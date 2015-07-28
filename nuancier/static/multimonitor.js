var overlays = [],
    nOverlay = 0,
    $cropImage = $('#cropImage'),
    cropImageWidth = $cropImage.width(),
    cropImageHeight = $cropImage.height(),
    wallpaperWidth,
    wallpaperHeight,
    imageScale;

$(document).ready(function() {
    $("<img/>").attr("src", $cropImage.attr("src")).load(function() {
        wallpaperWidth = this.width;
        wallpaperHeight = this.height;
        imageScale = cropImageWidth * 1.0 / wallpaperWidth;
    });
    $('#addOverlay').click(function() {
        var xAspect = $('#xAspect').val();
        var yAspect = $('#yAspect').val();
        if(Number(xAspect) > 0 && Number(yAspect) > 0) {
            var dynamic_div = $(document.createElement('div')).css({
                width: xAspect * imageScale,
                height: yAspect * imageScale
            });
            $(dynamic_div).addClass('overlays').attr('id', 'overlay' + nOverlay);
            $(dynamic_div).draggable().resizable();
            $(dynamic_div)
            .append('<span class="resize-handle resize-handle-nw"></span>')
            .append('<span class="resize-handle resize-handle-ne"></span>')
            .append('<span class="delete"></span>')
            .append('<span class="resize-handle resize-handle-se"></span>')
            .append('<span class="resize-handle resize-handle-sw"></span>');
            $(dynamic_div).appendTo('#cropArea');
            overlays.push("#overlay" + nOverlay++);
        }
    });
    $('#enlargeOverlay').click(function() {
        for(var i = 0; i < overlays.length; i++) {
            $overlay = $(overlays[i]);
            $overlay.css({
                    'width' : $overlay.width()  * 1.1,
                    'height': $overlay.height() * 1.1
            });
        }
    });
    $('#shrinkOverlay').click(function() {
        for(var i = 0; i < overlays.length; i++) {
            $overlay = $(overlays[i]);
            $overlay.css({
                    'width' : $overlay.width()  / 1.1,
                    'height': $overlay.height() / 1.1
            });
        }
    });
    $('#cropArea').on('click','.delete',function () {
        toDelete = '#' + $(this).parent().attr('id');
        index = overlays.indexOf(toDelete);
        $(toDelete).remove();
        overlays.splice(index, 1);
        return false;
    });
    $('#downloadCrop').click(function() {
        var data = {overlays: []};
        for(var i = 0; i < $overlays.length; i++) {
            var left = ($overlays[i].offset().left - $cropImage.offset().left) * 1.0 / imageScale,
                top =  ($overlays[i].offset().top - $cropImage.offset().top) * 1.0 / imageScale,
                width = $overlays[i].width() * 1.0 / imageScale,
                height = $overlays[i].height() * 1.0 / imageScale;

            data.overlays.push([left, top, left + width, top + height]);
        }
        $.ajax({
            url: window.location.href,
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8"
        });
    });
});
