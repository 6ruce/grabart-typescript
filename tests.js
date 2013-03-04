var GrabArt;
(function (GrabArt) {
    (function (Core) {
        var Console = (function () {
            function Console() { }
            Console.writeLine = function writeLine(text, color) {
                if (typeof color === "undefined") { color = "black"; }
                $('#consoleContent').append($('<div></div>').html('> ' + text).css('color', color));
            };
            return Console;
        })();
        Core.Console = Console;        
    })(GrabArt.Core || (GrabArt.Core = {}));
    var Core = GrabArt.Core;
})(GrabArt || (GrabArt = {}));
var GrabArt;
(function (GrabArt) {
    (function (Core) {
        var Event = (function () {
            function Event() { }
            Event.prototype.addListener = function (handler) {
                Core.Console.writeLine("add listener", 'green');
                this.handlers.push(handler);
                return this;
            };
            Event.prototype.fire = function (sender, args) {
                Core.Console.writeLine("fire called", 'green');
                if(this.handlers.length != 0) {
                    for(var i in this.handlers) {
                        this.handlers[i](sender, args);
                    }
                }
            };
            return Event;
        })();
        Core.Event = Event;        
    })(GrabArt.Core || (GrabArt.Core = {}));
    var Core = GrabArt.Core;
})(GrabArt || (GrabArt = {}));
var GrabArt;
(function (GrabArt) {
    (function (Tests) {
        var TestCase = (function () {
            function TestCase() { }
            TestCase.prototype.assertEquals = function (expected, real) {
                if(expected != real) {
                    GrabArt.Core.Console.writeLine("`" + real + "` not equals `" + expected + "` as expected", "red");
                    return false;
                }
                return true;
            };
            return TestCase;
        })();
        Tests.TestCase = TestCase;        
    })(GrabArt.Tests || (GrabArt.Tests = {}));
    var Tests = GrabArt.Tests;
})(GrabArt || (GrabArt = {}));
var GrabArt;
(function (GrabArt) {
    (function (Tests) {
        var TestSuit = (function () {
            function TestSuit() { }
            TestSuit.prototype.run = function () {
                GrabArt.Core.Console.writeLine("[Start tests ...]", "green");
                GrabArt.Core.Console.writeLine("[Start tests ...]", "green");
                GrabArt.Core.Console.writeLine("[Start tests ...]", "green");
                GrabArt.Core.Console.writeLine("[Start tests ...]", "green");
                var event = new GrabArt.Core.Event();
                event.addListener(function (s, a) {
                    return GrabArt.Core.Console.writeLine("called", "green");
                }).addListener(function (s, a) {
                    return GrabArt.Core.Console.writeLine("called", "green");
                });
                event.fire(1, 1);
            };
            return TestSuit;
        })();
        Tests.TestSuit = TestSuit;        
    })(GrabArt.Tests || (GrabArt.Tests = {}));
    var Tests = GrabArt.Tests;
})(GrabArt || (GrabArt = {}));
