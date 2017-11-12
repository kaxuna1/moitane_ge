

var Types = {
    GetTypes : function (callBack) {
        AjaxRequest("types","GET",function (data) {
            callBack(data);
        });
    },
    GetSubTypes: function (typeId,callBack) {
        AjaxRequest("subTypes/"+typeId,"GET",function (data) {
            callBack(data);
        });
    },
    CreateTypesNav:function (data) {
      var TypesNavContainer = $("#TypesNavContainer");
      $.each(data,function (i,d) {
         var typeItem = $(`<div  class="TypeNav">
                           <img src="images/logos/good.jpg" width="100" height="100">
                           <div style="text-align: center">${d.name}</div>
                          </div>`);
          typeItem.data(d);

          typeItem.click(function (e) {
              var cmp = $(this);
              Types.GetSubTypes(cmp.data().id,function (subData) {
                  Types.CreateSubTypeNav(subData);
              });
          });

          TypesNavContainer.append(typeItem);
      });
    },
    CreateSubTypeNav:function (data) {
        var TypesNavSubContainer = $("#TypesNavSubContainer");
        TypesNavSubContainer.hide();
        TypesNavSubContainer.empty();
        $.each(data, function (i, d) {
            var stypeItem = $(`<div  class="TypeSubNav">
                           <img src="images/logos/good.jpg" width="100" height="100">
                           <div style="text-align: center">${d.name}</div>
                          </div>`);
            stypeItem.data(d);
            TypesNavSubContainer.append(stypeItem);
            if(data.length == i +1)
                TypesNavSubContainer.show();
        });

    }
}