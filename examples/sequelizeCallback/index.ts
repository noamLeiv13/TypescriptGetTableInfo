import {Column, DataType, Model, Sequelize, Table} from "sequelize-typescript";
import {getTableInfo} from "../../src/GetTableInfo";
import {SequelizeCallback} from "../../src/callbacks/SequelizeCallback";


@Table({tableName: "Person"})
class Person extends Model {
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
    type PersonPropPath =  { name: string};
    const person: PersonPropPath = {} as PersonPropPath;
    const test1 = await getTableInfo(sequelize, "Person", {}, person, SequelizeCallback, "name");
    console.log(test1.name);
})();
