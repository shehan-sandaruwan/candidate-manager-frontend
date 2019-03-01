const {Router} = require('express');
const {conf} = require("../conf/config");
const router = Router();


router.get('/signOut', (req, res) => {
    const cookieDomain = conf.get('app.cookie_domain');
    res.clearCookie("Cake_SSO_Token", {path: '/', domain: cookieDomain});
    res.clearCookie(conf.get('app.cookie_name'), {path: '/', domain: cookieDomain});
    const idmUrl = conf.get('idm.end_session_endpoint') + "?redirect_uri=" + conf.get('server.home_url');
    res.redirect(idmUrl);
});

module.exports = router;

