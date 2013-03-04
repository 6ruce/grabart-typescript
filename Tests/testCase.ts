/// <reference path="../Core/console.ts" />

module GrabArt.Tests {
    export class TestCase {
        private assertEqualsAny(expected : any, real: any) : bool {
            return expected == real;
        }

        assertEquals(expected : string, real: string) : bool {
            return this.assertEqualsAny(expected, real);
        }
    }
}