import { connection } from "./jsstore_con";

export class ABService {

    constructor() {}

    getData(tableName) {
        return connection.select({
            from: tableName,
        })
    }

    addData(tableName, data) {
        return connection.insert({
            into: tableName,
            values: [data],
            return: true
        })
    }

    getDataById(tableName, id) {
        return connection.select({
            from: tableName,
            where: {
                id: id
            }
        })
    }

    removeData(tableName, id) {
        return connection.remove({
            from: tableName,
            where: {
                id: id
            }
        })
    }
    searchData(tableName, word) {
        return connection.select({
            from: tableName,
            where: {
                name: {
                    like: `%${word}%`
                },
            }
        });
    }

    updateDataById(tableName, data, id) {
        return connection.update({ in: tableName,
            set: data,
            where: id
        })
    }

    clearTable(table) {
        return connection.clear(table);
    }
}