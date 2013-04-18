/// <reference path="../../Core/Event.ts" />

module GrabArt.UI.Services {
    export interface IMovable {
        move   (dx : number, dy : number) : void;
        redraw ()                         : void;
    }

    export class Dragger {

        private subject     : IMovable;
        private mouseMoveEv : GrabArt.Core.Event;
        private mouseDownEv : GrabArt.Core.Event;
        private mouseUpEv   : GrabArt.Core.Event;

        private dragging     : bool      = false;
        private turnOnDrag   : (sender : Object, args : any) => void = null;
        private turnOffDrag  : (sender : Object, args : any) => void = null;
        private performDrag  : (sender : Object, args : any) => void = null;
        private previousX    : number;
        private previousY    : number;

        constructor(
              subject        : IMovable
            , mouseMoveEvent : GrabArt.Core.Event
            , mouseDownEvent : GrabArt.Core.Event
            , mouseUpEvent   : GrabArt.Core.Event
        ) {
            if (subject        == null) throw 'subject is null';
            if (mouseMoveEvent == null) throw 'mouseMoveEvent is null';
            if (mouseDownEvent == null) throw 'mouseDownEvent is null';
            if (mouseUpEvent   == null) throw 'mouseUpEvent is null';

            this.subject     = subject;
            this.mouseMoveEv = mouseMoveEvent;
            this.mouseDownEv = mouseDownEvent;
            this.mouseUpEv   = mouseUpEvent;

        }

        onDragging() : void {
            if (this.turnOnDrag === null) {
                this.performDrag = (sender, args) => {
                    if (this.dragging) {
                        this.subject.move(args.clientX - this.previousX, args.clientY - this.previousY);
                        this.subject.redraw();
                        this.previousX = args.clientX;
                        this.previousY = args.clientY;
                    }
                };
                this.turnOnDrag  = (_, args) => {
                    this.dragging = true;
                    this.previousX = args.clientX;
                    this.previousY = args.clientY;
                };
                this.turnOffDrag = (_1, _2) => this.dragging = false;
                this.mouseDownEv.addListener(this.turnOnDrag);
                this.mouseUpEv.addListener(this.turnOffDrag);
                this.mouseMoveEv.addListener(this.performDrag);
            }
        }

        offDragging() : void {
            if (this.turnOnDrag !== null) {
                this.mouseDownEv.removeListener(this.turnOnDrag);
                this.mouseUpEv.removeListener(this.turnOffDrag);
                this.mouseMoveEv.removeListener(this.performDrag);
                this.turnOnDrag  = null;
                this.turnOffDrag = null;
                this.performDrag = null;
            }
        }
    }
}