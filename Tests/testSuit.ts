/// <reference path="../Core/console.ts" />
/// <reference path="../Core/event.ts" />

/// <reference path="testCase.ts" />

module GrabArt.Tests {

    export class TestSuit {

        run() : void {
            Core.Console.writeLine("[Start tests ...]", "green");

            var event = new Core.Event();
            event.addListener((s, a) => Core.Console.writeLine("called", "green")).addListener((s, a) => Core.Console.writeLine("called", "green"));
            event.fire(1, 1);
        }
    }
}