/// <reference path="../Core/console.ts" />
/// <reference path="testCase.ts" />

module GrabArt.Tests {

    export class TestSuit {

        run() : void {
            if (new TestCase().assertEquals("1", "1")) Core.Console.writeLine("not equals", "red");
        }
    }
}