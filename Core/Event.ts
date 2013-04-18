module GrabArt.Core {
    export interface IEventHandler {
        (sender : Object, args : any) : void;
    }

    export class Event {
        private handlers : IEventHandler[] = [];

        addListener(handler : IEventHandler) : Event {
            this.handlers.push(handler);
            return this;
        }

        removeListener(handler : IEventHandler) : Event {
            if (this.handlers.length != 0) {
                for (var i in this.handlers) {
                    if (handler == this.handlers[i]) {
                        delete this.handlers[i];
                    }
                }
            }

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

        clear() : void {
            if (this.handlers.length != 0) {
                for (var i in this.handlers) {
                    delete this.handlers[i];
                }
            }
        }
    }
}