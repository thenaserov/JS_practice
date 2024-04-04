/*
The var keyword was used in all JavaScript code from 1995 to 2015.
The let and const keywords were added to JavaScript in 2015.
The var keyword should only be used in code written for older browsers.

The general rules for constructing names for variables (unique identifiers) are:

    Names can contain letters, digits, underscores, and dollar signs.
    Names must begin with a letter.
    Names can also begin with $ and _ (but we will not use it in this tutorial).
    Names are case sensitive (y and Y are different variables).
    Reserved words (like JavaScript keywords) cannot be used as names.



LET
    The let keyword was introduced in ES6 (2015)
    Variables declared with let have Block Scope
    Variables declared with let must be Declared before use
    Variables declared with let cannot be Redeclared in the same scope

VAR


*/

var v   = 1;
let l   = 2;
const c = 3;



// Numbers:
let length = 16;
let weight = 7.5;

// Strings:
let color = "Yellow";
let lastName = "Johnson";

// Booleans
let x = true;
let y = false;

// Object:
const person = {firstName:"John", lastName:"Doe"};

// Array object:
const cars = ["Saab", "Volvo", "BMW"];

// Date object:
const date = new Date("2022-03-25");

function adder(a, b){
    return a + b;
}

alert(adder(1, 2))