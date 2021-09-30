import { connection } from "./jsstore_con";

export class DrugService {

    constructor() {
        this.tableName = "Drugs";
    }

    getDrugs() {
        return connection.select({
            from: this.tableName,
        })
    }

    addDrugs(drug) {
        return connection.insert({
            into: this.tableName,
            values: [drug],
            return: true
        })
    }

    getStudentById(id) {
        return connection.select({
            from: this.tableName,
            where: {
                id: id
            }
        })
    }

    removeStudent(id) {
        return connection.remove({
            from: this.tableName,
            where: {
                id: id
            }
        })
    }
    searchDrug(word) {
        return connection.select({
            from: this.tableName,
            where: {
                name: {
                    like: `%${word}%`
                },
            }
        });
    }

    updateStudentById(student) {
        return connection.update({ in: this.tableName,
            set: {
                name: student.name,
                gender: student.gender,
                country: student.country,
                city: student.city
            },
            where: {
                id: student.id
            }
        })
    }
}