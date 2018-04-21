
$(document).ready(function () {

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
    $(titleDiv).append('<h5>Search Results <span>('+data.recordsTotal+')</span></h5>');
    var container = $('<div class="single-pro"></div>').appendTo('#mainDiv');
    for (var i = 0; i < data.recordsTotal; i++) {
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
    var cardOuter = $('<div class="col-md-4 product-men"></div>').appendTo(container);
    var shelf = $('<div class="men-pro-item simpleCart_shelfItem"></div>').appendTo(cardOuter);
    
    //inside shelf 1
    var item = $('<div class="men-thumb-item"></div>').appendTo(shelf);
    $(item).append('<img src="images/movies/'+record.image+'" alt="" class="pro-image-front"/>');
    $(item).append('<img src="images/movies/'+record.image+'" alt="" class="pro-image-back"/>');
    var cart = $('<div class="men-cart-pro"></div>').appendTo(item);
    var innerCart = $('<div class="inner-men-cart-pro"></div>').appendTo(cart);
    $(innerCart).append('<a href="single.jsp" class="link-product-add-cart">Quick View</a>');
    
    //inside shelf 2
    $(shelf).append('<span class="product-new-top">'+record.status+'</span>');
    
    //inside shelf 3
    var product = $('<div class="item-info-product "></div>').appendTo(shelf);
    $(product).append('<h4><a href="single.jsp">'+record.name+'</a></h4>');
    /*var details = $('<div class="snipcart-details top_brand_home_details item_add single-item hvr-outline-out button2"></div>').appendTo(product);
    var form = $(' <form action="#" method="post"></form>').appendTo(details);
    var fieldset = $(' <fieldset></fieldset>').appendTo(form);
    $(fieldset).append('<input type="hidden" name="cmd" value="_cart"/>');
    $(fieldset).append('<input type="hidden" name="add" value="1"/>');
    $(fieldset).append('<input type="hidden" name="business" value=" "/>');
    $(fieldset).append('<input type="hidden" name="item_name" value=""/>');
    $(fieldset).append('<input type="hidden" name="amount" value="'+record.price+'"/>');
    $(fieldset).append('<input type="hidden" name="discount_amount" value="1.00"/>');
    $(fieldset).append('<input type="hidden" name="currency_code" value="USD"/>');
    $(fieldset).append('<input type="hidden" name="return" value=" "/>');
    $(fieldset).append('<input type="hidden" name="cancel_return" value=" "/>');
    $(fieldset).append('<input type="submit" name="submit" value="Add to cart" class="button"/>');*/
}

//End of search functions
