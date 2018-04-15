var array =[
    {"name": 'movie', "price": 999},
    {"name": 'movie', "price": 444}
];

$(document).ready(function () {
    $('#searchBtn').click(function () {

        var term = $('#searchValue').val();
        var message = {"postType": 'search', "query": term};
        callAjax("CRUD", message, false,
                function (data) {
                    if (data.result == 'OK') {
                        alert(data.message);
                    } else if (data.result == 'ERROR') {
                        alert(data.message);
                    }
                },
                function (error) {
                    alert(error);
                });
    });

});


