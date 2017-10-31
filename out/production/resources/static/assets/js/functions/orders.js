/**
 * Created by vakhtanggelashvili on 3/25/17.
 */
var openOrderGlobal;
function loadOrders(index, search) {
    var dynamicFilters = addDynamicFilters($("#dynamicFilterRow").html(""),
        {
            type: {
                name: strings["admin_label_categories"],
                type: "comboBox",
                valueField: "id",
                nameField: "name",
                url: "/categories"
            },
            price: {
                name: strings["admin_label_price"],
                type: "text",
                operator: {
                    type: "comboBox",
                    data: {
                        1: "=",
                        2: ">",
                        3: "<"
                    }
                }
            },
            teacher: {
                name: strings["admin_label_teacher_pn"],
                type: "text"
            },
            student: {
                name: strings["admin_label_student_pn"],
                type: "text"
            }
        });
    dynamicFilters.type.change(function () {
        dataLoading();
    });
    dynamicFilters.price.change(function () {
        dataLoading();
    });
    dynamicFilters.teacher.change(function () {
        dataLoading();
    });
    dynamicFilters.student.change(function () {
        dataLoading();
    });
    $("#addNewDiv").html(
        '');
    dataLoading()
    function dataLoading() {
        $.getJSON("orders/" + index +
            "?&type=" + dynamicFilters.type.val() +
            "&price=" + dynamicFilters.price.val() +
            "&teacher=" + dynamicFilters.teacher.val() +
            "&student=" + dynamicFilters.student.val() +
            "&priceOp=" + dynamicFilters.price.operatorObj.attr("value") +
            "&search=" + search, function (result) {
            $("#dataGridHeader").html("");
            $("#dataGridBody").html("");
            $("#paginationUl").html("");
            for (i = 0; i < orderColumns.length; i++) {
                var currentElement = orderColumns[i];
                $("#dataGridHeader").append('<th style="font-family: font1;">' + currentElement + "</th>")
            }
            currentData = result;
            var dataArray = result["content"];
            var totalPages = result["totalPages"];
            var totalElements = result["totalElements"];
            for (i = 0; i < dataArray.length; i++) {
                var currentElement = dataArray[i];
                var name = "";

                var type = ""


                $("#dataGridBody").append("<tr>" +
                    "<td><input value='" + currentElement["id"] + "' class='checkboxUz' type='checkbox' /></td>" +
                    "<td style='font-family: font1;' value='" + i + "' class='gridRowClientUz2'>" + currentElement["categoryName"] + "</td>" +
                    "<td style='font-family: font1;' value='" + i + "' class=''>" +
                    "<a value='" + i + "' class='teacherLink'>" + currentElement["teacherName"] + "</a></td>" +
                    "<td style='font-family: font1;' value='" + i + "' class=''>" +
                    "<a value='" + i + "' class='studentLink'>" + currentElement["studentName"] + "</a></td>" +
                    "<td style='font-family: font1;' value='" + i + "' class='gridRowClientUz2'>" + moment(currentElement.createDate).locale("ka").format("LL") + "</td>" +
                    "<td style='font-family: font1;' value='" + i + "' class='gridRowClientUz2'>" + currentElement["orderPrice"] + "</td>" +
                    "</tr>");


            }
            var checkboxParcel = $(".checkboxParcel");
            checkboxParcel.unbind();
            checkboxParcel.change(function () {

            });
            var gridRow = $('.gridRowClientUz2');
            gridRow.css('cursor', 'pointer');
            gridRow.unbind();
            gridRow.click(function () {
                var currentItem=dataArray[$(this).attr("value")];
                openOrderGlobal(currentItem.uuid);
            });
            var teacherButton = $('.teacherLink');
            teacherButton.css('cursor', 'pointer');
            teacherButton.unbind();
            teacherButton.click(function () {
                $.getJSON("/getuser/" + dataArray[$(this).attr("value")].teacherId, function (result) {
                    openUserGlobal(result)
                })
            });
            var studentLink = $('.studentLink');
            studentLink.css('cursor', 'pointer');
            studentLink.unbind();
            studentLink.click(function () {
                $.getJSON("/getuser/" + dataArray[$(this).attr("value")].studentId, function (result) {
                    openUserGlobal(result)
                })
            });


            for (i = 0; i < totalPages; i++) {
                if (i > index - 3 && i < index + 3 || i === 0 || i === (totalPages - 1))
                    $("#paginationUl").append('<li value="' + i + '" class="paginate_button ' + (index == i ? 'active"' : '') + '"><a href="#">' + (i + 1) + '</a></li>');

            }
            $(".paginate_button").click(function () {
                //console.log($(this).val())
                currentPage = $(this).val();
                index = currentPage;
                dataLoading();


            });

        })
    }
    openOrderGlobal=function (id) {
        showModalWithTableInside(function (head, body, modal, rand) {
            $.getJSON("/order/" + id, function (result) {
                console.log(result);

                /** @namespace result.confirmed */
                /** @namespace result.canBePaid */
                body.append('<div class="row">' +
                    '<div class="col-md-4">Status: </div>' +
                    '<div class="col-md-4">'+(result.confirmed?"Paid":"Not Paid")+'</div>' +
                    '<div class="col-md-4">'+(result.canBePaid?"<button class='btn'>Pay Now</button>":"")+'</div>' +
                    '</div>');

                body.append('<div class="row">' +
                    '<div class="col-md-4">Price: </div>' +
                    '<div class="col-md-4">'+result.orderPrice+'</div>' +
                    '<div class="col-md-4"></div>' +
                    '</div>');
                body.append('<div class="row">' +
                    '<div class="col-md-4">Category: </div>' +
                    '<div class="col-md-4">'+result.categoryName+'</div>' +
                    '<div class="col-md-4"></div>' +
                    '</div>');
                body.append('<div class="row">' +
                    '<div class="col-md-4">Teacher: </div>' +
                    '<div class="col-md-4">'+result.teacherName+'</div>' +
                    '<div class="col-md-4"></div>' +
                    '</div>');
                body.append('<div class="row">' +
                    '<div class="col-md-4">Student: </div>' +
                    '<div class="col-md-4">'+result.studentName+'</div>' +
                    '<div class="col-md-4"></div>' +
                    '</div>');
                body.append('<div class="row">' +
                    '<div class="col-md-4"><h4>Ordered Times: </h4></div>' +
                    '<div class="col-md-4"></div>' +
                    '<div class="col-md-4"></div>' +
                    '</div>');
                createTable(body,{
                    date:{
                        name:"Date"
                    },
                    start:{
                        name:"From"
                    },
                    end:{
                        name:"To"
                    }
                },function (table) {
                    var data= result.bookedTimes;
                    for(var key in data){
                        var item= data[key];
                        table.append("<tr>" +
                            "<td>"+moment(item.startDate).locale("ka").format("dddd LL")+"</td>" +
                            "<td>"+moment(item.startDate).locale("ka").format("HH:mm")+"</td>" +
                            "<td>"+moment(item.endDate).locale("ka").format("HH:mm")+"</td>" +
                            "</tr>")
                    }
                })
            })
        }, {}, 500);
    }
}