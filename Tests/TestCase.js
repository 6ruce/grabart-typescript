var GrabArt;
(function (GrabArt) {
    (function (Tests) {
        var TestCase = (function () {
            function TestCase() { }
            TestCase.prototype.assertEquals = function (expected, real) {
                if(expected !== real) {
                    var errorMessage = "`" + real + "`:" + typeof (real) + " not equals `" + expected + "`:" + typeof (expected) + " as expected";
                    throw errorMessage;
                }
            };
            return TestCase;
        })();
        Tests.TestCase = TestCase;        
    })(GrabArt.Tests || (GrabArt.Tests = {}));
    var Tests = GrabArt.Tests;

})(GrabArt || (GrabArt = {}));

//@ sourceMappingURL=TestCase.js.map
