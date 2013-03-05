/// <reference path="testCase.ts" />

module GrabArt.Tests {
    export class SampleTest extends TestCase {
        getDescription() {
            return "Some test testing thought !";
        }

        testSomeFunctionality() {
            this.assertEquals(1, 2);
        }

        testOtherFunction() {
            this.assertEquals("a", "a");
        }
    }
}