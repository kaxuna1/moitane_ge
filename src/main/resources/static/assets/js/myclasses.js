/**
 * Created by vakhtanggelashvili on 5/21/17.
 */

$(document).ready(function () {
    $.getJSON("/mystudentschedule/60", function (result) {
        var callData = [];
        for (var key in result) {
            var item = result[key];
            callData.push({
                start: moment(item.startDate),
                end: moment(item.endDate).toDate(),
                title: item.categoryName
            })
        }
        $('#callAllLessons').fullCalendar({
            header: {
                left: 'prev',
                center: 'title',
                right: 'today   agendaWeek,listMonth   next'
            },
            defaultView: "agendaWeek",
            height: 500,
            minTime: "08:00:00",
            editable: false,
            eventLimit: true, // allow "more" link when too many events
            events: callData
        });
        $(".fc-prev-button").addClass("btn")
        $(".fc-next-button").addClass("btn")

        $(".fc-prev-button").addClass("myBtn")
        $(".fc-next-button").addClass("myBtn")


        $(".fc-agendaWeek-button").addClass("myBtn")
        $(".fc-agendaWeek-button").addClass("btn")


        $(".fc-today-button").addClass("myBtn")
        $(".fc-today-button").addClass("btn")



        $(".fc-listMonth-button").addClass("myBtn")
        $(".fc-listMonth-button").addClass("btn")

        $(".fc-prev-button").attr("style","background-color:transparent;")
        $(".fc-agendaWeek-button").attr("style","background-color:transparent;")
        $(".fc-today-button").attr("style","background-color:transparent;")
        $(".fc-listMonth-button").attr("style","background-color:transparent;")


        $(".fc-prev-button").removeClass("fc-button")
        $(".fc-prev-button").removeClass("fc-state-default")
        $(".fc-prev-button").removeClass("fc-corner-left")
        $(".fc-prev-button").removeClass("fc-corner-right")
        $(".fc-next-button").removeClass("fc-button")
        $(".fc-next-button").removeClass("fc-state-default")
        $(".fc-next-button").removeClass("fc-corner-left")
        $(".fc-next-button").removeClass("fc-corner-right")




        $(".fc-agendaWeek-button").removeClass("fc-button")
        $(".fc-agendaWeek-button").removeClass("fc-state-default")
        $(".fc-agendaWeek-button").removeClass("fc-corner-left")
        $(".fc-agendaWeek-button").removeClass("fc-corner-right")
        $(".fc-agendaWeek-button").removeClass("fc-state-active")

        $(".fc-today-button").removeClass("fc-button")
        $(".fc-today-button").removeClass("fc-state-default")
        $(".fc-today-button").removeClass("fc-corner-left")
        $(".fc-today-button").removeClass("fc-corner-right")
        $(".fc-today-button").removeClass("fc-state-active")

        $(".fc-listMonth-button").removeClass("fc-button")
        $(".fc-listMonth-button").removeClass("fc-state-default")
        $(".fc-listMonth-button").removeClass("fc-corner-left")
        $(".fc-listMonth-button").removeClass("fc-corner-right")
        $(".fc-listMonth-button").removeClass("fc-state-active")



        $(".fc-button").removeClass("fc-corner-right")
        $(".fc-button").removeClass("fc-corner-right")
        $(".fc-button").removeClass("fc-corner-right")
        $(".fc-button").removeClass("fc-corner-right")
    });

});