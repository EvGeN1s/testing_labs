import * as console from 'console';
import * as fs from "fs";
import {exec} from "child_process";
import colors from "colors/safe.js";

function ParseTestFile(testFilePath) {
    const testFile = fs.readFileSync(testFilePath, 'utf8')
    return testFile.split("\r\n")
}

function RunTests(testingFilePath, testFilePath, outputFile) {
    const tests = ParseTestFile(testFilePath)

    let response = []

    tests.forEach((testCase) => {
        let params = testCase.split(",");
        let inputParams = params.slice(0, params.length - 1)
        let output = params[params.length - 1]

        exec(`node ${testingFilePath} ${inputParams.toString().replaceAll(',', ' ',)}`, (error, stdout) => {
            if (error) {
                console.log(`error: ${error.message}`)
                return
            }
            stdout = stdout.replaceAll('\n', '')
            if (stdout === output) {
                console.log(colors.green("test passed"))
                response.push("test passed\n")
                fs.writeFileSync('out.txt', response.toString().replaceAll(',', ''), "utf8")

            } else {
                console.log(inputParams.toString())
                console.log(`excepted: ${output}, got: ${stdout}`)
                console.log(colors.red("test failed"))
                response.push(`excepted: ${output}, got: ${stdout}\n test failed\n`)
                fs.writeFileSync('out.txt', response.toString().replaceAll(',', ''), "utf8")
            }
        })


    })

    console.log(response)
    fs.writeFileSync('out.txt', response.toString(), "utf8")
    console.log(`Test count: ${tests.length}`)
}

RunTests('triangle.js', 'tests.txt', 'out.txt')