/**
 * Created by sumith on 2/20/17.
 */

const url = require('url');
const request = require('request');
const fs = require('fs');
const _ = require('lodash');
const confDef = require('./conf-def');
const convict = require('./conf-man');

let conf = convict(confDef.config);

/****************************************************************************
 * Shedule the callback to be triggered in the next tick
 *
 * @param cb  Callback
 * @param err Error object
 */
function callCb(cb, err) {
    let errorObj = null;

    if ('string' === typeof err) {
        errorObj = new Error(err);
    } else if (err) {
        errorObj = err;
    }

    // Why should we use process.nextTick here? What are the disadvantages?
    // I leave it as an exercise for you
    process.nextTick(function () {
        cb(errorObj);
    });
};


/****************************************************************************
 * Finalize the config load
 *
 * @param cb Callback
 */
function finalizeConfLoad(cb) {
    // If there is a local config file, load it.
    if (fs.existsSync(confDef.localSettingsFile)) {
        conf.loadFile([confDef.localSettingsFile]);
    }
    try {
        // Validate against the schema
        conf.validate({
            strict: true
        });

        // All success
        callCb(cb);
    } catch (e) {
        callCb(cb, e);
    }
};


/****************************************************************************
 * Return the configuration API settings schema
 *
 * @returns {a}
 */
function getConfApiSchema() {
    return convict({
        confApi: {
            env: {
                doc: 'The config environment.',
                format: confDef.allowedEnviroments,
                default: '',
                env: `${confDef.envVarPrefix}_ENV`,
                arg: 'env'
            },

            api: {
                doc: 'Configuration server api endpoint.',
                format: 'url',
                default: '',
                env: `${confDef.envVarPrefix}_CONFIG_API_HOST`,
                arg: 'conf-api'
            },

            authHeader: {
                doc: 'Configuration server api basic auth header.',
                format: 'no-empty-string',
                default: '',
                env: `${confDef.envVarPrefix}_CONFIG_API_BASIC_AUTH_KEY`,
                arg: 'conf-api-header'
            }
        }
    });
}


/****************************************************************************
 * Read configuration values from the configuration server
 *
 * @param cb Callback
 */
const initConfig = function (cb) {
    let confApiSchema = getConfApiSchema();

    // If the configuration API settings file exists, read from it
    finalizeConfLoad(cb);
    if (fs.existsSync(confDef.localConfApiSettingsFile)) {
        confApiSchema.loadFile([confDef.localConfApiSettingsFile]);
    }
    console.log('config API env: ', confApiSchema.get('confApi.env'));
    console.log('config API url: ', confApiSchema.get('confApi.api'));
    console.log('config API authHeader: ', confApiSchema.get('confApi.authHeader'));
    /*if (_.isEmpty(confApiSchema.get('confApi.env')) &&
        _.isEmpty(confApiSchema.get('confApi.api')) &&
        _.isEmpty(confApiSchema.get('confApi.authHeader'))) {
        // All the configuration API settings are empty.
        // That means we are not going to load any configuration settings from the server
        finalizeConfLoad(cb);
    } else {
        // At least one configuration API setting has been defined.
        // That means we are trying to load the configuration api settings
        try {
            // Validate against the schema
            confApiSchema.validate({
                strict: true
            });

            // Make the request to config server
            let configUrl = confApiSchema.get('confApi.api');
            if (!configUrl.endsWith('configs/')) {
                configUrl += '/configs/';
            }

            request({
                url: url.resolve(configUrl, `${confDef.appId}/${confApiSchema.get('confApi.env')}`),
                headers: {
                    'Authorization': 'Basic ' + confApiSchema.get('confApi.authHeader')
                }
            }, function (error, response, body) {
                if (error) {
                    callCb(cb, `Communication with the config server failed. ${error}`)
                } else {
                    try {
                        // Ok, we have the configs, try to decode
                        let confObj = JSON.parse(body);

                        // We have successfully decoded configs. Check if the server is returning an error
                        if (confObj.error) {
                            callCb(cb, `Config server failed to process our request. Do you have a config repo corresponding to your app id "${confDef.appId}"?\n${body}`);
                        } else {
                            // Extract the sources
                            let sourceList = _.map(confObj.propertySources, 'source');

                            // Merge into a single object.
                            // sourceList provide us array of config objects. We have to merge them to a single object
                            // such that if a particular key has been already seen in an object, it is ignored from any other object
                            // down the line. This exact behaviour is given by the defaults function of the lodash library.
                            // Please refer the lodash documentation given below if you are unfamiliar with the defaults function
                            // https://lodash.com/docs

                            let confSet = _.defaults({}, ...sourceList);

                            // Set values obtained from the config server
                            _.forEach(confSet, function (val, key) {
                                conf.set(key, val);
                            });

                            finalizeConfLoad(cb);
                        }
                    } catch (e) {
                        callCb(cb, e);
                    }
                }
            });
        } catch (e) {
            callCb(cb, e);
        }
    }*/
};

module.exports = {conf, initConfig, getConfApiSchema};
