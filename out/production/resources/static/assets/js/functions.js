/**
 * Created by KGelashvili on 10/26/2015.
 */


var currentFunction;
var datarowSlide = false;
var dashRow = false;
var currentPage = 1;
var permissions = {};
$.getJSON("/getsessionstatus", function (result) {
    if (!result["isactive"]) {
        eraseCookie("projectSessionId");
        window.location.href = "/";
    }
});
$(document).ready(function () {
    $.getJSON("/getpermissions", function (result) {
        for (var key in result) {
            var permission = result[key];
            permissions[permission.code] = permission;
            switch (permission.code) {
                case "users":
                    navigation.append('<li id="loadUsersButton" class="k">' +
                        '<a href="#"><i class="icon-picture"></i><span data-translate="'+
                        strings["admin_menu_users"]+'">'+strings["admin_menu_users"]+'</span></a></li>');
                    $("#loadUsersButton").click(function () {
                        $(".k").attr("class", "k");
                        $(this).attr("class", "k nav-active active");
                        $("#searchparams").html("");
                        if (datarowSlide) {
                            $("#dataRow").slideDown("slow");
                            $("#dashRow").slideUp("slow");
                            datarowSlide = true;
                        }
                        loadUsersData(0, "",1);
                    });

                    loadUsersData(0, "",1);

                    break;
                case "strings":
                    navigation.append('<li id="loadTextsButton" class="k">' +
                        '<a href="#"><i class="icon-picture"></i><span data-translate="'+strings["admin_menu_strings"]+'">'+
                        strings["admin_menu_strings"]+'</span></a></li>');
                    $("#loadTextsButton").click(function () {
                        $(".k").attr("class", "k");
                        $(this).attr("class", "k nav-active active");
                        $("#searchparams").html("<div id='dynamicFilterRow' class='row'> </div>");
                        if (datarowSlide) {
                            $("#dataRow").slideDown("slow");
                            $("#dashRow").slideUp("slow");
                            datarowSlide = true;
                        }
                        loadTexts(0, "");
                    });
                    break;
                case "payments":

                    break;
                case "store_management":
                    navigation.append('<li id="loadStoresButton" class="k">' +
                        '<a href="#"><i class="icon-picture"></i><span data-translate="'+strings["store_management_button"]+'">'
                        +strings["store_management_button"]+'</span></a></li>');
                    $("#loadStoresButton").click(function () {
                        $(".k").attr("class", "k");
                        $(this).attr("class", "k nav-active active");
                        $("#searchparams").html("");
                        if (datarowSlide) {
                            $("#dataRow").slideDown("slow");
                            $("#dashRow").slideUp("slow");
                            datarowSlide = true;
                        }
                        loadStores(0, "");
                    });
                    break;
                    break;
                case "product_type":
                    navigation.append('<li id="loadProductTypes" class="k">' +
                        '<a href="#"><i class="icon-picture"></i><span data-translate="'+strings["product_types_menu_label"]+'">'
                        +strings["product_types_menu_label"]+'</span></a></li>');
                    $("#loadProductTypes").click(function () {
                        $(".k").attr("class", "k");
                        $(this).attr("class", "k nav-active active");
                        $("#searchparams").html("");
                        if (datarowSlide) {
                            $("#dataRow").slideDown("slow");
                            $("#dashRow").slideUp("slow");
                            datarowSlide = true;
                        }
                        loadProductTypes(0, "");
                    });
                    break;
                case "store_product_management":
                    navigation.append('<li id="loadStoreProducts" class="k">' +
                        '<a href="#"><i class="icon-picture"></i><span data-translate="'+strings["store_products_label"]+'">'
                        +strings["product_types_menu_label"]+'</span></a></li>');
                    $("#loadStoreProducts").click(function () {
                        $(".k").attr("class", "k");
                        $(this).attr("class", "k nav-active active");
                        $("#searchparams").html("");
                        if (datarowSlide) {
                            $("#dataRow").slideDown("slow");
                            $("#dashRow").slideUp("slow");
                            datarowSlide = true;
                        }
                        loadStoreProducts(0, "");
                    });
                    break;
                default:

                    break;
            }


        }


    });


    $("#dashRow").hide();

    $("#logoutBtn").click(function () {
        $.getJSON("/logout", function (result) {
            if (result) {
                eraseCookie("projectSessionId");
                window.location.href = "/";
            }
        })

    });

    var navigation = $("#navigationUl");

    $("#settingsBtn").click(function () {

        showModalWithTableInside(function (head, body, modal, rand) {
            body.append("<button class='btn btn-flat' id='callConnect'>Connect Google Calendar</button>")
            $("#callConnect").click(function () {
                window.open("https://accounts.google.com/o/oauth2/v2/auth?" +
                    "scope=https://www.googleapis.com/auth/calendar&" +
                    "access_type=offline&" +
                    "prompt=consent&" +
                    "include_granted_scopes=true&" +
                    "state=state_parameter_passthrough_value&" +
                    "redirect_uri=http://localhost:8081/oauthcall&" +
                    "response_type=code&" +
                    "client_id=55995473742-00obqav5bir1au4qdn4l1jgdvf7kbmv2.apps.googleusercontent.com", "_blank");

            });
            $.getJSON("/getmycalendarslist",function (result) {
                console.log(result);
                if(result){
                    var calendarItems=[];
                    body.append("<br><div>" +
                        "<select style='margin-top: 50px;display: inline;width: 60%' class='form-control' id='calSelect'>" +
                        "<option value='0'>აირჩიეთ კალენდარი</option></select>" +
                        "<button style='margin-top: 50px;margin-left: 10px;width: 20%' id='saveCallBtn' class='btn'>"+strings["admin_button_save"]+"</button></div>")
                    for(var key in result.items){
                        var item=result.items[key];
                        if(item.accessRole==="owner"){

                            $("#calSelect").append("<option value='"+item.id+"'>"+item.summary+"</option>")
                            calendarItems.push({
                                name:item.summary,
                                id:item.id
                            })
                        }
                    }
                    $("#saveCallBtn").click(function () {
                        if($("#calSelect").val())
                        $.getJSON("/setcalendarid?id="+$("#calSelect").val(),function (result) {
                            if(result){
                                alert("Calendar Saved As Default");
                            }
                        })
                    });



                }

            })



        }, {}, 600);

    });
    function signInCallback(authResult) {
        if (authResult['code']) {
            console.log(authResult);
            // Hide the sign-in button now that the user is authorized, for example:
            $('#signinButton').attr('style', 'display: none');


            // Send the code to the server
            $.ajax({
                type: 'POST',
                url: 'savecalltoken?token=' + authResult['code'],
                // Always include an `X-Requested-With` header in every AJAX request,
                // to protect against CSRF attacks.
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                contentType: 'application/octet-stream; charset=utf-8',
                success: function (result) {
                    // Handle or verify the server response.
                    if (result)
                        alert("Your Google Calendar Is Now Connected!")
                },
                processData: false
            });
        } else {
            // There was an error.
        }
    }

    if (readCookie("projectUserType") === "1" || readCookie("projectUserType") === "2") {

        navigation.append('<li id="loadProjectsButton" class="k">' +
            '<a href="#"><i class="icon-note"></i><span data-translate="პროექტები">პროექტები</span></a></li>');
        navigation.append('<li id="loadFilialsButton" class="k">' +
            '<a href="#"><i class="icon-screen-desktop"></i><span data-translate="ფილიალები">ფილიალები</span></a></li>');
        navigation.append('<li id="loadUsersButton" class="k">' +
            '<a href="#"><i class="icon-picture"></i><span data-translate="მომხმარებლები">მომხმარებლები</span></a></li>');
        navigation.append('<li id="loadElementsButton" class="k">' +
            '<a href="#"><i class="icon-note"></i><span data-translate="მასალის ტიპები">მასალის ტიპები</span></a></li>');
        navigation.append('<li id="loadStageTypesButton" class="k">' +
            '<a href="#"><i class="icon-note"></i><span data-translate="ეტაპის ტიპები">ეტაპის ტიპები</span></a></li>');
        /*navigation.append('<li id="loadAcceptedRequestsButton" class="k">' +
         '<a href="#"><i class="icon-layers"></i><span data-translate="დადასტურებული მოთხოვნები">დადასტურებული მოთხოვნები</span></a></li>');
         navigation.append('<li id="loadTendersButton" class="k">' +
         '<a href="#"><i class="icon-layers"></i><span data-translate="ტენდერები">ტენდერები</span></a></li>');*/
        /*navigation.append('<li id="loadRejectedByTenderUser" class="k">' +
         '<a href="#"><i class="icon-note"></i><span data-translate="უარყოფილი მოთხოვნები">უარყოფილი მოთხოვნები</span></a></li>');*/

        $("#loadProjectsButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            loadProjectsData(0, "");


        });


        $("#loadFilialsButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            $("#addNewDiv").html('<button id="addNewButton" data-target="#myModal" class="btn btn-sm btn-dark">ახალი ფილიალის დამატება </button>')
            $("#addNewButton").click(function () {
                $("#myModalLabel").html("ახალი ფილიალის დამატება")
                var modalBody = $("#modalBody");
                modalBody.html(filialsRegistrationFormTemplate);
                $('#myModal').modal("show");
                $("#registrationModalSaveButton").unbind()
                $("#registrationModalSaveButton").click(function () {
                    var registerData = {
                        name: $("#nameField").val().trim(),
                        address: $("#addressField").val().trim()
                    }
                    var valid = true;
                    for (key in registerData) {
                        if (registerData[key] == "") {
                            valid = false
                        }
                    }
                    if (valid) {
                        $.ajax({
                            url: "/createfilial",
                            method: "POST",
                            data: registerData
                        }).done(function (msg) {
                            if (msg) {
                                loadFilialsData(0, "")
                                $('#myModal').modal("hide");
                            } else {
                                $('#myModal').modal("hide");
                                alert("მოხმდა შეცდომა. შეცდომის ხშირი განმეორების შემთხვევაში დაუკავშირდით ადმინისტრაციას.")
                            }
                        })
                    } else {
                        alert("შეავსეთ ყველა ველი რეგისტრაციისთვის")
                    }

                    console.log(registerData);
                })
            });
            loadFilialsData(0, "");
        });
        $("#loadUsersButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            loadUsersData(0, "",1);
        });


        $("#loadElementsButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            loadElementTypes();

        });
        $("#loadStageTypesButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            loadProjectStageTypes();

        });

        $("#loadAcceptedRequestsButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            $("#addNewDiv").html('')
            loadAcceptedRequests(0)
        });
        $("#loadTendersButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            $("#addNewDiv").html('<button id="addNewButton" data-target="#myModal" class="btn btn-sm btn-dark">ახალი ტენდერის შექმნა </button>' +
                '<button id="loadBeforeStarted" data-target="#myModal" class="btn btn-sm btn">მიმდინარე ტენდერები</button>' +
                '<button id="loadStarted" data-target="#myModal" class="btn btn-sm btn">დაწყებული ტენდერები</button>' +
                '<button id="loadEnded" data-target="#myModal" class="btn btn-sm">დასრულებული ტენდერები</button>');
            $("#addNewButton").click(function () {
                $("#myModalLabel").html("ახალი ტენდერის დამატება");
                var modalBody = $("#modalBody");
                modalBody.html(tenderRegistrationFormTemplate);
                $("#registrationModalSaveButton").unbind()
                $("#registrationModalSaveButton").click(function () {
                    var registerData = {
                        name: $("#nameField").val().trim(),
                        startDate: moment($("#dateStartField").val()).toDate(),
                        endDate: moment($("#dateEndField").val()).toDate()
                    }
                    var valid = true;
                    for (key in registerData) {
                        if (registerData[key] == "") {
                            valid = false
                        }
                    }
                    if (valid) {
                        $.ajax({
                            url: "/createtender",
                            method: "POST",
                            data: registerData
                        }).done(function (msg) {
                            if (msg) {
                                loadTenders(0, 1)
                                $('#myModal').modal("hide");
                            } else {
                                $('#myModal').modal("hide");
                                alert("მოხმდა შეცდომა. შეცდომის ხშირი განმეორების შემთხვევაში დაუკავშირდით ადმინისტრაციას.")
                            }
                        })
                    } else {
                        alert("შეავსეთ ყველა ველი რეგისტრაციისთვის")
                    }


                });
                $('#myModal').modal("show");
            });
            $("#loadBeforeStarted").click(function () {
                loadTenders(0, 1);
            });
            $("#loadStarted").click(function () {
                loadTenders(0, 2);
            });
            $("#loadEnded").click(function () {
                loadTenders(0, 3);
            });
            loadTenders(0, 1);
        });
        $("#loadRejectedByTenderUser").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            $("#addNewDiv").html('');
            requestsfromtenders();

        });
        loadProjectsData(0, "");
    }

    if (readCookie("projectUserType") === "3") {
        navigation.append('<li id="loadProjectsButton" class="k">' +
            '<a href="#"><i class="icon-note"></i><span data-translate="პროექტები">პროექტები</span></a></li>');
        $("#loadProjectsButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            loadProjectsForPrarab();
        });
        $("#loadProductRequestsButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            $("#addNewDiv").html('');
            loadProductRequestsData(0, 2);

        });
        loadProjectsForPrarab();
    }

    if (readCookie("projectUserType") === "4") {
        navigation.append('<li id="loadTendersButton" class="k">' +
            '<a href="#"><i class="icon-layers"></i><span data-translate="ტენდერები">მიმდინარე ტენდერები</span></a></li>');
        navigation.append('<li id="loadMyWonTenders" class="k">' +
            '<a href="#"><i class="icon-layers"></i><span data-translate="ტენდერები">ჩემი მოგებული ტენდერები</span></a></li>');
        navigation.append('<li id="loadEndedTenders" class="k">' +
            '<a href="#"><i class="icon-layers"></i><span data-translate="ტენდერები">დასრულებული ტენდერები</span></a></li>');
        navigation.append('<li id="loadRequestsFromTender" class="k">' +
            '<a href="#"><i class="icon-layers"></i><span data-translate="დამატებითი მოთხოვნები">დამატებითი მოთხოვნები</span></a></li>');
        $("#loadTendersButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            $("#addNewDiv").html('');
            loadTenders(0, 2);
        });
        $("#loadMyWonTenders").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            $("#addNewDiv").html('');
            loadTendersWon(0);
        });
        $("#loadEndedTenders").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            $("#addNewDiv").html('');
            loadTenders(0, 3);
        });
        $("#loadRequestsFromTender").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            $("#addNewDiv").html('');
            requestsfromtenders();
        });

        loadTenders(0, 2);
    }

    if (readCookie("projectUserType") === "1" || readCookie("projectUserType") === "2" || readCookie("projectUserType") === "3") {
        canCreateUsers = true;
    }

    if (readCookie("projectUserType") === "1" || readCookie("projectUserType") === "2") {
        canCreateProject = true;
    }

    if (readCookie("projectUserType") === "5") {
        navigation.append('<li id="loadWaitProductsButton" class="k">' +
            '<a href="#"><i class="icon-note"></i><span data-translate="მოსატანი პროდუქცია">მოსატანი პროდუქცია</span></a></li>');
        $("#loadWaitProductsButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");

            loadMosatani();
        });
        loadMosatani();
    }

    if (readCookie("projectUserType") === "6") {
        navigation.append('<li id="loadTendersButton" class="k">' +
            '<a href="#"><i class="icon-layers"></i><span data-translate="ტენდერები">მიმდინარე ტენდერები</span></a></li>');
        navigation.append('<li id="loadEndedTenders" class="k">' +
            '<a href="#"><i class="icon-layers"></i><span data-translate="ტენდერები">დასრულებული ტენდერები</span></a></li>');
        $("#loadTendersButton").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            $("#addNewDiv").html('');
            loadTenders(0, 2);
        });
        $("#loadEndedTenders").click(function () {
            $(".k").attr("class", "k");
            $(this).attr("class", "k nav-active active");
            $("#addNewDiv").html('');
            loadTenders(0, 3);
        });


        loadTenders(0, 2);
    }

    /*if (readCookie("projectUserType") === "21") {
     navigation.append('<li id="loadDashboardButton" class="k">' +
     '<a href="#">' +
     '<i class="icon-graph"></i> ' +
     '<span style="font-family: font1;" data-translate="დეშბორდი">დეშბორდი</span></a></li>');
     navigation.append('<li id="loadClientsButton" class="k">' +
     '<a href="#">' +
     '<i class="fa fa-address-book-o" aria-hidden="true"></i>' +
     '<span style="font-family: font1;" data-translate="კლიენტები">კლიენტები</span></a></li>');
     navigation.append('<li id="loadLoansButton" class="k">' +
     '<a href="#">' +
     '<i class="fa fa-balance-scale" aria-hidden="true"></i> ' +
     '<span style="font-family: font1;" data-translate="სესხები">სესხები</span></a></li>');


     navigation.append('<li id="loadConfiscatedButton" class="k">' +
     '<a href="#"><i class="fa fa-mobile" aria-hidden="true"></i>' +
     '<span style="font-family: font1;" data-translate=" საწყობი">საწყობი</span></a></li>');


     navigation.append('<li id="loadConditionsButton" class="k">' +
     '<a href="#"><i class="fa fa-percent" aria-hidden="true"></i>' +
     '<span style="font-family: font1;" data-translate=" განაკვეთები"> განაკვეთები</span></a></li>');


     $("#loadDashboardButton").click(function () {
     $(".k").attr("class", "k");
     $(this).attr("class", "k nav-active active");
     $("#searchparams").html("");
     $("#dataRow").slideUp("slow");
     $("#dashRow").slideDown("slow");
     datarowSlide = true;
     dashRow = true;
     DashInit();

     });

     $("#loadClientsButton").click(function () {
     currentPage = 2;
     $(".k").attr("class", "k");
     $(this).attr("class", "k nav-active active");
     $("#searchparams").html("");
     $("#searchparams").append(
     '<div class="row">    ' +
     '<div class="col-md-2">' +
     '<label>გაშავებული' +
     '<input id="flaggedParam" type="checkbox" data-checkbox="icheckbox_square-blue"></label>' +
     '</div>' +
     '<div class="col-md-2">        ' +
     '<label>' +
     '</div>' +
     '</div>');
     $('input').iCheck({
     checkboxClass: 'icheckbox_minimal',
     radioClass: 'iradio_minimal',
     increaseArea: '20%' // optional
     });
     if (datarowSlide) {
     $("#dataRow").slideDown("slow");
     $("#dashRow").slideUp("slow");
     datarowSlide = true;
     }
     loadClientsData(0, "");
     currentFunction = loadClientsData;
     });

     $("#loadConfiscatedButton").click(function () {
     currentPage = 4;
     $(".k").attr("class", "k");
     $(this).attr("class", "k nav-active active");
     $("#searchparams").html("");
     $("#searchparams").append('<div class="row">    ' +
     '<div class="col-md-2">        ' +
     '<label>' +
     '<input id="datvirtuliCheck" type="checkbox" data-checkbox="icheckbox_square-blue">დატვირთული</label>' +
     '    </div>    <div class="col-md-2">        ' +
     '<label>' +
     '<input id="confiscatedCheck" type="checkbox" data-checkbox="icheckbox_square-blue">დაკავებული' +
     '</label>    ' +
     '</div>    ' +
     '<div class="col-md-2">        ' +
     '<div class="input-group">' +
     '<div class="icheck-list">' +
     ' <label>' +
     '<input id="forSaleCheck" type="checkbox" data-checkbox="icheckbox_square-blue">გასაყიდები' +
     '</label>            ' +
     '</div>' +
     '</div>' +
     '</div>' +
     '<div class="col-md-2">     ' +
     '<div class="input-group">' +
     '<div class="icheck-list">' +
     ' <label>' +
     '<input id="soldCheck" type="checkbox" data-checkbox="icheckbox_square-blue">გაყიდული' +
     '</label>            ' +
     '</div>' +
     '</div>' +
     "</div>" +
     '<div class="col-md-2">     ' +
     '<div class="input-group">' +
     '<div class="icheck-list">' +
     ' <label style="font-size: 13px;">' +
     '<input id="freeCheck" type="checkbox" data-checkbox="icheckbox_square-blue">გათავისუფლებული' +
     '</label>            ' +
     '</div>' +
     '</div>' +
     '</div>' +
     '<div class="col-md-2">     ' +
     '<div class="input-group">' +
     '<div class="icheck-list">' +
     ' <label>' +
     '<input id="takenCheck" type="checkbox" data-checkbox="icheckbox_square-blue">გატანილი' +
     '</label>            ' +
     '</div>' +
     '</div>' +
     '</div>' +
     '</div>').append("<div id='dynamicFilterRow' class='row'></div>");
     $('input').iCheck({
     checkboxClass: 'icheckbox_minimal',
     radioClass: 'iradio_minimal',
     increaseArea: '20%' // optional
     });

     if (datarowSlide) {
     $("#dataRow").slideDown("slow");
     $("#dashRow").slideUp("slow");
     datarowSlide = true;
     }
     loadConfiscatedData(0, "");
     currentFunction = loadConfiscatedData;
     });

     $("#loadLoansButton").click(function () {
     currentPage = 3;
     $(".k").attr("class", "k");
     $(this).attr("class", "k nav-active active");
     $("#searchparams").html("");
     $("#searchparams").append('<div class="row">    ' +
     '<div class="col-md-2">        ' +
     '<label>' +
     '<input id="closedParam" type="checkbox" data-checkbox="icheckbox_square-blue">დახურული</label>' +
     '    </div>    <div class="col-md-2">        ' +
     '<label>' +
     '<input id="openedParam" type="checkbox" data-checkbox="icheckbox_square-blue">მიმდინარე' +
     '</label>    </div>    <div class="col-md-2">        <div class="input-group">            ' +
     '<div class="icheck-list">                <label>' +
     '<input id="lateParam" type="checkbox" data-checkbox="icheckbox_square-blue">დაგვიანებული' +
     '</label>            </div>        </div>    </div>    ' +
     '<div class="col-md-5">        ' +
     '<input style="width: 40%;height: 30px" type="date" class="form-control" placeholder="დან" id="lstd">        ' +
     '<input style="width: 40%;height: 30px" type="date" class="form-control" placeholder="დან" id="lend">      ' +
     '<button id="updateButton" style=";"><i style="padding-right: 0px;" class="fa fa-search" aria-hidden="true"></i></button>' +
     '<button style="margin-left: 10px;" id="exportLoans" style=";"><i style="padding-right: 0px;" class="fa fa-file-excel-o" aria-hidden="true"></i></button>' +
     '</div></div>');
     $('input').iCheck({
     checkboxClass: 'icheckbox_minimal',
     radioClass: 'iradio_minimal',
     increaseArea: '20%' // optional
     });
     $("#lstd").val(moment(new Date()).subtract(365, 'days').locale("ka").format("YYYY-MM-DD"));
     $("#lend").val(moment(new Date()).locale("ka").format("YYYY-MM-DD"));
     if (datarowSlide) {
     $("#dataRow").slideDown("slow");
     $("#dashRow").slideUp("slow");
     datarowSlide = true;
     }
     $("#updateButton").click(function () {
     loadLoansData(0, $("#searchText").val());
     })
     $("#exportLoans").click(function () {
     exportLoansData($("#searchText").val());
     })
     loadLoansData(0, "");
     currentFunction = loadLoansData;

     });
     $("#loadConditionsButton").click(function () {
     currentPage = 5;
     $(".k").attr("class", "k");
     $(this).attr("class", "k nav-active active");
     $("#searchparams").html("");
     loadLoanConditions(0, "");
     currentFunction = loadLoanConditions;

     });
     $("#loadDashboardButton").click()
     }*/

    //loadProductsData(0, "");
});
function search(e) {
    if (e === 13) {
        console.log(e)
        currentFunction(0, $("#searchText").val());
    }
}

