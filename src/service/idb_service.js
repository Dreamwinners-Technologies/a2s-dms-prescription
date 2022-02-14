import { connection } from "./jsstore_con";
import { DATA_TYPE } from "jsstore";
import { encryptData, decryptData } from "../shared/enc.js";



connection.logStatus = true;


const getDatabase = () => {
    const tblProfile = {
        name: 'ProfData',
        columns: {
            Id: {
                primaryKey: true,
                autoIncrement: false
            },
            data: {
                dataType: DATA_TYPE.Object
            },
        }
    };
    const tblDrugs = {
        name: 'Drugs',
        columns: {
            drugId: {
                primaryKey: true,
                autoIncrement: true
            },
            data: {
                notNull: true,
                dataType: DATA_TYPE.Object
            }
        }
    };
    const tblUser = {
        name: 'User',
        columns: {
            id: {
                primaryKey: true,
                autoIncrement: true
            },
            uData: {
                dataType: DATA_TYPE.String,
            }
        }
    };

    const tblComlaints = {
        name: 'chiefComplaints',
        columns: {
            id: {
                primaryKey: true,
                autoIncrement: true
            },
            data: {
                notNull: false,
                dataType: DATA_TYPE.String
            },
        }
    };
    const tblInstruction = {
        name: 'instruction',
        columns: {
            id: {
                primaryKey: true,
                autoIncrement: true
            },
            data: {
                notNull: false,
                dataType: DATA_TYPE.String
            },
        }
    };
    const tblDuration = {
        name: 'duration',
        columns: {
            id: {
                primaryKey: true,
                autoIncrement: true
            },
            data: {
                notNull: false,
                dataType: DATA_TYPE.String
            },
        }
    };
    const tblNotes = {
        name: 'note',
        columns: {
            id: {
                primaryKey: true,
                autoIncrement: true
            },
            data: {
                notNull: false,
                dataType: DATA_TYPE.String
            },
        }
    };
    const tblOnExamination = {
        name: 'onExamination',
        columns: {
            id: {
                primaryKey: true,
                autoIncrement: true
            },
            data: {
                notNull: false,
                dataType: DATA_TYPE.String
            },
        }
    };
    const tblDiagnosis = {
        name: 'diagnosis',
        columns: {
            id: {
                primaryKey: true,
                autoIncrement: true
            },
            data: {
                notNull: false,
                dataType: DATA_TYPE.String
            },
        }
    };
    const tblInvestigationAdvice = {
        name: 'investigationAdvice',
        columns: {
            id: {
                primaryKey: true,
                autoIncrement: true
            },
            data: {
                notNull: false,
                dataType: DATA_TYPE.String
            },
        }
    };
    const tblAdvice = {
        name: 'advice',
        columns: {
            id: {
                primaryKey: true,
                autoIncrement: true
            },
            data: {
                notNull: false,
                dataType: DATA_TYPE.String
            },
        }
    };
    const tblLocalPrescription = {
        name: 'LocalPresciption',
        columns: {
            lId: {
                primaryKey: true,
                autoIncrement: true
            },
            id: {
                notNull: false,
            },
            data: {
                notNull: false,
                dataType: DATA_TYPE.Object
            },
        }
    };
    const tblPrescription = {
        name: 'Presciption',
        columns: {
            lId: {
                primaryKey: true,
                autoIncrement: true
            },
            id: {
                notNull: false,
            },
            data: {
                notNull: false,
                dataType: DATA_TYPE.Object
            },
        }
    };
    const tblAppointment = {
        name: 'Appointment',
        columns: {
            lId: {
                primaryKey: true,
                autoIncrement: true
            },
            id: {
                notNull: false,
            },
            data: {
                notNull: false,
                dataType: DATA_TYPE.Object
            },
        }
    };
    const tblLocalAppointment = {
        name: 'LocalAppointment',
        columns: {
            lId: {
                primaryKey: true,
                autoIncrement: true
            },
            id: {
                notNull: false,
            },
            data: {
                notNull: false,
                dataType: DATA_TYPE.Object
            },
        }
    };
    const tblLatestAppointment = {
        name: 'LatestAppointment',
        columns: {
            lId: {
                primaryKey: true,
                autoIncrement: true
            },
            id: {
                notNull: false,
            },
            data: {
                notNull: false,
                dataType: DATA_TYPE.Object
            },
        }
    };
    const tblFavDrugs = {
        name: 'FavDrugs',
        columns: {
            drugId: {
                primaryKey: true,
                autoIncrement: true
            },
            data: {
                notNull: true,
                dataType: DATA_TYPE.Object
            }
        }
    };
    return {
        name: "a2sdms",
        version: 20,
        tables: [tblUser, tblLatestAppointment, tblDrugs, tblComlaints, tblOnExamination, tblDiagnosis, tblInvestigationAdvice, tblAdvice, tblPrescription, tblLocalPrescription, tblAppointment, tblLocalAppointment, tblProfile, tblInstruction, tblDuration, tblNotes, tblFavDrugs]
    };

};

export const initJsStore = async() => {
    const dataBase = getDatabase();
    connection.logStatus = false;
    return await connection.initDb(dataBase);
};
const encryptMiddleware = function(request) {

    const query = request.query;

    if (request.name === 'insert' && query.encrypt) {

        JSE.encrypt(query)

    } else if (request.name === 'select' && query.decrypt) {
        // result will be encrypted, so let's wait for result and then decrypt data

        request.onResult((result) => {
            JSE.decrypt(result);
        })

    }
};
// connection.addMiddleware(encryptMiddleware, false);

export const setSpecialData = async(tableName, data) => {
    // let encData = encryptData(data);
    connection.set(tableName, data).then(function() {
        console.log('value setted');
    }).catch(function(error) {
        console.log(error);
    });
};

export const getSpecialData = async(tableName, data) => {
    connection.get(tableName).then(function(userInfo) {
        // console.log(decryptData(userInfo));
        return userInfo;
    }).catch(function(error) {
        console.log(error);
    });
};




export const dropDatabase = async() => {
    connection.dropDb().then(function() {
        location.reload(); // this reload is to fix not saving sync data to idb after login out and then login 
    }).catch(function(error) {
        console.log(error);
    });
};