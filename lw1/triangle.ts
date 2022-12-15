import {argv} from 'process';

const EquilateralTriangle: string = 'равносторонний'
const IsoscelesTriangle: string = 'равнобедренный'
const ScaleneTriangle: string = 'обычный'

const UnexpectedError: string = 'неизвестаня ошибка'
const NotTriangleError: string = 'не существует'

const ExceptedArgsCount: number = 5

function IsTriangleExist(a: number, b: number, c: number): boolean {
    return ((a + b > c) && (b + c > a) && (a + c > b)) &&
        (a > 0 && b > 0 && c > 0)
}

function IsEquilateral(a: number, b: number, c: number): boolean {
    return a === b && a === c
}

function IsIsosceles(a: number, b: number, c: number): boolean {
    return a === b || a === c || b === c
}

function GetTriangleType(a: number, b: number, c: number): string {
    if (IsEquilateral(a, b, c)) {
        return EquilateralTriangle
    }

    if (IsIsosceles(a, b, c)) {
        return IsoscelesTriangle
    }

    return ScaleneTriangle
}

function IsArgsValid(): boolean {
    if (argv.length !== ExceptedArgsCount)
    {
        return false
    }

    for (let index: number = 2; index <= 4; index++)
    {
        if (isNaN(Number(argv[index])))
        {
            return  false
        }
    }

    return true
}

function main(): string {
    if (!IsArgsValid()) {
        return UnexpectedError
    }

    let a: number = Number(argv[2])
    let b: number = Number(argv[3])
    let c: number = Number(argv[4])

    if (!IsTriangleExist(a, b, c))
    {
        return NotTriangleError
    }

    return GetTriangleType(a, b, c)
}

let result: string = main()

console.log(result)