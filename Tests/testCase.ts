/// <reference path="../Core/console.ts" />

module GrabArt.Tests {
    export class TestCase {
        assertEquals(expected : any, real: any) : void {
            if (expected !== real) {
                var errorMessage : string = "`" + real + "`:" + typeof(real) + " not equals `"
                                                + expected + "`:" + typeof(expected) + " as expected";
                throw errorMessage;
            }
        }

        reservedMethods() : string[] {
            return ['constructor', 'assertEquals', 'reservedMethods', 'getDescription'];
        }
    }
}