/**
 * Created by kakha on 11/12/2015.
 */

function loadCategoriesData(index, search) {
    $.getJSON("/categories/"+index, function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        for (i = 0; i < categoryColumns.length; i++) {
            var currentElement = categoryColumns[i];
            $("#dataGridHeader").append("<th>" + currentElement + "</th>")
        }
        currentData = result;
        var dataArray = result["content"];
        var totalPages = result["totalPages"];
        var totalElements = result["totalElements"];
        for (i = 0; i < dataArray.length; i++) {
            var currentElement = dataArray[i];

            $("#dataGridBody").append("<tr value='" + i + "'   class='gridRow' ><td>" + currentElement["name"] + "</td>" +
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
        $("#addNewDiv").html('<button id="addNewButton" data-target="#myModal" class="btn btn-sm btn-dark">'+strings["admin_button_add_category"]+'</button>');
        $("#addNewButton").click(function () {
            showModalWithTableInside(function (head, body, modal) {
                dynamicCreateForm(body, "/createcategory", {
                    name: {
                        name: strings["admin_label_name"],
                        type: "text"
                    }
                }, function () {
                    modal.modal("hide");
                    loadCategoriesData(0, search);
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
                body.html(categoryPageTemplate);
                var documents = $("#tab5_1");
                var teachers = $("#tab5_2");
                var translations = $("#tab5_3");
                var actions = $("#tab6_1");
                var infoDiv = $("#tab6_2");
                var DOMElements = {
                    documents: documents,
                    teachers: teachers,
                    translations: translations,
                    actions: actions,
                    infoDiv: infoDiv,
                    modal: modal,
                    rand: rand,
                    currentElement:currentElement
                };
                actions.append("<button id='giveColor'>Give Color</button>");
                actions.append("<button id='giveDesc'>Set Description</button>");
                actions.append("<button id='giveDescColor'>Set Description Color</button>");
                $("#giveColor").click(function () {
                   showModalWithTableInside(function (head, body, modal, rand) {
                       dynamicCreateForm(body,"setcolor/"+currentElement.id,{
                           color:{
                               name:"",
                               type:"text"
                           }
                       },function () {
                           modal.modal("hide");
                       })
                   },{},400)
                });
                $("#giveDesc").click(function () {
                   showModalWithTableInside(function (head, body, modal, rand) {
                       dynamicCreateForm(body,"setdescription/"+currentElement.id,{
                           description:{
                               name:"",
                               type:"text"
                           }
                       },function () {
                           modal.modal("hide");
                       })
                   },{},400)
                });
                $("#giveDescColor").click(function () {
                   showModalWithTableInside(function (head, body, modal, rand) {
                       dynamicCreateForm(body,"setdescriptioncolor/"+currentElement.id,{
                           descriptionColor:{
                               name:"",
                               type:"text"
                           }
                       },function () {
                           modal.modal("hide");
                       })
                   },{},400)
                });

                documents.append('<div style="display:inline-flex;width: 100%">' +
                    '    <div style="width: 45%">' +
                    '        <table class="table">' +
                    '            <thead>' +
                    '            <tr>' +
                    '                <th class="text-left">'+strings["admin_label_required_document_types"]+'</th>' +
                    '            </tr>' +
                    '            </thead>' +
                    '            <tbody id="categoryDocTypes">' +
                    '            </tbody>' +
                    '        </table>' +
                    '    </div>' +
                    '    <div style="width:10%">' +
                    '        <button style="width: 100%" id="removeDocType">-></button>' +
                    '        <br>' +
                    '        <button style="width: 100%" id="addDocType"><-</button>' +
                    '    </div>' +
                    '    <div style="width: 45%">' +
                    '        <table class="table">' +
                    '            <thead>' +
                    '            <tr>' +
                    '                <th class="text-left">'+strings["admin_label_types_to_add"]+'</th>' +
                    '            </tr>' +
                    '            </thead>' +
                    '            <tbody id="notCategoryDocTypes">' +
                    '            </tbody>' +
                    '        </table>' +
                    '    </div>' +
                    '</div>');

                drawDocTypesForAdding(currentElement.id);

                var addPerms = $("#addDocType");
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
                        url: "/givecategorydoctype",
                        data: {
                            id: currentElement["id"],
                            ids: productIds.toString()
                        }
                    }).done(function (result) {
                        drawDocTypesForAdding(currentElement["id"]);
                    })
                });
                var removePerms = $("#removeDocType");
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
                        url: "/removecategorydoctype",
                        data: {
                            id: currentElement["id"],
                            ids: productIds.toString()
                        }
                    }).done(function (result) {
                        drawDocTypesForAdding(currentElement["id"]);
                    })
                })
                drawInfoPage(DOMElements);
                drawTranslationsTab(DOMElements);





            }, {
                "დამატებითი ღილაკი": function () {
                }
            }, 1024);
        })
        if(permissions["docTypes"]){
            createButtonWithHandlerr($("#addNewDiv"),strings["admin_button_doctypes"], function () {
                showModalWithTableInside(function (head, body, modal, rand) {
                    head.html("<h2>"+strings["admin_label_document_types"]+"</h2>");
                    body.append("<div id='buttonsDivForDocTypes'></div>" +
                        "<div id='addFormDiv'></div>" +
                        "<div>" +
                        "<table class='table-bordered table'>" +
                        "<thead>" +
                        "<tr>" +
                        "<th>"+strings["admin_label_name"]+"</th>" +
                        "</tr>" +
                        "</thead>" +
                        "<tbody id='docTypesTableBody'>" +
                        "</tbody>" +
                        "</table>" +
                        "</div>");
                    createButtonWithHandlerr($("#buttonsDivForDocTypes"),strings["admin_button_add_new_doc_type"], function () {
                        $("#addFormDiv").html("");
                        dynamicCreateForm($("#addFormDiv"), "/createdoctype", {
                            name: {
                                name: "სახელი",
                                type: "text"
                            }
                        }, function () {
                            $("#addFormDiv").html("");
                            loadDocTypesInTable($("#docTypesTableBody"))
                        })

                    });
                    loadDocTypesInTable($("#docTypesTableBody"))
                },{},1024);
            })
        }

    });
    function drawDocTypesForAdding(id) {
        $.getJSON("/getcategorydocs/" + id, function (result) {
            var categoryDocsTable = $("#categoryDocTypes");
            categoryDocsTable.html("");
            for (var key in result) {
                categoryDocsTable.append("<tr><td><input class='checkboxUserPerm' value='" + result[key].id + "' type='checkbox'> " + result[key].name + "</td></tr>")
            }
        });
        $.getJSON("/getnotcategorydocs/" + id, function (result) {
            var notCategoryDocsTable = $("#notCategoryDocTypes");
            notCategoryDocsTable.html("");
            for (var key in result) {
                notCategoryDocsTable.append("<tr><td><input class='checkboxPerm' value='" + result[key].id + "' type='checkbox'> " + result[key].name + "</td></tr>")
            }
        });
    }
    function loadDocTypesInTable(tBody){
        tBody.html("");
        $.getJSON("/doctypes", function (result) {
            for(var key in result){
                var item=result[key];
                tBody.append("<tr><td>"+item.name+"</td></tr>")
            }
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
    function drawTranslationsTab(DOMElements) {
        DOMElements.translations.html("");
        DOMElements.translations.append("<div id='stringTranslationAddButtonPlace'></div>" +
            "<div id='stringTranslationAddFormPlace'></div>");
        createButtonWithHandlerr($("#stringTranslationAddButtonPlace"), strings.admin_button_add, function () {
            $("#stringTranslationAddFormPlace").html("")
            dynamicCreateForm($("#stringTranslationAddFormPlace"),"/addtranslation",{
                value: {
                    name: strings.admin_label_value,
                    type: "text"
                },
                lang: {
                    name: strings.admin_label_lang,
                    type: "comboBox",
                    valueField: "id",
                    nameField: "name",
                    url: "/langsnotinstring/"+DOMElements.currentElement.uuid
                },
                uuid:{
                    value:DOMElements.currentElement.uuid,
                    type:"hidden"
                },
                name:{
                    value:DOMElements.currentElement.name,
                    type:"hidden"
                }
            },function () {
                $("#stringTranslationAddFormPlace").html("");
                drawTranslationsTab(DOMElements);
            });

        });
        $.getJSON("translationsfor/" + DOMElements.currentElement.uuid, function (resultData) {
            console.log(resultData)
            createTable(DOMElements.translations,{
                lang:{name:strings.admin_label_lang},
                value:{name:strings.admin_label_value}
            },function (table) {
                for(var key in resultData){
                    var item=resultData[key];
                    table.append("<tr>" +
                        "<td>"+item.langName+"</td>" +
                        "<td>"+item.value+"</td>" +
                        "</tr>")
                }
            })
        })
    }

}