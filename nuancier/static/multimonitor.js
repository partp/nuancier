var element_pos = 0;
var overlayCount = 0;
var overlays = [];
$(document).ready(function() {
    $('#addOverlay').click(function() {
        var xAspect = $("#xAspect").val();
        var yAspect = $("#yAspect").val();
        if(Number(xAspect) > 0 && Number(yAspect) > 0) {
            var dynamic_div = $(document.createElement('div')).css({
                width: xAspect, height: yAspect
            });
            $(dynamic_div).addClass('divContainers').draggable().resizable();
            $(dynamic_div).appendTo('body');
            overlays.push($(dynamic_div));
            overlayCount += 1;
        }
    });
});
