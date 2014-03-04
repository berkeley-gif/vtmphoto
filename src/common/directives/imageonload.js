
/*
 * Based on http://selbie.wordpress.com/2011/01/23/scale-crop-and-center-an-image-with-correct-aspect-ratio-in-html-and-javascript/
 *
 */
angular.module('directives.imageonload', [])

.directive( 'imageonload', [ function() {

    function ScaleImage(srcwidth, srcheight, targetwidth, targetheight, fLetterBox) {

        var result = { width: 0, height: 0, fScaleToTargetWidth: true };

        if ((srcwidth <= 0) || (srcheight <= 0) || (targetwidth <= 0) || (targetheight <= 0)) {
            return result;
        }

        // scale to the target width
        var scaleX1 = targetwidth;
        var scaleY1 = (srcheight * targetwidth) / srcwidth;

        // scale to the target height
        var scaleX2 = (srcwidth * targetheight) / srcheight;
        var scaleY2 = targetheight;

        // now figure out which one we should use
        var fScaleOnWidth = (scaleX2 > targetwidth);
        if (fScaleOnWidth) {
            fScaleOnWidth = fLetterBox;
        }
        else {
            fScaleOnWidth = !fLetterBox;
        }

        if (fScaleOnWidth) {
            result.width = Math.floor(scaleX1);
            result.height = Math.floor(scaleY1);
            result.fScaleToTargetWidth = true;
        }
        else {
            result.width = Math.floor(scaleX2);
            result.height = Math.floor(scaleY2);
            result.fScaleToTargetWidth = false;
        }

        result.targetleft = Math.floor((targetwidth - result.width) / 2);
        result.targettop = Math.floor((targetheight - result.height) / 2);

        return result;
    }

    return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('load', function() {

                    var img = element;

                    // what's the size of this image and it's parent
                    var w = $(img).width();
                    var h = $(img).height();
                    var tw = $(img).offsetParent().width();
                    var th = $(img).offsetParent().height();
                    //for landscape oriented photos increase target ht & w
                    //to clip out bottom strip
                    if (w > h) {
                        tw = tw + (tw * 0.25);
                        th = th + (th * 0.25);
                    }

                    // compute the new size and offsets
                    var result = new ScaleImage(w, h, tw, th, false);

                    // adjust the image coordinates and size
                    img[0].width = result.width;
                    img[0].height = result.height;

                    //Position the photos
                    if (w < h) {
                        $(img).css("top", -10); //For portraits
                    }


                });
            }
        };
}])


;