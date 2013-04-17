/// <reference path="../../Core/Event.ts" />
/// <reference path="../TestCase.ts" />

module GrabArt.Tests.Core {
    export class EventsTest extends GrabArt.Tests.TestCase {
        getDescription() : string {
            return 'Core.Event tests';
        }

        testEventsProperWorkWithCasts() : void {
            var   entireEvent : GrabArt.Core.EntireEvent  = new GrabArt.Core.EntireEvent()
                , event       : GrabArt.Core.Event        = entireEvent
                , callsNum    : number                    = 0
                , testCallback = (sender : Object, args : any) : void => { callsNum += 1 };

            event.addListener(testCallback);
            entireEvent.fire({}, '');

            this.assertEquals(1, callsNum);
        }
    }
}