var $cropImage = $('#cropImage'),
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
        var xAspect = $('#xAspect').val(),
            yAspect = $('#yAspect').val();
        if(Number(xAspect) > 0 && Number(yAspect) > 0) {
            xAspect *=  imageScale;
            yAspect *=  imageScale;
            var dynamic_div = $(document.createElement('div')).css({
                width: xAspect,
                height: yAspect
            });
            $(dynamic_div).addClass('overlays').draggable({
                containment: '#cropImage',
                snap: true,
                snapMode: "outer"
            })
            .resizable({
                containment: '#cropImage',
                minWidth: xAspect,
                minHeight: yAspect,
                aspectRatio: xAspect / yAspect
            });
            $(dynamic_div)
            .append('<span class="resize-handle resize-handle-nw"></span>')
            .append('<span class="resize-handle resize-handle-ne"></span>')
            .append('<span class="delete"></span>')
            .append('<span class="resize-handle resize-handle-se"></span>')
            .append('<span class="resize-handle resize-handle-sw"></span>');
            $(dynamic_div).appendTo('#cropArea');
        }
    });
    $('#enlargeOverlay').click(function() {
        var $overlays = $(".overlays");
        for(var i = 0; i < $overlays.length; i++) {
            $overlays.eq(i).css({
                    'width' : $overlays.eq(i).width()  * 1.1,
                    'height': $overlays.eq(i).height() * 1.1
            });
        }
    });
    $('#shrinkOverlay').click(function() {
        var $overlays = $(".overlays");
        for(var i = 0; i < $overlays.length; i++) {
            $overlays.eq(i).css({
                    'width' : $overlays.eq(i).width()  / 1.1,
                    'height': $overlays.eq(i).height() / 1.1
            });
        }
    });
    $('#cropArea').on('click','.delete',function () {
        $(this).parent().remove();
        return false;
    });
    $('#downloadCrop').click(function() {
        var data = {overlays: []},
            $overlays = $(".overlays"),
            left, top, width, height;
        for(var i = 0; i < $overlays.length; i++) {
            left = ($overlays.eq(i).offset().left - $cropImage.offset().left) * 1.0 / imageScale;
            top =  ($overlays.eq(i).offset().top - $cropImage.offset().top) * 1.0 / imageScale;
            width = $overlays.eq(i).width() * 1.0 / imageScale;
            height = $overlays.eq(i).height() * 1.0 / imageScale;
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
