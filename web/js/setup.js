

function callAjax(url, postData, async, success, error) {
                    alert(postData.postType);

    $.ajax({
        url: url,
        async: async,
        data: postData,
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function() {
            
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
        complete: function() {
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


jQuery(document).ready(function ($) {
    $(".scroll").click(function (event) {
        event.preventDefault();
        $('html,body').animate({scrollTop: $(this.hash).offset().top}, 1000);
    });
});


$(document).ready(function () {
    /*
     var defaults = {
     containerID: 'toTop', // fading element id
     containerHoverID: 'toTopHover', // fading element hover id
     scrollSpeed: 1200,
     easingType: 'linear' 
     };
     */

    $().UItoTop({easingType: 'easeOutQuart'});

});