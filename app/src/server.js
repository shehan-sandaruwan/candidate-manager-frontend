var bodyParser = require('body-parser');

module.exports = (app) => {
    const applicationRouter = require('./application/applicationRoutes');
    const positionRouter = require('./application/positionRoutes');
    const userRouter = require("./application/userRoutes");
    const extRoutes = require("./application/externalApplicationRoutes");
    const stateRoutes = require("./application/stateRoutes");
    const userPriviledgeRoutes = require("./application/userPriviledgeRoutes");
    const adminPriviledgeRoutes = require("./application/adminRoutes");
    const departmentRoutes = require("./application/departmentRoutes");
    const scheduleRoutes = require("./application/scheduleRoutes");
    var auth = require('./auth/authenticate');
    const profileRoutes = require("./application/profileRoutes");
    const feedbackRoutes = require("./application/feedbackRoutes");
    
    app.use(bodyParser.json());
    app.use(auth);    
    
    app.use('/application', applicationRouter);
    app.use('/position',positionRouter);
    app.use('/user',userRouter);
    app.use('/externalapplication',extRoutes);
    app.use('/state',stateRoutes);
    app.use('/userPrivilege',userPriviledgeRoutes);
    app.use('/department',departmentRoutes);
    app.use('/adminPrivilege',adminPriviledgeRoutes);
    app.use('/schedule',scheduleRoutes);
    app.use('/profile',profileRoutes);
    app.use('/feedback',feedbackRoutes);
};
