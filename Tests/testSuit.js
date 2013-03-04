var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GrabArt;
(function (GrabArt) {
    (function (Tests) {
        var Console = (function (_super) {
            __extends(Console, _super);
            function Console() {
                _super.apply(this, arguments);

            }
            return Console;
        })(GrabArt.Core.Console);        
        var TestSuit = (function () {
            function TestSuit() { }
            TestSuit.prototype.run = function () {
                Console.writeLine("test suit");
                Console.writeLine("another test");
            };
            return TestSuit;
        })();
        Tests.TestSuit = TestSuit;        
    })(GrabArt.Tests || (GrabArt.Tests = {}));
    var Tests = GrabArt.Tests;
})(GrabArt || (GrabArt = {}));
