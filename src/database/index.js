import SQLite from 'react-native-sqlite-storage'

export class BaseManager {


    constructor() {
        this.sqlite = SQLite;
        this.sqlite.DEBUG(true);
        this.sqlite.enablePromise(true);
        this.sqlite.openDatabase({
            name: "HardwareAndro",
            location: "default"
        }).then((db) => {
            this.dbInstance = db;
        })
    }

    createTable() {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "CREATE TABLE Employee (" +
                "id INTEGER PRIMARY KEY NOT NULL ," +
                "title TEXT );"
            ).then((val) => {
                resolve(true)
            }).catch((err) => {
                console.log(err);
                reject(false)
            })
        });
    }

    addTable(val) {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "INSERT INTO Employee (title)" +
                `VALUES('${val}')`
            ).then((val) => {

                resolve(true);
            }).catch((err) => {

                reject(false);
            })

        });
    }

    getTable() {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "SELECT * FROM Employee"
            ).then(([values]) => {
                var array = [];
                for (let index = 0; index < values.rows.length; index++) {
                    const element = values.rows.item(index);
                    array.push(element);
                }
                resolve(array);
            }).catch((err) => {
                reject(false);
            })

        });
    }

    dropTable() {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "DELETE FROM  Employee"
            ).then((val) => {
                resolve(true);
            }).catch((err) => {
                reject(false);
            })

        });
    }



}