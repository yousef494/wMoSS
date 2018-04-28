
$(document).ready(function () {
    
     /**
      * Action listner for add to cart btn
      */
  
    
     /**
      * Action listner for search btn
      */
    $('#searchBtn').click(function () {
        var term = $('#searchValue').val();
        var message = {"postType": 'search', "query": term};

        callAjax("CRUD", message, false,
                function (data) {
                    if (data.result == 'OK') {
                        mainpulatePage(data);
                    } else if (data.result == 'ERROR') {

                    }
                },
                function (error) {
                    alert(error);
                });
    });
    
    /**
     * Enter button action listener
     */
    $('#searchValue').keypress(function(e) {
      if(e.which == 13) {
        var term = $('#searchValue').val();
        var message = {"postType": 'search', "query": term};

        callAjax("CRUD", message, false,
                function (data) {
                    if (data.result == 'OK') {
                        mainpulatePage(data);
                    } else if (data.result == 'ERROR') {

                    }
                },
                function (error) {
                    alert(error);
                });
      }
    });


});

function callAjax(url, postData, async, success, error) {

    $.ajax({
        url: url,
        async: async,
        data: postData,
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function () {

        },
        success: function (input) {
            success(input);
        },
        error: function (jqXHR, error, errorThrown) {
            alert(errorThrown);
            //var modal = createModal('error', 'Error while communicating to server', '<div>' + errorThrown + '</div>');
            //modal.modal('show');
            error(errorThrown) || console.log(errorThrown);
        },
        complete: function () {
            //loading('stop');
        }
    });
}




// You can also use "$(window).load(function() {"
$(function () {
    // Slideshow 4
    $("#slider3").responsiveSlides({
        auto: true,
        pager: true,
        nav: false,
        speed: 500,
        namespace: "callbacks",
        before: function () {
            $('.events').append("<li>before event fired.</li>");
        },
        after: function () {
            $('.events').append("<li>after event fired.</li>");
        }
    });
});

// Mini Cart
paypal.minicart.render({
    action: '#'
});

if (~window.location.search.indexOf('reset=true')) {
    paypal.minicart.reset();
}

$(window).load(function () {
    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 9000,
        values: [1000, 7000],
        slide: function (event, ui) {
            $("#amount").val("$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ]);
        }
    });
    $("#amount").val("$" + $("#slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));

});//]]>  


$(document).ready(function ($) {
    $(".scroll").click(function (event) {
        event.preventDefault();
        $('html,body').animate({scrollTop: $(this.hash).offset().top}, 1000);
    });
});


$(document).ready(function () {
    $().UItoTop({easingType: 'easeOutQuart'});
});



//Search functions

/**
 * Responsible for manipulating the page
 * @param {type} data
 * @returns {undefined}
 */

/**
 * Responsible for manipulating the page
 * @param {type} data
 * @returns {undefined}
 */
function mainpulatePage(data) {
    $('#mainDiv').html('');
    var titleDiv = $('<div class="col-md-12 products-right"></div>').appendTo('#mainDiv');
    $(titleDiv).append('<h5>Results <span>('+data.recordsTotal+')</span></h5>');
    $('<div class="clearfix"></div>').appendTo('#mainDiv');
    var container = '';
    for (var i = 0; i < data.recordsTotal; i++) {
        if((i%4)==0)
            container = $('<div class="single-pro col-md-12"></div>').appendTo('#mainDiv');
        createCard(container, data.records[i]);
    }
    $('html,body').animate({scrollTop: $(this.hash).offset().top}, 1000);
}

/**
 * It builds single card
 * @param {type} container in which the card will be added
 * @param {type} record
 * @returns {undefined}
 */
function createCard(container, record){
    var cardOuter = $('<div class="col-md-3 product-men"></div>').appendTo(container);
    var shelf = $('<div class="men-pro-item simpleCart_shelfItem"></div>').appendTo(cardOuter);
    
    //inside shelf 1
    var item = $('<div class="men-thumb-item"></div>').appendTo(shelf);
    $(item).append('<img src="images/movies/'+record.image+'" alt="" class="pro-image-front" />');
    $(item).append('<img src="images/movies/'+record.image+'" alt="" class="pro-image-back" />');
    var cart = $('<div class="men-cart-pro"></div>').appendTo(item);
    var innerCart = $('<div class="inner-men-cart-pro"></div>').appendTo(cart);
    $(innerCart).append('<a href="single.jsp" class="link-product-add-cart">Quick View</a>');
    
    //inside shelf 2
    $(shelf).append('<span class="product-new-top">'+record.status+'</span>');
    
    //inside shelf 3
    var product = $('<div class="item-info-product "></div>').appendTo(shelf);
    $(product).append('<h4><a href="single.jsp">'+record.name+'</a></h4>');
    var sessions ='';
    for(var i=0;i<record.sessions.length;i++){
        sessions += '<span style="margin-left: 5px;">'+record.sessions[i]+'</span>,';
    }
    $(product).append(sessions.substring(0,sessions.length-2));
    var details = $('<div class="snipcart-details top_brand_home_details item_add single-item hvr-outline-out button2"></div>').appendTo(product);
    var btn = $('<input type="button" name="submit" value="Add to cart" class="button" id="addBtn" movieAttr="'+record.name+","+record.price+","+record.image+'"/>').appendTo(details);
    btn.click(function () {
        var movieInfo = btn.attr('movieAttr');
        addCart(movieInfo);
    });
}

//End of search functions


function addCart(movieInfo){
        var movieInfoList = movieInfo.split(",");
        var movieJson = {"name":movieInfoList[0],"price":movieInfoList[1], "image": movieInfoList[2]};
        //alert(movieInfoList[0]);
        var message = {"postType": 'add', "movie": JSON.stringify(movieJson)};

        callAjax("CRUD", message, false,
                function (data) {
                    if (data.result == 'OK') {
                        alert("Item("+data.record.name+") was added to your cart successfully");
                       // mainpulatePage(data);
                    } else if (data.result == 'ERROR') {

                    }
                },
                function (error) {
                    alert(error);
                });
}