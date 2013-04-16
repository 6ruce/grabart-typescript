module GrabArt.Core {
    declare var setInterval;
    declare var clearInterval;

    export interface IRunner {
        () : void;
    }

    export class Process {

        private static runners : {[name : string] : number;} = {};

        static create(name : string, interval : number, func : IRunner) : void {
            var id = setInterval(func, interval);
            Process.runners[name] = id;
        }

        static remove(name : string) : void {
            if (undefined != typeof(Process.runners[name])) {
                clearInterval(Process.runners[name]);
            }
        }
    }
}