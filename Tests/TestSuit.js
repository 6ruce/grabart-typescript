var GrabArt;
(function (GrabArt) {
    (function (Tests) {
        var TestSuit = (function () {
            function TestSuit() { }
            TestSuit.prototype.run = function () {
                var testCases = this.configure();
                GrabArt.Core.Console.writeLine("[Start tests ...]", "green");
                for(var tests in testCases) {
                    GrabArt.Core.Console.writeLine(testCases[tests].getDescription(), "brown");
                    for(var test in testCases[tests]) {
                        try  {
                            if(test.search("test") != -1) {
                                testCases[tests][test]();
                                GrabArt.Core.Console.writeLine(test + ' - OK', "green");
                            }
                        } catch (ex) {
                            GrabArt.Core.Console.writeLine(test + ' - ' + ex, "red");
                        }
                    }
                }
            };
            TestSuit.prototype.configure = function () {
                return [
                    new Tests.SampleTest()
                ];
            };
            return TestSuit;
        })();
        Tests.TestSuit = TestSuit;        
    })(GrabArt.Tests || (GrabArt.Tests = {}));
    var Tests = GrabArt.Tests;

})(GrabArt || (GrabArt = {}));

//@ sourceMappingURL=TestSuit.js.map
