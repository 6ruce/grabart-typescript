var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GrabArt;
(function (GrabArt) {
    (function (Tests) {
        var SampleTest = (function (_super) {
            __extends(SampleTest, _super);
            function SampleTest() {
                _super.apply(this, arguments);

            }
            SampleTest.prototype.getDescription = function () {
                return "Some test testing thought !";
            };
            SampleTest.prototype.testSomeFunctionality = function () {
                var ts = new GrabArt.Core.EventUser();
                ts.SomethingChanged().addListener(function (e, s) {
                    return GrabArt.Core.Console.writeLine(s);
                });
                ts.someMethod();
                ts.someMethod();
            };
            return SampleTest;
        })(Tests.TestCase);
        Tests.SampleTest = SampleTest;        
    })(GrabArt.Tests || (GrabArt.Tests = {}));
    var Tests = GrabArt.Tests;
})(GrabArt || (GrabArt = {}));
//@ sourceMappingURL=sampleTest.js.map
