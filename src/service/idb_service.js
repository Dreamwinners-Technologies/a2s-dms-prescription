import { connection } from "./jsstore_con";
import { DATA_TYPE } from "jsstore";

const getDatabase = () => {
    const tblDrugs = {
        name: 'Drugs',
        // 'drugId,name,type,generic,brandName,packSize,indications,adultDose,childDose,renalDose,
        // administration,contraindications,sideEffects,precautionsAndWarnings,pregnancyAndLactation,
        // therapeuticClass,modeOfAction,interaction,packSizeAndPrice,*ftsName',
        columns: {
            drugId: {
                primaryKey: true,
                autoIncrement: false
            },
            name: {
                notNull: true,
                dataType: DATA_TYPE.String
            },
            type: {
                dataType: DATA_TYPE.String,
            },
            generic: {
                dataType: DATA_TYPE.String,
            },
            typbrandNamee: {
                dataType: DATA_TYPE.String,
            },
            packSize: {
                dataType: DATA_TYPE.String,
            },
            indications: {
                dataType: DATA_TYPE.String,
            },
            adultDose: {
                dataType: DATA_TYPE.String,
            },
            childDose: {
                dataType: DATA_TYPE.String,
            },
            renalDose: {
                dataType: DATA_TYPE.String,
            },
            administration: {
                dataType: DATA_TYPE.String,
            },
            contraindications: {
                dataType: DATA_TYPE.String,
            },
            sideEffects: {
                dataType: DATA_TYPE.String,
            },
            precautionsAndWarnings: {
                dataType: DATA_TYPE.String,
            },
            pregnancyAndLactation: {
                dataType: DATA_TYPE.String,
            },
            therapeuticClass: {
                dataType: DATA_TYPE.String,
            },
            modeOfAction: {
                dataType: DATA_TYPE.String,
            },
            interaction: {
                dataType: DATA_TYPE.String,
            },
            packSizeAndPrice: {
                dataType: DATA_TYPE.String,
            },
        }
    };
    const dataBase = {
        name: "a2dms",
        tables: [tblDrugs]
    };
    return dataBase;
};

export const initJsStore = async() => {
    const dataBase = getDatabase();
    return await connection.initDb(dataBase);
};