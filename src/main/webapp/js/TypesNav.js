$(window).load(function(){
    //========================================================
    // Adds the active class to selected Pokemon
    //========================================================
    function changeActiveTpNav1() {
        var pkmn = $(".pkmnTpNav1");

       // pkmn.click(function(){
         //   pkmn.removeClass("active");
         //   $(this).addClass("active");
        //});
    }
    function setScrollTpNav1() {
        $(document).on("click", ".prevTpNav1", function() {
            var leftPos = $(".tpNav1").scrollLeft();

            if ($(".tpNav1").scrollLeft() > "0") {
                $(".tpNav1").animate({scrollLeft: leftPos - 500}, 300);
            }

            else {
                event.preventDefault();
            }
        });

        $(document).on("click", ".nextTpNav1", function() {
            var leftPos = $(".tpNav1").scrollLeft();

            if (leftPos < $(".tpNav1")[0].scrollWidth) {
                $(".tpNav1").animate({scrollLeft: leftPos + 500}, 300);
            }

            else {
                event.preventDefault();
            }
        });
    }

    function changeActiveTpNav2() {
        var pkmn = $(".pkmnTpNav2");

        pkmn.click(function(){
            pkmn.removeClass("active");
            $(this).addClass("active");
        });
    }
    function setScrollTpNav2() {
        $(document).on("click", ".prevTpNav2", function() {
            var leftPos = $(".tpNav2").scrollLeft();

            if ($(".tpNav2").scrollLeft() > "0") {
                $(".tpNav2").animate({scrollLeft: leftPos - 500}, 300);
            }

            else {
                event.preventDefault();
            }
        });

        $(document).on("click", ".nextTpNav2", function() {
            var leftPos = $(".tpNav2").scrollLeft();

            if (leftPos < $(".tpNav2")[0].scrollWidth) {
                $(".tpNav2").animate({scrollLeft: leftPos + 500}, 300);
            }

            else {
                event.preventDefault();
            }
        });
    }

    //changeActiveTpNav1();
    setScrollTpNav1();

    //changeActiveTpNav2();
    setScrollTpNav2();
});