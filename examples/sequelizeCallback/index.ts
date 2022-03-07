import {Column, DataType, Model, Sequelize, Table} from "sequelize-typescript";
import {getTableInfo} from "../../src/GetTableInfo";
import {SequelizeCallback} from "../../src/callbacks/SequelizeCallback";

type PersonInfo =  { name: string};
@Table({tableName: "Person"})
class Person extends Model<PersonInfo> {
    @Column(DataType.STRING)
    name: string
}

// run in root directory docker-compose up --build for creating postgres db instance
(async () => {
    const sequelize = new Sequelize({
        username: "sierra",
        password: "sierra",
        host: "localhost",
        database: "test",
        dialect: "postgres"
    });
    sequelize.addModels([Person])

    const person: PersonInfo = {} as PersonInfo; //we need this object for internal usage of getTableInfo
    const test1 = await getTableInfo(sequelize, "Person", {}, person, SequelizeCallback, "name");
    console.log(test1.name);
})();
