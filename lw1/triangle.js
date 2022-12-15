"use strict";
import process from "node:process";

var EquilateralTriangle = 'равносторонний';
var IsoscelesTriangle = 'равнобедренный';
var ScaleneTriangle = 'обычный';
var UnexpectedError = 'неизвестная ошибка';
var NotTriangleError = 'не треугольник';
var ExceptedArgsCount = 5;

function IsSafeNumbers(a, b, c) {
    return ((a <= Number.MAX_SAFE_INTEGER) && (b <= Number.MAX_SAFE_INTEGER) && (c <= Number.MAX_SAFE_INTEGER));
}

function IsTriangleExist(a, b, c) {
    return (
        (a > 0 && b > 0 && c > 0) &&
        IsSafeNumbers(a, b, c) &&
        (a > Math.abs(c - b)) && (b > Math.abs(a - c)) && (a > Math.abs(b - c))
    );
}

function IsEquilateral(a, b, c) {
    return a === b && a === c;
}

function IsIsosceles(a, b, c) {
    return a === b || a === c || b === c;
}

function GetTriangleType(a, b, c) {
    if (IsEquilateral(a, b, c)) {
        return EquilateralTriangle;
    }
    if (IsIsosceles(a, b, c)) {
        return IsoscelesTriangle;
    }
    return ScaleneTriangle;
}

function IsArgsValid() {
    if (process.argv.length !== ExceptedArgsCount) {
        return false;
    }
    for (var index = 2; index <= 4; index++) {
        if (isNaN(Number(process.argv[index]))) {
            return false;
        }
    }
    return true;
}

function main() {
    if (!IsArgsValid()) {
        return UnexpectedError;
    }
    var a = Number(process.argv[2]);
    var b = Number(process.argv[3]);
    var c = Number(process.argv[4]);
    if (!IsTriangleExist(a, b, c)) {
        return NotTriangleError;
    }
    return GetTriangleType(a, b, c);
}

var result = main();
console.log(result);
