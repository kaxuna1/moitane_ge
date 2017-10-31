/**
 * Created by vakhtanggelashvili on 5/14/17.
 */

var timesForBook = {};
var k = 1;

var currentDay = null;
var currentSelf = null;

function calendarInit(data) {
    //console.log(data)
    !function () {

        var today = moment();
        today.startOf('isoweek');

        function Calendar(selector, events) {
            this.el = document.querySelector(selector);
            this.events = events;
            this.current = moment().startOf('isoweek').date(1);
            this.draw();
            var current = document.querySelector('.today');

        }

        Calendar.prototype.draw = function () {
            //Create Header
            this.drawHeader();

            //Draw Month
            this.drawMonth();

            //this.drawLegend();
        }

        Calendar.prototype.drawHeader = function () {
            var self = this;
            if (!this.header) {
                //Create the header elements
                this.header = createElement('div', 'header');
                this.header.className = 'header';

                this.title = createElement('h1');

                var right = createElement('div', 'right');
                right.addEventListener('click', function () {
                    self.nextMonth();
                });

                var left = createElement('div', 'left');
                left.addEventListener('click', function () {
                    self.prevMonth();
                });

                //Append the Elements
                this.header.appendChild(this.title);
                this.header.appendChild(right);
                this.header.appendChild(left);
                this.el.appendChild(this.header);
            }

            this.title.innerHTML = this.current.format('MMMM YYYY');
        }

        Calendar.prototype.drawMonth = function () {
            var self = this;

            this.events.forEach(function (ev) {
                ev.date = self.current.clone().date(Math.random() * (29 - 1) + 1);
            });


            if (this.month) {
                this.oldMonth = this.month;
                this.oldMonth.className = 'month out ' + (self.next ? 'next' : 'prev');
                this.oldMonth.addEventListener('webkitAnimationEnd', function () {
                    self.oldMonth.parentNode.removeChild(self.oldMonth);
                    self.month = createElement('div', 'month');
                    k = 1;
                    self.backFill();
                    self.currentMonth();
                    self.fowardFill();
                    self.el.appendChild(self.month);
                    window.setTimeout(function () {
                        self.month.className = 'month in ' + (self.next ? 'next' : 'prev');

                    }, 16);
                });
            } else {
                this.month = createElement('div', 'month');
                this.el.appendChild(this.month);
                this.backFill();
                this.currentMonth();
                this.fowardFill();
                this.month.className = 'month new';
            }

        }

        Calendar.prototype.backFill = function () {
            var clone = this.current.clone();
            var dayOfWeek = clone.day();

            if (!dayOfWeek) {
                return;
            }

            clone.subtract('days', dayOfWeek + 1);

            for (var i = dayOfWeek; i > 0; i--) {
                this.drawDay(clone.add('days', 1));
            }
        }

        Calendar.prototype.fowardFill = function () {
            var clone = this.current.clone().add('months', 1).subtract('days', 1);
            var dayOfWeek = clone.day();

            if (dayOfWeek === 6) {
                return;
            }

            for (var i = dayOfWeek; i < 6; i++) {
                this.drawDay(clone.add('days', 1));
            }
        }

        Calendar.prototype.currentMonth = function () {
            var clone = this.current.clone();
            var k = 1;
            while (clone.month() === this.current.month()) {
                this.drawDay(clone, k);
                clone.add('days', 1);
                //k++;
            }
        }

        Calendar.prototype.getWeek = function (day) {
            if (!this.week || day.day() === 0) {
                this.week = createElement('div', 'week');
                this.month.appendChild(this.week);
            }
        }

        Calendar.prototype.drawDay = function (day) {

            var self = this;
            this.getWeek(day);


            var itemsToday = data.reduce(function (memo, item) {
                if (moment(item.starting_time).isSame(day, 'day')) {
                    memo.push(item);
                }
                return memo;
            }, []);
            var withDates = itemsToday.length > 0 ? " withDates" : "";

            //Outer Day
            var outer = createElement('div', this.getDayClass(day) );
            outer.addEventListener('click', function () {

                var dontOpen = self.openDay(this);

                if(dontOpen){
                    return;
                }

                $(".calendarBodyTimes").removeClass("hide");
                $(".calendarBody").addClass("hide");

                $(".goback").unbind().click(function () {
                    $(".calendarBodyTimes").addClass("hide");
                    $(".calendarBody").removeClass("hide");
                });


                console.log(this);
            });

            //Day Name
            var name = createElement('div', 'day-name', day.format('dd'));

            //Day Number
            var number = createElement('div', 'day-number'+withDates, day.format('D'));


            //Events
            //var events = createElement('div', 'day-events');
            //this.drawEvents(day, events);

            if (k < 8)
                outer.appendChild(name);
            outer.appendChild(number);
            //outer.appendChild(events);
            this.week.appendChild(outer);
            k++;
        }

        Calendar.prototype.drawEvents = function (day, element) {
            if (day.month() === this.current.month()) {
                var todaysEvents = this.events.reduce(function (memo, ev) {
                    if (ev.date.isSame(day, 'day')) {
                        memo.push(ev);
                    }
                    return memo;
                }, []);

                todaysEvents.forEach(function (ev) {
                    var evSpan = createElement('span', ev.color);
                    element.appendChild(evSpan);
                });
            }
        }

        Calendar.prototype.getDayClass = function (day) {
            classes = ['day'];
            if (day.month() !== this.current.month()) {
                classes.push('other');
            } else if (today.isSame(day, 'day')) {
                classes.push('today');
            }
            return classes.join(' ');
        }

        Calendar.prototype.openDay = function (el) {

            var self = this;
            var details, arrow;
            var dayNumber = +el.querySelectorAll('.day-number')[0].innerText || +el.querySelectorAll('.day-number')[0].textContent;
            var day = this.current.clone().date(dayNumber);
            //console.log(day.date())

            $("#dayname").html(day.format("ddd, MMM DD"));

            $(".timesPlaceTableBody").html("");
            var size = 0;
            var todayDates = data.reduce(function (memo, item) {
                if (moment(item.starting_time).isSame(day, 'day') && !timesForBook[item.starting_time]) {
                    $(".timesPlaceTableBody").append("<tr>" +
                        "<td class='timeTd'>" +
                        moment(item.starting_time).format("HH:mm") +
                        "-" +
                        moment(item.starting_time).add(parseInt($("#duration").html()),"minutes").format("HH:mm") +
                        "</td>" +
                        "<td>" +
                        "<button value='"+item.starting_time+"' class='btn addTimeButton'>+" +
                        "</button></td>" +
                        "</tr>");
                    size++;
                }
                return memo;
            }, []);
            if(size===0){
                return true;
            }
            $(".addTimeButton").click(function () {
                timesForBook[$(this).attr("value")]=$(this).attr("value");
                self.openDay(el);
                drawItemsToBook()
            })
            return false;
        };

        Calendar.prototype.renderEvents = function (events, ele) {

            //console.log(events);
            //Remove any events in the current details element
            var currentWrapper = ele.querySelector('.events');
            var wrapper = createElement('div', 'events in' + (currentWrapper ? ' new' : ''));

            events.forEach(function (ev) {
                //console.log(ev);
                //console.log(new Date(ev.starting_time));
                var div = createElement('div', 'event');
                var square = createElement('div', 'event-category ' + "black");
                var span = createElement('span', 'timeIntervalItem', moment(ev.starting_time).locale("ka").format("HH:mm") + "-" + moment(ev.ending_time).locale("ka").format("HH:mm"));
                var buttonForThis = createElement("button", "btn addIntervalBtn", "+");


                span.setAttribute("value", ev.starting_time);
                buttonForThis.setAttribute("value", ev.starting_time);

                div.appendChild(square);
                div.appendChild(span);
                div.appendChild(buttonForThis);
                wrapper.appendChild(div);
            });

            if (!events.length) {
                var div = createElement('div', 'event empty');
                var span = createElement('span', '', 'Empty');

                div.appendChild(span);
                wrapper.appendChild(div);
            }

            if (currentWrapper) {
                currentWrapper.className = 'events out';
                currentWrapper.addEventListener('webkitAnimationEnd', function () {
                    currentWrapper.parentNode.removeChild(currentWrapper);
                    ele.appendChild(wrapper);
                });
                currentWrapper.addEventListener('oanimationend', function () {
                    currentWrapper.parentNode.removeChild(currentWrapper);
                    ele.appendChild(wrapper);
                });
                currentWrapper.addEventListener('msAnimationEnd', function () {
                    currentWrapper.parentNode.removeChild(currentWrapper);
                    ele.appendChild(wrapper);
                });
                currentWrapper.addEventListener('animationend', function () {
                    currentWrapper.parentNode.removeChild(currentWrapper);
                    ele.appendChild(wrapper);
                });
            } else {
                ele.appendChild(wrapper);
            }
        }

        Calendar.prototype.drawLegend = function () {
            var legend = createElement('div', 'legend');
            var calendars = this.events.map(function (e) {
                return e.calendar + '|' + e.color;
            }).reduce(function (memo, e) {
                if (memo.indexOf(e) === -1) {
                    memo.push(e);
                }
                return memo;
            }, []).forEach(function (e) {
                var parts = e.split('|');
                var entry = createElement('span', 'entry ' + parts[1], parts[0]);
                legend.appendChild(entry);
            });
            this.el.appendChild(legend);
        }

        Calendar.prototype.nextMonth = function () {
            this.current.add('months', 1);
            this.next = true;
            this.draw();

        }

        Calendar.prototype.prevMonth = function () {
            this.current.subtract('months', 1);
            this.next = false;
            this.draw();
            //$(".calendarTopDiv").height(parseInt($("#calendar").height()) + 60);
        }

        window.Calendar = Calendar;

        function createElement(tagName, className, innerText) {
            var ele = document.createElement(tagName);
            if (className) {
                ele.className = className;
            }
            if (innerText) {
                ele.innderText = ele.textContent = innerText;
            }
            return ele;
        }
    }();

    !function () {
        var data = [
            {eventName: 'Lunch Meeting w/ Mark', calendar: 'Work', color: 'orange'},
            {eventName: 'Interview - Jr. Web Developer', calendar: 'Work', color: 'orange'},
            {eventName: 'Demo New App to the Board', calendar: 'Work', color: 'orange'},
            {eventName: 'Dinner w/ Marketing', calendar: 'Work', color: 'orange'},

            {eventName: 'Game vs Portalnd', calendar: 'Sports', color: 'blue'},
            {eventName: 'Game vs Houston', calendar: 'Sports', color: 'blue'},
            {eventName: 'Game vs Denver', calendar: 'Sports', color: 'blue'},
            {eventName: 'Game vs San Degio', calendar: 'Sports', color: 'blue'},

            {eventName: 'School Play', calendar: 'Kids', color: 'yellow'},
            {eventName: 'Parent/Teacher Conference', calendar: 'Kids', color: 'yellow'},
            {eventName: 'Pick up from Soccer Practice', calendar: 'Kids', color: 'yellow'},
            {eventName: 'Ice Cream Night', calendar: 'Kids', color: 'yellow'},

            {eventName: 'Free Tamale Night', calendar: 'Other', color: 'green'},
            {eventName: 'Bowling Team', calendar: 'Other', color: 'green'},
            {eventName: 'Teach Kids to Code', calendar: 'Other', color: 'green'},
            {eventName: 'Startup Weekend', calendar: 'Other', color: 'green'}
        ];


        function addDate(ev) {

        }

        var calendar = new Calendar('#calendar', data);

    }();
}
function drawItemsToBook() {
    var itemsNum = 0;
    var table = $(".timesChosenPlaceTableBody")
    table.html("")
    var keys = Object.keys(timesForBook),
        i, len = keys.length;

    keys.sort();

    for (i = 0; i < len; i++) {
        var key = keys[i];
        table.append("<tr><td class='timeTd'>" +
            moment(parseInt(key)).locale("us").format("LL") +
            "</td>" +
            "<td class='timeTd'>" +
            moment(parseInt(key)).locale("us").format("HH:mm") +
            "-" +
            moment(parseInt(key)).add(parseInt($("#duration").html()),"minutes").format("HH:mm")+
            "</td>" +
            "<td class='removeTd'>" +
            "<a class='removeDateFromItems' value='" + key + "' >X</a>" +
            "</td>" +
            "</tr>")
        console.log(key);
        itemsNum++;
    }


    if (itemsNum == 0) {
        $(".calendarBodyTimes2").addClass("hide");
    } else {
        $(".calendarBodyTimes2").removeClass("hide");
    }
    $(".removeDateFromItems").click(function () {
        var val = $(this).attr("value");
        delete timesForBook[val];
        drawItemsToBook();
        //currentSelf.openDay(currentDay);
    })
}