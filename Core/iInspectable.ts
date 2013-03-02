module GrabArt.Core {
    export interface IInspectable {
        getConstructorTypes() : IInspectable[];
        new()                 : any;
        new(n : number)       : any;
    }
}