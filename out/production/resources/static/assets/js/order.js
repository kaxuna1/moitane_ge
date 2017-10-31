/**
 * Created by vakhtanggelashvili on 5/21/17.
 */

$(document).ready(function () {
    var id = getParameterByName("id");
    var times = getParameterByName("times")
    var times = times.split(",")
    console.log(times);
    var timesObject = {};


    var price = $("#price").html();
    var fee = 4;
    var firstLastDates = {
        a: "",
        b: ""
    }

    var numberOfTimes = 0;
    for (var key in times) {

        var item = times[key];

        if (numberOfTimes === 0) {
            firstLastDates.a = moment(parseInt(item)).locale("us").format("LL");
        }
        if (numberOfTimes === times.length - 1) {
            firstLastDates.b = moment(parseInt(item)).locale("us").format("LL");
        }


        numberOfTimes++;
        timesObject[item] = {
            date: moment(parseInt(item)).locale("us").format("LL"),
            startTime: moment(parseInt(item)).locale("us").format("HH:mm"),
            endTime: moment(parseInt(item)).add(parseInt($("#duration").html()), "minutes").format("HH:mm")
        }
    }
    console.log(timesObject);


    $(".numberOfClasses").html("<div class='numberOfClassesName'>" + numberOfTimes + " Classes</div>");
    $(".numberOfClasses").append("<div class='numberOfClassesAB'>" + firstLastDates.a + "-" + firstLastDates.b + "</div>")
    $(".numberOfClasses").append("<div style='margin-top: 25px;display: grid;'>" +
        "<a style='cursor:pointer;float: right;margin-bottom: 15px;text-align: right;' class='expandDates'>See Details</a>" +
        "<table id='hiddenTimeTable' class='hideOrder' style='padding-top: 10px;    margin-bottom: 20px;'><tbody class='timesExpanded'></tbody></table></div>")

    for (var key in timesObject) {
        var item = timesObject[key];

        $(".timesExpanded").append("<tr>" +
            "<td>" +
            item.date + "  -  " + item.startTime + " - " + item.endTime +
            "</td>" +
            "</tr>")


    }
    $(".expandDates").click(function () {
        $("#hiddenTimeTable").toggleClass("hideOrder");
    });

    var sum = (parseInt(price) * numberOfTimes);

    var total = (parseFloat(sum) + parseFloat(((sum/100)*fee).toPrecision(3))).toPrecision(3);

    $(".pricextimes").html(price + " ₾ x " + numberOfTimes + " classes");
    $(".pricextimesSum").html(sum + " ₾");
    $(".feePlace").html(fee + "%");
    $(".totalPlace").html(total + " ₾");

    $(".bookButton").click(function () {
        var url = "/bookforuser/" + id;


        $.ajax({
            url: url,
            data: {
                comment:$("#commentText").html(),
                times: times.toString()
            }
        }).done(function (result) {
            console.log(result);
            if (result.code == 100) {
                openOrderGlobal(result)
            }else{
                alert("Error Please Contact System Administration")
            }
        })


    })

});
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
var openOrderGlobal = function (data) {

    showModalWithTableInside(function (head, body, modal, rand) {
        $.getJSON("/order/" + data.message, function (result) {

            modal.on('hidden.bs.modal', function () {
               window.location="/profile"
            });

            console.log(result);

            /** @namespace result.confirmed */
            /** @namespace result.canBePaid */
            body.append('<div class="row">' +
                '<div class="col-xs-4">Status: </div>' +
                '<div class="col-xs-4">' + (result.confirmed ? "Paid" : "Not Paid") + '</div>' +
                '<div class="col-xs-4" style="padding: 0;">' + (result.canBePaid ?
                    '<form name="returnform" action="https://securepay.ufc.ge/ecomm2/ClientHandler" method="POST">' +
                        '<input type="hidden" name="trans_id" value="'+data.message2+'">'+
                    "<button style='float: right;background-color: #46c3bf;color: white;' class='btn'>Pay Now</button></form>" : "") + '</div>' +
                '</div>');

            body.append('<div class="row">' +
                '<div class="col-xs-4">Price: </div>' +
                '<div class="col-xs-4">' + result.orderPrice + '</div>' +
                '<div class="col-xs-4"></div>' +
                '</div>');
            body.append('<div class="row">' +
                '<div class="col-xs-4">Category: </div>' +
                '<div class="col-xs-4">' + result.categoryName + '</div>' +
                '<div class="col-xs-4"></div>' +
                '</div>');
            body.append('<div class="row">' +
                '<div class="col-xs-4">Teacher: </div>' +
                '<div class="col-xs-4" style="text-transform: capitalize;">' + result.teacherName + '</div>' +
                '<div class="col-xs-4"></div>' +
                '</div>');
            body.append('<div class="row">' +
                '<div class="col-xs-4">Student: </div>' +
                '<div class="col-xs-4" style="text-transform: capitalize;">' + result.studentName + '</div>' +
                '<div class="col-xs-4"></div>' +
                '</div>');
            body.append('<div class="row">' +
                '<div class="col-xs-6"><h4>Ordered Classes: </h4></div>' +
                '<div class="col-xs-4"></div>' +
                '<div class="col-xs-2"></div>' +
                '</div>');

            $(".modal-cancele-btn").remove();
            createTable(body, {
                date: {
                    name: "Date"
                },
                start: {
                    name: "From"
                },
                end: {
                    name: "To"
                }
            }, function (table) {
                var data = result.bookedTimes;
                for (var key in data) {
                    var item = data[key];
                    table.append("<tr>" +
                        "<td>" + moment(item.startDate).locale("en").format("dddd LL") + "</td>" +
                        "<td>" + moment(item.startDate).locale("en").format("HH:mm") + "</td>" +
                        "<td>" + moment(item.endDate).locale("en").format("HH:mm") + "</td>" +
                        "</tr>")
                }
            })
        })
    }, {
    }, 500);
};