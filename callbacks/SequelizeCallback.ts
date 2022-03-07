import {DeepPick, DeepPickPath, DefaultGrammar} from "ts-deep-pick";
import {Model, Sequelize} from "sequelize-typescript"
import {Attributes, NonNullFindOptions} from "sequelize/types/model";


// by M we can choose connection type, customizeQueryOptionType
//callback<M>(connection: mongo | Sequelize, tableName: string, customizeQueryOptions)


//connection: Connection, tableName: string,queryOptions: any = {},...paths: DeepPickPath<K, DefaultGrammar>[]

//@ts-ignore TS2589
export async function SequelizeCallback<O>(sequelize: Sequelize, tableName: string, options: NonNullFindOptions<Attributes<Model>> = {rejectOnEmpty:true},
                                           ...paths: DeepPickPath<O, DefaultGrammar>[]): Promise<DeepPick<O, typeof paths[number]>> {
    console.log("starting sequelize callback")
    let queryOptions:  NonNullFindOptions<Attributes<Model>> = options || {};
    queryOptions["attributes"] = [...paths];
    return await sequelize.model(tableName).findOne(queryOptions) as unknown as Promise<DeepPick<O, typeof paths[number]>>;
}