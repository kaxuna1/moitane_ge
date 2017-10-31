/**
 * Created by vakhtanggelashvili on 3/26/17.
 */
var openTextGlobal;
function loadTexts(index, search) {

    $("#addNewDiv").html(
        '');
    createButtonWithHandlerr($("#addNewDiv"), strings["admin_button_add"], function () {
        showModalWithTableInside(function (head, body, modal, rand) {
            dynamicCreateForm(body, "/createstring", {
                name: {
                    name: strings.admin_label_name,
                    type: "text"
                },
                value: {
                    name: strings.admin_label_value,
                    type: "text"
                }
            }, function () {
                dataLoading();
                modal.modal("hide");
            })
        }, {

        }, 500)
    });
    dataLoading()
    function dataLoading() {
        $.getJSON("/strings/" + index, function (result) {
            $("#dataGridHeader").html("");
            $("#dataGridBody").html("");
            $("#paginationUl").html("");
            for (i = 0; i < stringsColumns.length; i++) {
                var currentElement = stringsColumns[i];
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
                    "<td><input type='checkbox'></td>" +
                    "<td style='font-family: font1;' value='" + i + "' class='gridRowClientUz2'>" + currentElement["name"] + "</td>" +
                    "<td style='font-family: font1;' value='" + i + "' class='gridRowClientUz2'>" + currentElement["value"] + "</td>" +
                    "</tr>");


            }
            var gridRow = $('.gridRowClientUz2');
            gridRow.css('cursor', 'pointer');
            gridRow.unbind();
            gridRow.click(function () {
                var currentItem = dataArray[$(this).attr("value")];
                openTextGlobal(currentItem.uuid,currentItem.name);
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

    openTextGlobal = function (uuid,name, DOMElements) {
        showModalWithTableInside(function (head, body, modalMain, rand) {
            head.html(name)
            body.append("<div id='stringTranslationAddButtonPlace'></div>" +
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
                        url: "/langsnotinstring/"+uuid
                    },
                    uuid:{
                        value:uuid,
                        type:"hidden"
                    },
                    name:{
                        value:name,
                        type:"hidden"
                    }
                },function () {
                    $("#stringTranslationAddFormPlace").html("");
                    modalMain.modal("hide")
                    openTextGlobal(uuid,name, DOMElements);

                })
            });
            $.getJSON("/translationsfor/" + uuid, function (resultData) {
                console.log(resultData)
                createTable(body,{
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
        }, {}, 500);
    }
}