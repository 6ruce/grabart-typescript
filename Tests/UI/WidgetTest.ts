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
                , unit       = testWidget.getUnit();

            this.assertEquals('static'   , domElem.style.position);
            this.assertEquals(0   + unit , domElem.style.left    );
            this.assertEquals(0   + unit , domElem.style.top     );
            this.assertEquals(100 + unit , domElem.style.width   );
            this.assertEquals(75  + unit , domElem.style.height  );
        }

        testNewWidgetCreationWithCustomSizes() : void {
            var   testWidget = new GrabArt.UI.Widget('test')
                                  .setSizes({ w : 200, h : 200})
                , domElem    = testWidget.drawSelf()[0]
                , unit       = testWidget.getUnit();

            this.assertEquals(200 + unit , domElem.style.width  );
            this.assertEquals(200 + unit , domElem.style.height );
        }

        testSizesSetup() : void {
            var   testWidget = new GrabArt.UI.Widget('test')
                                 .setSizes({ w : 200, h : 200}),
                  unit       = testWidget.getUnit();

            this.assertEquals(200, testWidget.getSizes().w);
            this.assertEquals(200, testWidget.getSizes().h);
        }
    }
}