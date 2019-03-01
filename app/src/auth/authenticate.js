const jwt = require('jwt-simple');
const userService = require('../service/userService');
const UserPrivilegeService = require('../service/userPriviledgeService');
const adminPrivilegeService = require('../service/adminPrivilegeService');
const axios = require('axios');
const backendIp = require('../constants');

const authenticate = (req, res, next) => {
    if (['/bundle.js', '/bundle.js.map', '/3b6c05e0738e60f545760dd4b9b0ea2f.svg', '/__webpack_hmr', '/externalapplication/'].includes(req.url)) {
        next()
    }

    else if (req.url == '/candidatemanager/authenticate') {
        try {
            let { token } = req.cookies;
            jwt.decode(token, "secret");
            res.writeHead(302, {
                'Location': '/candidatemanager/authenticate'
            });
            res.end();

        }
        catch (e) {
            next();

        }
    }
    else if (req.url == '/auth/signin/' && req.method == 'POST') {
        let data = req.body;
        if (!data.email) {
            res.writeHead(302, {
                'Location': '/candidatemanager/authenticate'
                //add other headers here...
            });
            res.end();
        }
        if (!validateEmail(data.email)) {
            res.writeHead(302, {
                'Location': '/candidatemanager/authenticate'
                //add other headers here...
            });
            res.end();
        }
        else {
            console.log("==================token created==========================")
            var token = jwt.encode(data.email, "secret");

            var authLink = "http://ec2-34-229-119-225.compute-1.amazonaws.com/auth/auth?"+ token;
            console.log(authLink);


            // axios.post('https://outlook.office.com/api/v2.0/me/sendmail',{
            //     Message: {
            //     Subject: "Candidate API Token",
            //     Body: {
            //       ContentType: "Text",
            //       Content: authLink
            //     },
            //     ToRecipients: [
            //       {
            //         EmailAddress: {
            //           Address: data.email.toString()
            //         }
            //       }
            //     ]
            //   },
            //   "SaveToSentItems": "false"}).then((response) => {
            //       console.log(response);
            //   }).catch((error) => {
            //       console.log(error)
            //   })



            userService.authorize({ email: data.email, url: "http://ec2-34-229-119-225.compute-1.amazonaws.com/auth/auth?" + token }).then(res.end())
        }
    }

    else if (req.url.split("?")[0] == '/auth/auth' && req.method == 'GET') {
        let token = req.url.split("?")[1];
        try {
            console.log("==================auth successful==========================")
            let decoded = jwt.decode(token, "secret");
            console.log(decoded);
            res.cookie('token', token, { maxAge: 86400000 });
            res.cookie('email', decoded, { maxAge: 86400000 })
            res.writeHead(302, {
                'Location': '/'
            });
            res.end();

        }
        catch (e) {
            console.log("==================token error==========================")
            console.log(req.url)
            res.writeHead(302, {
                'Location': '/candidatemanager/authenticate'
            });
            res.end();

        }

    }

    else if (req.url == '/auth/signout/' && req.method == 'GET') {
        console.log("==================sign out==========================")
        res.clearCookie('token');
        res.writeHead(302, {
            'Location': '/candidatemanager/authenticate'
        });
        res.end();

    }
    else {
        let error = null;
        let email = "";

        try {
            let { token } = req.cookies;
            email = jwt.decode(token, "secret");
        }
        catch (e) {
            error = e;
            console.log("==================auth fail==========================")
            console.log(req.url)
            res.writeHead(302, {
                'Location': '/candidatemanager/authenticate'
            });
            res.end();

        }
        if (!error) {
            let user = new Object();
           var promise =  userService.findOneByEmail(email)
                .then(
                    response => {
                        if (response.status == 400) {
                            user.email = email;
                            user.isGeneral = true;
                            console.log("=================authenticated user====================");
                            console.log(user);
                            req.authUser = user;
                            res.cookie('root', 0, { maxAge: 86400000 });
                            res.cookie('authUser', JSON.stringify(user), { maxAge: 86400000 });
                            next();
                        }
                        else {
                            user.email = response.data.email;
                            user.isGeneral = false;
                            user.id = response.data.id;
                            let root = 0;
                            UserPrivilegeService.findAllByUserId(user.id)
                                .then(
                                    response => {
                                        if (response.status == 200) {
                                            user.canInterview = response.data.length != 0;
                                            user.canShortList = response.data.length != 0;
                                        }
                                        adminPrivilegeService.findAllByUserId(user.id)
                                            .then(
                                                response => {
                                                    if (response.status == 200) {
                                                        if (response.data.length == 0) {
                                                            user.isAdmin = false;
                                                            user.isSuperAdmin = false;
                                                        }
                                                        else {
                                                            user.isAdmin = response.data[0].isAdmin == 1;
                                                            user.isSuperAdmin = response.data[0].isSuperAdmin == 1;
                                                        }
                                                    }
                                                    console.log("=================authenticated user====================");
                                                    console.log(user);
                                                    req.authUser = user;
                                                    if (user.isAdmin) root = 1
                                                    else if (user.isSuperAdmin) root = 3
                                                    else if (user.canInterview) root = 2
                                                    res.cookie('root', root, { maxAge: 86400000 });
                                                    res.cookie('authUser', JSON.stringify(user), { maxAge: 86400000 });
                                                    next();

                                                })


                                    })
                        }

                        throw new Error('Failed');

                    });

                    promise['catch'](function(){console.log('caught')});
        }
    }

};

function isSysco(email) {
    email = email.toLowerCase();
    let sysco = email.length >= "sysco.com".length && email.substr(email.length - "sysco.com".length) == "sysco.com";
    let syscoLabs = email.length >= "syscolabs.com".length && email.substr(email.length - "syscolabs.com".length) == "syscolabs.com";
    return sysco || syscoLabs;
}

const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()) && isSysco(email);
};

module.exports = authenticate;