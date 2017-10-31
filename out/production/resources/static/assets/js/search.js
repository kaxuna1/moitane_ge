/**
 * Created by vakhtanggelashvili on 5/7/17.
 */
var sortMenu = false;
var priceMenu = false;
var map;
var geocoder;
var locationPoint  = 1;

var educationMap = {
    "2":"High School",
    "3":"Bachelor’s Degree",
    "4":"Master’s Degree",
    "5":"PhD"
};
var markerMap={

}



function loadSearch(city, clas, page, lower, upper, loadmore) {
    $.getJSON("/searchapi?city=" + $(".citySearchField").val()
        + "&category=" + $(".categorySearchField").val()
        + "&location=" + locationPoint
        + "&education=" + $(".educationCheck:checked").val()
        + "&exp=" + $(".expirienceCheck:checked").val()
        + "&age=" + $(".ageCheck:checked").val()
        + "&page=" + page
        + "&lower=" + lower
        + "&sort=" + $(".sortCheck:checked").val()
        + "&upper=" + upper, function (result) {
        $("#numberOfResult").html(result.numberOfElements + " results");
        var data = result["content"]

        if (!loadmore){

            $(".searchResultDiv").html("");
            try{
                map.clearOverlays();
            }catch (e){
                console.log(e);
            }
        }


        for (key in data) {

            var ratingStars = "";
            var item = data[key];
            var rating = item.rating;
            for (var i = 0; i < rating; i++) {
                ratingStars += '<img class="staricon" src="png/search/v.png">';
            }
            var itemString = '<article value="'+item.user.id+'" class="searchResultItem">' +
                '    <div class="searchResultItemTop">' +
                '        <div class="searchResultItemTopImgDiv">' +
                '            <a href="class?id=' + item.id + '"><img class="img-circle searchResultItemTopImg" src="profilePic/' + item.user.id + '"></a>' +
                '        </div>' +
                '        <div class="searchResultItemTopTextDiv">' +
                '            <div class="searchResultItemTopTextDivChild">' +
                '                <a href="class?id=' + item.id + '"><p class="nameLabel">' +
                '                    ' + item.user.name +
                '                </p></a>' +
                '                <div class="degreeAndClass"><p class="classLabel">' +
                '                   ' + item["categoryName"] +
                '                </p>' +
                '                <p class="degreeLabel">' +
                '                   ' +educationMap[item.education]+
                '                </p></div>' +
                '            </div>' +
                '        </div>' +
                '        <div class="searchResultItemTopPriceDiv">' +
                '                            <span class="priceLabelClass"><span class="priceTag">' + item.price + '₾</span> <span' +
                '                                    class="delimiter">/</span>class</span>' +
                '        </div>' +
                '    </div>' +
                '    <div class="searchResultItemBottom" style="">' +
                '        <div class="starRatingDiv">' +
                '                             <span class="starRating">' +
                ratingStars +
                '                             </span>' +
                '            <span class="reviewsLabel">' +
                '                                ' + item.ratingNum + ' reviews' +
                '                            </span>' +
                '            <span class="viewsLabel">' +
                '                                <img src="png/search/4.png">' + item.views +
                '                            </span>' +
                '            <a href="class?id=' + item.id + '"><button class="btn readMoreBtn">' +
                '                Read More' +
                '            </button></a>' +
                '        </div>' +
                '' +
                '    </div>' +
                '</article>';
            $(".searchResultDiv").append(itemString);
            console.log(item);
            geocodeAddress(item.user.city.name+" "+item.user.address,item.user.id)

        }
        $(".searchResultItem").mouseenter(function () {
           var id = $(this).attr("value");
           markerMap[id].setAnimation(google.maps.Animation.BOUNCE);
        });
        $(".searchResultItem").mouseleave(function () {
           var id = $(this).attr("value");
           markerMap[id].setAnimation(null);
        });
        if(!result.last){
            $(".searchResultDiv")
                .append("<a id='loadMore' style='cursor: pointer;margin: auto;font-family: brixLight;font-size: 18px'>Load more</a>");
        }
        $("#loadMore").unbind().click(function () {
            page++;
            $(this).remove();
            loadSearch(city, clas, page, lower, upper, true);
        })
    })
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
function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {lat: -34.397, lng: 150.644}
    });

    geocoder = new google.maps.Geocoder();
    $(document).ready(function () {

        $(".radio").kalypto({toggleClass: "toggleR"});

        var city = getParameterByName('city');
        var clas = getParameterByName('class');
        console.log(city, clas);
        $("#upper").val(199);
        $("#lower").val(0);



        $("#lower").change(function () {

            console.log($(this).val())
            if ($(this).val() > $("#upper").val()) {
                $("#upper").val($(this).val()+1)
            }
            loadSearch(city, clas, 0, $("#lower").val(), $("#upper").val())
            drawPriceRange($("#lower").val(), $("#upper").val())
        });
        $("#upper").change(function () {
            console.log($(this).val())
            if ($(this).val() < $("#lower").val()) {
                $("#lower").val($(this).val()-1)
            }
            loadSearch(city, clas, 0, $("#lower").val(), $("#upper").val())
            drawPriceRange($("#lower").val(), $("#upper").val())
        });
        $(".meeting_point").change(function () {
            loadSearch(city, clas, 0, $("#lower").val(), $("#upper").val())
        });


        function drawPriceRange(lower, upper) {
            $(".priceRangeClass").html(lower + "₾ - " + upper + "₾")
        }


        $(".citySearchField").val(city).change(function () {
            loadSearch($(".citySearchField").val(), $(".categorySearchField").val(), 0, $("#lower").val(), $("#upper").val())
        });


        $(".categorySearchField").val(clas).change(function () {
            loadSearch($(".citySearchField").val(), $(".categorySearchField").val(), 0, $("#lower").val(), $("#upper").val())
        });
        $(".sortCheck").change(function () {
            loadSearch($(".citySearchField").val(), $(".categorySearchField").val(), 0, $("#lower").val(), $("#upper").val())
        });
        $(".educationCheck").change(function () {
            loadSearch($(".citySearchField").val(), $(".categorySearchField").val(), 0, $("#lower").val(), $("#upper").val())
        });
        $(".expirienceCheck").change(function () {
            loadSearch($(".citySearchField").val(), $(".categorySearchField").val(), 0, $("#lower").val(), $("#upper").val())
        });
        $(".ageCheck").change(function () {
            loadSearch($(".citySearchField").val(), $(".categorySearchField").val(), 0, $("#lower").val(), $("#upper").val())
        });

        loadSearch(city, clas, 0, $("#lower").val(), $("#upper").val())
        $(".dropMenu").click(function () {
            $(".dropMenu").removeClass("activeItem");

            $(this).addClass("activeItem");
            $(".searchResultDiv").addClass("hr");
            var item = this;
            $(document).mouseup(function (e) {
                var container = $(item);

                // if the target of the click isn't the container nor a descendant of the container
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    $(".searchResultDiv").removeClass("hr")
                    container.removeClass("activeItem");

                }
            });
        });

        $(".placeSearchField").val("");
        $(".placeSearchField").typeahead({
            source: [{
                id:"1",
                name:"Teacher's place"
            },{
                id: "2",
                name:"Student's place"
            }],
            minLength:0,
            highlight: true,
            hint:true,
            autoSelect: true,
            afterSelect: function (selected) {
                console.log(selected);
                locationPoint = selected.id
                loadSearch($(".citySearchField").val(), $(".categorySearchField").val(), 0, $("#lower").val(), $("#upper").val())
            },
            fitToElement: true,
            items: 5
        });
        $(".placeSearchField").on("click", function () {
            ev = $.Event("keydown")
            ev.keyCode = ev.which = 40
            $(this).trigger(ev)
            return true
        });


        var lowerSlider = document.querySelector('#lower'),
            upperSlider = document.querySelector('#upper'),
            lowerVal = parseInt(lowerSlider.value);
        upperVal = parseInt(upperSlider.value);

        upperSlider.oninput = function () {
            lowerVal = parseInt(lowerSlider.value);
            upperVal = parseInt(upperSlider.value);

            if (upperVal < lowerVal + 4) {
                lowerSlider.value = upperVal - 4;

                if (lowerVal == lowerSlider.min) {
                    upperSlider.value = 4;
                }
            }
        };


        lowerSlider.oninput = function () {
            lowerVal = parseInt(lowerSlider.value);
            upperVal = parseInt(upperSlider.value);

            if (lowerVal > upperVal - 4) {
                upperSlider.value = lowerVal + 4;

                if (upperVal == upperSlider.max) {
                    lowerSlider.value = parseInt(upperSlider.max) - 4;
                }

            }
        };


    });
}
function geocodeAddress(address,id) {

    if(markerMap[id])
        return;

    markerMap[id] = 1;

    var image = {
        url: '/p.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(32, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32)
    };

    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.DROP,
                icon: image,
                position: results[0].geometry.location
            });
            markerMap[id]=marker;
        } else {

        }
    });
}