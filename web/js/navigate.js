
$(document).ready(function () {
    
    var status = getURLParameter('status');
    document.title = app + "| " + status;
    
    var message = {"postType": 'navigate', "query": status};

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

