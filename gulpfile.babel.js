import gulp from 'gulp';
import print from 'gulp-print';
import del from 'del';
import webpack from 'webpack';
import gutil from 'gulp-util';
import webpackConfigProd from './webpack/webpack.config.production.js';
import through from 'through-gulp';
import Vinyl from 'vinyl';
import babel from 'gulp-babel';
import replace from 'gulp-string-replace';
import uuid from 'uuid';
import {spawn} from 'child_process';
import rename from 'gulp-rename';

// Generate a unique UUID. This is used to name the application asset folder in the npm module build
const assetUUID = uuid();

// At the moment, there is no way to pass parameters to a gulp process. we need currently running main task name to
// make some conditional builds later
const runningTaskName = process.argv[2] || 'default';

// This is the main output folder of the build process
const distDir = './dist';

// Setup the sub directory name for server and standalone builds.
// We could use the runningTaskName directly here. But, used a condition anyway in order to be in the safe side
const subDir = ('server' == runningTaskName) ? 'server' : 'standalone';

// Standalone directory path
const standaloneDir = `${distDir}/${subDir}`;

// UI asset dir in the project root. This is kept in the project root in order to keep the relative paths same in the
// both dev mode and the production mode. Assets are first copied into this directory and
// then copied to the corresponding directory in "distDir" from here
const uiDir = './public';

// UI asset dir in the "distDir"
const standaloneUiDir = `${standaloneDir}/public`;

// UI asset dir in the "distDir"
const standaloneTplDir = `${standaloneDir}/tpl`;

// Dir to keep framework server code
const standaloneServerDir = `${standaloneDir}/src`;

// Dir to keep app server code
const standaloneServerAppDir = `${standaloneDir}/app/src`;

// Regular expression to match conditional compilation statements.
// Any server code between /** IF (...) **/ and /** ENDIF **/ is removed in the builds that are not listed in the parenthesis.
const conditionalCompilationBlockMatcher = /\/\*{2,}\s*IF\s*\(\s*([A-Z]+(?:\s*,\s*[A-Z]+)*)\s*\)\s*\*{2,}\/([\s\S]*?)\/\*{2,}\s*ENDIF\s*\*{2,}\//g;


///////////////////////////////////////////////////////////////////////////////////////////////
// Support tasks for NPM module build

// Remove the dist folder
gulp.task('clean:dist', () => {
    return del(distDir);
});

// Copy application assets in module build
gulp.task('copy:appassets:dist', function () {
    return gulp.src('./app/frontend/assets/**')
        .pipe(gulp.dest('./dist/assets/' + assetUUID));
});

// Production module build
gulp.task('build:dist', () => {
    return gulp.src(['app/frontend/src/**/*.js', 'app/frontend/src/**/*.jsx', 'app/frontend/src/**/*.es6'])
        .pipe(babel({
            presets: ['es2015', 'react'],
            plugins: ['babel-plugin-add-module-exports']
        }))
        .pipe(replace(/\/assets\/app/img, '/assets/' + assetUUID))
        .pipe(gulp.dest('dist'));
});


///////////////////////////////////////////////////////////////////////////////////////////////
// Support tasks for asset processing

// Clean the root level asset folder
gulp.task('asset:clean:output', function () {
    return del(uiDir);
});

// Clean the temp dir holding intermediate files
gulp.task('assets:clean:temp', () => {
    return del('./.build_tmp');
});

// Copy error html files to public folder folder
gulp.task('asset:build:html', () => {
    return gulp.src(['./ui/errors/**'])
        .pipe(gulp.dest(`${uiDir}/errors`));
});


// Collect all assets in the node modules in @trycake domain to the temporary holding position
// This is basically to collect assets in the glaze ui library
gulp.task('asset:build:temp', () => {
    return gulp.src(['./node_modules/@trycake/**/assets/**'])
        .pipe(print())
        .pipe(rename(function (path) {
            if (path.dirname) {
                path.dirname = path.dirname.replace(/^.*?\/assets\//im, 'assets/');
            }
        }))
        .pipe(gulp.dest('./.build_tmp/'));
});

// Copy temporary holding position to root level public folder
gulp.task('asset:build:copy', () => {
    return gulp.src(['./.build_tmp/assets/**'])
        .pipe(gulp.dest(`${uiDir}/assets/`));
});

// Copy application assets into the public folder
gulp.task('copy:appassets:standalone', () => {
    return gulp.src('./app/frontend/assets/**')
        .pipe(gulp.dest(`${uiDir}/assets/app`));
});

// Build assets
gulp.task('asset:build',
    gulp.series(
        'asset:clean:output',
        gulp.parallel(
            'copy:appassets:standalone',
            gulp.series('assets:clean:temp', 'asset:build:temp', 'asset:build:copy', 'assets:clean:temp', 'asset:build:html')
        )
    ));


///////////////////////////////////////////////////////////////////////////////////////////////
// Support tasks for css processing

// Generate css import statements for node modules
function generateCssInclude(importBase) {
    let pathSet = [];

    // Use "through" to hook into the gulp stream and extract the file names.
    // Import statements are pushed into an array.
    // When the stream ends, collected import statements are written into a new file called glazeComponentCss.jsx
    // and pushed into the stream
    return through(function (file, enc, cb) {
        if (file.path) {
            pathSet.push("import '" + importBase + file.relative + "';");

            cb();
        }
    }, function (cb) {
        this.push(new Vinyl({
            path: 'glazeComponentCss.jsx',
            contents: new Buffer(pathSet.join("\n"))
        }));

        cb();
    });
}

// Build css
gulp.task('css:build', () => {
    return gulp.src(['./node_modules/@trycake/**/glaze-ui-components.css'])
        .pipe(generateCssInclude('../node_modules/@trycake/'))
        .pipe(gulp.dest('ui/'));
});

// Production standalone build using webpack
gulp.task('build:ui:standalone', function (cb) {
    webpack(webpackConfigProd(), function (err, stats) {
        if (err) {
            throw new gutil.PluginError("build:ui:standalone", err);
        }

        gutil.log("[build:ui:standalone]", stats.toString({
            colors: true
        }));

        cb();
    });
});


///////////////////////////////////////////////////////////////////////////////////////////////
// Support tasks for server code processing

// Replace function to process conditional compilation blocks
function condCompilationReplacer(fullMatch, modeString, codeBody) {
    // Normalize the string in the parenthesis for later testing
    var modes = modeString.replace(/\s+/g, '').toLowerCase().split(',');

    // If the current compilation mode is listed in the parenthesis, no replacement should occur.
    // Just return the code body enclosed by the IF statement
    if (modes.indexOf(runningTaskName) >= 0) {
        return codeBody;
    }

    // If the current compilation mode is listed in the parenthesis,
    // make the entire thing vanished into thin air
    return '';
}

// Server framework code build
gulp.task('build:server:standalone', function () {
    return gulp.src(['./src/**/*.js', './src/**/*.es6'])
        .pipe(replace(conditionalCompilationBlockMatcher, condCompilationReplacer))
        .pipe(gulp.dest(standaloneServerDir));
});

// Server app code build
gulp.task('build:server:standalone:app', function () {
    return gulp.src(['./app/src/**/*.js', './app/src/**/*.es6'])
        .pipe(replace(conditionalCompilationBlockMatcher, condCompilationReplacer))
        .pipe(gulp.dest(standaloneServerAppDir));
});

// Copy assets from root level public folder to the corresponding folder inside the "distDir"
gulp.task('copy:assets:standalone', function () {
    return gulp.src([`${uiDir}/**`, `!${uiDir}/idx.template.html`])
        .pipe(gulp.dest(standaloneUiDir));
});

// Copy the html template
gulp.task('copy:assets:standalone:html', function () {
    return gulp.src([`${uiDir}/idx.template.html`])
        .pipe(gulp.dest(standaloneTplDir));
});

// Copy package json
gulp.task('copy:package', function () {
    return gulp.src(['./package.json'])
        .pipe(gulp.dest(standaloneDir));
});


var nodeMonProcess;

// Start dev server by spawning a nodemon process that monitors the babel-node executable and
// restart it when the files being watched are modified
gulp.task('dev-server', function () {
    if (nodeMonProcess) {
        nodeMonProcess.kill();
    }

    let env = Object.create(process.env);

    env.DEBUG = 'idm-auth';

    nodeMonProcess = spawn('nodemon', [
        'src/index.js',
        '--exec',
        'babel-node'
    ], {
        stdio: 'inherit',
        env: env
    })
});

//Kill the nodemon process if the gulp is to exit for any reason
process.on('exit', function () {
    if (nodeMonProcess) {
        nodeMonProcess.kill();
    }
});

// Copy nav.json into the root level public folder so that the dev server can statically
// serve it to the navigation component
gulp.task('copy:json', function () {
    return gulp.src(['./app/*.json'])
        .pipe(gulp.dest(uiDir));
});


///////////////////////////////////////////////////////////////////////////////////////////////
// Standalone build
const standalone = gulp.series(
    'clean:dist',

    gulp.parallel (
        'asset:build','css:build','build:ui:standalone','build:server:standalone','build:server:standalone:app'
    ),

    gulp.parallel(
        'copy:assets:standalone', 'copy:assets:standalone:html', 'copy:package'
    )
);

export {standalone};


///////////////////////////////////////////////////////////////////////////////////////////////
// Server build
const server = gulp.series(
    'clean:dist',

    gulp.parallel(
        'build:server:standalone', 'build:server:standalone:app', 'copy:package'
    )
);

export {server};


///////////////////////////////////////////////////////////////////////////////////////////////
// Module build
const build = gulp.series(
    'clean:dist',

    gulp.parallel(
        'build:dist', 'copy:appassets:dist'
    )
);

export {build};


///////////////////////////////////////////////////////////////////////////////////////////////
// Dev build
const dev = gulp.series(
    'clean:dist',

    gulp.parallel(
        'asset:build', 'css:build'
    ),

    'copy:json',
    'dev-server'
);

export default dev;


