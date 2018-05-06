
$(document).ready(function () {

    var movieName = getURLParameter('movieName');
    document.title = app + "| " + movieName;
    
    var message = {"postType": 'search', "query": movieName};

    callAjax("CRUD", message, false,
            function (data) {
                if (data.result == 'OK') {
                    manipulate(data);
                } else if (data.result == 'ERROR') {

                }
            },
            function (error) {
                alert(error);
            });

});



function manipulate(data) {
    var leftContainer = $('<div class="col-md-4 single-right-left "></div>').appendTo('#mainDiv');
    createUpper(leftContainer, data.records[0]);
    var rightContainer = $('<div class="col-md-8 single-right-left simpleCart_shelfItem"></div>').appendTo('#mainDiv');
    createRight(rightContainer, data.records[0]);
    $('<div class="clearfix"></div>').appendTo('#mainDiv');
    var lowerContainer = $('<div class="col-md-12 single-right-left "></div>').appendTo('#mainDiv');
    createLower(lowerContainer, data.records[0]);
}

function createUpper(container, record){
    var imageDiv = $('<div class="grid images_3_of_2"><div>').appendTo(container);
    var sliderDiv = $('<div class="flexslider"><div>').appendTo(imageDiv);
    $('<div class="clearfix"></div>').appendTo(sliderDiv);
    
    var flexDiv = $('<div class="flex-viewport" style="overflow: hidden; position: relative;"></div>').appendTo(sliderDiv);
    var ul = $('<ul class="slides" style="width: 1000%; transition-duration: 0.6s; transform: translate3d(-1020px, 0px, 0px);"></ul>').appendTo(flexDiv);
    for(var i=0;i<4;i++){
        var li = $('<li data-thumb="images/movies/' + record.image + '" class="clone" aria-hidden="true" style="width: 340px; float: left; display: block;"></li>').appendTo(ul);
        $('<div class="thumb-image"> <img src="images/movies/' + record.image + '" data-imagezoom="true" class="img-responsive" draggable="false"/> </div>').appendTo(li);
    }
    
    
    var thumbsDiv = $('<ol class="flex-control-nav flex-control-thumbs"></ol>').appendTo(sliderDiv);
    var thumb1 = $('<li><img src="images/movies/' + record.image + '" class="" draggable="false"></li>').appendTo(thumbsDiv);
    var thumb2 = $('<li><img src="images/movies/' + record.image + '" class="" draggable="false"></li>').appendTo(thumbsDiv);
    var thumb3 = $('<li><img src="images/movies/' + record.image + '" class="flex-active" draggable="false"></li>').appendTo(thumbsDiv);
    
    var controlsDiv = $('<ul class="flex-direction-nav"></ul>').appendTo(sliderDiv);
    $('<li class="flex-nav-prev"><a class="flex-prev" href="#">Previous</a></li>').appendTo(controlsDiv);
    $('<li class="flex-nav-next"><a class="flex-next" href="#">Next</a></li>').appendTo(controlsDiv);
}


function createRight(container, record){
    $('<h3>'+record.name+'</h3>').appendTo(container);
    $('<p><span class="item_price">'+record.price+'$</span></p>').appendTo(container);
    
    var sessionsCon = $('<div class="color-quality"></div>').appendTo(container);
    var sessionsDiv = $('<div class="color-quality-right"></div>').appendTo(sessionsCon);
    $('<h5>Sessions:</h5>').appendTo(sessionsDiv);
    var sessions = $('<select id="s'+(record.name).split(' ').join("")+'" class="frm-field required sect"></select').appendTo(sessionsDiv);
    for(var i=0;i<record.sessions.length;i++){
        $('<option name="s'+(record.name).split(' ').join("")+'" value="'+record.sessions[i]+'">'+record.sessions[i]+'</option>').appendTo(sessions);
    }
    
    $(container).append('<br/>');
    var quantityCon = $('<div class="color-quality"></div>').appendTo(container);
    var quantityDiv = $('<div class="color-quality-right"></div>').appendTo(quantityCon);
    $('<h5>Quantity:</h5>').appendTo(quantityDiv);
    $(quantityDiv).append('<input id="q'+(record.name).split(' ').join("")+'" type="number"  min="1" name="qTxt" value="1" class="form-control-plaintext qTxt" id="qTxt"/>');

    
    var occasionCon = $('<div class="occasion-cart"></div>').appendTo(container);
    var details = $('<div class="snipcart-details top_brand_home_details item_add single-item hvr-outline-out button2"></div>').appendTo(occasionCon);
    var btn = $('<input type="button" name="submit" value="Add to cart" class="button" id="addBtn" movieAttr="'+record.name+","+record.price+","+record.image+'"/>').appendTo(details);
    btn.click(function () {
        var movieInfo = $(this).attr('movieAttr');
        addCart(movieInfo);
    });
}


function createLower(container, record){
    var tabsCon = $('<div class="responsive_tabs_agileits"></div>').appendTo(container);
    var horizontalTab = $('<div id="horizontalTab" style="display: block; width: 100%; margin: 0px;"></div>').appendTo(tabsCon);
    var ul = $('<ul class="resp-tabs-list"></ul>').appendTo(horizontalTab);
    $(ul).append('<li class="resp-tab-item resp-tab-active" aria-controls="tab_item-0" role="tab">Description</li>');

    var tabsCon = $('<div class="resp-tabs-container"></div>').appendTo(horizontalTab);
    $(tabsCon).append('<h2 class="resp-accordion resp-tab-active" role="tab" aria-controls="tab_item-0"><span class="resp-arrow"></span>Description</h2>');
    var tabCon = $('<div class="tab1 resp-tab-content resp-tab-content-active" style="display:block" aria-labelledby="tab_item-0">').appendTo(tabsCon);
    var tabDiv = $('<div class="single_page_agile_its_w3ls"></div>').appendTo(tabCon);
    $(tabDiv).append('<p>'+record.summary+'</p>');
}
