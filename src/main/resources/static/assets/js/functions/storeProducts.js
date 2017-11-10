function loadStoreProducts(index, search) {
    $.getJSON("/getStoreProducts/"+index, function (result) {
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
                "<td>" + currentElement["type"] + "</td>" +"<td>" + currentElement["subType"] + "</td>" +"<td>" + currentElement["price"] + "</td>" +
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
        $("#addNewDiv").html('<button id="addNewButton" data-target="#myModal" class="btn btn-sm btn-dark">'+strings["store_product_add_btn"]+'</button>');
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
                        depends:{
                            field:"type",
                            urlTemplate:"/{type}"
                        }
                    },
                    price: {
                        name: strings["store_product_price"],
                        type: "number"
                    }
                }, function () {
                    modal.modal("hide");
                    loadStoreProducts(0, search);
                })
            })
        });


        var gridRow=$('.gridRow');
        gridRow.css('cursor', 'pointer');
        gridRow.unbind();
        gridRow.click(function () {
            var currentElement = dataArray[$(this).attr("value")];
            console.log(currentElement);
            showModalWithTableInside(function (head, body, modal, rand) {
                body.html(productTypeTemplate);
                var subTypes = $("#tab5_1");
                var products = $("#tab5_2");
                var actions = $("#tab6_1");
                var infoDiv = $("#tab6_2");
                var DOMElements = {
                    subTypes: subTypes,
                    products: products,
                    actions: actions,
                    infoDiv: infoDiv,
                    modal: modal,
                    rand: rand,
                    currentElement:currentElement
                };





                drawSubTypes(DOMElements,0)






            }, {
                "დამატებითი ღილაკი": function () {
                }
            }, 1024);
        })

    });

    function drawSubTypes(DOMElements,index) {

        DOMElements.subTypes.html("");
        createButtonWithHandlerr(DOMElements.subTypes,'დამატება',function () {
            showModalWithTableInside(function (head, body, modal, rand) {
                dynamicCreateForm(body,"/createSubType",{
                    type:{
                        type:"hidden",
                        value:DOMElements.currentElement.id
                    },
                    name:{
                        name:strings.admin_label_name,
                        type:"text"
                    }
                },function () {
                    modal.modal("hide");
                    drawSubTypes(DOMElements,0)
                })
            },{},400)
        });

        $.getJSON("/productSubTypes/"+DOMElements.currentElement.id+"/"+index,function (result) {
            createTable(DOMElements.subTypes,{
                name:{
                    name:"name"
                }
            },function (table) {
                var data = result["content"];
                for(key in data){
                    var item = data[key];
                    table.append("<tr><td>"+item.name+"</td></tr>")
                }
            })
        })
    }

    function drawInfoPage(DOMElements){
        DOMElements.infoDiv.html("");
        DOMElements.infoDiv.append(
            "<div id='categoryLogoDiv' class='row'>" +
            "<div class='col-md-2'>"+
            "<img style='width: 150px' src='categorylogo/"+DOMElements.currentElement.id+"?"+ new Date().getTime()+"'/>"+
            "</div>" +
            "<div class='col-md-2'>" +
            "</div>" +
            "</div>"+
            "<div id='catColor' class='row'>" +
            "<div class='col-md-2'>"+
            "color:" + DOMElements.currentElement.color+
            "</div>" +
            "<div class='col-md-2'>" +
            "</div>" +
            "</div>"+
            "<div id='catColor' class='row'>" +
            "<div class='col-md-12'>"+
            "Description:" + DOMElements.currentElement.description+
            "</div>" +
            "</div>");
        DOMElements.infoDiv.append(
            "<div class='row'>" +
            "<div>" +
            "</div>"
        )
        dropBoxFunc('promptModal' + DOMElements.rand,"uploadcategorylogo/"+DOMElements.currentElement.id, function () {
            drawInfoPage(DOMElements);
        });
    }


}