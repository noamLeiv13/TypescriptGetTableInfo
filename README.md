# Get Table Info
this project is the product of self research of typescript advanced features
problem: I try to create strongly typed function that will accept type that represent collection or table schma and multiple nested paths from the type and will retrive the values from the db and enforce valid paths in compile time. 


# Code Example
```
import {DeepPick, DeepPickPath, DefaultGrammar} from "ts-deep-pick";
import {getTableInfo} from "./GetTableInfo";
import * as _ from "lodash"

//example of callback function (in real case use mongo or other db)
async function callback<O>(...paths: DeepPickPath<O,DefaultGrammar>[]): Promise<DeepPick<O, typeof paths[number]>> {
	let object = {address: {street: "dan", num: 1, foo: {bar: "bar"}}};
	let result = {};
	for( let path of paths){
		_.setWith(result, path, _.get(object, path));
	}
	return result as unknown as Promise<DeepPick<O, typeof paths[number]>>;
}

type PersonPropPath = { address: { street: string, num: number, foo: { bar: string } } };

// declare const Person:PersonPropPath;
const Person: PersonPropPath = {} as PersonPropPath;

const test1 = await getTableInfo(Person, callback, 'address.num', "address.street");

console.log(test1.address);
console.log(test1.address.street);
console.log(test1.address.num);
```
