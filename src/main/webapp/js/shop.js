

var Types = {
    init: function () {
        Types.GetTypes(function (data) {
            Types.CreateTypesNav(data);
        });
    },
    GetTypes: function (callBack) {
        AjaxRequest("types", "GET", function (data) {
            callBack(data);
        });
    },
    GetSubTypes: function (typeId, callBack) {
        AjaxRequest("subTypes/" + typeId, "GET", function (data) {
            callBack(data);
        });
    },
    CreateTypesNav: function (data) {
        var TypesNavContainer = $("#TypesNavContainer");
        $.each(data, function (i, d) {
            var typeItem = $(`<div id="p${i}" class="pkmn pkmnTpNav1">
                                <img src="images/logos/good.jpg" width="100" height="100">
                                <div style="text-align: center">${d.name}</div>
                              </div>`);
            typeItem.data(d);


            typeItem.click(function (e) {
                Types.onClickTypeNav($(this));
            });

            TypesNavContainer.append(typeItem);
        });
    },
    CreateSubTypeNav: function (data, typeId) {
        var TypesNavSubContainer = $("#TypesNavSubContainer");
        TypesNavSubContainer.empty();

        if (data.length != 0) {
            $(".TypesNavSubContainerWrapper").show();
        }

        $.each(data, function (i, d) {
            var stypeItem = $(`<div id="p${i}" class="pkmn pkmnTpNav2">
                           <img src="images/logos/good.jpg" width="100" height="100">
                           <div style="text-align: center">${d.name}</div>
                          </div>`);
            d.typeId = typeId;
            stypeItem.data(d);

            stypeItem.click(function (e) {
                Types.onClickSubTypeNav($(this));
            });

            TypesNavSubContainer.append(stypeItem);
        });

    },
    //Events============================================
    onClickTypeNav: function (cmp) {
        var data = cmp.data();
        Types.GetSubTypes(data.id, function (subData) {
            Types.CreateSubTypeNav(subData, data.id);
        });
        Products.GetProducts(0, Products.storeId, Products.sort, data.id, 0, function (result) {
            Products.CreateProducts(result);
        });


        $(".pkmnTpNav1").removeClass("activetpNav")
        cmp.addClass("activetpNav");
    },
    onClickSubTypeNav: function (cmp) {
        var data = cmp.data();
        Products.GetProducts(0, Products.storeId, Products.sort, data.typeId, data.id, function () {
            Products.CreateProducts(data.storeProducts);
        });

        $(".pkmnTpNav2").removeClass("activetpNav")
        cmp.addClass("activetpNav");
    }
}

var Products = {
    storeId: null,
    sort: 0,
    init: function () {
        var parStoreId = getUrlParameter("store");
        if (ValueNotEmpty(parStoreId)) Products.storeId = parseInt(parStoreId);
        Products.GetProducts(0, Products.storeId, Products.sort, 0, 0, function (data) {
            Products.CreateProducts(data);
        });
    },
    GetProducts: function (page, storeId, sort, typeId, subTypeId, callBack) {
        AjaxRequest("searchProducts/" + page + "?store=" + storeId + "&sort=" + sort + "&type=" + typeId + "&subType=" + subTypeId, "GET", function (data) {
            callBack(data);
        });
    },
    CreateProducts: function (data) {
        var ProductContainer = $("#ProductContainer");
        ProductContainer.empty();
        if (data.length == 0) return;
        $.each(data, function (i, d) {
            var Item = $(`<li><div class="">
                <div class="make-3D-space ">
                    <div class="product-card">
                        <div class="product-front">
                            <div class="shadow"></div>
                            <img src="picture/${d.galleryPictures[0].name}" class="fwi" alt=""/>
                            <div class="image_overlay"></div>
                            <a href='shopitem.html'>
                                <div class="view_details">მეტის ნახვა</div>
                            </a>
                            <div class="stats">
                                <div class="stats-container">
                                    <span class="product_price">${d.price}₾</span>
                                    <span class="product_name">${d.name}</span>
                                    <p>${d.type}</p>

                                    <div class="product-options">
                                        <strong>დეტალები</strong>
                                        <span>წარმოება: უცხოური</span>
                                        <strong>შეკვეთა</strong>
                                        <div class="input-group">
                                            <input type="number" class="form-control"
                                                   aria-label="რაოდენობა" placeholder="რაოდენობა" value="1"/>
                                            <div class="input-group-btn">
                                                <button type="button" class="btn btn-secondary dropdown-toggle"
                                                        data-toggle="dropdown" aria-haspopup="true"
                                                        aria-expanded="false">
                                                    დამატება
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div></li>`);
            Item.data(d);
            ProductContainer.append(Item);
        });

        $(".product-card").on({
            mouseenter: function () {
                $(this).addClass('animate');
                $(this).find('div.carouselNext, div.carouselPrev').addClass('visible');
            },
            mouseleave: function () {
                $(this).removeClass('animate');
                $(this).find('div.carouselNext, div.carouselPrev').removeClass('visible');
            }
        });
    }
}
