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

    updateDataById(tableName, data) {
        return connection.update({ in: tableName,
            set: {
                data: data.data
            },
            where: {
                id: data.id
            }
        })
    }

    clearTable(table) {
        return connection.clear(table);
    }
}