
$(document).ready(function () {
    document.title = app + "| Home";
    var message = {"postType": 'navigate', "query": "Current", "numberOfResult": 5};

    callAjax("CRUD", message, false,
            function (data) {
                if (data.result == 'OK') {
                    fix(data.records);
                } else if (data.result == 'ERROR') {

                }
            },
            function (error) {
                alert(error);
            });


});


function fix(records) {
    var bannerDive = $('<div id="myCarousel" class="carousel slide" data-ride="carousel"></div>').appendTo('#mainDive');
    var olDive = $('<ol id="olItems" class="carousel-indicators"></ol>').appendTo(bannerDive);
    var innerDive = $('<div id="innerItems" class="carousel-inner" role="listbox"></div>').appendTo(bannerDive);
    for (var i = 0; i < records.length; i++) {
        $(olDive).append('<li data-target="#myCarousel" data-slide-to="' + i + '" class="' + (i == 0 ? "active" : "") + '"></li>');
        var itemDive = $('<div class="item ' + (i == 0 ? "active" : "") + '"></div>').appendTo(innerDive);
        var itemCon = $('<div class="container"></div>').appendTo(itemDive);
        $(itemCon).append('<div class="carousel-caption"><h3>Current <span>Movies</span></h3><p>You can browse for sessions a week in advance</p><a class="hvr-outline-out button2" href="navigation.jsp?status=Current">Shop Now </a></div>');
        $(itemDive).attr("style","background:linear-gradient(rgba(23, 22, 23, 0.2), rgba(23, 22, 23, 0.5)), url('images/movies/"+records[i].image+"') no-repeat; background-size:cover;");
    }
    $(bannerDive).append('<a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a>');
    $(bannerDive).append('<a class="right carousel-control" href="#myCarousel" role="button" data-slide="next"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Previous</span></a>');




}
