module GrabArt.Core {
    export interface IEventHandler {
        (sender : any, args : any) : void;
    }

    export class Event {
        private handlers : IEventHandler[] = [];

        addListener(handler : IEventHandler) : Event {
            this.handlers.push(handler);
            return this;
        }
    }

    export class EntireEvent extends Event {
        private handlers : IEventHandler[] = [];

        fire(sender : Object, args : any) : void {
            if (this.handlers.length != 0) {
                for (var i in this.handlers) {
                    this.handlers[i](sender, args);
                }
            }
        }
    }
}