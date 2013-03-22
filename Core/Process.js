var GrabArt;
(function (GrabArt) {
    (function (Core) {
        var Process = (function () {
            function Process() { }
            Process.runners = {
            };
            Process.create = function create(name, interval, func) {
                var id = setInterval(func, interval);
                Process.runners[name] = id;
            }
            Process.remove = function remove(name) {
                if(undefined != typeof (Process.runners[name])) {
                    clearInterval(Process.runners[name]);
                }
            }
            return Process;
        })();
        Core.Process = Process;        
    })(GrabArt.Core || (GrabArt.Core = {}));
    var Core = GrabArt.Core;

})(GrabArt || (GrabArt = {}));

//@ sourceMappingURL=Process.js.map
