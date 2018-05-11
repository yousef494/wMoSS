function seating(container, data) {

    var nOfSelectedSeats = 0;
    var firstSeatLabel = 1;
    $(container).html('');
    var seatingdiv = $('<div class="single-pro col-md-12"></div>').appendTo(container);
    var map = $('<div class="col-md-7"></div>').appendTo(seatingdiv);
    map.append('<div class="text-center">Screen</div><hr/>');

    var info = $('<div class="col-md-5"></div>').appendTo(seatingdiv);
    var legend = $('<div class="col-md-12"></div>').appendTo(info);
    var cart = $('<div class="col-md-12"></div>').appendTo(info);
    cart.append('<br/>');

    var sc = $(map).seatCharts({
        map: [
            'eeee__eeee',
            'eeee__eeee',
            'eeee__eeee',
            'eeee__eeee',
            'eeee__eeee',
            'eeeeeeeeee',
        ],
        naming: {
            top: false,
            getLabel: function (character, row, column) {
                return firstSeatLabel++;
            },
        },
        legend: {
            node: $(legend),
            items: [
                ['e', 'available', 'Available'],
                ['f', 'unavailable', 'Already Booked'],
                ['s', 'selected', 'Selected']
            ]
        },
        click: function () {
            if (this.status() == 'available') {
                if (nOfSelectedSeats != data.max && nOfSelectedSeats!=10) {
                    var selectedSeates = 'Seat#' + this.settings.label + ' ('+this.settings.id+')';
                    $('<div>' + selectedSeates + '</div>').attr('id', 'cart-item-' + this.settings.id).appendTo(cart);
                    nOfSelectedSeats++;
                    return 'selected';
                }
            } else if (this.status() == 'selected') {
                //remove the item from our cart
                $('#cart-item-' + this.settings.id).remove();
                nOfSelectedSeats--;
                return 'available';
            } else if (this.status() == 'unavailable') {
                return 'unavailable';
            } else {
                return this.style();
            }
        }
    });

    return sc;


    //let's pretend some seats have already been booked
    sc.get(data.booked).status('unavailable');

}


function getSelectedSeats(sc) {
    var nodes = sc.find('selected').node();
    var seats = [];
    nodes.each(function () {
        var seatId = this.id;
        seats.push(seatId); //display seat data
    });
    return seats;
}