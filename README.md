# Get Table Info
this project is the product of self research of typescript advanced features
problem: I try to create strongly typed function that will accept type that represent collection or table schma and multiple nested paths from the type and will retrive the values from the db and enforce valid paths in compile time. 


# Code Example
```
type PersonPropPath = { address: { street: string, num: number, foo: { bar: string } } };

// declare const Person:PersonPropPath;
const Person: PersonPropPath = {} as PersonPropPath;

const test1 = await getTableInfo(Person, callback, 'address.num', "address.street");

console.log(test1.address);
console.log(test1.address.street);
console.log(test1.address.num);
```
