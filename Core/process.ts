module GrabArt.Core {
    export interface IRunner {
        () : void;
    }

    export class Process {

        private static runners : IRunner[] ;

        create (func : IRunner, time : number) : void {

        }
    }
}