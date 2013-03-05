var GrabArt;
(function (GrabArt) {
    (function (Core) {
        var Event = (function () {
            function Event() { }
            Event.prototype.addListener = function (handler) {
                Core.Console.writeLine("add listener", 'green');
                this.handlers.push(handler);
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
