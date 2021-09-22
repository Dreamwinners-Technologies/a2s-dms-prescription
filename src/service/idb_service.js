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
            },
            // type: {
            //     dataType: DATA_TYPE.String,
            // },
            // generic: {
            //     dataType: DATA_TYPE.String,
            // },
            // typbrandNamee: {
            //     dataType: DATA_TYPE.String,
            // },
            // packSize: {
            //     dataType: DATA_TYPE.String,
            // },
            // indications: {
            //     dataType: DATA_TYPE.String,
            // },
            // adultDose: {
            //     dataType: DATA_TYPE.String,
            // },
            // childDose: {
            //     dataType: DATA_TYPE.String,
            // },
            // renalDose: {
            //     dataType: DATA_TYPE.String,
            // },
            // administration: {
            //     dataType: DATA_TYPE.String,
            // },
            // contraindications: {
            //     dataType: DATA_TYPE.String,
            // },
            // sideEffects: {
            //     dataType: DATA_TYPE.String,
            // },
            // precautionsAndWarnings: {
            //     dataType: DATA_TYPE.String,
            // },
            // pregnancyAndLactation: {
            //     dataType: DATA_TYPE.String,
            // },
            // therapeuticClass: {
            //     dataType: DATA_TYPE.String,
            // },
            // modeOfAction: {
            //     dataType: DATA_TYPE.String,
            // },
            // interaction: {
            //     dataType: DATA_TYPE.String,
            // },
            // packSizeAndPrice: {
            //     dataType: DATA_TYPE.String,
            // },
        }
    };
    const tblComlaints = {
        name: 'Complaints',
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
        name: 'OnExamination',
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
        name: 'Diagnosis',
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
        name: 'InvestigationAdvice',
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
    const dataBase = {
        name: "a2sdms",
        tables: [tblDrugs, tblComlaints, tblOnExamination, tblDiagnosis, tblInvestigationAdvice]
    };
    return dataBase;
};

export const initJsStore = async() => {
    const dataBase = getDatabase();
    return await connection.initDb(dataBase);
};