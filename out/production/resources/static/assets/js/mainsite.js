/**
 * Created by kakha on 3/30/2017.
 */
var colors = {
    1: "efefee",
    2: "8fc9ea",
    3: "274402",
    4: "db2e2d",
    5: "efefee",
    6: "fdbb9c"
};

var emailValid = false;
var googleToken = "";
var fbToken = "";

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
$(document).ready(function () {

    $("#logisignbtn").click(function () {
        showModalWithTableInside(function (head, body, modal, random, footer) {
            //$(".modal-header").remove();
            body.append(' <form style="padding-top: 30px;" action="loginapi" method="post" class="form-signin">' +
                '<a id="signInFB" onclick="loginWithFace()" class="btn btn-block btn-social btn-facebook" style="height: 40px;    padding-top: 8px;color: #000;font-family:brixNorm!important;"> <span style="color: white;" class="fa fa-facebook"></span> Log in with Facebook </a>' +
                '<a id="signInGoogle" class="g-signin2 btn btn-block btn-social" style="height: 40px;    padding-top: 8px;border: 1px solid darkgray;color: #000;font-family:brixNorm!important;margin-top: 10px" data-onsuccess="onSignIn"> <img style="    padding-bottom: 4px" src="png/login/g.png"> Log in with Google </a>' +
                '<div style="height: 10px;margin-top: 15px;padding-bottom: 20px;margin-bottom: 15px;" class="row"><div style="height: 13px;width: 42.5%;border-bottom: 1px solid black;float: left;"></div><div style="width: 15%;float: left;text-align: center;font-family: brixNorm;font-size: 1.2em">or</div><div style="height: 13px;width: 42.5%;border-bottom: 1px solid black;float: left;"></div></div>' +
                '<input id="emailFieldLogin" type="text" class="form-control" name="username" placeholder="Email Address" required="" autofocus="" />' +
                '<input id="passwordFieldLogin" type="password" class="form-control" name="password" placeholder="Password" required=""/>' +
                '<div class="row" style="margin-top: 10px">' +
                '<div style="width: 50%;float: left">' +
                '<input type="checkbox"><span style="margin-left: 10px;font-family: brixNorm">Remember me</span>' +
                '</div>' +
                '<div style="width: 50%;float: right;text-align: right">' +
                '<span><a style="cursor: pointer;font-family: brixNorm!important;color: #218769">Forgot password?</a></span>' +
                '</div>' +
                '</div>' +
                '<button style="margin-top: 10px;background-color: #46c3bf;color: white;" id="signInBtn" class="btn btn-block btn-social">  Log in </button>' +
                '</form>');


            footer.prepend("<div style='float: left;font-family: brixNorm;color: dimgrey;font-size: 1.2em;padding-top: 5px'>Don't have an account?</div>")

            $("#signInGoogle").click(function () {
                gapi.load('auth2', function () {
                    gapi.auth2.init();
                    var auth2 = gapi.auth2.getAuthInstance();
                    //console.log(auth2);
                    auth2.signIn().then(function (response) {//request to sign in
                        console.log(response);
                        var id_token = response.getAuthResponse().id_token;
                        $.getJSON("/loginapigoogle?token=" + id_token, function (result) {
                            if (result) {
                                createCookie("projectSessionId", result["id"], 365);
                                createCookie("lang", result["lang"], 365);
                                location.reload();
                            } else {
                                alert("no such user")
                            }
                        })
                    });
                });
            })

        }, {
            "Sign up": function () {
                showModalWithTableInside(function (head, body, modal, random, footer) {
                    //graph.facebook.com/10202582199151436/picture?type=normal


                    body.append('<div style="padding-top: 30px;" method="" class="form-signin">' +
                        '<a id="signInFB"                                                                   class="btn btn-block btn-social btn-facebook"                                                                  style="height: 40px;    padding-top: 8px;color: #000;font-family:brixNorm!important;">    <span style="color: white;" class="fa fa-facebook"></span> Log in with Facebook </a>' +
                        '<a id="signInGoogle"                                                                                           class="g-signin2 btn btn-block btn-social"                                                                                           style="height: 40px;    padding-top: 8px;border: 1px solid darkgray;color: #000;font-family:brixNorm!important;margin-top: 10px"                                                                                           data-onsuccess="onSignIn">    <img style="    padding-bottom: 4px" src="png/login/g.png"> Log in with Google </a>    ' +
                        '<div style="height: 10px;margin-top: 15px;padding-bottom: 20px;margin-bottom: 15px;" class="row">        <div style="height: 13px;width: 42.5%;border-bottom: 1px solid black;float: left;"></div>        <div style="width: 15%;float: left;text-align: center;font-family: brixNorm;font-size: 1.2em">or</div>        <div style="height: 13px;width: 42.5%;border-bottom: 1px solid black;float: left;"></div>    </div>    ' +
                        '<button style="margin-top: 10px;background-color: #46c3bf;color: white;" id="singUpWithEmailBtn"            class="btn btn-block btn-social">Sign up with Email    </button>    ' +
                        '<div class="row"><p style="    line-height: 17px;font-size: 0.87em;padding-top: 10px;font-family: brixNorm;">' +
                        'By        signing up, I agree to Allwitz’s ' +
                        '<a href="#" style="color:#218769;font-family: brixNorm!important;">Terms os            Service, Nondiscrimination Policy, ' +
                        'Payments Terms of Service, Privacy Policy, ' +
                        'Guest Refund Policy, and Host            Guarantee Terms.</a></p></div>' +
                        '</div>')


                    var gid = "";
                    var fbid = "";
                    var email = "";
                    var name = "";
                    var surname = "";


                    $("#singUpWithEmailBtn").unbind().click(function () {
                        modal.modal("hide")
                        showModalWithTableInside(function (head, body, modal, random, footer) {

                            footer.prepend("<div style='float: left;font-family: brixNorm;color: dimgrey;font-size: 1.2em;padding-top: 5px'>Already have an Allwitz account?</div>")


                            body.append(
                                '<div style="padding-top: 30px;" method="" class="form-signin">' +
                                '<div style="text-align: center" class="row"><span style="text-align: center;font-family: brixnorm!important;">Sign up with <a style="color:#218769;font-family: brixNorm!important;" href="#">Facebook</a> or <a style="color:#218769;font-family: brixNorm!important;" href="#">Google</a></span></div>' +
                                '<div style="height: 10px;margin-top: 15px;padding-bottom: 20px;margin-bottom: 15px;" class="row">        <div style="height: 13px;width: 42.5%;border-bottom: 1px solid black;float: left;"></div>        <div style="width: 15%;float: left;text-align: center;font-family: brixNorm;font-size: 1.2em">or</div>        <div style="height: 13px;width: 42.5%;border-bottom: 1px solid black;float: left;"></div>    </div>    ' +
                                '<input id="emailField" value="' + email + '" type="text" class="form-control" name="username" placeholder="Email Address" required="" autofocus="" />' +
                                '<input id="nameField" value="' + name + '" type="text" class="form-control" name="username" placeholder="First name" required="" autofocus="" />' +
                                '<input id="surnameField" value="' + surname + '" type="text" class="form-control" name="username" placeholder="Last name" required="" autofocus="" />' +
                                '<input id="passwordField"  type="password" class="form-control" name="password" placeholder="Password" required=""/>' +
                                '<div id="errorMessage"></div>' +
                                '<div class="row">' +
                                '<p style="font-family: brixnorm!important;margin-bottom: 0px;font-size: 1.3em;padding-top: 20px">Birthday</p>' +
                                '<p style="font-family: brixnorm!important;font-size: 0.9em;    line-height: 12px;">To sign up, you must be 18 or older. Other people won’t see your birthday.</p></div>' +
                                '<div class="row">' +
                                '<div style="width: 35%;float: left"><select class="form-custom" id="month" style="width: 80%"></select></div>' +
                                '<div style="width: 30%;float: left;text-align: center"><select id="day" class="form-custom"  style="width: 80%"></select></div>' +
                                '<div style="width: 35%;float: left;text-align: right"><select id="year" class="form-custom"  style="width: 80%"></select></div>' +
                                '</div>' +
                                '<div class="row" style="padding-top: 10px;display: flex">' +
                                '<input id="promotions" type="checkbox" value="value1" />' +
                                '<span style="font-size: 0.9em;font-family: brixnorm;padding-left: 5px">' +
                                'I’d like to receive coupons, promotions, surveys, and updates via email aboutAllwitz and its partners </span></div>' +
                                '<button style="margin-top: 10px;background-color: #46c3bf;color: white;" id="singUpWithEmailBtn1" class="btn btn-block btn-social">Sign up</button>    ' +
                                '<div class="row"><p style="    line-height: 17px;font-size: 0.87em;padding-top: 10px;font-family: brixNorm;">' +
                                'By      signing up, I agree to Allwitz’s ' +
                                '<a href="#" style="color:#218769;font-family: brixNorm!important;">Terms os Service, Nondiscrimination Policy, ' +
                                'Payments Terms of Service, Privacy Policy, ' +
                                'Guest Refund Policy, and Host            Guarantee Terms.</a></p></div>' +
                                '</div>')
                            $("#promotions").kalypto({toggleClass: "toggleR"});
                            $("#month").append("<option value='" + 0 + "'>" + moment().month(12).format('MMMM') + "</option>");
                            for (var i = 1; i < 12; i++) {
                                $("#month").append("<option value='" + i + "'>" + moment().month(i).format('MMMM') + "</option>");
                            }
                            for (var i = 1; i < 32; i++) {
                                $("#day").append("<option value='" + i + "'>" + i + "</option>");
                            }
                            for (var i = 2010; i > 1940; i--) {
                                $("#year").append("<option value='" + i + "'>" + i + "</option>");
                            }

                            $("#emailField").change(function () {
                                $.getJSON("emailexists?email=" + $(this).val(), function (result) {
                                    $("#emailExistsError").remove();
                                    if (result) {
                                        $("#emailField").addClass("reg-invalid");
                                        $("#errorMessage").append("<p id='emailExistsError'>Email exists</p>")
                                    } else {
                                        $("#emailField").removeClass("reg-invalid");
                                    }
                                })
                            });
                            $("#emailField").change();

                            $("#singUpWithEmailBtn1").unbind().click(function () {
                                var userModel = {
                                    email: $("#emailField").val().trim(),
                                    name: $("#nameField").val().trim(),
                                    surname: $("#surnameField").val().trim(),
                                    password: $("#passwordField").val().trim(),
                                    googleId: gid,
                                    fbId: fbid,
                                    year: $("#year").val(),
                                    month: $("#month").val(),
                                    day: $("#day").val()
                                };
                                $('.form-control').removeClass("reg-invalid");
                                for (key in userModel) {
                                    var valid = true;
                                    var item = userModel[key];

                                    if (!item) {
                                        valid = false;
                                        $("#" + key + "Field").addClass("reg-invalid");
                                    }
                                    if (valid) {
                                        $.ajax({
                                            url: "registerapi",
                                            data: userModel
                                        }).done(function (result) {
                                            if (result.id) {
                                                createCookie("projectSessionId", result["id"], 365);
                                                createCookie("lang", result["lang"], 365);
                                                location.reload();
                                            }
                                        })
                                    }
                                }
                            });

                        }, {
                            "Log in": function () {
                                $("#logisignbtn").click()
                            }
                        }, 500, true)
                    })


                    $("#signInFB").unbind().click(function () {
                        FB.login(function (response) {
                            //https://graph.facebook.com/me?access_token=
                            //10202582199151436
                            if (response.status = "connected") {
                                console.log(response)
                                FB.api("/me?fields=id,name,email", function (result) {
                                    console.log(result);
                                    if (result) {
                                        var token = response.authResponse.accessToken;
                                        $.getJSON("/loginapifb/" + token, function (session) {
                                            console.log(session)
                                            if (session.id) {
                                                createCookie("projectSessionId", session["id"], 365);
                                                createCookie("lang", session["lang"], 365);
                                                location.reload();
                                            } else {
                                                fbid = response.authResponse.userID
                                                $("#singUpWithEmailBtn").click();
                                                name = result.name.split(" ")[0];
                                                surname = result.name.split(" ")[1];
                                                email = result.email?result.email:"";

                                            }
                                        })


                                    }
                                });

                            }
                        });
                    });

                    $("#signInGoogle").click(function () {
                        gapi.load('auth2', function () {
                            gapi.auth2.init();
                            var auth2 = gapi.auth2.getAuthInstance();
                            //console.log(auth2);
                            auth2.signIn().then(function (response) {//request to sign in
                                console.log(response.getBasicProfile());
                                var id_token = response.getBasicProfile().getId();


                                gid = id_token;
                                name = response.getBasicProfile().getGivenName();
                                surname = response.getBasicProfile().getFamilyName();
                                email = response.getBasicProfile().getEmail();
                                console.log(id_token);
                                $("#singUpWithEmailBtn").click();

                                /*$.getJSON("/loginapigoogle?token=" + id_token, function (result) {
                                 if (result) {
                                 createCookie("projectSessionId", result["id"], 365);
                                 createCookie("lang", result["lang"], 365);
                                 location.reload();
                                 } else {
                                 alert("no such user")
                                 }
                                 })*/
                            });
                        });

                    });

                    /*body.append(' <form id="regForm" class="form-signin">' +
                     ' <h2 class="form-signin-heading">Sign Up</h2>' +
                     '<div id="imagePlace" style="text-align: center;padding-bottom: 10px" class="row"></div>' +
                     '<input type="text" id="nameReg" class="form-control reg-control " placeholder="Name" required="" autofocus="" />' +
                     '<input type="text" id="surnameReg" class="form-control reg-control"  placeholder="Surname" required="" autofocus="" />' +
                     '<input type="text" id="emailReg" class="form-control reg-control"  placeholder="Email Address" required="" autofocus="" />' +
                     '<input type="password" id="passwordReg" class="form-control reg-control"  placeholder="Password" required=""/>' +
                     '<input type="hidden" id="fbToken">' +
                     '<input type="hidden" id="googleToken">' +
                     '<a id="registerBtn" style="background-color: #ee9cac;color: white;" class="btn btn-block btn-social"> <span class="fa fa-sign-in"></span> Sign up </a>' +
                     '<a id="connectFB" class="btn btn-block btn-social btn-facebook"> <span class="fa fa-facebook"></span> Connect Facebook </a>' +
                     '<a id="connectGoogle" class="btn btn-block btn-social btn-google"> <span class="fa fa-google"></span> Connect Google </a>' +
                     '<div id="errorMessage"></div>' +
                     '</form>');*/


                    footer.prepend("<div style='float: left;font-family: brixNorm;color: dimgrey;font-size: 1.2em;padding-top: 5px'>Already have an Allwitz account?</div>")

                    $("#emailReg").change(function () {
                        $.getJSON("emailexists?email=" + $(this).val(), function (result) {
                            $("#emailExistsError").remove();
                            if (result) {
                                $("#emailReg").addClass("reg-invalid");
                                $("#errorMessage").append("<p id='emailExistsError'>Email exists</p>")
                                emailValid = false;
                            } else {
                                $("#emailReg").removeClass("reg-invalid");
                                emailValid = true;
                            }
                        })
                    });
                    $("#connectFB").click(function () {
                        registerWithFacebook();
                    });
                    $("#registerBtn").click(function () {
                        $('.reg-control').removeClass("reg-invalid");
                        $("#emailExistsError").remove();
                        var regData = {};
                        var valid = true;
                        regData["name"] = $("#nameReg").val();
                        regData["surname"] = $("#surnameReg").val();
                        regData["email"] = $("#emailReg").val();
                        regData["password"] = $("#passwordReg").val();
                        for (key in regData) {
                            if (!regData[key]) {
                                $("#" + key + "Reg").addClass("reg-invalid");
                                valid = false;
                            }
                        }
                        if ($("#connectFB").attr("value")) {
                            regData["fbId"] = $("#connectFB").attr("value");
                        }
                        if (valid && emailValid) {
                            $.ajax({
                                url: "registerapi",
                                data: regData
                            }).done(function (result) {
                                createCookie("projectSessionId", result["id"], 365);
                                createCookie("lang", result["lang"], 365);
                                location.reload();
                            })
                        }

                    })
                }, {
                    "Log in": function () {
                        $("#logisignbtn").click()
                    }
                }, 500, true)
            }
        }, 500, true)
    })
    $("#becometeacherbtn").click(function () {
        if (readCookie("projectSessionId")) {
            $.getJSON("/getcategoriesforuseradding", function (result) {
                var categoriesData = {};
                for (var key in result) {
                    var item = result[key];
                    categoriesData[item.id] = item.name;
                }


                swal.setDefaults({
                    input: 'text',
                    confirmButtonColor: "#46c3bf",
                    cancelButtonColor: "#218769",
                    confirmButtonText: 'Next &rarr;',
                    showCancelButton: true,
                    animation: true,
                    //progressSteps: ['1', '2', '3', '4','5','6','7']

                });
                var steps = [
                    {
                        title: "Become A Teacher",
                        text: "Choose your city",
                        input: 'select',
                        inputOptions: {
                            "1": "Tbilisi"
                        }
                    },
                    {
                        title: "Become A Teacher",
                        text: "What do you want to teach?",
                        input: 'select',
                        inputOptions: categoriesData
                    }, {
                        title: "Become A Teacher",
                        text: "What will be the duration of your class?",
                        input: 'number',
                        inputPlaceholder: "Minutes",
                        inputValidator: function (value) {
                            return new Promise(function (resolve, reject) {
                                if (value) {
                                    resolve()
                                } else {
                                    reject('You need to write something!')
                                }
                            })
                        }
                    }, {
                        title: "Become A Teacher",
                        text: "How much would you like to get paid per class?",
                        input: 'number',
                        inputPlaceholder: "Price in ₾",
                        inputValidator: function (value) {
                            return new Promise(function (resolve, reject) {
                                if (value) {
                                    resolve()
                                } else {
                                    reject('You need to write something!')
                                }
                            })
                        }
                    }, {
                        title: "Become A Teacher",
                        text: "Your IBAN account number",
                        input: 'text',
                        inputPlaceholder: "IBAN",
                        inputValidator: function (value) {
                            return new Promise(function (resolve, reject) {
                                if (value) {
                                    resolve()
                                } else {
                                    reject('You need to write something!')
                                }
                            })
                        }
                    }, {
                        title: "Become A Teacher",
                        text: "Meeting point",
                        input: 'select',
                        inputOptions: {
                            "1": "Teacher's place",
                            "2": "Student's place"
                        }
                    }, {
                        title: "Become A Teacher",
                        text: "Education",
                        input: 'select',
                        inputOptions: {
                            "2": "High School",
                            "3": "Bachelor’s Degree",
                            "4": "Master’s Degree",
                            "5": "PhD"
                        }
                    }, {
                        title: "Become A Teacher",
                        text: " Years of Experience",
                        input: 'number',
                        inputPlaceholder: "Experience",
                        inputValidator: function (value) {
                            return new Promise(function (resolve, reject) {
                                if (value) {
                                    resolve()
                                } else {
                                    reject('You need to write something!')
                                }
                            })
                        }
                    }, {
                        title: "Class type",
                        text: "Group or individual",
                        input: 'select',
                        inputOptions: {
                            "0": "Individual",
                            "1": "Group"
                        }
                    }
                ];
                swal.queue(steps).then(function (result) {
                    var selectedCategoryLocal = result[1];


                    $.getJSON("/requestcategory", {
                        city: result[0],
                        category: result[1],
                        duration: result[2],
                        price: result[3],
                        iban: result[4],
                        location: result[5],
                        education: result[6],
                        exp: result[7],
                        group: result[8]
                    }, function (result) {
                        if (result) {
                            var selectedCategory = result;

                            swal.resetDefaults();
                            swal.setDefaults({
                                confirmButtonColor: "#46c3bf"
                            });
                            swal(
                                'Good job!',
                                'You are now registered as teacher!<br/> Now please upload required documents!',
                                'success'
                            ).then(function () {
                                $.getJSON("/getcategorydocs/" + selectedCategoryLocal, function (result) {

                                    var progres = [];
                                    var pI = 1;
                                    var iI = 0;
                                    var docsData = {};
                                    var steps = [];
                                    var typeIdMap = {};
                                    var uploadCount = 0;
                                    for (var key in result) {
                                        var item = result[key];
                                        progres.push(pI);
                                        pI++;
                                        typeIdMap[iI] = item.id;
                                        var localI = iI;
                                        iI++;
                                        steps.push(
                                            {
                                                title: item.name,
                                                text: "Choose " + item.name + " document file",
                                                inputValidator: function (value) {
                                                    return new Promise(function (resolve, reject) {
                                                        if (value) {
                                                            resolve()
                                                        } else {
                                                            reject('You need to choose file!')
                                                        }
                                                    })
                                                },
                                                confirmButtonText: 'Upload',
                                                showLoaderOnConfirm: true,
                                                preConfirm: function (obj) {
                                                    console.log(obj);
                                                    return new Promise(function (resolve, reject) {


                                                        if (obj) {

                                                            uploadFileToUrl(obj,
                                                                'upload?category=' + selectedCategory + "&docType=" + typeIdMap[uploadCount],
                                                                function () {
                                                                    uploadCount++;
                                                                    resolve()
                                                                });
                                                        } else {
                                                            reject('You need to choose file.')
                                                        }
                                                    })
                                                },
                                            }
                                        );


                                    }
                                    swal.setDefaults({
                                        input: 'file',
                                        inputAttributes: {
                                            accept: '*/*'
                                        },
                                        confirmButtonColor: "#46c3bf",
                                        cancelButtonColor: "#218769",
                                        confirmButtonText: 'Next &rarr;',
                                        showCancelButton: true,
                                        animation: true,
                                        progressSteps: progres
                                    });
                                    swal.queue(steps).then(function (result) {
                                        swal.resetDefaults();
                                        swal({
                                            type: 'success',
                                            title: 'All files uploaded successfully!',
                                            text: 'Please wait for confirmation!'

                                        })
                                    });

                                })
                            })
                        }
                    })
                }).then(function () {

                });


            })
        } else {
            $("#logisignbtn").click()
        }

    });

    if(readCookie("lang")==2){
        $("#curLang").attr("src","png/ge.png")
    }else{
        $("#curLang").attr("src","png/us.png")
    }

    var cat = $(".categorySearchField");
    var city = $(".citySearchField");
    $.getJSON("/categories", function (result) {
        cat.typeahead({
            source: result,
            autoSelect: true,
            afterSelect: function (selected) {

            },
            hint:true,
            highlight: true,
            minLength: 0,
            limit:10,
            fitToElement: true
        });
        cat.change(function () {
            var current = cat.typeahead("getActive");
            if (current) {
                // Some item from your model is active!
                if (current.name == cat.val()) {
                    // This means the exact match is found. Use toLowerCase() if you want case insensitive match.
                } else {
                    // This means it is only a partial match, you can either add a new item
                    // or take the active if you don't want new items
                }
            } else {
                // Nothing is active so it is a new value (or maybe empty value)
            }
        });
        cat.on("click", function () {
            ev = $.Event("keydown")
            ev.keyCode = ev.which = 40
            $(this).trigger(ev)
            return true
        });
    });
    $.getJSON("/cities", function (result) {
        city.typeahead({
            source: result,
            autoSelect: true,
            afterSelect: function (selected) {

            },
            hint:true,
            highlight: true,
            minLength: 0,
            limit:10,
            fitToElement: true
        });
        city.change(function () {
            var current = cat.typeahead("getActive");
            if (current) {
                // Some item from your model is active!
                if (current.name == cat.val()) {
                    // This means the exact match is found. Use toLowerCase() if you want case insensitive match.

                } else {
                    // This means it is only a partial match, you can either add a new item
                    // or take the active if you don't want new items

                }
            } else {
                // Nothing is active so it is a new value (or maybe empty value)
            }
        });
        city.on("click", function () {
            ev = $.Event("keydown")
            ev.keyCode = ev.which = 40
            $(this).trigger(ev)
            return true
        });
    });

    /* $.getJSON("/topcategories", function (result) {
     var data = result["content"];//
     var grid = $(".containerfortopcat");
     var left = true
     var i = 1;
     for (var key in data) {
     //categorylogo/"+item.id+"?"+new Date().getTime()+"
     var item = data[key];
     var img = "<div style='display: flex;justify-content: center; height: 70vh;width: 50%!important;' class='col-md-6 mycol'>" +
     "<div style='align-self: center;display: flex;justify-content: center;height: 100%;'>" +
     "<img class='catimg' src='categorylogo/" + item.id + "?" + new Date().getTime() + "'/>" +
     "</div>" +
     "</div>";
     var txt = "<div style='display: flex;justify-content: center;height: 70vh;width: 50%!important;' class='col-md-6 cattext mycol'>" +
     "<div style='align-self: center;text-align: center'>" +
     "<span class='descriptionText' style='font-family: brix;color: #" + item.descriptionColor + ";'>" + item.description.replaceAll("*", "<br/>") + "</span>" +
     "</div>" +
     "</div>";

     grid.append(
     "<div class='row topCatRow' style='background-color: #" + colors[i] + ";'>" +
     (left ? img + txt : txt + img) +
     "</div>")
     left = !left;
     i++
     }
     })*/

    $(window).resize(function () {
        //document.documentElement.style.setProperty("--widz",k+"%");

    })

});
function itemHWCorect() {
    $(".containerGrid .item").each(function () {
        $(this).height($(this).width());
    })
}
function checkRegValue(name, val) {
}
function createCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name) {
    createCookie(name, "", -1);
}
window.fbAsyncInit = function () {
    FB.init({
        appId: '917362565073485',
        xfbml: true,
        version: 'v2.8'
    });
    FB.AppEvents.logPageView();

};
function registerWithFacebook() {
    $("#emailExistsError").remove();
    FB.login(function (response) {
        //https://graph.facebook.com/me?access_token=
        //10202582199151436
        console.log(response);
        if (response.status = "connected") {
            FB.api("/me?fields=id,name,email", function (result) {
                console.log(result);
                if (result) {
                    var token = response.authResponse.accessToken;
                    $.getJSON("/loginapifb/" + token, function (session) {
                        console.log(session)
                        if (session.id) {
                            createCookie("projectSessionId", session["id"], 365);
                            createCookie("lang", result["lang"], 365);
                            location.reload();
                        } else {
                            $("#imagePlace").html("<img style='height: 150px' src='http://graph.facebook.com/" + result.id + "/picture?type=large'>");
                            var name = result.name.split(" ")[0];
                            var surname = result.name.split(" ")[1];
                            $("#nameReg").val(name);
                            $("#surnameReg").val(surname);
                            $("#emailReg").val(result.email);
                            $("#emailReg").change();
                            $("#connectGoogle").hide();
                            $("#connectFB").unbind().html('<span class="fa fa-facebook"></span>Facebook Connected');
                            $("#connectFB").attr("value", result.id);
                        }
                    })


                }
            });
            var token = response.authResponse.accessToken;
            /*$.getJSON("/loginapifb/" + token, function (result) {
             if (result) {
             createCookie("projectSessionId",result["id"],365);
             createCookie("userId",result["user"]["id"],365);
             location.reload();
             } else {
             alert("no such user")
             }
             })*/
        }
    }, {scope: 'email'});
}
function loginWithFace() {
    FB.login(function (response) {
        //https://graph.facebook.com/me?access_token=
        //10202582199151436
        if (response.status = "connected") {

            var token = response.authResponse.accessToken;
            $.getJSON("/loginapifb/" + token, function (result) {
                if (result) {
                    if (result["id"]) {
                        createCookie("projectSessionId", result["id"], 365);
                        createCookie("lang", result["lang"], 365);
                        location.reload();
                    } else {
                        alert("no such user")
                    }
                } else {
                    alert("no such user")
                }
            })
        }
    });
}
$(".settingsBtn").click(function () {
    $.getJSON("/mydata", function (result) {
        console.log(result);
        showModalWithTableInside(function (head, body, modal, rand) {
            body.html("<ul class='settingsList'>" +
                "<li class='settingsItem'>" +
                "<a class='settingsItemA'>" +
                "<h3 class='settingsItemH'>" + strings.main_settings_field_name + "</h3>" +
                "<span class='settingsItemValue' id='settingsItemValueNameSurname'>" + result.nameSurname + "</span>" +
                "<span><span id='nameSurnameSettingsItem' class='settingsItemEditButton'>edit</span></span></a> <div id='nameSurnameSettingsFormDiv' hidden class='settingsChangeFormDiv'></div></li>" +
                "<li class='settingsItem'>" +
                "<a class='settingsItemA'>" +
                "<h3 class='settingsItemH'>" + strings.main_settings_field_email + "</h3>" +
                "<span class='settingsItemValue' style='font-size: 12px' id='settingsItemValueEmail'>" + getMailStringForValue(result) + "</span>" +
                "<span><span id='emailSettingsItem' class='settingsItemEditButton'>edit</span></span></a> <div id='emailSettingsFormDiv' hidden class='settingsChangeFormDiv'></div></li>" +
                "<li class='settingsItem'>" +
                "<a class='settingsItemA'>" +
                "<h3 class='settingsItemH'>" + strings.main_settings_field_password + "</h3>" +
                "<span class='settingsItemValue'>******</span>" +
                "<span><span id='passwordSettingsItem' class='settingsItemEditButton'>edit</span></span></a> <div id='passwordSettingsFormDiv' hidden class='settingsChangeFormDiv'></div></li>" +
                "<li class='settingsItem'>" +
                "<a class='settingsItemA'>" +
                "<h3 class='settingsItemH'>" + strings.main_settings_field_language + "</h3>" +
                "<span class='settingsItemValue' id='settingsItemValueLang'>" + result.langName + "</span>" +
                "<span><span id='langSettingsItem' class='settingsItemEditButton'>edit</span></span></a> <div id='langSettingsFormDiv' hidden class='settingsChangeFormDiv'></div></li>" +
                "<li class='settingsItem'>" +
                "<a class='settingsItemA'>" +
                "<h3 class='settingsItemH'>" + strings.main_settings_field_facebook + "</h3>" +
                "<span class='settingsItemValue floatRight'>" + getFacebookFieldForSettings(result) + "</span>" +
                "<span><span class='settingsItemEditButton'></span></span></a> </li>" +
                "<li class='settingsItem'>" +
                "<a class='settingsItemA'>" +
                "<h3 class='settingsItemH'>" + strings.main_settings_field_google + "</h3>" +
                "<span class='settingsItemValue floatRight'>" + getGoogleFieldForSettings(result) + "</span>" +
                "<span><span class='settingsItemEditButton'></span></span></a> </li>" +
                "<li class='settingsItem'>" +
                "<a class='settingsItemA'>" +
                "<h3 class='settingsItemH'>" + strings.main_settings_field_calendar + "</h3>" +
                "<span class='settingsItemValue floatRight'>" + getCalendarFieldForSettings(result) + "</span>" +
                "<span><span class='settingsItemEditButton'></span></span></a> </li>" +
                getCalendarChooserField(result));
            $(".disconnectFbButton").click(function () {
                $.getJSON("/disconnect/1", function (result) {
                    if (result) {
                        modal.modal("hide");
                        $(".settingsBtn").click();
                    }
                })
            });
            $(".disconnectGoogleButton").click(function () {
                $.getJSON("/disconnect/2", function (result) {
                    if (result) {
                        modal.modal("hide");
                        $(".settingsBtn").click();
                    }
                })
            });
            $(".connectGoogleButton").click(function () {
                gapi.load('auth2', function () {
                    gapi.auth2.init();
                    var auth2 = gapi.auth2.getAuthInstance();
                    //console.log(auth2);
                    auth2.signIn().then(function (response) {//request to sign in
                        console.log(response);
                        console.log(response.getId());
                        var id = response.getId();
                        $.ajax({
                            url: "connectSocial/2",
                            data: {
                                value: id
                            }
                        }).done(function (result) {
                            if (result) {
                                modal.modal("hide");
                                $(".settingsBtn").click();
                            } else {
                                alert("Cant connect account")
                            }
                        })
                    });
                });


            });
            $(".connectFbButton").click(function () {
                FB.login(function (response) {
                    console.log(response);
                    var id = response.authResponse.userID;
                    $.ajax({
                        url: "connectSocial/1",
                        data: {
                            value: id
                        }
                    }).done(function (result) {
                        if (result) {
                            modal.modal("hide");
                            $(".settingsBtn").click();
                        } else {
                            alert("Cant connect account")
                        }
                    })
                })
            });
            $(".connectCalendarButton").click(function () {
                window.open("https://accounts.google.com/o/oauth2/v2/auth?" +
                    "scope=https://www.googleapis.com/auth/calendar&" +
                    "access_type=offline&" +
                    "prompt=consent&" +
                    "include_granted_scopes=true&" +
                    "state=state_parameter_passthrough_value&" +
                    "redirect_uri=http://allwitz.com/oauthcall&" +
                    "response_type=code&" +
                    "client_id=55995473742-00obqav5bir1au4qdn4l1jgdvf7kbmv2.apps.googleusercontent.com", "_self");
            });
            $(".disconnectCalendarButton").click(function () {
                $.getJSON("/disconnect/3", function (result) {
                    if (result) {
                        modal.modal("hide");
                        $(".settingsBtn").click();
                    }
                })
            });

            $("#nameSurnameSettingsItem").click(function () {
                if ($("#nameSurnameSettingsFormDiv").html() == "") {
                    dynamicCreateForm($("#nameSurnameSettingsFormDiv"), "editme", {
                        name: {
                            name: strings.main_label_name,
                            type: "text",
                            value: result.name
                        },
                        surname: {
                            name: strings.main_label_surname,
                            type: "text",
                            value: result.surname
                        }
                    }, function () {
                        $("#nameSurnameSettingsFormDiv").slideUp().html("")
                        $.getJSON("/mydata", function (result2) {
                            result = result2;
                            $("#settingsItemValueNameSurname").html(result.nameSurname)
                        })
                    });
                    $("#nameSurnameSettingsFormDiv").slideDown()

                } else {
                    $("#nameSurnameSettingsFormDiv").slideUp().html("")

                }

            });
            $("#emailSettingsItem").click(function () {
                if ($("#emailSettingsFormDiv").html() == "") {
                    dynamicCreateForm($("#emailSettingsFormDiv"), "editme", {
                        email: {
                            name: strings.main_label_email,
                            type: "text",
                            value: result.email,
                            //dynamicCreateFormFilterSample
                            filter: function (val) {
                                var valid = true;
                                $.ajax({
                                    type: 'GET',
                                    url: "emailexists?email=" + val,
                                    dataType: 'json',
                                    success: function (result) {
                                        valid = !result;
                                    },
                                    data: {},
                                    async: false
                                });
                                return valid;
                            }
                        }
                    }, function () {
                        $("#emailSettingsFormDiv").slideUp().html("")
                        $.getJSON("/mydata", function (result2) {
                            result = result2;
                            $("#settingsItemValueEmail").html(getMailStringForValue(result))
                        })
                    });
                    $("#emailSettingsFormDiv").slideDown()

                } else {
                    $("#emailSettingsFormDiv").slideUp().html("")

                }

            });
            $("#passwordSettingsItem").click(function () {
                if ($("#passwordSettingsFormDiv").html() == "") {
                    dynamicCreateForm($("#passwordSettingsFormDiv"), "editme", {
                        password: {
                            name: strings.main_label_password,
                            type: "text"
                        }
                    }, function () {
                        $("#passwordSettingsFormDiv").slideUp().html("")
                        $.getJSON("/mydata", function (result2) {
                            result = result2;
                            $("#settingsItemValueEmail").html(getMailStringForValue(result))
                        })
                    });
                    $("#passwordSettingsFormDiv").slideDown()

                } else {
                    $("#passwordSettingsFormDiv").slideUp().html("")

                }

            });
            $("#langSettingsItem").click(function () {
                if ($("#langSettingsFormDiv").html() == "") {
                    dynamicCreateForm($("#langSettingsFormDiv"), "editme", {
                        lang: {
                            name: strings.main_label_lang,
                            type: "comboBox",
                            valueField: "id",
                            nameField: "name",
                            url: "/getlanguages"
                        }
                    }, function () {
                        $("#langSettingsFormDiv").slideUp().html("")
                        $.getJSON("/mydata", function (result2) {
                            result = result2;
                            $("#settingsItemValueLang").html(result.langName)
                            eraseCookie("lang");
                            createCookie("lang", result["language"], 365);
                            location.reload();
                        })
                    });
                    $("#langSettingsFormDiv").slideDown()

                } else {
                    $("#langSettingsFormDiv").slideUp().html("")

                }

            });
            $("#calSettingsItem").click(function () {
                if ($("#calSettingsFormDiv").html() == "") {
                    dynamicCreateForm($("#calSettingsFormDiv"), "editme", {
                        cal: {
                            name: strings.main_label_calendar,
                            type: "comboBox",
                            valueField: "id",
                            nameField: "summary",
                            url: "/getmycalendarslist"
                        }
                    }, function () {
                        $("#calSettingsFormDiv").slideUp().html("")
                        $.getJSON("/mydata", function (result2) {
                            result = result2;
                            $("#settingsItemValueCal").html((result.calendarId ? result.calendarId : "not selected"))
                        })
                    });
                    $("#calSettingsFormDiv").slideDown()

                } else {
                    $("#calSettingsFormDiv").slideUp().html("")

                }

            });

        }, {}, 450, true);


    })

});
$(".profileBtn").click(function () {
    window.location = "/profile"

});
$(".langBtn").click(function () {
    var val = $(this).attr("value");

    console.log(val);
    createCookie("lang", val, 365);
    location.reload()

})


function getMailStringForValue(user) {
    return user.email
}
function getFacebookFieldForSettings(user) {
    if (user.facebookConnected) {
        return "connected<button class='disconnectFbButton btn' style='margin-left: 5px'>Disconnect</button>";
    } else {
        return "<button class='connectFbButton btn'>connect</button>"
    }
}
function getGoogleFieldForSettings(user) {
    if (user.googleConnected) {
        return "connected<button class='disconnectGoogleButton btn' style='margin-left: 5px'>Disconnect</button>";
    } else {
        return "<button class='connectGoogleButton btn'>connect</button>";
    }
}
function getCalendarFieldForSettings(user) {
    if (user.calendarConnected) {
        return "connected<button class='disconnectCalendarButton btn' style='margin-left: 5px'>Disconnect</button>";
    } else {
        return "<button class='connectCalendarButton btn'>connect</button>";
    }
}
function getCalendarChooserField(user) {
    if (user.calendarConnected) {
        return "<li class='settingsItem'>" +
            "<a class='settingsItemA'>" +
            "<h3 class='settingsItemH'>" + strings.main_settings_field_calendar_to_use + "</h3>" +
            "<span class='settingsItemValue' id='settingsItemValueCal'>" + (user.calendarId ? user.calendarId : "not selected") + "</span>" +
            "<span><span id='calSettingsItem' class='settingsItemEditButton'>edit</span></span></a> <div id='calSettingsFormDiv' hidden class='settingsChangeFormDiv'></div></li>";
    }
    else {
        return "";
    }

}
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
$(".logoutBtn").click(function () {
    $.getJSON("/logout", function (result) {
        if (result) {
            eraseCookie("projectSessionId");

            window.location.href = "/";
        }
    })
});
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function uploadFileToUrl(obj, url, callback) {
    var formData = new FormData();
    var xhr = new XMLHttpRequest();

    formData.append('file', obj);

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