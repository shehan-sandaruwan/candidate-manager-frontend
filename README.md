# universal-admin-boilerplate

Boiler plate code to start developing new universal admin compatible
applications.

Universal Admin(UA) is a framework that has been designed to facilitate 
the development of independent sub applications and yet integrate all of 
them into a single page app ( SPA ) while providing maximum possible 
runtime isolation between individual sub apps. 

## Usage

* Refer [this wiki page](https://wiki.leapset.com/display/CR/Instructions+for+bootstrapping+a+new+universal+admin+application) for more information.
* If you just want to jump start the app do following.

**1.** Create following 2 files in given path

**(i)** /etc/cake_conf/ua-boilerplate/conf.json

```javascript
{
  "env": "development",
  "server": {
    "ip": "127.0.0.1",
    "port": "8080",
    "use_https": "false"
  },
  "app": {
    "cookie_name": "CAKE_NET_AUTH",
    "cookie_domain": ".cake.net",
    "nav_api": "http://local.cake.net:8080/nav.json",
    "account_list_api": "http://local.cake.net:8080/account.json",
    "account_api": "http://local.cake.net:8080/accounts",
    "ua_profile_api_url": "http://local.cake.net:8080/profiles.json"
  },
  "idm": {
    "end_session_endpoint": "https://pos2-accounts.cake.net/auth/realms/leapset/protocol/openid-connect/logout",
    "discover": "https://pos2-api.leapset.com:8443/idm/realms/leapset/.well-known/openid-configuration",
    "client_id": "user-management",
    "client_secret": "127aeea1-e283-48ab-a374-e3277c6cd311",
    "clock_tolerance": 0,
    "redirect_uri":"http://local.cake.net:8080/login/verify",
    "bearer_api": "https://pos2-api.leapset.com:8443/oauth/token"
  },
  subApp: {
        backend:"http://local.cake.net:8080"
      }
} 
```

**(ii)** /etc/cake_conf/ua-boilerplate/conf_api.json

```javascript
{
  confApi:{
     env: 'pos2',
     api: 'https://pos2-api.leapset.com:8443',
     authHeader: 'Y29uZmlnLXN1cGVyLXVzZXI6OWlqbkJHVDU='
  }
}
```

**2.** Login to npm in console using ***@trycake*** domain npm account.

**3.** Type ```npm install``` and after that type ```npm start``` and navigate to
http://local.cake.net:8080. **Note**: Map *local.cake.net* in your host file to
localhost.

## Contributors
- Nuwan Munasinge: <nuwan.munasinghe@trycake.com>

