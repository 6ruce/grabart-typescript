module GrabArt.Core {
    export class Type {
        private typeHolder : any;
        constructor (type: new() => any) {
            this.typeHolder = type;
        }

        getType() : any {
            return this.typeHolder;
        }

        static take(type): Type {
            return new Type(type);
        }

        getConstructorTypes() : IInspectable[] {
            return [];
        }
    }
}