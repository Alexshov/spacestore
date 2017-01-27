var residents = [];
var elevator;
var home = $('#floor1');

if (!elevator) {
    elevator = new Elevator;
}

$('.floor').on('click', function(event){
    event.stopPropagation();
    var room = $(event.target);
    var floor = $(event.target).parent();
    addResident(room, floor);
    var maxfloor = residents[residents.length - 1].floor;
    if (!elevator.inMoution) {
        elevator.move(maxfloor);
        elevator.inMoution = true;
    };
})

function Residents() {
    this.weight;
    this.floor;
    this.floorNo;
    this.room;
    this.init = function(weight, floor, floorNo, room) {
        this.weight = weight;
        this.floor = floor;
        this.floorNo = floorNo;
        this.room = room;
    }
}

function addResident(room, floor) {
    // var numroom = room.attr("id").slice(4, 5);
    var numfloor = parseInt(floor.attr('id').slice(5));
    var resident = new Residents();
    resident.init(100, floor, numfloor, room);
    residents.push(resident);
    residents.sort(compareNumeric);
    room.text(parseInt(room.text()) + 1);
}

function compareNumeric(a, b) {
  return a.floorNo - b.floorNo;
}

function Elevator(capacity) {
    this.capacity = capacity || 400;
    this.weight = 0;
    this.inMoution = false;
    this.elfloor = $('#elevator').parent().parent();
    this.move = function(floor) {
        var calledFloor = $(floor).offset().top;
        var street = $('#room21').offset().top;
        $('#elevator').animate({top: calledFloor - street}, {duration: 1500, queue: false, complete: function() {lift(floor);}});
        // console.log("Move: ", $(floor).attr("id"));
    }
}

function lift(floor) {
    if (residents.length > 0) {
        var maxFloor = residents[residents.length - 1];
        if (maxFloor.floor == floor) {
            if ((elevator.weight + maxFloor.weight) <= elevator.capacity) {
                maxFloor.room.text(parseInt(maxFloor.room.text()) - 1);
                elevator.weight += maxFloor.weight;
                $('#men').text(parseInt($('#men').text()) + 1);
                $('#weight').text(elevator.weight);
                residents.pop();
                if (residents.length == 0) {
                    goHome();
                } else {
                    var newMaxFloor = residents[residents.length - 1];
                    elevator.move(newMaxFloor.floor);
                };
            } else {
                goHome();
            };
        } else {
            elevator.move(maxFloor.floor);
            // console.log("lift - else: ", $(floor).attr("id"), maxFloor.floor);
        };
    };
    if (floor == home) {
        elevator.weight = 0;
        elevator.inMoution = false;
        $('#men').text("0");
        $('#weight').text("0");
    };
}

function goHome() {
    elevator.move(home);
}

$('#cloud').on('click', function(event) {
    var pos = 0;
    if ($('#cloud').offset().left == 0) {
        pos = $('#sun').offset().left;
    }
    $('#cloud').animate({left: pos}, {duration: 7000, queue: false, complete: function() {goSleep();}});
})

function goSleep() {
    $('.header').toggleClass('night-sky');
    $('.window').toggleClass('lights-on');
    $('.floor').toggleClass('lights-on');
    $('.cloud').toggleClass('night-cloud');
    console.log("OK");
}
