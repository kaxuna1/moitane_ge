function ValueNotEmpty(value) {
    return (
        value != null &&
        value != undefined &&
        value !== '' &&
        value !== "" ||
        (value === true || value === false)
    );
}
function ValueIsEmpty(value) {
    return !ValueNotEmpty(value);
}

function AjaxRequest( url, type, succAction, failAction) {
    $.ajax({
        url: url,
        type: type,
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function () {

        },
        complete: function () {

        },
        success: function (returnData) {

                if (ValueNotEmpty(succAction)) succAction(returnData);


            if (returnData.success == false) {
                if (ValueNotEmpty(failAction)) failAction(returnData.data);
            }
        },
        error: function () {

        }
    });
}