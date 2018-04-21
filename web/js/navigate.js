
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


/**
 * This function is adapted form
 * Virendra 2012, Get URL Parameters using jQuery, jquerybyexample,http://www.jquerybyexample.net/2012/06/get-url-parameters-using-jquery.html, viewed 21/4/2018
 * 
 * @param {type} sParam
 * @returns {getURLParameter.sParameterName}
 */
function getURLParameter(sParam) {
    try {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {

            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1].replace('%20',' ');
            }
        }
        return 'Current';
    } catch (e) {
        return 'Current';
    }
}