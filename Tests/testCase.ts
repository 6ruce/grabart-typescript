/// <reference path="../Core/console.ts" />

module GrabArt.Tests {
    export class TestCase {
        assertEquals(expected : any, real: any) : bool {
            if (expected != real) {
                Core.Console.writeLine("`" + real + "` not equals `" + expected + "` as expected", "red");
                return false;
            }
            return true;
        }
    }
}