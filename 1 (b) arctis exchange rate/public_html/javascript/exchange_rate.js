

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
    var url = 'http://hnbex.eu/api/v1/rates/daily/?callback=jsonpcallback&date=' + dateValue;
    
    $.ajax({
        url: url,
        jsonp: "jsonpcallback",
        dataType: "jsonp",
        data: {
            date: dateValue
        },
        success: function (data) {
            console.log(data);
        }
    });
}

function jsonpcallback(data) {
    //alert(JSON.stringify(data));
    var tableRow = '<tbody>';
    $.each(data, function (i, item){
       tableRow += '<tr><td align="center">' + data[i].unit_value + 
               '</td><td align="center">' + data[i].currency_code + 
               '</td><td align="center">' + data[i].median_rate + 
               '</td><td align="center">' + data[i].buying_rate + 
               '</td><td align="center">' + data[i].selling_rate + '</td></tr>';
    });
    tableRow += '</tbody>';
    $('#tableEx').append(tableRow);
}


