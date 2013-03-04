var GrabArt;
(function (GrabArt) {
    (function (Core) {
        var Process = (function () {
            function Process() { }
            Process.prototype.create = function (func, time) {
            };
            return Process;
        })();
        Core.Process = Process;        
    })(GrabArt.Core || (GrabArt.Core = {}));
    var Core = GrabArt.Core;
})(GrabArt || (GrabArt = {}));
