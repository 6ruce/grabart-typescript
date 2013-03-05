/// <reference path="testCase.ts" />
/// <reference path="../Core/process.ts" />
/// <reference path="../Core/console.ts" />

module GrabArt.Tests {
    export class SampleTest extends TestCase {
        getDescription() {
            return "Some test testing thought !";
        }

        testSomeFunctionality() {
            Core.Process.create("test", 500, () => Core.Console.writeLine("from process", 'yellow'));
        }
    }
}