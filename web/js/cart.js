
$(document).ready(function () {
    document.title = app + "| Cart";

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
    var totalsContainer = $('<div class="col-md-4 cartSubTotal"></div>').appendTo('#mainDiv');
    createSubtotals(totalsContainer, total);
    $('html,body').animate({scrollTop: $(this.hash).offset().top}, 1000);
}




var g_total = 0;
function createTable(container, records, cart) {//quantities) {
    var table = $('<table class="table table-hover table-bordered"></table>').appendTo(container);
    var thead = $('<thead class="bcell"></thead>').appendTo(table);
    var tr = $('<tr></tr>').appendTo(thead);
    $(tr).append('<th></th><th></th><th>Movie (Session)</th><th>Seat(s)</th><th>Price</th><th>Quantity</th><th>Total</th>');

    var tbody = $('<tbody></tbody').appendTo(table);
    if (cart.items.length == 0) {
        $(container).append('<div class="text-center">No added item in the cart yet</div>');
    }


    for (var i = 0; i < cart.items.length; i++) {
        var record = cart.items[i];
        var quantitiy = cart.quants[i];
        var sTotal = (parseInt(record.price) * quantitiy);
        var tr = $('<tr></tr>').appendTo(tbody);
        var btnTd = $('<td></td>').appendTo(tr);
        var removeBtn = $('<a href="#" id="removeBtn" movieName="' + record.name + '"></a>').appendTo(btnTd);
        $(removeBtn).append('<span class="label label-danger fa fa-remove">Remove</span>');
        $(tr).append('<td><img src="images/movies/' + record.image + '" class="movieImageCart"/></td>\n\
<td>' + record.name + '</td><td>' + (cart.seats[i].seats).toString() + '</td><td>$' + record.price + '</td><td>' + quantitiy + '</td><td>$' + sTotal + '</td>');
        removeBtn.click(function () {
            var movieName = $(this).attr('movieName');
            confirmDeletion(movieName);
        });
        g_total = g_total + sTotal;
    }
    return g_total;

}

function createSubtotals(container, total) {
    container.append('<div class="page-header"><h3 class="bars cartTotals">Cart totals</h3></div>');
    var table = $('<table class="table table-hover table-bordered"></table>').appendTo(container);
    var tbody = $('<tbody></tbody').appendTo(table);
    var tr1 = $('<tr><td class="bcell">Subtotal</td><td>$' + total + '</td></tr>').appendTo(tbody);
    var tr2 = $('<tr><td class="bcell">Total</td><td>$' + total + '</td></tr>').appendTo(tbody);

    var checkoutCon = $('<div class="snipcart-details top_brand_home_details item_add single-item hvr-outline-out button2"></div>').appendTo(container);
    var checkoutBtn = $('<input type="button" name="submit" value="Proceed to checkout" class="button" id="checkoutBtn"/>').appendTo(checkoutCon);
    checkoutBtn.click(function () {
        proceedCheckout();
    });
}


function confirmDeletion(movieName) {
    var modal = createModal("dConfirm", "Please confirm...", "Confirm", "Are you sure you want to delete " + movieName + " from your cart?");
    modal.modal('show');
    modal.find('#submitBtn').on('click', function (e) {
        removFromCart(movieName);
        modal.modal('hide');
        window.location.href = "";
    });
}


function removFromCart(movieName) {
    var message = {"postType": 'delete', "movieName": movieName};

    callAjax("CRUD", message, false,
            function (data) {
                if (data.result == 'OK') {
                    $('#numberOfCartItems').html(data.recordsTotal);
                } else if (data.result == 'ERROR') {

                }
            },
            function (error) {
                alert(error);
            });
}


function proceedCheckout() {
    if (g_total == 0)
        return;
    var form = '<form name="altEditor-form" role="form"><div class="clearfix"></div>';
    form = form + createControl('Name', 'name', "", "required");
    form = form + createControl('Address', 'address', "", "required");
    form = form + createControl('Email', 'email', "", "required");
    form = form + '</form>';
    form = form + '<div id="message"></div>';
    var infoModal = createModal("userInfo", "Checkout", "Proceed for payment", form);
    infoModal.modal('show');
    infoModal.find('#submitBtn').on('click', function (e) {
        var isValid = validateForm(infoModal.find('.modal-body'));
        if (isValid) {
            var name = infoModal.find('.modal-body').find('#name').val();
            var address = infoModal.find('.modal-body').find('#address').val();
            var email = infoModal.find('.modal-body').find('#email').val();
            proceedPayment(name, address, email);
            infoModal.modal("hide");
            infoModal.modal("dispose");
        } else {
            infoModal.find('.modal-body').find('#message').html(
                    createAlert("Invalid", "Missing information", "danger"));
        }
    });
}

function proceedPayment(name, address, email) {
    var form = '<form name="w3_w3layouts" role="form"><div class="clearfix"></div>';
    form = form + createControl('Card Number', 'cardNumber', "", "required");
    form = form + createControl('Expire Date', 'date', "", "required");
    form = form + createControl('Verification Code', 'vCode', "", "required");
    form = form + '</form>';
    form = form + '<div id="message"></div>';
    var paymentModal = createModal("paymentModal", "Payment", "Place payment", form);
    paymentModal.modal('show');
    //validate

    paymentModal.find('#cardNumber').validateCreditCard(function (result) {
        var message = "Card Type: " + (result.card_type == null ? '-' : result.card_type.name);
        var labelAlert = (result.valid && result.length_valid && result.luhn_valid);
        if (result.card_type != null) {
            paymentModal.find('#message').html(
                    createAlert(labelAlert ? "Valid" : "Invalid", message, labelAlert ? "success" : "danger"));
        }
    });


    //on submit
    paymentModal.find('#submitBtn').on('click', function (e) {
        var isValid = false;
        //validate 
        //update message for the user
        paymentModal.find('#cardNumber').validateCreditCard(function (result) {
            paymentModal.find('#cardType').html(result.card_type == null ? '-' : result.card_type.name);
            paymentModal.find('#valid').html("" + (result.valid && result.length_valid && result.luhn_valid));
            isValid = result.valid && result.length_valid && result.luhn_valid;
        });

        isValid = validateForm(paymentModal.find('.modal-body'));
        if (isValid) {
            var cardNumber = paymentModal.find('#cardNumber').val();
            submitCheckout(name, address, email, cardNumber);
            paymentModal.modal("hide");
            paymentModal.modal("dispose");
        } else {
            paymentModal.find('.modal-body').find('#message').html(
                    createAlert("Invalid", "Missing information", "danger"));
        }
    });
}

function createControl(label, input, size, required) {
    var style = "";//size!=undefined?'style="width:'+size+'px;"':"";
    var control = '<div class="input-group col-sm-12 col-md-12 col-lg-12">\n\
    <div class="col-sm-4 col-md-4 col-lg-4 text-right" style="padding-top:4px;">\n\
    <label>' + label + ':</label></div>\n\
    <div class="col-sm-8 col-md-8 col-lg-8" >\n\
    <input id="' + input + '" placeholder="' + label + '"' + style + ' ' + required + '/></div></div>';
    return control

}

function createAlert(label, message, type) {
    var control = '<div class="alert alert-' + type + '" role="alert">\n\
    <strong>' + label + '</strong> ' + message + '</div>';
    return control;
}


function validateForm(form) {
    var result = true;
    $(form).each(function () {
        $(this).find(':input').each(function () {
            var value = $(this).val();
            if (value == undefined || value.length < 1 || value == "") {
                result = false;
            }
        });
    });
    return result;
}

function submitCheckout(name, address, email, cardNumber) {
    var message = {"postType": 'checkout',
        "name": name, "address": address, "email": email, "cardNumber": cardNumber};

    callAjax("CRUD", message, false,
            function (data) {
                if (data.result == 'OK') {
                    var modal = createModal("purchaseConfirmation", "Confirmation", "", "Hi " + name + ",<br/>Thank you for shopping with Cienma Aurora, please note this number (" + data.message + ") for your refrence.");
                    modal.modal('show');
                    g_total = 0;
                    manipulate(data);
                } else if (data.result == 'ERROR') {

                }
            },
            function (error) {
                alert(error);
            });
}
