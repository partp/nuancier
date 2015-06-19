var $cropImage = $('#cropImage'),
    overlays = [],
    patt = /-(\d+)x(\d+).\w{3,4}/g,
    res = patt.exec($('#cropImage').attr('src')),
    wallpaperWidth = res[1],
    wallpaperHeight = res[2],
    cropImageWidth = $cropImage.width(),
    cropImageHeight = $cropImage.height();

$(document).ready(function() {
    $('#addOverlay').click(function() {
        var xAspect = $('#xAspect').val();
        var yAspect = $('#yAspect').val();
        if(Number(xAspect) > 0 && Number(yAspect) > 0) {
            var dynamic_div = $(document.createElement('div')).css({
                width: xAspect, height: yAspect
            });
            $(dynamic_div).addClass('overlays').draggable().resizable();
            $(dynamic_div).appendTo('#cropArea');
            overlays.push($(dynamic_div));
        }
    });
    $('#enlargeOverlay').click(function() {
        if(overlays.length > 0){
            for(var i = 0; i < overlays.length; i++) {
                overlays[i].css({
                        'width' : overlays[i].width()  * 1.1,
                        'height': overlays[i].height() * 1.1
                });
            }
        }
    });
    $('#shrinkOverlay').click(function() {
        if(overlays.length > 0){
            for(var i = 0; i < overlays.length; i++) {
                overlays[i].css({
                        'width' : overlays[i].width()  / 1.1,
                        'height': overlays[i].height() / 1.1
                });
            }
        }
    });
});
