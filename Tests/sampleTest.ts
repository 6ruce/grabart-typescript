/// <reference path="testCase.ts" />
/// <reference path="../Core/process.ts" />
/// <reference path="../Core/console.ts" />
/// <reference path="../Core/event.ts" />

module GrabArt.Tests {
    export class SampleTest extends TestCase {
        getDescription() {
            return "Some test testing thought !";
        }

        testSomeFunctionality() {
            var ts = new Core.EventUser();
            ts.SomethingChanged().addListener((e,s) => Core.Console.writeLine(s));
            ts.someMethod();
            ts.someMethod();
        }
    }
}