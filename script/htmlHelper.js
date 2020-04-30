$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'header.html',
        success: dados => {
            $('#header').html(dados)
        }
    });

    $.ajax({
        type: 'GET',
        url: 'footer.html',
        success: dados => {
            $('#footer').html(dados)
        }
    });
});
