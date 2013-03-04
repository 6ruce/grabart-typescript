var GrabArt;
(function (GrabArt) {
    (function (Core) {
        var Console = (function () {
            function Console() { }
            Console.writeLine = function writeLine(text, color) {
                if (typeof color === "undefined") { color = "black"; }
                $('#consoleContent').prepend($('<div></div>').html('> ' + text).css('color', color));
            };
            return Console;
        })();
        Core.Console = Console;        
    })(GrabArt.Core || (GrabArt.Core = {}));
    var Core = GrabArt.Core;
})(GrabArt || (GrabArt = {}));
