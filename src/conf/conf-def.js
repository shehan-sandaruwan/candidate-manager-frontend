const _ = require('lodash');
const path = require('path');


const confDir = '/etc/cake_conf';

// Set your application id here. No spaces pls
const appId = 'ua-boilerplate';

// Potential environments this application will run on. Please feel free to add yours if its not listed here
// But, there are so many of them already. :)
// This list is used to validate "env" config option.
const allowedEnviroments = [
  // Production
  'prod',

  //Staging
  'stag',

  // QA
  'tst1','tst2','tst3','tst4','tst5','tst6',

  // POS
  'pos1','pos2','pos3','pos4',

  // Platform
  'plat1','plat2'
];

// Settings are also red from the environment variables.
// We try to group our set of environment variables using the app id as a prefix here
const envVarPrefix = _.replace(_.toUpper(appId), /[\-]/g, '_');

// Application configuration schema itself. Add any configuration option definition here
// See the convict module for more information
// https://github.com/mozilla/node-convict

const confDef = {
  localSettingsFile: path.join(confDir, `${appId}/conf.json`),

  localConfApiSettingsFile: path.join(confDir, `${appId}/conf_api.json`),

  appId: appId,

  envVarPrefix: envVarPrefix,

  allowedEnviroments: allowedEnviroments,

  config: {
    // Application environment - do not modify
    env: {
      doc: 'The application environment.',
      format: ['development', ...allowedEnviroments],
      default: 'development',
      env: `${envVarPrefix}_APP_ENV`,
      arg: 'app-env'
    },

    // Server settings - do not modify
    server:{
      ip: {
        doc: 'The server IP address to bind.',
        format: 'ipaddress',
        default: '127.0.0.1',
        env: `${envVarPrefix}_SERVER_IP`,
        arg: 'ip'
      },
      port: {
        doc: 'The server port to bind.',
        format: 'port',
        default: 8080,
        env: `${envVarPrefix}_SERVER_PORT`,
        arg: 'port'
        },
        ssl_key: {
        doc: 'Path for the ssl key file',
        default: '',
        env: `${envVarPrefix}_SSL_KEY`,
        arg: 'ssl-key'
        },
        ssl_cert: {
        doc: 'Path for the ssl cert file',
        default: '',
        env: `${envVarPrefix}_SSL_CERT`,
        arg: 'ssl-cert'
        },
        use_https: {
        doc: 'Server should run in https mode',
        format: 'Boolean',
        default: true,
        env: `${envVarPrefix}_USE_HTTPS`,
        arg: 'use-https'
            },
            home_url: {
                doc: 'Home page of the app with domain',
                format: 'url',
                default: '',
                env: `${envVarPrefix}_HOME_URL`,
                arg: 'home-url'
      }
    },

    // App settings - no need to modify
    app:{
      app_id: {                                 // this is added mainly for to act as an identifier for logs
        doc: 'Application Identifier',
        format: 'String',
        default: appId
      },
      cookie_name: {
        doc: 'Application auth cookie name. This cookie is shared between call out and sub applications',
        format: 'uppercase-underscore',
        default: 'CAKE_NET_AUTH',
        env: `${envVarPrefix}_APP_COOKIE_NAME`,
        arg: 'app-cookie-name'
      },
      cookie_domain: {
        doc: 'Domain name of the domain cookie',
        format: 'cake-subdomain',
        default: '.cake.net',
        env: `${envVarPrefix}_APP_COOKIE_DOMAIN`,
        arg: 'app-cookie-domain'
      },
      cookie_max_age: {
        doc: 'Cookie max age',
        format: 'nat',
        default: 172800,
        env: `${envVarPrefix}_APP_COOKIE_MAX_AGE`,
        arg: 'app-cookie-max-age'
      },
      nav_api: {
        doc: 'API for the navigation bar to load the menu data.',
        format: 'url',
        default: '',
        env: `${envVarPrefix}_APP_NAV_API`,
        arg: 'app-nav-api'
      },
      account_api: {
        doc: 'API to get account product information',
        format: 'url',
        default: '',
        env: `${envVarPrefix}_APP_ACCOUNT_API`,
        arg: 'app-account-api'
      },
      account_list_api: {
        doc: 'API for the header drop down to obtain the account list.',
        format: 'url',
        default: '',
        env: `${envVarPrefix}_APP_ACCOUNT_LIST_API`,
        arg: 'app-account-list-api'
      },
      ua_profile_api_url: {
        doc: 'Url to get logged in user profiles',
        format: 'url',
        env: `${envVarPrefix}_UA_PROFILES_API_URL`,
        arg: 'ua-profile-api-url',
        default: ''
      }
    },

    // IDM settings - no need to modify
    idm: {
        discover: {
            doc: 'IDM discovery end-point',
            format: 'url',
            env: `${envVarPrefix}_IDM_DISCOVER`,
            arg: 'idm-discover',
            default: ''
        },
        end_session_endpoint: {
            doc: 'IDM end session end-point',
            format: 'url',
            env: `${envVarPrefix}_IDM_END_SESSION_END_POINT`,
            arg: 'idm-end-session-end-point',
            default: ''
        },
      client_id: {
        doc: 'IDM client ID',
        format: 'no-empty-string',
        env: `${envVarPrefix}_IDM_CLIENT_ID`,
        arg: 'idm-client-id',
        default: ''
      },
      client_secret: {
        doc: 'IDM client secret',
        format: 'uuid',
        env: `${envVarPrefix}_IDM_CLIENT_SECRET`,
        arg: 'idm-client-secret',
        default: ''
      },
      redirect_uri: {
        doc: 'IDM redirect URL. This should point to your application.',
        format: 'url',
        env: `${envVarPrefix}_IDM_REDIRECT_URI`,
        arg: 'idm-redirect-uri',
        default: '',
      },
      clock_tolerance: {
        doc: 'Clock tolerance allowed for IDM id_token verification. This setting comes handy when your dev machine / server has a clock delta with the IDM server',
        format: 'nat',
        default: 0,
        env: `${envVarPrefix}_IDM_CLOCK_TOLERANCE`,
        arg: 'idm-clock-tolerance'
      },
      bearer_api: {
        doc: 'Endpoint to fetch the bearer token',
        format: 'url',
        default: '',
        env: `${envVarPrefix}_IDM_BEARER_API`,
        arg: 'idm-bearer-api'
      }
    },

    // Configs inside this section will be available as app state to your app
    subApp: {
      backend: {
        doc: 'Backend API for the sub app ua',
        format: 'url',
        default: '',
        env: `${envVarPrefix}_SUBAPP_UA_BACKEND`,
        arg: 'subapp-ua-backend'
      }
      // Your frontend related configs which needs to be available in browser goes here
    }

    // Your app related configs goes here. Add a section and put them inside

  }
};

module.exports = confDef;
