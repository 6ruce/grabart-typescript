/// <reference path="../TestCase.ts" />
/// <reference path="../../UI/Widget.ts" />

module GrabArt.Tests.UI {
    export class WidgetTest extends GrabArt.Tests.TestCase {
        getDescription() : string {
            return 'UI.Widget tests';
        }

        testNewWidgetCreationWithoutParams() : void {
            var   testWidget = new GrabArt.UI.Widget('test')
                , domElem    = testWidget.drawSelf()[0]
                , unit       = testWidget.getUnit()

            console.log(domElem);

            this.assertEquals('static'   , domElem.style.position);
            this.assertEquals(0   + unit , domElem.style.left    );
            this.assertEquals(0   + unit , domElem.style.top     );
            this.assertEquals(100 + unit , domElem.style.width   );
            this.assertEquals(75  + unit , domElem.style.height  );
        }
    }
}