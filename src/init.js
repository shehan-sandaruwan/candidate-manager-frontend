/**
 * Created by sumith on 2/22/17.
 */

const express = require('express');
const appRoutes = require('../app/src/server');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const uuidV4 = require("uuid/v4");
const cls = require("continuation-local-storage");
const favicon = require('serve-favicon');
const namespace = cls.getNamespace("net.cake.global");

const appInit = function (app) {
    if (namespace) {
        app.use(function (req, res, next) {
            namespace.bindEmitter(req);
            namespace.bindEmitter(res);

            let correlationId = req.get("X-Correlation-Id");

            // run following middleware in the scope of the namespace we created
            namespace.run(function () {
                // set correlationId on the namespace, makes it available for all continuations
                if (correlationId) {
                    namespace.set("correlationId", correlationId);
                } else {
                    let uuid = uuidV4();
                    namespace.set("correlationId", uuid);
                }
                next();
            });
        });
    }
    // Cookie parser
    app.use(cookieParser());

    // Enabling CORS. If you have custom headers include them here.
    // !Important enable withCredentials flags in your client side calls otherwise they will be rejected
    const corsConfig = {
        origin: (origin, callback) => {
            callback(null, true);
        },
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'Accept-Language', 'Accept-Encoding', 'User', 'Cookie', 'X-Correlation-Id'],
        credentials: true,
        maxAge: 86400
    };
    app.options('*', cors(corsConfig));
    app.use(cors(corsConfig));
    app.use(express.static(path.join(__dirname, '../public'), {maxAge: 86400000}));
    app.use(favicon(path.join(__dirname, '../public/assets/images/favicon.png')));

    appRoutes(app);
};

module.exports = appInit;
