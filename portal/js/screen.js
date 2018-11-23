function takeScreenshot() {
    html2canvas(document.querySelector(".container"),{
            useCORS : true,
            foreignObjectRendering : true,
            allowTaint :false
        }
    ).then(canvas => {

        document.body.appendChild(canvas);
        var dataUrl=canvas.toDataURL("image/jpeg");

        var saveFile = function(data, filename)
        {
            var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
            save_link.href = data;
            save_link.download = filename;

            var event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0,
                false, false, false, false, 0, null);
            save_link.dispatchEvent(event);
        };

        var filename = '地图截图.jpg';
        saveFile(dataUrl,filename);

    });
    console.log('截取屏幕success');


}

$(function () {
    $('#screensave').on('click',takeScreenshot);
});

//
// $('#screensave').on('click', function () {
//     $('.gisFunc').slideToggle("normal");
// });