var imageScale = 0.1,
    passOverlays = function(action) {
    $('#pass-overlays').attr("action", action);
    $('#pass-overlays').submit();
};


$(document).ready(function() {
    $('#add-overlay').click(function() {
        var xAspect = $('#x-aspect').val(),
            yAspect = $('#y-aspect').val();
        if(Number(xAspect) > 0 && Number(yAspect) > 0) {
            xAspect *=  imageScale;
            yAspect *=  imageScale;
            var dynamic_div = $(document.createElement('div')).css({
                width: xAspect,
                height: yAspect
            });
            $(dynamic_div).addClass('overlay').draggable({
                containment: '#multimonitor-config',
                snap: true,
                snapMode: "outer"
            });
            $(dynamic_div)
            .append('<span class="delete"></span>');
            $(dynamic_div).appendTo('#multimonitor-config');
        }
    });

    $('#multimonitor-config').on('click','.delete',function () {
        $(this).parent().remove();
        return false;
    });

    $('#show-wallpapers').click(function() {
        var $overlays = $('.overlay'),
            overlaysLength = $overlays.length;
        if(overlaysLength > 1) {
            var data = {overlays: []},
                $multimonitorConfig = $('#multimonitor-config'),
                left, top, width, height;
            for(var i = 0; i < overlaysLength; i++) {
                left = ($overlays.eq(i).offset().left - $multimonitorConfig.offset().left) / imageScale;
                top =  ($overlays.eq(i).offset().top - $multimonitorConfig.offset().top) / imageScale;
                width = $overlays.eq(i).width() / imageScale;
                height = $overlays.eq(i).height() / imageScale;
                data.overlays.push([left, top, width, height]);
            }
            $('#overlays-json').val(JSON.stringify(data));
            $('#submit-overlays').submit();
        }
    });
});
