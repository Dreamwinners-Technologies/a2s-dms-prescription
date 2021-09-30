import { connection } from "./jsstore_con";

export class AppointmentService {

    constructor() {

        this.tableName = "Appointments";
    }

    getAppointments() {
        return connection.select({
            from: this.tableName,
        })
    }

    addAppointments(data) {
        return connection.insert({
            into: this.tableName,
            values: [data],
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