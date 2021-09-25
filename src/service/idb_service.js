import { connection } from "./jsstore_con";
import { DATA_TYPE } from "jsstore";

const getDatabase = () => {
    const tblDrugs = {
        name: 'Drugs',
        columns: {
            drugId: {
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                notNull: true,
                dataType: DATA_TYPE.String
            }
        }
    };
    const tblComlaints = {
        name: 'chiefComplaint',
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
            Id: {
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
            Id: {
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
    const dataBase = {
        name: "a2sdms",
        tables: [tblDrugs, tblComlaints, tblOnExamination, tblDiagnosis, tblInvestigationAdvice, tblPrescription, tblLocalPrescription]
    };
    return dataBase;
};

export const initJsStore = async() => {
    const dataBase = getDatabase();
    return await connection.initDb(dataBase);
};