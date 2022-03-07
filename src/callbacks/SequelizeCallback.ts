import {DeepPick, DeepPickPath, DefaultGrammar} from "ts-deep-pick";
import {Model, Sequelize} from "sequelize-typescript"
import {Attributes, NonNullFindOptions} from "sequelize/types/model";


// by M we can choose connection type, customizeQueryOptionType
//callback<M>(connection: mongo | Sequelize, tableName: string, customizeQueryOptions)


//connection: Connection, tableName: string,queryOptions: any = {},...paths: DeepPickPath<K, DefaultGrammar>[]

//@ts-ignore TS2589
export async function SequelizeCallback<O>(sequelize: Sequelize, tableName: string, queryOptions: {},
                                           ...paths: DeepPickPath<O, DefaultGrammar>[]): Promise<DeepPick<O, typeof paths[number]>> {
    console.log("starting sequelizeCallback callback") //todo: remove print
    let sequelizeQueryOptions: NonNullFindOptions<Attributes<Model>> = queryOptions as NonNullFindOptions<Attributes<Model>>;
    if (queryOptions === {}){
        sequelizeQueryOptions = {rejectOnEmpty: false};
    }
    sequelizeQueryOptions["attributes"] = [...paths];
    const model = sequelize.model(tableName);
    return await model.findOne(sequelizeQueryOptions) as unknown as Promise<DeepPick<O, typeof paths[number]>>;
}