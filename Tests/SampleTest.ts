/// <reference path="TestCase.ts" />

module GrabArt.Tests {
    export class SampleTest extends TestCase {
        getDescription() : string {
            return 'Recover after git push conflicts';
        }

        testMustSucced() : void {
            this.assertEquals(1, 1);
        }
    }
}