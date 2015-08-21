var $cropImage = $('#crop-image'),
    $cropArea = $('#crop-area'),
    cropImageWidth = $cropImage.width(),
    cropImageHeight = $cropImage.height(),
    wallpaperWidth,
    wallpaperHeight,
    imageScale;

$(document).ready(function() {
    $('<img/>').attr('src', $cropImage.attr('src')).load(function() {
        wallpaperWidth = this.width;
        wallpaperHeight = this.height;
        imageScale = cropImageWidth * 1.0 / wallpaperWidth;
        for (i = 0; i < overlays.length; i++) {
            var dynamic_div = $(document.createElement('div')).css({
                left: $cropImage.offset().left + overlays[i][0] * imageScale,
                top: $cropImage.offset().top + overlays[i][1] * imageScale,
                width: overlays[i][2] * imageScale,
                height: overlays[i][3] * imageScale
            });
            $(dynamic_div).addClass('overlay');
            $(dynamic_div).appendTo('#crop-area');
        }

        $('.overlay').drag('init', function() {
            return $('.overlay');
        }).drag('start', function(handler, options){
            options.limit = $cropArea.offset();
            options.limit.bottom = options.limit.top + $cropImage.outerHeight() - $(this).outerHeight();
            options.limit.right = options.limit.left + $cropImage.outerWidth() - $(this).outerWidth();
        }).drag(function(handler, options) {
            $(this).css({
                top: Math.min(options.limit.bottom, Math.max(options.limit.top, options.offsetY)),
                left: Math.min(options.limit.right, Math.max(options.limit.left, options.offsetX))
            });
        });
    });

    $('#enlarge-overlay').click(function() {
        var $overlays = $(".overlay");
        for(var i = 0; i < $overlays.length; i++) {
            $overlays.eq(i).css({
                    'width' : $overlays.eq(i).width()  * 1.1,
                    'height': $overlays.eq(i).height() * 1.1
            });
        }
    });

    $('#shrink-overlay').click(function() {
        var $overlays = $(".overlay");
        for(var i = 0; i < $overlays.length; i++) {
            $overlays.eq(i).css({
                    'width' : $overlays.eq(i).width()  / 1.1,
                    'height': $overlays.eq(i).height() / 1.1
            });
        }
    });

    $('#download-crop').click(function() {
        var data = {overlays: []},
            $overlays = $('.overlay'),
            left, top, width, height;
        for(var i = 0; i < $overlays.length; i++) {
            left = ($overlays.eq(i).offset().left - $cropImage.offset().left) * 1.0 / imageScale;
            top =  ($overlays.eq(i).offset().top - $cropImage.offset().top) * 1.0 / imageScale;
            width = $overlays.eq(i).width() * 1.0 / imageScale;
            height = $overlays.eq(i).height() * 1.0 / imageScale;
            data.overlays.push([left, top, left + width, top + height]);
        }
        $.ajax({
            url: 'download/',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8'
        });
    });
});
