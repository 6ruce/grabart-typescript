/// <reference path="../Core/Console.ts" />

/// <reference path="TestCase.ts" />
/// <reference path="SampleTest.ts" />
/// <reference path="UI/WidgetTest.ts" />
/// <reference path="Core/EventsTest.ts" />

module GrabArt.Tests {
    export interface ITestCase {
        getDescription  : () => string;
    }

    export class TestSuit {

        run() : void {
            var testCases : ITestCase[] = this.configure();

            GrabArt.Core.Console.writeLine("[Start tests ...]", "green");

            for (var tests in testCases) {
                GrabArt.Core.Console.writeLine(testCases[tests].getDescription(), "brown");
                for (var test in testCases[tests]) {
                    try {
                        if (test.search("test") != -1) {
                            testCases[tests][test]();
                            GrabArt.Core.Console.writeLine(test + ' - OK', "green");
                        }
                    } catch (ex)  {
                        GrabArt.Core.Console.writeLine(test + ' - ' + ex, "red");
                    }
                }
            }
        }

        private configure() : ITestCase[] {
            return [
                new UI.WidgetTest(),
                new Core.EventsTest()
            ];
        }
    }
}