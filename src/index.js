/**
 * Created by sumith on 2/13/17.
 */

const express = require('express');
const {conf, initConfig} = require('./conf/config');
const appInit = require('./init');
const path = require('path');
const {isEmpty} = require('validator');
const fs = require('fs');
const https = require('https');
const url = require('url');
const request = require('request');
const {frameworkLogger} = require('./utils/logger');

const logger = frameworkLogger.getDefaultLogger();

function sendErrorPage(res, next, code){
    return fs.readFile(path.join(__dirname, `../public/errors/error${code}.html`), 'utf8', function (err, data){
        if (err) {
            logger.error(`error in reading file to send ${code} error page`);
            return next(err);
        }else{
            logger.info(`reading file to send ${code} success: data`, data);
            res.send(data);
            res.end();
            next();
        }
    })
}

/****************************************************************************
 * Process the index template
 *
 * @param fileSystem  The file system. This can be the in memory file system used by the webpack dev middleware
 *                    in the dev mode or the actual dis file system in the production mode
 *
 * @param tplPath     Path of the template file
 * @param req         Express request object
 * @param res         Express response object
 * @param next        Next express middleware
 */
function processIdxTpl(fileSystem, tplPath, req, res, next) {
    fileSystem.readFile(tplPath, 'utf8', function (err, data) {
        if (err) {
            return next(err);
        } else {
            let user = req.user;
            const url_parts = url.parse(req.url, true);
            const query = url_parts.query;

            const cookieName = conf.get('app.cookie_name');
            const cookieValue = req.cookies[cookieName];
            let profile_url = conf.get('app.ua_profile_api_url');
            logger.info('profile url is', profile_url);

            let clientSideData = {
                defaultAccount: query.accountId,
                navApi: conf.get('app.nav_api'),
                accountListApi: conf.get('app.account_list_api'),
                accountApi: conf.get('app.account_api'),
                subApp: conf.get('subApp'),
                appClient: query.appClient
            };
            logger.info('client side data', clientSideData);

            res.set('content-type', 'text/html');
            if(user) {
                let j = request.jar();
                logger.info(cookieName + '-' + cookieValue);
                const cookie = request.cookie(cookieName + '=' + cookieValue);
                j.setCookie(cookie, profile_url);
                logger.info('user is', user);
                logger.info('User available making API call to get permissions: ', profile_url);
                request({url: profile_url, jar: j}, function (error, response, body) {
                    logger.info('API call to get permissions finished');
                    if (err) {
                        logger.info('error getting permissions:', error);
                        return sendErrorPage(res, next, 500);
                    } else {
                        let statusCode = response && response.statusCode;
                        logger.info('API call to get permissions finished and statusCode:', statusCode);
                        if (statusCode != 200) {
                            logger.error('index.es6 get profiles: error in getting permissions statusCode:', statusCode);
                            logger.error('index.es6 error send file path not 200:', path.join(__dirname, '../public/errors/error401.html'));
                            return sendErrorPage(res, next, 401);
                        }

                        let profiles;
                        try{
                            profiles = JSON.parse(body);
                        clientSideData.user = {
                           username: user.preferred_username || user.username || '',
                           fname:    user.firstName,
                           lname:    user.lastName,
                           accounts: user.accounts,
                           email: user.email,
                           idmUserId: req.user.sub,
                           permissions: null,
                           profiles: profiles.profiles
                        };
                            logger.info('Send index page, user available');
                        sendIndexPage(res, data, clientSideData);
                        }catch (e){
                            logger.error('index.es6 error in parsing the data', body + ' error : ', e);
                            logger.error('index.es6 error send file path:', path.join(__dirname, '../public/errors/error401.html'));
                            return sendErrorPage(res, next, 401);
                        }
                    }
      });
            }else {
                logger.info('Send index page, user not available');
                sendIndexPage(res, data, clientSideData);
            }
        }
    });
}


function sendIndexPage(res, data, clientSideData) {
    logger.info('clientSideData: ',clientSideData);
    let data2Html = JSON.stringify(clientSideData);
    logger.info('data to HTML content:  ', data2Html);
    res.send(data.replace(/\{\{\{APPLICATION_DATA\}\}\}/g, data2Html.replace(/"/g, "\\\"")));
    res.end();
}


/****************************************************************************
 * Terminate the application with an error
 *
 * @param e  Exception object
 */
function exitWithError(e){
  // God dammit!!!
  // We are programmers. We write the perfect code. Nothing can go wrong there.
  // Some idiot must have messed with the configuration. Anyway, we are screwed at this point. Nowhere to proceed :(

    logger.error('-------------------- Error starting the server! -------------------- ');
    logger.error(e.message);
    logger.error('-------------------------------------------------------------------- ');
  process.exit(); // Just die

  // By the way, we programmers don't mess with the configuration files either. So its definitely some idiot!!
}


var app = express();

// Read the config from the config server if available and start the express server
initConfig(function(error){
  if (false) {
    exitWithError(error);
  } else {
    // Initialize the application
    appInit(app);


/** IF (STANDALONE) **/
        let tplFile = {
      fs: require('fs'),
      file: path.join(__dirname, '../tpl/idx.template.html')
    };
/** ENDIF **/


/** IF (DEV) **/
    ////////////////////////////////// !!!! DEV BUILD ONLY CODE !!!! //////////////////////////////////
    // This code block is automatically removed from the production build.
    // DO NOT write any code you want to keep in the production build
    // in between START_DEV_MODE_ONLY and END_DEV_MODE_ONLY

    if ('development' === conf.get('env')) {
      let webpack = require('webpack');
      let webpackDevMiddleware = require('webpack-dev-middleware');
      let webpackHotMiddleware = require('webpack-hot-middleware');
      let webpackDevConfig = require('../webpack/webpack.config.development');

      let cfg = webpackDevConfig();

      let compiler = webpack(cfg);

      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

      app.use(webpackDevMiddleware(compiler, {
        publicPath: cfg.output.publicPath,

        stats: {
          colors: true,
          progress: true
        }
      }));

      app.use(webpackHotMiddleware(compiler, {
        log: console.log
      }));

      tplFile = {
        fs: compiler.outputFileSystem,
        file: path.join(compiler.outputPath,'idx.template.html')
      }

    }
/** ENDIF **/

/** IF (STANDALONE) **/
    app.use('*', function(req, res, next){
      processIdxTpl(tplFile.fs, tplFile.file, req, res, next);
    });
/** ENDIF **/

    // Listen to the incoming connections
    try {
            let listeningPort = conf.get('server.port');
            let sslKeyPath = conf.get('server.ssl_key');
            let sslCertPath = conf.get('server.ssl_cert');

            if ('development' === conf.get('env')) {
                sslKeyPath = "";
                sslCertPath = "";
            }
            logger.info('use https: ', conf.get('server.use_https'));
            if (conf.get('server.use_https')) {
                if (isEmpty(sslKeyPath) || isEmpty(sslCertPath)) {

                    if ('development' !== conf.get('env')) {
                        throw new Error('Server configured to https but hasn\'t provided path for ssl key and cert.');
                    } else {
                        //In dev mode use self signed key
                        const pem = require('pem');
                        pem.createCertificate({days: 1, selfSigned: true}, function (err, keys) {
                            https.createServer({
                                key: keys.serviceKey,
                                cert: keys.certificate
                            }, app).listen(listeningPort, (req, res) => {
                                logger.info('App listening on port ' + listeningPort + ' in https with self signed keys!')
                            });
                        });
                    }

                } else {
                    https.createServer({
                        key: fs.readFileSync(sslKeyPath),
                        cert: fs.readFileSync(sslCertPath)
                    }, app).listen(listeningPort, () => {
                        logger.info('App listening on port ' + listeningPort + ' in https!')
                    })
                }
            } else {
      app.listen(listeningPort, function () {
          logger.info('App listening on port '+listeningPort+'!')
      });
            }
    } catch (e) {
      exitWithError(e);
    }
  }
});

