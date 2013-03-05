/// <reference path="console.ts" />

module GrabArt.Core {
    export interface IHandler {
        (sender : any, args : any) : void;
    }

    export class Event {
        private handlers : IHandler[] = [];

        addListener(handler : IHandler) : Event {
            this.handlers.push(handler);
            return this;
        }

        fire(sender : any, args : any) : void {
            if (this.handlers.length != 0) {
                for (var i in this.handlers) {
                    this.handlers[i](sender, args);
                }
            }
        }
    }
}