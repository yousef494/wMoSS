
$(document).ready(function () {

    var staus = getURLParameter('status');
    var message = {"postType": 'navigate', "query": staus};

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

