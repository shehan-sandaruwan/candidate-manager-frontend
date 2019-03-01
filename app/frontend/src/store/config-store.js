import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';


const allStoreEnhancers = compose(
    applyMiddleware(thunk)
    // , window.devToolsExtension && window.devToolsExtension()
);

export default function () {
    return createStore(
        rootReducer,
        {
            application: {
                saving: false,
                doneSaving: false,
                errorSaving: false,
                alertVisible: false,
                alertMsg: "",
                alertType: "",
                applications: []
            },
            department: {
                allDepartments: [],
                isEditVisible: false,
                saveAlertVisible: false,
                alertMsg: "",
                alertType: ""
            },
            job: {
                isEditVisible: false,
                getting: false,
                got: true,
                alertMsg: "",
                alertType: "",
                savealertVisible: false,
                saving: false,
                saved: false,
                isEdit: false,
                currentEdit: {},
                job: {},
                allJobs: [{ id: 8, name: "SE", description: "java", isOpen: true }, { id: 8, name: "SSE", description: "java and .net", isOpen: true }]
            },
            home: {
                isEditVisible: false,
                isacceptVisible:false,
                getting: false,
                got: true,
                alertMsg: "",
                alertType: "",
                savealertVisible: false,
                isEdit: false,
                currentEdit: {},
                isHRShortListVisible: false,
                hrShortListAlertType: "",
                hrShortListAlertMsg: "",
                allApplications: [],
                hrShortListAlertVisible: false,

                isScheduleInterviewVisible: false,
                interviewers: [],
                scheduleAlertMsg: "",
                scheduleAlertType: "",
                scheduleAlertVisible: false,
                isScheduleEdit: false,
                isInterviewed: false,
                currentSchedule: {
                    "id": 2,
                    "venue": "DM-2-AMES",
                    "type": "tech-1",
                    "time": "2018-12-12T06:06:00.000+0000",
                    "description": "quick",
                    "finalRating": "pending",
                    "applicationByApplicationId": {
                        "id": 59,
                        "firstName": "nilanka",
                        "lastName": "GAYAN",
                        "nic": "951000620V",
                        "institute": "UOMDFBFD",
                        "source": "ref: 1",
                        "gender": "male",
                        "lastCompany": "",
                        "email": "MADFD@EAFSF.GNG",
                        "contactNumber": "0000000000",
                        "cvName": "nilankaGAYAN951000620VThu Sep 13 2018 12:08:39 GMT+0530 (India Standard Time)",
                        "createdTime": "2018-09-13T01:08:39.000+0000",
                        "positionByPositionId": {
                            "id": 1,
                            "name": "Software Architect",
                            "description": "Participate in the system specification review process to ensure system requirements can be translated into software design.",
                            "isOpen": 0
                        }
                    },
                    "interviewFormsById": [],
                    "pannelsById": []
                },

                allProfiles: []
            },
            user: {
                isEditVisible: false,
                getting: false,
                got: true,
                alertMsg: "",
                alertType: "",
                savealertVisible: false,
                saving: false,
                saved: false,
                isEdit: false,
                currentEdit: {},
                allUsers: [{ id: 8, firstName: "SE", lastName: "java", email: "hello@gmail.com" }],
                allApplications: []
            },
            preCheck: {
                getting: false,
                got: true,
                alertMsg: "",
                alertType: "",
                savealertVisible: false,
                saving: false,
                saved: false,
                matches: [{ name: "hello" }, { name: "hi" }]
            },
            privilege: {
                isPrivilegeEditVisible: false,
                getting: false,
                got: true,
                alertMsg: "",
                alertType: "",
                savealertVisible: false,
                saving: false,
                saved: false,
                isPriviledgeEdit: false,
                currentEdit: {},
                privilegedUsers: [],
                allPrivileges: [{
                    "id": 1,
                    "canInterview": 1,
                    "canShortList": 1,
                    "userByUserId": {
                        "id": 2
                    },
                    "positionByPositionId": {
                        "id": 1,
                        "name": "Software Architect"
                    }
                }, {
                    "id": 2,
                    "canInterview": 1,
                    "canShortList": 0,
                    "userByUserId": {
                        "id": 3
                    },
                    "positionByPositionId": {
                        "id": 1,
                        "name": "Software Architect"
                    }
                }]
            },
            lineShortlist: {
                getting: false,
                got: true,
                alertMsg: "",
                alertType: "",
                savealertVisible: false,
                saving: false,
                saved: false,
                assignedApplications: [],
                sideBarVisible: false,
                currentEdit: {}
            },
            loging: {
                alertVisible: false,
                alertMsg: "",
                saving: false,
                saved: false,
                alertType: ""
            },
            admin: {
                isAdminEditVisible: false,
                getting: false,
                got: true,
                alertMsg: "",
                alertType: "",
                savealertVisible: false,
                saving: false,
                saved: false,
                isEdit: false,
                currentEdit: {},
                allAdmins: [{
                    "id": 1,
                    "isAdmin": 1,
                    "isSuperAdmin": 1,
                    "userByUserId": {
                        "id": 10,
                        "email": "shiran@syscolabs.com",
                        "firstName": "shiran",
                        "lastName": "Gamage"
                    }
                },
                {
                    "id": 3,
                    "isAdmin": 1,
                    "isSuperAdmin": 0,
                    "userByUserId": {
                        "id": 12,
                        "email": "rushada@syscolabs.com",
                        "firstName": "rushada",
                        "lastName": "ramzeen"
                    }
                }]
            },
            scheduledInterviews: {
                isEditVisible: false,
                getting: false,
                got: true,
                alertMsg: "",
                alertType: "",
                savealertVisible: false,
                saving: false,
                saved: false,
                isEdit: false,
                currentEdit: {},
                job: {},
                interviews: []
            },

            state: {
                getting: false,
                got: true,
                alertMsg: "",
                alertType: "",
                savealertVisible: false,
                saving: false,
                saved: false,
                allStates: []
            },

            profile: {
                isAddFieldFlyerVisible: false,
                isAddProfileFlyerVisible: false,
                alertType: "",
                alertMsg: "",
                isAlertVisible: false,
                allProfiles: [],
                isSaveAlertVisible: false,
                isSaveEditVisible: false,
                profile: {}
            },

            feedback: {
                alertVisible: false,
                alertMsg: "",
                getting: false,
                got: false,
                alertType: "",
                feedbacks: []

            }

        }, allStoreEnhancers
    );
}
