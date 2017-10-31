/**
 * Created by vakhtanggelashvili on 5/21/17.
 */

$(document).ready(function () {
    $(".profilePicProfilePage").click(function () {
        $("#profilePick").click();
    });
    $("#profilePick").change(function (e) {

        var globalThis = this;
        var $uploadCrop;
        showModalWithTableInside(function (head, body, modal, rand) {

            body.append('<div style="height: 300px"><div id="upload-demo" style="height: 100%"></div></div>');


            $uploadCrop = $('#upload-demo').croppie({
                viewport: {
                    width: 100,
                    height: 100,
                    type: 'circle'
                },
                enableExif: true
            });

            function readFile(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        $('.upload-demo').addClass('ready');
                        $uploadCrop.croppie('bind', {
                            url: e.target.result
                        }).then(function(){
                            console.log('jQuery bind complete');
                        });

                    }

                    reader.readAsDataURL(input.files[0]);
                }
                else {
                    swal("Sorry - you're browser doesn't support the FileReader API");
                }
            }
            readFile(globalThis);


        },{"Crop and Upload":function () {
            $uploadCrop.croppie('result', {
                type: 'base64',
                size: 'viewport'
            }).then(function (result) {
                console.log(result);
                $.post({
                    url:"profilepicupdate",
                    data:{pic:result}
                }).then(function (res) {
                    console.log(res)
                    window.location.reload()
                })
            })

            /*
            console.log(this.files);
            var formData = new FormData();
            var xhr = new XMLHttpRequest();

            for (var i = 0; i < this.files.length; i++) {
                //TODO Append in php files array
                formData.append('file', this.files[i]);
                console.log('Looping trough passed data', this.files[i]);
            }

            //On successful upload response, parse JSON data
            //TODO handle response from php server script
            xhr.onload = function () {
                var data = JSON.parse(this.responseText);
                window.location.reload()
            };

            //Open an AJAX post request
            xhr.open('post', "uploadProfilePic/");
            xhr.send(formData);*/
        }},400);


    });
    $(".profileEditButton").click(function () {


        var title = "";
        var text = "";
        var sendUrl = "/editme?";
        var inputType = "textarea";
        var value = "";

        var inputOptions = {};

        var type = $(this).attr("value");

        if (type === "about") {
            title = "Enter";
            text = "Information about you";
            value = $(".aboutText").html();
        }
        if (type === "academic") {
            title = "Academic Credentials";
            value = $(".academicStringText").html();
        }
        if (type === "current") {
            title = "Current Employment";
            value = $(".currentText").html();
        }
        if (type === "succeed") {
            title = "Succeed";
            value = $(".succeedStringText").html();
        }
        if (type === "skills") {
            title = "Skills";
            value = $(".skillsStringText").html();
        }
        if (type === "city") {
            inputType = 'select';
            title = "Choose";
            text = "Your city!";
            inputOptions = {
                '1': 'Tbilisi'
            }
        }
        if (type === "address") {
            title = "Enter";
            text = "Your address!";
            inputType = "text";
            value = $(".addressText").html();
        }
        if (type === "phone") {
            title = "Enter";
            text = "Your phone number!";
            inputType = "text";
            value = $(".phoneText").html();
        }
        swal({
            title: title,
            text: text,
            inputValue:value,
            inputOptions: inputOptions,
            input: inputType,
            imageWidth: 400,
            imageHeight: 200,
            animation: false
        }).then(function (val) {
            if (val === "") {

                swal(
                    'Error',
                    'You need to write something',
                    'error'
                )
                return false
            }
            $.getJSON(sendUrl + type + "=" + val, function (result) {
                var text2 = "Changes saved!";
                if (text) {
                    text2 = "You changed: " + text
                }
                if (result) {
                    swal({
                        title: "Nice!",
                        text: text2,
                        type: "success"
                    }).then(
                        function () {
                            location.reload()
                        }
                    );

                }
            })
        })


    })
    $.getJSON("/usercategories", function (result) {
        for (key in result) {
            var item = result[key]
            $(".lastInfoItemrow").after('<div class="row infoRowOrder">' +
                '   <div class="col-md-4 infoLogoName noLeftPadding">' +
                '   <span class="infoTitle">' +
                '   ' + item.category.name +
                '    </span>' +

                '   </div>' +
                '   <div class="col-md-8 infoContentOrder noLeftPadding noRightPadding">' +

                '   <div class="row">' +
                '   <div class="col-xs-11 noLeftPadding academicStringText">' +
                (item.accepted ? "Confirmed" : "Please wait for confirmation") +
                '   </div>' +
                '   <div  style="text-align: right" class="col-xs-1 noRightPadding">' +
                '   <a  value="' + item.id + '" class="categoryButton">details</a>' +
                '   </div>' +

                '   </div>' +
                '   </div>' +
                '</div>')
        }
        $(".categoryButton").click(function () {
            var id = $(this).attr("value");
            loadCategory(id)

        })

    })
})
;
function loadCategory(id) {
    $.getJSON("/usercategory/" + id, function (result) {
        console.log(result);
        var ratingStars = "";
        var rating = result.rating;
        for (var i = 0; i < rating; i++) {
            ratingStars += '<img class="staricon" src="png/search/v.png">';
        }


        showModalWithTableInside(function (head, body, modal, rand) {
            head.append("<span style='font-family: brixnorm'>" + result.category.name + "</span>");

            body.append('<div class="row">' +
                '<div class="col-xs-4">Status: </div>' +
                '<div class="col-xs-8">' + (result.accepted ? "Confirmed" : "Waiting confirmation") + '</div>');

            body.append('<div class="row">' +
                '<div class="col-xs-4">Category: </div>' +
                '<div class="col-xs-4">' + result.category.name + '</div>' +
                '<div class="col-xs-4"></div>' +
                '</div>');
            body.append('<div class="row">' +
                '<div class="col-xs-4">Price: </div>' +
                '<div class="col-xs-4">' + result.price + ' GEL</div>' +
                '<div class="col-xs-4"></div>' +
                '</div>');
            body.append('<div class="row">' +
                '<div class="col-xs-4">Rating: </div>' +
                '<div class="col-xs-4">' + ratingStars + '</div>' +
                '<div class="col-xs-4"></div>' +
                '</div>');
            body.append('<div class="row">' +
                '<div class="col-xs-6"><h4>Available days: </h4></div>' +
                '<div class="col-xs-3"></div>' +
                '<div class="col-xs-3"><button class="btn myclassesbtn addDay">add</button></div>' +
                '</div>');
            body.append('<div class="row">' +
                '<div class="col-xs-6 placeForDayAdd"></div>' +
                '</div>');

            $(".modal-cancele-btn").remove();
            $(".addDay").click(function () {
                dynamicCreateForm($(".placeForDayAdd"), "/createscheduledaymy", {

                    day: {
                        name: strings["admin_label_weekday"],
                        type: "comboBox",
                        valueField: "day",
                        nameField: "name",
                        url: "/getweekdaysforcategorytoadd?user=" + 0 + "&category=" + id
                    },
                    category: {
                        type: "hidden",
                        value: "" + id
                    }
                }, function () {
                    modal.modal("hide");
                    loadCategory(id)
                })
            });
            $.getJSON("/getusercategoryscheduledays/"+id,function (result2) {
                createTable(body, {

                    day: {
                        name: "Day"
                    },
                    action: {
                        name: "#"
                    }
                }, function (table) {
                    for (key2 in result2){
                        var item2 = result2[key2];
                        table.append("<tr><td style='cursor: pointer;' value='"+item2.id+"' class='weekDayColumn'>"+item2.name+"" +
                            "</td><td style='width: 10%'><button value='"+item2.id+"' class='btn myclassesbtn removeDay'>X</button>" +
                            "</td></tr>")

                    }
                    $(".removeDay").click(function () {
                        var idSch = $(this).attr("value")
                        $.getJSON("/removeday/"+idSch,function (result) {
                            modal.modal("hide");
                            loadCategory(id)
                        })
                    })
                    $(".weekDayColumn").click(function () {
                        var dayId = $(this).attr("value");
                        loadCategoryDayHours(dayId);

                    })


                })
            });


        }, {}, 500)
    })


}


function loadCategoryDayHours(id) {

    showModalWithTableInside(function (head, body, modal, rand) {
        var createScheduleIntervalBtn = createButtonWithHandlerr(body, strings["admin_button_add"], function () {
            $("#timeIntervalChooserDiv").remove();
            $("<div id='timeIntervalChooserDiv'>" +
                '<input style="" type="time" id="fromTime" class=" floating-label" placeholder="Time"/>' +
                '<input style="" type="time" id="toTime" class=" floating-label" placeholder="Time"/>' +
                '<button style="width: 50px;height: 28px;font-size: 12px;margin-left: 10px" id="addTimeToSchedule" class="btn myclassesbtn ">' + strings["admin_button_add"] + '</button>' +
                "</div>").insertAfter(createScheduleIntervalBtn.obj);
            createScheduleIntervalBtn.obj.hide()
            var fromTime = $('#fromTime');
            var toTime = $('#toTime');

            $("#addTimeToSchedule").unbind().click(function () {

                if (toTime.val() && fromTime.val()) {

                    var timeFrom = fromTime.val().split(':');
                    var timeTo = toTime.val().split(':');

                    var dFrom = new Date();
                    var dTo = new Date();

                    dFrom.setHours(timeFrom[0]);
                    dFrom.setMinutes(timeFrom[1]);

                    dTo.setHours(timeTo[0]);
                    dTo.setMinutes(timeTo[1]);
                    if (moment(dFrom).valueOf() > moment(dTo).valueOf()) {
                        alert("Wrong Values");
                        return;
                    }

                    console.log(moment(dTo).locale("ka").format("LLLL"));
                    console.log(moment(dFrom).locale("ka").format("LLLL"));


                    $.ajax({
                        url: "createscheduletime/" + id,
                        data: {
                            from: moment(dFrom).valueOf(),
                            to: moment(dTo).valueOf()
                        }
                    }).done(function () {
                        modal.modal("hide");
                    })
                }

            })

        });
        $.getJSON("/scheduledtimes/" + id, function (result) {
            createTable(body, {
                start: {
                    name: "Start"
                },
                end: {
                    name: "End"
                }
            }, function (table) {
                for (var key in result) {
                    var currentTime = result[key];
                    table.append("<tr><td>" + currentTime.startTime + "</td><td>" + currentTime.endTime + "</td></tr>")
                }
            })
        });
    }, {}, 600)
}