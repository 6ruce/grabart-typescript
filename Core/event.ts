/// <reference path="console.ts" />

module GrabArt.Core {
    export interface IHandler {
        (sender : any, args : any) : void;
    }

    export class Event {
        private handlers : IHandler[];

        addListener(handler : IHandler) : Event {
            Console.writeLine("add listener", 'green');
            this.handlers.push(handler);
            return this;
        }

        fire(sender : any, args : any) : void {
            Console.writeLine("fire called", 'green');
            if (this.handlers.length != 0) {
                for (var i in this.handlers) {
                    this.handlers[i](sender, args);
                }
            }
        }

    }
}