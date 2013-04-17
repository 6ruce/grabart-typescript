/// <reference path="../Core/Console.ts" />
/// <reference path="../Core/Event.ts" />

/// <reference path="TestCase.ts" />
/// <reference path="SampleTest.ts" />

module GrabArt.Tests {
    export interface ITestCase {
        getDescription  : () => string;
    }

    export class TestSuit {

        run() : void {
            var testCases : ITestCase[] = this.configure();

            Core.Console.writeLine("[Start tests ...]", "green");

            for (var tests in testCases) {
                Core.Console.writeLine(testCases[tests].getDescription(), "brown");
                for (var test in testCases[tests]) {
                    try {
                        if (test.search("test") != -1) {
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