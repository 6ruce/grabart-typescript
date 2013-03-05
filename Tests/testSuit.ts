/// <reference path="../Core/console.ts" />
/// <reference path="../Core/event.ts" />

/// <reference path="testCase.ts" />
/// <reference path="sampleTest.ts" />

module GrabArt.Tests {
    export interface ITestCase {
        reservedMethods : () => string[];
        getDescription  : () => string;
    }

    export class TestSuit {

        run() : void {
            var testCases : ITestCase[] = this.configure();

            Core.Console.writeLine("[Start tests ...]", "green");

            for (var tests in testCases) {
                var reservedMethods = testCases[tests].reservedMethods();
                Core.Console.writeLine(testCases[tests].getDescription(), "brown");
                for (var test in testCases[tests]) {
                    try {
                        if (reservedMethods.indexOf(test) == -1) {
                            testCases[tests][test]();
                            Core.Console.writeLine(test + ' - OK', "green");
                        }
                    } catch (ex)  {
                        Core.Console.writeLine(test + ' - ' + ex, "red");
                    }
                }
            }
        }

        private configure() : ITestCase[] {
            return [
                new SampleTest()
            ];
        }
    }
}