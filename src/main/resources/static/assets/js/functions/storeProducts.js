function loadStoreProducts(index, search) {
    $.getJSON("/getStoreProducts/" + index, function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        for (i = 0; i < storeProductColumns.length; i++) {
            var currentElement = storeProductColumns[i];
            $("#dataGridHeader").append("<th>" + currentElement + "</th>")
        }
        currentData = result;
        var dataArray = result["content"];
        var totalPages = result["totalPages"];
        var totalElements = result["totalElements"];
        for (i = 0; i < dataArray.length; i++) {
            var currentElement = dataArray[i];

            $("#dataGridBody").append("<tr value='" + i + "'   class='gridRow' ><td>" + currentElement["name"] + "</td>" +
                "<td>" + currentElement["type"] + "</td>" + "<td>" + currentElement["subType"] + "</td>" + "<td>" + currentElement["price"] + "</td>" +
                "<td><a value='" + currentElement['id'] + "' class='deleteCat' href='#'><i class='fa fa-times'></i></a></td>" +
                "</tr>");

        }
        for (i = 0; i < totalPages; i++) {
            $("#paginationUl").append('<li value="' + i + '" class="paginate_button ' + (index == i ? 'active"' : '') + '"><a href="#">' + (i + 1) + '</a></li>');
        }
        $(".paginate_button").click(function () {
            //console.log($(this).val())
            loadCategoriesData($(this).val(), search)
        });
        $(".deleteCat").click(function () {
            /*)*/
            var deleteValue = $(this).attr("value");
            showBootstrapPrompt("გსურთ წაშალოთ ჩანაწერი", {
                "კი": function () {
                    $.ajax({
                        url: "/deleteCategory",
                        data: {
                            id: deleteValue
                        }
                    }).done(function (result) {
                        loadCategoriesData(index, search);
                    });
                }
            });

        });
        $("#addNewDiv").html('<button id="addNewButton" data-target="#myModal" class="btn btn-sm btn-dark">' + strings["store_product_add_btn"] + '</button>');
        $("#addNewButton").click(function () {
            showModalWithTableInside(function (head, body, modal) {
                dynamicCreateForm(body, "/createStoreProduct", {
                    name: {
                        name: strings["store_product_name"],
                        type: "text"
                    },
                    type: {
                        name: strings["store_product_type"],
                        type: "comboBox",
                        valueField: "id",
                        nameField: "name",
                        url: "/types"
                    },
                    subType: {
                        name: strings["store_product_sub_type"],
                        type: "comboBox",
                        valueField: "id",
                        nameField: "name",
                        url: "/subTypes",
                        depends: {
                            field: "type",
                            urlTemplate: "/{type}"
                        }
                    },
                    price: {
                        name: strings["store_product_price"],
                        type: "number"
                    },
                    description: {
                        name: strings["store_product_description"],//TODO add label to DB
                        type: "text"
                    }
                }, function () {
                    modal.modal("hide");
                    loadStoreProducts(0, search);
                })
            })
        });


        var gridRow = $('.gridRow');
        gridRow.css('cursor', 'pointer');
        gridRow.unbind();
        gridRow.click(function () {
            var currentElement = dataArray[$(this).attr("value")];
            console.log(currentElement);
            showModalWithTableInside(function (head, body, modal, rand) {
                body.html(StoreProductTemplate);
                var details = $("#tab5_1");
                var sales = $("#tab5_2");
                var actions = $("#tab6_1");
                var infoDiv = $("#tab6_2");
                var DOMElements = {
                    details: details,
                    sales: sales,
                    actions: actions,
                    infoDiv: infoDiv,
                    modal: modal,
                    rand: rand,
                    currentElement: currentElement
                };


                drawGalleryTab(DOMElements, 0)
                drawDetails(DOMElements)


            }, {
                "დამატებითი ღილაკი": function () {
                }
            }, 1024);
        })

    });

    function drawGalleryTab(DOMElements, index) {

        DOMElements.details.html("");
        DOMElements.details.append("<input style='display: none' id='pictureField' type='file'/>")
        createButtonWithHandlerr(DOMElements.details, "Upload Picture", function () {
            $("#pictureField").click();
        });
        DOMElements.details.append("<div id='picturesDiv'></div>");
        DOMElements.picturesDiv = $("#picturesDiv");
        drawGallery(DOMElements);
        $("#pictureField").change(function () {
            var obj = this;
            var sendData = [];


            uploadFileToUrl(obj, 'uploadProductPic/' + DOMElements.currentElement.id, function () {
                drawGallery(DOMElements);
            });

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
    }
    function drawGallery(DOMElements) {
        DOMElements.picturesDiv.html("");
        $.getJSON("getProductPictures/"+DOMElements.currentElement.id,function (result) {
            createTable(DOMElements.picturesDiv,{
                image:{
                    name:"image"
                },
                download:{
                    name:"download"
                }
            },function (table) {
                for(key in result){
                    var item = result[key];
                    table.append("<tr><td><img style='height: 50px' src='picturelogo/"+item.name+"'></td>" +
                        "<td><a href='picture/"+item.name+"'>download</a></td></tr>")


                }
            })
        })
    }
    function drawDetails(DOMElements) {
        DOMElements.infoDiv.html("");
        createButtonWithHandlerr(DOMElements.infoDiv,strings.admin_button_change_price,function () {
           showModalWithTableInside(function (head, body, modal) {
               dynamicCreateForm(body,"changePrice",{
                   id:{
                       type:"hidden",
                       value:DOMElements.currentElement.id
                   },
                   price:{
                       name:strings.admin_label_price,
                       type:"number",
                       filter:function (val) {
                           return val >= 0;
                       }
                   }
               },function () {
                   modal.modal("hide");
                   loadStoreProducts(index, search);
               })
           })
        });
        DOMElements.infoDiv.append("<h2>"+strings.admin_label_price+":"+DOMElements.currentElement.price+"</h2>")
    }

    function drawInfoPage(DOMElements) {
        DOMElements.infoDiv.html("");
        DOMElements.infoDiv.append(
            "<div id='categoryLogoDiv' class='row'>" +
            "<div class='col-md-2'>" +
            "<img style='width: 150px' src='categorylogo/" + DOMElements.currentElement.id + "?" + new Date().getTime() + "'/>" +
            "</div>" +
            "<div class='col-md-2'>" +
            "</div>" +
            "</div>" +
            "<div id='catColor' class='row'>" +
            "<div class='col-md-2'>" +
            "color:" + DOMElements.currentElement.color +
            "</div>" +
            "<div class='col-md-2'>" +
            "</div>" +
            "</div>" +
            "<div id='catColor' class='row'>" +
            "<div class='col-md-12'>" +
            "Description:" + DOMElements.currentElement.description +
            "</div>" +
            "</div>");
        DOMElements.infoDiv.append(
            "<div class='row'>" +
            "<div>" +
            "</div>"
        )
        dropBoxFunc('promptModal' + DOMElements.rand, "uploadcategorylogo/" + DOMElements.currentElement.id, function () {
            drawInfoPage(DOMElements);
        });
    }


}