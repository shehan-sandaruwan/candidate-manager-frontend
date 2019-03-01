/**
 * Created by achintha on 5/17/17.
 */

const log4js = require('log4js');
const fs = require('fs');
const {conf} = require('../conf/config');
const clstorage = require('continuation-local-storage');

const logDirectoryPath = '/var/log/'+ conf.get('app.app_id')+'/';
const logFileName = conf.get('app.app_id') + '.log';
if (!fs.existsSync(logDirectoryPath)) {
    fs.mkdirSync(logDirectoryPath);
}

const getLoggingConfig = customConfigs => {
    return {
        "appenders": [
            {
                "type": "logLevelFilter",
                "level": (customConfigs != undefined && customConfigs['level']) ?
                                    customConfigs['level'] : frameworkLogger.level.ALL,
                "appender": {
                    "type": "dateFile",
                    "filename": (customConfigs != undefined && customConfigs['filename']) ?
                                        logDirectoryPath + customConfigs['filename'] :(logDirectoryPath + logFileName),
                    "pattern": "-yyyy-MM-dd",
                    "layout": {
                        "type": "pattern",
                        "pattern": "[%d{DATE}], [%x{correlationId}], [%p], %z %c - %m",
                        "tokens": {
                            "correlationId" : function() {
                                return (clstorage.getNamespace('net.cake.global')) ?
                                    clstorage.getNamespace('net.cake.global').get('correlationId') : null;
                            }
                        }
                    }
                }
            },
            {
                "type": "logLevelFilter",
                "level": (customConfigs != undefined && customConfigs['level']) ? customConfigs['level'] : frameworkLogger.level.ALL,
                "appender": {
                    "type": "stdout",
                    "layout": {
                        "type": "pattern",
                        "pattern": "[%d{DATE}], [%x{correlationId}], %[%p%], %z %c - %m",
                        "tokens": {
                            "correlationId" : function() {
                                return (clstorage.getNamespace('net.cake.global')) ?
                                    clstorage.getNamespace('net.cake.global').get('correlationId') : null;
                            }
                        }
                    }
                }
            },
        ]
    }
};

export const createLogger = (loggerConfig) => {
    log4js.configure(getLoggingConfig(loggerConfig));
    let logger = log4js.getLogger();

    return logger;
};

export const frameworkLogger = {
    createLogger,
    getDefaultLogger: () => {
        return createLogger();
    },

    level: {
        ALL: 'ALL',
        TRACE: 'TRACE',
        DEBUG: 'DEBUG',
        INFO: 'INFO',
        WARN: 'WARN',
        ERROR: 'ERROR',
        FATAL: 'FATAL',
        OFF: 'OFF',
    },
};
