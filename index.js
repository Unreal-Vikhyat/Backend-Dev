
// Create an object student with properties name, age, and grade.

let student = {
    name: "Vikhyat",
    age: 21,
    grade: "A"
};

console.log(student);

//   Add a new property country to an existing object person.


student.country = "India";

console.log(student);

//   Access and print the value of city from a nested object address.


let address = {
    street: "HoliGate",
    city: "Mathura",
    pin: 281001
};

console.log(address.city);


//  Convert a string "javascript" to uppercase.

let str = "javascript";
console.log(str.toUpperCase());


// Find the length of the string "Hello World".


let text = "Hello World";
console.log(text.length);


//  Join two strings "Hello" and "JavaScript" with a space in between.


let a = "Hello";
let b = "JavaScript";

console.log(a + " " + b);


//  Check whether the string "Coding is fun" contains the word "fun".

let str2 = "Coding is fun";
console.log(str2.includes("fun"));


//   Count the number of characters in the string "Hello JS" excluding spaces.

let s = "Hello JS";
let count = s.replaceAll(" ", "").length;

console.log(count);


