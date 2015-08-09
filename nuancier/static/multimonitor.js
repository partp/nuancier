$(document).ready(function() {
    $('#add-overlay').click(function() {
        var xAspect = $('#x-aspect').val(),
            yAspect = $('#y-aspect').val();
        if(Number(xAspect) > 0 && Number(yAspect) > 0) {
            var dynamic_div = $(document.createElement('div')).css({
                width: xAspect,
                height: yAspect
            });
            $(dynamic_div).addClass('overlays').draggable({
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
        var data = {overlays: []},
            $overlays = $('.overlays'),
            $multimonitorConfig = $('#multimonitor-config'),
            left, top, width, height;
        for(var i = 0; i < $overlays.length; i++) {
            left = $overlays.eq(i).offset().left - $multimonitorConfig.offset().left;
            top =  $overlays.eq(i).offset().top - $multimonitorConfig.offset().top;
            width = $overlays.eq(i).width();
            height = $overlays.eq(i).height();
            data.overlays.push([left, top, left + width, top + height]);
        }
        $('#overlays-json').val(JSON.stringify(data));
        $('#submit-overlays').submit();
    });
});
