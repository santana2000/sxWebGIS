$(function () {
    $('button').on('click',function () {
        var lyr = $('#layers').val();
        $.ajax({
            url:lyr + '.html',
            success:function (data) {

                //console.log(data);
                $('#position').empty().append(data);

            },
            error:function () {
                alert('请求出错，请稍后尝试')
            }
        })
    })
})