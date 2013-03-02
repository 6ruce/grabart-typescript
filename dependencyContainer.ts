/// <reference path="Core/type.ts" />
/// <reference path="Core/iInspectable.ts" />

module GrabArt {
    export class DependencyContainer {
        resolve (type : Core.IInspectable): any {
            var dependencies = type.getConstructorTypes();
            if (dependencies.length == 0) {
                return new type();
            } else {
                return new type(1);
            }
            return ;
        }
    }
}