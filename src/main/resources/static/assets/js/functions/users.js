/**
 * Created by kakha on 11/12/2015.
 */
var cities = {};
var currentUploadUrl = '';
var currentRefreshFunction = null;
var currentFileType = 0;
var openUserGlobal = function () {

};
function loadUsersData(index, search,forAccept) {
    $.getJSON("getusers?index=" + index + "&search=" + search+"&fora="+forAccept, function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        for (i = 0; i < userColumns.length; i++) {
            var currentElement = userColumns[i];
            $("#dataGridHeader").append("<th>" + currentElement + "</th>")

        }
        console.log(result);
        currentData = result;
        var dataArray = result["content"];
        var totalPages = result["totalPages"];
        var totalElements = result["totalElements"];
        for (i = 0; i < dataArray.length; i++) {
            var currentElement = dataArray[i];

            $("#dataGridBody").append(
                "<tr value='" + i + "' class='gridRow'><td>" + currentElement["name"] + "</td><td>"
                + currentElement["surname"] + "</td><td>"
                + currentElement["username"] + "</td><td>"
                + currentElement["personalNumber"] + "</td>" +
                "<td>" + currentElement["mobile"] + "</td></tr>"
            );

        }
        for (i = 0; i < totalPages; i++) {
            $("#paginationUl").append('<li value="' + i + '" class="paginate_button ' + (index == i ? 'active"' : '') + '"><a href="#">' + (i + 1) + '</a></li>');
        }
        $(".paginate_button").click(function () {
            //console.log($(this).val())
            loadUsersData($(this).val(), "",forAccept)
        });

        var gridRow = $('.gridRow');
        gridRow.css('cursor', 'pointer');
        gridRow.unbind();
        gridRow.click(function () {
            var currentElement = dataArray[$(this).attr("value")];
            console.log(currentElement);
            openUserGlobal(currentElement);


        });


        $("#addNewDiv").html('<button id="addNewButton" data-target="#myModal" class="btn btn-sm btn-dark">' +
            strings["admin_button_newuser"] + '</button>');
        $("#addNewButton").click(function () {
            showModalWithTableInside(function (head, body, modal) {


                dynamicCreateForm(body, "/createuser", {
                    name: {
                        name: strings["admin_label_name"],
                        type: "text"
                    },
                    surname: {
                        name: strings["admin_label_surname"],
                        type: "text"
                    },
                    city: {
                        name: strings["admin_label_city"],
                        type: "comboBox",
                        valueField: "id",
                        nameField: "name",
                        url: "/cities"
                    },
                    username: {
                        name: strings["admin_label_username"],
                        type: "text"
                    },
                    email: {
                        name: strings["admin_label_email"],
                        type: "text"
                    },
                    password: {
                        name: strings["admin_label_password"],
                        type: "text"
                    },
                    personalNumber: {
                        name: strings["admin_label_personal_number"],
                        type: "text"
                    },
                    mobile: {
                        name: strings["admin_label_phone"],
                        type: "text"
                    },
                    address: {
                        name: strings["admin_label_address"],
                        type: "text"
                    }
                }, function () {
                    modal.modal("hide");
                    loadUsersData(index, search,forAccept);
                })
            })
        })
    });
    openUserGlobal = function (currentElement) {
        showModalWithTableInside(function (head, body, modal, rand) {
            body.html(clientProfileTemplate);
            var documents = $("#tab5_1");
            var permissions = $("#tab5_2");
            var lessons = $("#tab5_3");
            var categories = $("#tab5_4")
            var actions = $("#tab6_1");
            var infoDiv = $("#tab6_2");
            var DOMElements = {
                documents: documents,
                permissions: permissions,
                lessons: lessons,
                categories: categories,
                actions: actions,
                infoDiv: infoDiv,
                modal: modal,
                rand: rand,
                currentElement: currentElement
            };
            drawInfoForUser(DOMElements);

            drawCategories(DOMElements, currentElement);

            openDocuments(DOMElements, documents, currentElement);

            drawLessons(DOMElements);

            drawActionsPanel(DOMElements);


            permissions.append('<div style="display:inline-flex;width: 100%">' +
                '    <div style="width: 45%">' +
                '        <table class="table">' +
                '            <thead>' +
                '            <tr>' +
                '                <th class="text-left">' + strings['admin_label_user_permissions'] + '</th>' +
                '            </tr>' +
                '            </thead>' +
                '            <tbody id="userpermissions">' +
                '            </tbody>' +
                '        </table>' +
                '    </div>' +
                '    <div style="width:10%">' +
                '        <button style="width: 100%" id="removePermission">-></button>' +
                '        <br>' +
                '        <button style="width: 100%" id="addPermissions"><-</button>' +
                '    </div>' +
                '    <div style="width: 45%">' +
                '        <table class="table">' +
                '            <thead>' +
                '            <tr>' +
                '                <th class="text-left">' + strings['admin_label_permissions_to_add'] + '</th>' +
                '            </tr>' +
                '            </thead>' +
                '            <tbody id="notuserspermissions">' +
                '            </tbody>' +
                '        </table>' +
                '    </div>' +
                '</div>');

            drawPermsForAdding(currentElement.id);

            var addPerms = $("#addPermissions");
            addPerms.unbind();
            addPerms.click(function () {
                var checkboxPerm = $(".checkboxPerm");
                var productIds = [];
                checkboxPerm.each(function () {
                    if (this.checked) {
                        productIds.push(this.value);
                        this.checked = false;
                    }
                });
                $.ajax({
                    url: "/giveuserpermission",
                    data: {
                        id: currentElement["id"],
                        ids: productIds.toString()
                    }
                }).done(function (result) {
                    drawPermsForAdding(currentElement["id"]);
                })
            });

            var removePerms = $("#removePermission");
            removePerms.unbind();
            removePerms.click(function () {
                var checkboxPerm = $(".checkboxUserPerm");
                var productIds = [];
                checkboxPerm.each(function () {
                    if (this.checked) {
                        productIds.push(this.value);
                        this.checked = false;
                    }
                });
                $.ajax({
                    url: "/removeuserpermission",
                    data: {
                        id: currentElement["id"],
                        ids: productIds.toString()
                    }
                }).done(function (result) {
                    drawPermsForAdding(currentElement["id"]);
                })
            })
        }, {
            "დამატებითი ღილაკი": function () {
            }
        }, 1024);
    };


    function drawActionsPanel(DOMElements) {
        DOMElements.actions.append("<button id='infoDataBtn'>Info Data</button>")
        $("#infoDataBtn").click(function () {
            showModalWithTableInside(function (head, body, modal, rand) {
                body.append("<button id='addInfoData'>add info</button>");

                $("#addInfoData").click(function () {
                    showModalWithTableInside(function (head, body, modal, rand) {
                        dynamicCreateForm(body,"addinfotouser",
                            {

                                type: {
                                    type: "comboBox",
                                    valueField: "id",
                                    nameField: "name",
                                    name: "Type",
                                    data: [
                                        {id: "0", name: "Academic Credentials"},
                                        {id: "1", name: "Employment"},
                                        {id: "2", name: "Succeed"},
                                        {id: "3", name: "Skills"},
                                        {id: "4", name: "Attachment"}
                                    ]
                                },
                                value: {
                                    name: "Value",
                                    type: "text"
                                },
                                userId: {
                                    type: "hidden",
                                    value: "" + DOMElements.currentElement.id
                                }
                            }, function () {
                                modal.modal("hide");
                        })
                    },{},500)
                });
                $.getJSON("/getuserinforecords/" + DOMElements.currentElement.id, function (result) {
                    createTable(body, {
                        type: {name: "Type"},
                        value: {name: "Value"}
                    }, function (table) {
                        for (key in result) {
                            var item = result[key];

                            table.append("<tr>" +
                                "<td>" +
                                    infoTypes[item.type]+
                                "</td>" +
                                "<td>" +
                                    item.value+
                                "</td>" +
                                "</tr>")


                        }
                    })
                })
            }, {}, 600)
        })
    }

    function drawLessons(DOMElements) {
        DOMElements.lessons.html("<div id='callAllLessons'></div>")
        $.getJSON("getscheduledtimeforuser/" + DOMElements.currentElement.id + "/60", function (result) {
            var callData = [];
            for (var key in result) {
                var item = result[key];
                callData.push({
                    start: moment(item.startDate),
                    end: moment(item.endDate).toDate(),
                    title: item.categoryName
                })
            }
            $('#callAllLessons').fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'agendaDay,listMonth'
                },
                defaultView: "listMonth",
                height: 650,
                minTime: "08:00:00",
                editable: false,
                eventLimit: true, // allow "more" link when too many events
                events: callData
            });
            $("#tab5_3link").click(function () {
                setTimeout(function () {
                    $('#callAllLessons').fullCalendar('render');
                }, 400);

            });
        })
    }

    function drawCategories(DOMElements, currentElement) {

        DOMElements.categories.append('<div id="categoryPageActions" class="row">' +
            '</div>');
        createTable(DOMElements.categories, {
            category: {
                name: strings["admin_label_category"]
            },
            duration: {
                name: strings["admin_label_duration"]
            },
            price: {
                name: strings["admin_label_price"]
            }
        }, function (table) {
            DOMElements.CategoriesDataTableBody = table;
            loadCategiries(DOMElements, currentElement);
            createButtonWithHandlerr($("#categoryPageActions"), strings['admin_button_add_category'], function () {
                showModalWithTableInside(function (head, body, modal, rand) {
                    dynamicCreateForm(body, "/addcategorytouser", {
                        category: {
                            name: strings["admin_label_category"],
                            type: "comboBox",
                            valueField: "id",
                            nameField: "name",
                            url: "/getcategoriesforuseradding/" + currentElement.id
                        },
                        price: {
                            name: strings["admin_label_price"],
                            type: "number"
                        },
                        duration: {
                            name: strings["admin_label_duration"],
                            type: "number"
                        },
                        user: {
                            type: "hidden",
                            value: "" + currentElement.id
                        }

                    }, function () {
                        loadCategiries(DOMElements, currentElement);
                        modal.modal("hide")
                    })
                }, {}, 600)
            })
        });


    }

    function loadCategiries(DOMElements, currentElement) {
        DOMElements.CategoriesDataTableBody.html("");
        console.log(currentElement);
        $.getJSON("usercategories/" + currentElement.id, function (result) {
            for (var key in result) {
                var item = result[key];
                DOMElements.CategoriesDataTableBody.append("<tr value='" + key + "' class='categoryItem " + (item.accepted ? "" : "danger") + "'>" +
                    "<td>" +
                    item.category.name +
                    "</td>" +
                    "<td>" +
                    item.duration +
                    " წთ.</td>" +
                    "<td>" +
                    item.price +
                    "</td>" +
                    "</tr>")
            }
            var categoryItem = $('.categoryItem');
            categoryItem.css('cursor', 'pointer');
            categoryItem.unbind();
            categoryItem.click(function () {
                var currentCategory = result[$(this).attr("value")];
                console.log(currentCategory);
                showModalWithTableInside(function (head, body, modal, rand) {
                    body.html(clientCategoryPageTemplate);
                    DOMElements.categoryPageDom = {
                        schedules: $("#tab10_1"),
                        lessons: $("#tab10_2"),
                        actions: $("#tab10_3"),
                        freeSchedule: $("#tab10_4"),
                        currentCategory: currentCategory,
                        modal: modal
                    };
                    /** @namespace currentCategory.accepted */
                    if (!currentCategory.accepted) {
                        showTeacherAcceptMenu(DOMElements)
                    }
                    loadCategorySchedules(DOMElements);
                    loadFreeSchedule(DOMElements);
                    loadScheduledLessons(DOMElements);
                }, {}, 1000)
            })
        })
    }

    function loadScheduledLessons(DOMElements) {
        DOMElements.categoryPageDom.lessons.html("");
        createButtonWithHandlerr(DOMElements.categoryPageDom.lessons, strings["admin_button_book_lesson"], function () {
            showModalWithTableInside(function (head, body, modal, rand) {
                body.append("<div id='callForBooking'></div>" +
                    "<div id='chosenDatesTable' class='row'></div>");
                $.getJSON("schedulefordays/" + DOMElements.categoryPageDom.currentCategory.id + "/30", function (result) {


                    DOMElements.booking = {
                        bookData: {
                            dates: {}
                        },
                        chosenDiv: $("#chosenDatesTable"),
                        modal: modal
                    };

                    var callData = [];
                    for (var key in result) {
                        var item = result[key];
                        callData.push({
                            start: moment(item.starting_time),
                            end: moment(item.ending_time).toDate()
                        })
                    }
                    $('#callForBooking').fullCalendar({
                        header: {
                            left: 'prev,next today',
                            center: 'title',
                            right: 'agendaWeek,month'
                        },
                        minTime: "08:00:00",
                        defaultView: "agendaWeek",
                        height: 600,
                        editable: false,
                        eventLimit: false, // allow "more" link when too many events
                        events: callData,
                        eventClick: function (calEvent, jsEvent, view) {
                            console.log(calEvent);
                            if (DOMElements.booking.bookData.dates[calEvent.start._i])
                                this.clicked = true;
                            var item = this;
                            DOMElements.booking.bookData.dates[calEvent.start._i] = {
                                item: item,
                                start: calEvent.start._i,
                                end: calEvent.end._i
                            };
                            console.log(DOMElements);
                            drawChosenDatesTable(DOMElements);

                        }
                    });
                    $('#callForBooking').fullCalendar('render');
                    drawChosenDatesTable(DOMElements);
                })
            }, {}, 1024);
        });
        DOMElements.categoryPageDom.lessons.append("<div id='bookedCall'></div>");
        $.getJSON("getscheduledtimeforlesson/" + DOMElements.currentElement.id + "/" +
            DOMElements.categoryPageDom.currentCategory.id + "/60", function (result) {
            var callData = [];
            for (var key in result) {
                var item = result[key];
                callData.push({
                    start: moment(item.startDate),
                    end: moment(item.endDate).toDate(),
                    title: item.categoryName
                })
            }
            $('#bookedCall').fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'agendaWeek,agendaDay,listMonth'
                },
                defaultView: "agendaWeek",
                height: 650,
                minTime: "08:00:00",
                editable: false,
                eventLimit: true, // allow "more" link when too many events
                events: callData
            });
            $("#tab10_2link").click(function () {
                setTimeout(function () {
                    $('#bookedCall').fullCalendar('render');
                }, 400);

            });
        })
    }

    function drawChosenDatesTable(DOMElements) {
        DOMElements.booking.chosenDiv.html("");
        createTable(DOMElements.booking.chosenDiv, {
            date: {
                name: strings["admin_label_date"]
            },
            start: {
                name: strings["admin_label_start_time"]
            },
            end: {
                name: strings["admin_label_end_time"]
            },
            price: {
                name: strings["admin_label_price"]
            },
            buttons: {
                name: "#"
            }
        }, function (table) {
            var times = [];
            var keys = Object.keys(DOMElements.booking.bookData.dates),
                i, len = keys.length;

            keys.sort();

            for (i = 0; i < len; i++) {
                var k = keys[i];
                var item = DOMElements.booking.bookData.dates[k];
                times.push(item.start);
                table.append("<tr>" +
                    "<td>" + moment(item.start).locale("ka").format("dddd LL") + "</td>" +
                    "<td>" + moment(item.start).locale("ka").format("HH:mm") + "</td>" +
                    "<td>" + moment(item.end).locale("ka").format("HH:mm") + "</td>" +
                    "<td>" + DOMElements.categoryPageDom.currentCategory.price + " ₾</td>" +
                    "<td><a value='" + k + "' class='removeDateFromBooking' href='#'><i class='fa fa-remove'></i></a></td>" +
                    "</tr>")
            }
            table.append("<tr>" +
                "<td></td>" +
                "<td></td>" +
                "<td>" + strings["admin_label_sum"] + ":</td>" +
                "<td>" + (parseFloat(DOMElements.categoryPageDom.currentCategory.price) * parseFloat(len)) + " ₾</td>" +
                "<td><button id='bookBtn' class='btn btn-primary'>" + strings["admin_button_book"] + "</button></td>" +
                "</tr>")
            $(".removeDateFromBooking").click(function () {
                delete DOMElements.booking.bookData.dates[$(this).attr("value")]
                drawChosenDatesTable(DOMElements);
            })
            $("#bookBtn").unbind().click(function () {
                $.ajax({
                    url: "/bookforuser/2/" + DOMElements.categoryPageDom.currentCategory.id,
                    data: {
                        times: times.toString()
                    }
                }).done(function (result) {
                    if (result.code == 100) {
                        DOMElements.booking.modal.modal("hide");
                        loadCategorySchedules(DOMElements);
                        loadFreeSchedule(DOMElements);
                        loadScheduledLessons(DOMElements);
                        openOrderGlobal(result.message, DOMElements);
                    } else {
                        alert("მოხდა შეცდომა დაუკავშირდით ადმინისტრაციას!")
                    }

                })
            })

        })
    }

    function openOrderPage(DOMElements, orderid) {

    }

    function loadFreeSchedule(DOMElements) {
        DOMElements.categoryPageDom.freeSchedule.html("");
        DOMElements.categoryPageDom.freeSchedule.append("<div id='call'></div>");


        $.getJSON("schedulefordays/" + DOMElements.categoryPageDom.currentCategory.id + "/30", function (result) {

            DOMElements.categoryPageDom.freeSchedule.append("<div id='timeChart'></div>")
            var callData = [];
            for (var key in result) {
                var item = result[key];
                callData.push({
                    start: moment(item.starting_time),
                    end: moment(item.ending_time).toDate()
                })
            }
            $('#call').fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'agendaWeek,agendaDay,listMonth'
                },
                defaultView: "agendaWeek",
                height: 650,
                minTime: "08:00:00",
                editable: false,
                eventLimit: false, // allow "more" link when too many events
                events: callData
            });
            $("#tab10_4link").click(function () {
                setTimeout(function () {
                    $('#call').fullCalendar('render');
                }, 400);

            });
        })
    }

    function showTeacherAcceptMenu(DOMElements) {
        DOMElements.categoryPageDom.actions.html("");


        var decline = createButtonWithHandlerr(DOMElements.categoryPageDom.actions, "უარყოფა", function () {
            $.getJSON("usercategoryconfirm/" + DOMElements.categoryPageDom.currentCategory.id + "/2", function (result) {
                DOMElements.categoryPageDom.modal.modal("hide")
                loadCategiries(DOMElements, DOMElements.currentElement)
            })
        });
        var agree = createButtonWithHandlerr(DOMElements.categoryPageDom.actions, "დადასტურება", function () {
            $.getJSON("usercategoryconfirm/" + DOMElements.categoryPageDom.currentCategory.id + "/1", function (result) {
                DOMElements.categoryPageDom.modal.modal("hide")
                loadCategiries(DOMElements, DOMElements.currentElement)
            })
        });
        decline.obj.addClass("btn-danger");
        agree.obj.addClass("btn-success");


        $.getJSON("listusercatdocs/" + DOMElements.categoryPageDom.currentCategory.id, function (result) {
            console.log(result);
            createTable(DOMElements.categoryPageDom.actions,
                {
                    name: {
                        name: "დოკუმენტი"
                    },
                    action: {
                        name: "#"
                    }
                }, function (tableBody) {

                    for (var key in result) {
                        var currentDoc = result[key];
                        tableBody.append("<tr>" +
                            "<td>" + currentDoc.type + "</td>" +
                            "<td><a href='doc/" + currentDoc.id + "'><i class='fa fa-download'></i></a></td>" +
                            "</tr>")
                    }
                });

        })
    }

    function loadCategorySchedules(DOMElements) {
        DOMElements.categoryPageDom.schedules.html("");
        var btn = createButtonWithHandlerr(DOMElements.categoryPageDom.schedules, strings["admin_button_add"], function () {
            $("#addDayFormDiv").remove();
            $("<div id='addDayFormDiv'></div>").insertAfter(btn.obj);
            dynamicCreateForm($("#addDayFormDiv"), "/createscheduleday", {

                day: {
                    name: strings["admin_label_weekday"],
                    type: "comboBox",
                    valueField: "day",
                    nameField: "name",
                    url: "/getweekdaysforcategorytoadd?user=" + DOMElements.currentElement.id + "&category=" + DOMElements.categoryPageDom.currentCategory.id
                },
                user: {
                    type: "hidden",
                    value: "" + DOMElements.currentElement.id
                },
                category: {
                    type: "hidden",
                    value: "" + DOMElements.categoryPageDom.currentCategory.id
                }
            }, function () {
                loadCategorySchedules(DOMElements)
            })
        });
        createTable(DOMElements.categoryPageDom.schedules,
            {
                name: {
                    name: strings["admin_label_day"]
                },
                workTime: {
                    name: strings["admin_label_work_hours"]
                },
                actions: {
                    name: "#"
                }
            }, function (tableBody) {
                $.getJSON("getusercategoryscheduledays/" + DOMElements.categoryPageDom.currentCategory.id, function (result) {
                    for (var key in result) {
                        var item = result[key];
                        /** @namespace item.workHours */
                        tableBody.append("<tr value='" + item.id + "' class='schedule-row'>" +
                            "<td>" +
                            item.name +
                            "</td>" +
                            "<td>" +
                            item.workHours +
                            "</td>" +
                            "</tr>")
                    }
                    var row = $('.schedule-row');
                    row.css('cursor', 'pointer');
                    row.unbind();
                    row.click(function () {
                        var scheduleDayId = $(this).attr("value");
                        DOMElements.categories.schedule = {};
                        DOMElements.categories.schedule.id = scheduleDayId;
                        loadCategoryDayHours(DOMElements)
                    });
                })
            });
    }

    function loadCategoryDayHours(DOMElements) {

        showModalWithTableInside(function (head, body, modal, rand) {
            var createScheduleIntervalBtn = createButtonWithHandlerr(body, strings["admin_button_add"], function () {
                $("#timeIntervalChooserDiv").remove();
                $("<div id='timeIntervalChooserDiv'>" +
                    '<input style="" type="time" id="fromTime" class=" floating-label" placeholder="Time"/>' +
                    '<input style="" type="time" id="toTime" class=" floating-label" placeholder="Time"/>' +
                    '<button id="addTimeToSchedule" class="btn btn-primary">' + strings["admin_button_add"] + '</button>' +
                    "</div>").insertAfter(createScheduleIntervalBtn.obj);
                var fromTime = $('#fromTime').bootstrapMaterialDatePicker
                ({
                    date: false,
                    shortTime: false,
                    format: 'HH:mm'
                });
                var toTime = $('#toTime').bootstrapMaterialDatePicker
                ({
                    date: false,
                    shortTime: false,
                    format: 'HH:mm'
                });
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
                            url: "createscheduletime/" + DOMElements.categories.schedule.id,
                            data: {
                                from: moment(dFrom).valueOf(),
                                to: moment(dTo).valueOf()
                            }
                        }).done(function () {
                            modal.modal("hide");
                            loadCategoryDayHours(DOMElements);
                            loadCategorySchedules(DOMElements);
                            loadFreeSchedule(DOMElements);
                        })
                    }

                })

            });
            $.getJSON("/scheduledtimes/" + DOMElements.categories.schedule.id, function (result) {
                createTable(body, {
                    start: {
                        name: "დასაწყისი"
                    },
                    end: {
                        name: "დასასრული"
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

    function drawPermsForAdding(id) {
        $.getJSON("/getuserpermissions/" + id, function (result) {
            var userPermTable = $("#userpermissions");
            userPermTable.html("");
            for (var key in result) {
                userPermTable.append("<tr><td><input class='checkboxUserPerm' value='" + result[key].id + "' type='checkbox'> " + result[key].name + "</td></tr>")
            }
        });
        $.getJSON("/getnotuserpermissions/" + id, function (result) {
            var notUserPermTable = $("#notuserspermissions");
            notUserPermTable.html("");
            for (var key in result) {
                notUserPermTable.append("<tr><td><input class='checkboxPerm' value='" + result[key].id + "' type='checkbox'> " + result[key].name + "</td></tr>")
            }
        });
    }

    function openDocuments(DOMElements, documents, currentElement) {
        currentFileType = 1;
        documents.append(
            '<input type="file" id="docFile" style="display:none">');
        documents.append(filemanager);

        function maximizeWindow() {
            var newWid = $(document).width();
            var newHit = $(document).height();
            $('.doc-browser').css('margin-top', '0px');
            $('.doc-browser').animate({
                width: newWid,
                height: newHit,
                top: 0,
                left: 0
            });
            $('.sidebar-folder-list').animate({
                height: (newHit - 35) + 'px'
            })
            $('.main-content-view').animate({
                width: newWid - $('.sidebar-folder-list').width(),
                height: (newHit - 25) + 'px'
            })
        }

        function minimizeWindow() {
            var newWid = 900;
            var newHit = 900;
            var center = $(document).width() / 2 - newWid / 2;
            $('.doc-browser').animate({
                width: 900,
                height: 900,
                top: '10%',
                left: center
            });
            $('.sidebar-folder-list').animate({
                height: newHit - 35
            });
            $('.main-content-view').animate({
                width: newWid - $('.sidebar-folder-list').width(),
                height: newHit - 25
            });
        }

        function centerElementAbsolute(elem) {
            var center = $(document).width() / 2 - $(elem).width() / 2;
            $(elem).css('left', center);
        }


        $(document).ready(function () {

            centerElementAbsolute('.doc-browser')

            // Color variables for sidebar list items
            var listNorm = '#CACDD1';
            var listSel = '#ADB0B2';

            // Give the "Documents" item an initial selected color
            $('#docs').css({'background-color': listSel});

            /* List Item Click
             *
             * Change all list items back to the normal color, then
             * give the clicked list item the selected color.
             *
             * Hide the currently shown content, then show
             * the content for the selected item
             */
            $('.folder-list-item').click(function () {

                // Iterate items, give all normal color
                $('.folder-list-item').each(function () {
                    $(this).css({'background-color': listNorm});
                });
                // Then give the selected item the selected color
                $(this).css({'background-color': listSel});

                // Iterate all content and hide each
                $('.main-content-view').each(function () {
                    $(this).hide();
                });

                // Figure out which content to display and display it
                if ($(this).attr('id') == 'docs') {
                    $('#docs-content').fadeIn(500);
                    currentFileType = 1;
                    loadDocumentsForUser(DOMElements, currentElement.id, 0);
                } else if ($(this).attr('id') == 'projects') {
                    $('#projects-content').fadeIn(500);
                    loadCategoriesForDocs(DOMElements, currentElement.id);
                } else if ($(this).attr('id') == 'samples') {
                    $('#samples-content').fadeIn(500);

                } else if ($(this).attr('id') == 'about-me') {
                    $('#about-content').fadeIn(500);
                    currentFileType = 3;
                    loadGalleryForUser(DOMElements, currentElement.id, 0);
                }
            });


        });

        DOMElements.fileManager = {};
        DOMElements.fileManager.docs = $("#docs-content");
        DOMElements.fileManager.categories = $("#projects-content");
        DOMElements.fileManager.galery = $("#about-content");


        $("#uploadDoc").click(function () {
            $("#docFile").click();
        });
        $("#docFile").change(function () {
            var obj = this;
            var sendData = [];
            if (currentFileType === 1) {
                showModalWithTableInside(function (head, body, modal, rand) {

                    dynamicCreateToArray(body, sendData, {

                        category: {
                            name: strings["admin_label_category"],
                            type: "comboBox",
                            valueField: "id",
                            nameField: "name",
                            url: "/usercategoriescats/" + currentElement.id
                        },
                        docType: {
                            name: strings["admin_label_category"],
                            type: "comboBox",
                            valueField: "id",
                            nameField: "name",
                            url: "/doctypes/"
                        },
                    }, function () {
                        console.log(sendData);

                        uploadFileToUrl(obj,
                            'upload/' + currentElement.id + "?category=" + sendData[0].category + "&docType=" + sendData[0].docType,
                            function () {
                                loadDocumentsForUser(DOMElements, currentElement.id, 0)
                            })

                        modal.modal("hide");
                    }, function () {

                    }, function () {

                    });

                }, {}, 400)
            }


            if (currentFileType === 3) {
                uploadFileToUrl(obj, 'uploadGalleryPic/' + currentElement.id, function () {
                    loadGalleryForUser(DOMElements, currentElement.id, 0);
                });
            }
            function uploadFileToUrl(obj, url, callback) {
                var formData = new FormData();
                var xhr = new XMLHttpRequest();

                for (var i = 0; i < obj.files.length; i++) {
                    //TODO Append in php files array
                    formData.append('file', obj.files[i]);
                    console.log('Looping trough passed data', obj.files[i]);
                }

                //On successful upload response, parse JSON data
                //TODO handle response from php server script
                xhr.onload = function () {
                    var data = JSON.parse(this.responseText);
                    callback();
                };

                //Open an AJAX post request
                xhr.open('post', url);
                xhr.send(formData);
            }
        });
        dropBoxFuncUserDocs('promptModal' + DOMElements.rand, 'upload/' + currentElement.id, function () {
            loadDocumentsForUser(DOMElements, currentElement.id, 0)
        }, currentElement.id);
        loadDocumentsForUser(DOMElements, currentElement.id, 0);
        loadGalleryForUser(DOMElements, currentElement.id, 0);
        loadCategoriesForDocs(DOMElements, currentElement.id);

    }

    function loadCategoriesForDocs(DOMElements, id) {
        $("#goBackBtn").remove();
        $.getJSON("usercategories/" + id, function (result) {
            DOMElements.fileManager.categories.html("");
            var dataArray = result;
            for (var i = 0; i < dataArray.length; i++) {
                var currentElement = dataArray[i];
                var itemLogos = "";
                var logo = 'fa-folder';


                DOMElements.fileManager.categories.append('<div value="' + currentElement.id + '" class="cat-item content-item">' +
                    '<div class="content-icon">' +
                    '   <i class="fa ' + logo + ' fa-3x"></i>' +
                    '   </div>' +
                    '   <div title="' + currentElement.category.name + '" class="content-description">' +
                    currentElement.category.name +
                    '   </div>' +
                    '   </div>');
            }
            $('.cat-item').dblclick(function () {
                loadCategoryDocsInFileManager(DOMElements, $(this).attr("value"), id);
            });
            $('.cat-item').draggable({
                handle: '.content-icon',
                opacity: 0.9,
                revert: true, helper: "clone",
                containment: 'document'
            });


        })
    }

    function loadCategoryDocsInFileManager(DOMElements, id, parentId) {
        $.getJSON("listusercatdocs/" + id, function (result) {
            DOMElements.fileManager.categories.html("");
            var dataArray = result;
            $(".window-bar").append('<div id="goBackBtn" style="background-color: grey" class="w-max w-btn"><</div>');
            $("#goBackBtn").unbind().click(function () {
                loadCategoriesForDocs(DOMElements, parentId)
            });
            for (var i = 0; i < dataArray.length; i++) {
                var currentElement = dataArray[i];

                var logo = 'fa-file';
                switch (currentElement.extension) {
                    case 'image/jpeg':
                        logo = 'fa-file-image-o';
                        break;
                    case 'application/pdf':
                        logo = 'fa-file-pdf-o';
                        break;
                    case 'application/vnd.ms-excel':
                    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                        logo = 'fa-file-excel-o';
                        break;
                    case 'application/zip':
                    case 'application/x-zip-compressed':
                        logo = 'fa-file-archive-o';
                        break;
                    case 'text/plain':
                        logo = 'fa-file-text-o';
                        break;
                    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                    case 'application/msword':
                        logo = 'fa-file-word-o';
                        break;
                    case 'application/vnd.ms-powerpoint':
                        logo = 'fa-file-text-o';
                        break;
                    case 'video/quicktime':
                    case 'video/mpeg':
                    case 'video/x-ms-wmv':
                    case 'video/mp4':
                        logo = 'fa-file-video-o';
                        break;

                }


                DOMElements.fileManager.categories.append('<div value="' + currentElement.id + '" class="cat-doc-item content-item">' +
                    '<div class="content-icon">' +
                    '   <i class="fa ' + logo + ' fa-3x"></i>' +
                    '   </div>' +
                    '   <div title="' + currentElement.name + '" class="content-description">' +
                    currentElement.type +
                    '   </div>' +
                    '   </div>');
                $('.cat-doc-item').dblclick(function () {
                    var ifrm = document.getElementById("frame1");
                    ifrm.src = "doc/" + $(this).attr("value");
                });
                $('.cat-doc-item').draggable({
                    handle: '.content-icon',
                    opacity: 0.9,
                    revert: true, helper: "clone",
                    containment: 'document'
                });
            }
        })
    }


    function loadGalleryForUser(DOMElements, id, page) {
        $("#goBackBtn").remove();
        $.getJSON("listgallery/" + id + "/" + page, function (result) {
            DOMElements.fileManager.galery.html("");
            var dataArray = result["content"];
            var totalPages = result["totalPages"];
            var totalElements = result["totalElements"];
            for (var i = 0; i < dataArray.length; i++) {
                var currentElement = dataArray[i];
                var itemLogos = "";
                var showName = currentElement.name;
                if (currentElement.name.length > 11) {
                    showName = currentElement.name.substring(0, 11);
                }
                var logo = 'fa-file';


                DOMElements.fileManager.galery.append(
                    '<div style="background-image: url(userpicturelogo/' + currentElement.name + '?' + new Date().getTime() + ');' +
                    'background-size:     cover;' +
                    'background-repeat:   no-repeat;' +
                    'background-position: center center;' +
                    '" value="' + i + '" class="content-item gallery-item">' +
                    '<div  class="content-icon">' +
                    '  ' +
                    '   </div>' +
                    '   </div>');
            }
            $('.gallery-item').dblclick(function () {
                var currentPic = dataArray[$(this).attr("value")];
                showModalWithTableInside(function (head, body, modal, rand) {
                    head.html("<h2>ფოტო გალერეა</h2>")
                    body.html("<img style='width: 100%' src='userpicture/" + currentPic.name + "?" + new Date().getTime() + "'/>")
                }, {}, 600);
            });
            $('.gallery-item').draggable({
                handle: '.content-icon',
                opacity: 0.9,
                revert: true, helper: "clone",
                containment: 'document'
            });


        })

    }

    function loadDocumentsForUser(DOMElements, id, page) {
        $("#goBackBtn").remove();
        $.getJSON("listdocs/" + id + "?page=" + page, function (result) {
            DOMElements.fileManager.docs.html("");
            var dataArray = result["content"];
            var totalPages = result["totalPages"];
            var totalElements = result["totalElements"];
            for (var i = 0; i < dataArray.length; i++) {
                var currentElement = dataArray[i];
                var showName = currentElement.name;
                if (currentElement.name.length > 11) {
                    showName = currentElement.name.substring(0, 11);
                }
                var logo = 'fa-file';
                switch (currentElement.extension) {
                    case 'image/jpeg':
                        logo = 'fa-file-image-o';
                        break;
                    case 'application/pdf':
                        logo = 'fa-file-pdf-o';
                        break;
                    case 'application/vnd.ms-excel':
                    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                        logo = 'fa-file-excel-o';
                        break;
                    case 'application/zip':
                    case 'application/x-zip-compressed':
                        logo = 'fa-file-archive-o';
                        break;
                    case 'text/plain':
                        logo = 'fa-file-text-o';
                        break;
                    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                    case 'application/msword':
                        logo = 'fa-file-word-o';
                        break;
                    case 'application/vnd.ms-powerpoint':
                        logo = 'fa-file-text-o';
                        break;
                    case 'video/quicktime':
                    case 'video/mpeg':
                    case 'video/x-ms-wmv':
                    case 'video/mp4':
                        logo = 'fa-file-video-o';
                        break;

                }


                DOMElements.fileManager.docs.append('<div value="' + currentElement.id + '" class="doc-item content-item">' +
                    '<div class="content-icon">' +
                    '   <i class="fa ' + logo + ' fa-3x"></i>' +
                    '   </div>' +
                    '   <div title="' + currentElement.name + '" class="content-description">' +
                    showName +
                    '   </div>' +
                    '   </div>');
            }
            $('.doc-item').dblclick(function () {
                var ifrm = document.getElementById("frame1");
                ifrm.src = "doc/" + $(this).attr("value");
            });
            $('.doc-item').draggable({
                handle: '.content-icon',
                opacity: 0.9,
                revert: true, helper: "clone",
                containment: 'document'
            });


        })
    }

    function dropBoxFuncUserDocs(id, url, callback, userId) {
        // Global variables
        var dropbox = document.getElementById(id);
        var uploadDest = url;
        var maxFiles = 2;
        //var allowedFiles = /(.*?)\.(jpeg|jpg|gif|png|pdf)$/;
        //TODO Create maxFiles var

        //TODO Limit file extensions

        //TODO create a function that displays uploded files in our html!!!
        function displayFiles() {

        }

        // AJAX function for file uploads
        function uploadFiles(files, data) {
            //FormData supports IE 10+ TODO falback
            var formData = new FormData();
            var xhr = new XMLHttpRequest();

            for (var i = 0; i < files.length; i++) {
                //TODO Append in php files array
                formData.append('file', files[i]);
                console.log('Looping trough passed data', files[i]);
            }

            //On successful upload response, parse JSON data
            //TODO handle response from php server script
            xhr.onload = function () {
                var data = JSON.parse(this.responseText);
                callback();
            };

            //Open an AJAX post request
            xhr.open('post', uploadDest + "?category=" + data.category + "&docType=" + data.docType);
            xhr.send(formData);
        }

        //Style dropbox on this event
        dropbox.ondragover = function () {
            //this.className = 'dropbox dragover';
            return false;
        }
        //Style dropbox on this event
        dropbox.ondragleave = function () {
            //this.className = 'dropbox';
            return false;
        }

        // Call uploadFiles function with arguments
        dropbox.ondrop = function (e) {
            //Prevent default browser behaviour
            e.preventDefault();
            var g = e.dataTransfer.files;
            //this.className = 'dropbox';
            console.log(e.dataTransfer.files);
            var sendData = [];
            showModalWithTableInside(function (head, body, modal, rand) {
                dynamicCreateToArray(body, sendData, {

                    category: {
                        name: strings["admin_label_category"],
                        type: "comboBox",
                        valueField: "id",
                        nameField: "name",
                        url: "/usercategoriescats/" + userId
                    },
                    docType: {
                        name: strings["admin_label_category"],
                        type: "comboBox",
                        valueField: "id",
                        nameField: "name",
                        url: "/doctypes/"
                    },
                }, function () {
                    console.log(sendData);
                    console.log(g);
                    uploadFiles(g, sendData[0]);
                    modal.modal("hide");
                }, function () {

                }, function () {

                });

            }, {}, 400)
        }
    }

    function drawInfoForUser(DOMElements) {
        DOMElements.infoDiv.html("");
        DOMElements.infoDiv.append(
            "<div id='categoryLogoDiv' class='row'>" +
            "<div class='col-md-2'></div>" +
            "<div class='col-md-2'>" +
            "<img id='profilePicBtn' style='width: 150px;cursor: pointer' src='profilePic/" + DOMElements.currentElement.id + "?" + new Date().getTime() + "'/>" +
            '<input type="file" id="profilePick" style="display:none">' +
            "</div>" +
            "</div>");
        $("#profilePicBtn").click(function () {
            $("#profilePick").click();
        });
        $("#profilePick").change(function (e) {
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
                drawInfoForUser(DOMElements);
            };

            //Open an AJAX post request
            xhr.open('post', "uploadProfilePic/" + DOMElements.currentElement.id);
            xhr.send(formData);
        })
        DOMElements.infoDiv.append(
            "<div class='row'>" +
            "<div>" +
            "</div>"
        )
    }


}

function loadTeacherRequests() {
    $.getJSON("",function (result) {

    })
}