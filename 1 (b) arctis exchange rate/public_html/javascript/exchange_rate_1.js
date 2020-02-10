

$(document).ready(function () {

    //Current date display
    var n = new Date();
    var y = n.getFullYear();
    var m = n.getMonth() + 1;
    var d = n.getDate();
    document.getElementById("currentDate").innerHTML = y + "-" + m + "-" + d;


    //Check-ups for date insert
    $("#searchBtn").click(function (event) {
        $.ajaxSetup({cache: false});
        var incorrectDate = false;
        if ($.trim($("#dateInsert").val()) == '') {
            incorrectDate = true;
            alert("Date is not inserted.")
        } else if ($("#dateInsert").val().length < 10) {
            incorrectDate = true
            alert("Correct date format : YYYY-MM-DD.")
        }

        if (incorrectDate == true) {
            event.preventDefault();
        } else {
            $('#tableEx tbody').empty();
            getJson();
        }
    });

});

function getJson() {
    var dateValue = $("#dateInsert").val();
    var url = 'http://hnbex.eu/api/v1/rates/daily/?date=' + dateValue + '?callback=jsonpcallback&';
    alert(url);

    $.ajax({
        url: url,
        jsonp: "jsonpcallback",
        dataType: "jsonp",
        success: function (data) {
            console.log(data);
        }
    });
}

function jsonpcallback(data) {
    alert(JSON.stringify(data));
    var tableRow = '<tbody>';
    $.each(data, function (i, item){
       tableRow += '<tr><td>' + data[i].unit_value + 
               '</td><td>' + data[i].currency_code + 
               '</td><td>' + data[i].median_rate + 
               '</td><td>' + data[i].buying_rate + 
               '</td><td>' + data[i].selling_rate + '</td></tr>';
    });
    tableRow += '</tbody>';
    $('#tableEx').append(tableRow);
}

//JSON TABLE
//http://jsfiddle.net/8kkg3/3/
//https://stackoverflow.com/questions/17068121/ordering-json-data-in-a-table


