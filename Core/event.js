var GrabArt;
(function (GrabArt) {
    (function (Core) {
        var Event = (function () {
            function Event() { }
            Event.prototype.addListener = function (handler) {
                this.handlers.push(handler);
                return this;
            };
            Event.prototype.fire = function (sender, args) {
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
