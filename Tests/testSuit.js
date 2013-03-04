var GrabArt;
(function (GrabArt) {
    (function (Tests) {
        var TestSuit = (function () {
            function TestSuit() { }
            TestSuit.prototype.run = function () {
                new GrabArt.Core.Event().addListener(function (s, a) {
                    return GrabArt.Core.Console.writeLine("called", "green");
                });
            };
            return TestSuit;
        })();
        Tests.TestSuit = TestSuit;        
    })(GrabArt.Tests || (GrabArt.Tests = {}));
    var Tests = GrabArt.Tests;
})(GrabArt || (GrabArt = {}));
