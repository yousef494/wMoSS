
$(document).ready(function () {


    var message = {"postType": 'view'};

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
    $('#mainDiv').html('');
    var titleDiv = $('<div class="col-md-12 products-right"></div>').appendTo('#mainDiv');
    $(titleDiv).append('<h5>Cart <span>(' + data.recordsTotal + ')</span></h5>');
    $('<div class="clearfix"></div>').appendTo('#mainDiv');
    var tableContainer = $('<div class="single-pro col-md-12"></div>').appendTo('#mainDiv');
    var total = createTable(tableContainer, data.records, data.record);
    var totalsContainer = $('<div class="single-pro col-md-4 cartSubTotal"></div>').appendTo('#mainDiv');
    createSubtotals(totalsContainer, total);
    $('html,body').animate({scrollTop: $(this.hash).offset().top}, 1000);
}





function createTable(container, records, quantities) {
    var table = $('<table class="table table-hover table-bordered"></table>').appendTo(container);
    var thead = $('<thead class="bcell"></thead>').appendTo(table);
    var tr = $('<tr></tr>').appendTo(thead);
    $(tr).append('<th></th><th></th><th>Product</th><th>Price</th><th>Quantity</th><th>Total</th>');

    var tbody = $('<tbody></tbody').appendTo(table);
    if (records.length == 0) {
        $(container).append('<div class="text-center">No added item in the cart yet</div>');
    }

    var total = 0;
    for (var i = 0; i < records.length; i++) {
        var record = records[i];
        var quantitiy = quantities[i];
        var sTotal = (parseInt(record.price) * quantitiy);
        var tr = $('<tr></tr>').appendTo(tbody);
        var btnTd = $('<td></td>').appendTo(tr);
        var removeBtn = $('<a href="#" id="removeBtn" movieName="' + record.name + '"></a>').appendTo(btnTd);
        $(removeBtn).append('<span class="label label-danger fa fa-remove">Remove</span>');
        $(tr).append('<td><img src="images/movies/' + record.image + '" class="movieImageCart"/></td>\n\
<td>' + record.name + '</td><td>' + record.price + '$</td><td>' + quantitiy + '</td><td>' + sTotal + '$</td>');
        removeBtn.click(function () {
            var movieName = $(this).attr('movieName');
            confirmDeletion(movieName);
        });
        total =  total + sTotal;
    }
    return total;

}

function createSubtotals(container, total) {
    container.append('<div class="page-header"><h3 class="bars cartTotals">Cart totals</h3></div>');
    var table = $('<table class="table table-hover table-bordered"></table>').appendTo(container);
    var tbody = $('<tbody></tbody').appendTo(table);
    var tr1 = $('<tr><td class="bcell">Subtotal</td><td>'+total+'$</td></tr>').appendTo(tbody);
    var tr2 = $('<tr><td class="bcell">Total</td><td>'+total+'$</td></tr>').appendTo(tbody);
}


function confirmDeletion(movieName) {
    var modal = createModal("dConfirm", "Please confirm...", "Confirm", "Are you sure you want to delete "+movieName+" from your cart?");
    modal.modal('show');
    modal.find('#submitBtn').on('click', function (e) {
        removFromCart(movieName);
        modal.modal('hide');
        window.location.href="";
    });
}


function removFromCart(movieName) {
    var message = {"postType": 'delete', "movieName": movieName};

    callAjax("CRUD", message, false,
            function (data) {
                if (data.result == 'OK') {
                    
                } else if (data.result == 'ERROR') {

                }
            },
            function (error) {
                alert(error);
            });
}