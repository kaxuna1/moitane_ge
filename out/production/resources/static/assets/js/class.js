/**
 * Created by vakhtanggelashvili on 5/12/17.
 */


//google map api AIzaSyCQ3dsx4A353ZxftIJ7CkD2s9ZcFc_PTzg
$(document).ready(function () {
    $(document).on('click', 'a[href^="#"]', function(e) {
        // target element id
        var id = $(this).attr('href');

        // target element
        var $id = $(id);
        if ($id.length === 0) {
            return;
        }

        // prevent standard hash navigation (avoid blinking in IE)
        e.preventDefault();

        // top position relative to the document
        var pos = $id.offset().top;

        // animated top scrolling
        $('body, html').animate({scrollTop: pos});
    });
    var id = getParameterByName("id")
    $.getJSON("schedulefordays/" + id + "/45", function (result) {
        calendarInit(result);


        //$('#calendar').datepicker();


        $(".bookButton").click(function () {
            if (readCookie("projectSessionId")) {
                var timesString = "";
                var keys = Object.keys(timesForBook),
                    i, len = keys.length;

                keys.sort();
                if (len < 1)
                    return 0;

                for (i = 0; i < len; i++) {
                    var key = keys[i];
                    timesString += key + ",";

                }
                timesString = timesString.slice(0, -1)

                var url = "/order?id=" + id + "&times=" + timesString;

                window.location = url;


            } else {
                $("#logisignbtn").click();
            }
        })
    });
    $(document).ready(function () {
        function checkScroll() {
            var startY = $('.navbar').height() * 2; //The point where the navbar changes in px

            if ($(window).scrollTop() > startY) {
                $('.navbar').addClass("scrolled");
                $(".navlabel").addClass("navlabelScroled")
            } else {
                $('.navbar').removeClass("scrolled");
                $(".navlabel").removeClass("navlabelScroled")
            }
        }

        $(window).on("scroll load resize", function () {
            checkScroll();
        });
    })
    $(".addreview").click(function () {
        swal.setDefaults({
            input: 'text',
            confirmButtonText: 'Next &rarr;',
            showCancelButton: true,
            animation: true,
            progressSteps: ['1', '2']

        });
        var steps = [
            {
                title: 'Give rating',
                input: 'radio',
                inputOptions: {
                    '1': '1',
                    '2': '2',
                    '3': '3',
                    '4': '4',
                    '5': '5'
                }
            }, {
                title: 'leave comment'
            }
        ];
        swal.queue(steps).then(function (result) {

            if (result[0] && result[1]) {
                $.getJSON("/giverating?score=" + result[0] + "&comment=" + result[1] + "&id=" + getParameterByName("id"), function (result) {
                    if (result) {

                        swal.resetDefaults();
                        swal({
                            title: 'All done!',
                            html: 'Score submitted',
                            confirmButtonText: 'Finish',
                            showCancelButton: false
                        })
                    }
                })
            }

        }, function () {

        }).then(function () {
            location.reload()
        });
    })

});
function initMap() {

    map = new google.maps.Map(document.getElementById('mapDiv'), {
        zoom: 12,
        center: {lat: -34.397, lng: 150.644}
    });

    geocoder = new google.maps.Geocoder();

    geocodeAddress()
}
function geocodeAddress() {



    var image = {
        url: '/p.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(32, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32)
    };

    geocoder.geocode({'address': $("#address").html()}, function(results, status) {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.DROP,
                icon: image,
                position: results[0].geometry.location
            });
        } else {

        }
    });
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}