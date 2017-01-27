var pcman;
var gnumb = 5;
var ghosts = [];
var w_h = $(window).height();
var w_w = $(window).width();

// Конструктор для всех объектов.
function pMan(id, step, x, y) {
    this.top = x || $(id).offset().top;
    this.left = y || $(id).offset().left;
    this.name = id;
    this.height = $(id).height();
    this.width = $(id).width();
    this.step = step;
    this.move = function(nx, ny) {
        this.top += nx;
        this.left += ny;
    };
    this.buildme = function() {
        $(id).offset(this);
    };
    this.setSize = function(nhw) {
        $(id).height(this.height += nhw);
        $(id).width(this.width += nhw);

    };
}

//Инициализация Pacman.
if (!pcman) {
    pcman = new pMan('#packman', 10);
}

//Инициализация Ghosts
for (var i = 1; i < gnumb; i++) {
    ghost = '#ghost' + i;
    ghosts.push(new pMan(ghost, pcman.step * 2));
}

//Перехват события для передвижения Pacman стрелками клавиатуры
$('body').on('keydown', function(event) {
    switch(event.key) {
        case "ArrowUp":
            moveUp(pcman, pcman.step).buildme();
            check(pcman);
            break;
        case "ArrowDown":
            moveDown(pcman, pcman.step).buildme();
            check(pcman);
            break;
        case "ArrowLeft":
            moveLeft(pcman, pcman.step).buildme();
            check(pcman);
            break;
        case "ArrowRight":
            moveRight(pcman, pcman.step).buildme();
            check(pcman);
            break;
    }

})

//Передвижение чувачков
function moveUp(obj, step) {
    // console.log("moveUp");
    if (obj.top > step) {
        obj.move(-step, 0);
    }
    return obj;
}

function moveDown(obj, step) {
    // console.log("moveDown");
    if (obj.top < w_h - obj.height - step) {
        obj.move(step, 0);
    }
    return obj;
}

function moveLeft(obj, step) {
    // console.log("moveLeft");
    if (obj.left > step) {
        obj.move(0, -step);
    }
    return obj;
}

function moveRight(obj, step) {
    // console.log("moveRight");
    if (obj.left < w_w - obj.width - step) {
        obj.move(0, step);
    }
    return obj;
}

//Проверка, съел или нет Pacman Ghost`a
function check(obj) {
    ghosts.forEach(function(item, gi, arr) {
        var catched = inPoly(obj, item);
        if (catched) {
            $(item.name).addClass('hide');
            ghosts.splice(gi, 1);
            obj.step /= 2;
            obj.setSize(10);
            console.log("Cathched", item, gi);
        }
    })
}

//Проверка на съедение Ghost`a Pacman`ом
function inPoly(obj, item){
    var xo = [obj.left, obj.left + obj.width, obj.left, obj.left + obj.width];
    var yo = [obj.top, obj.top, obj.top + obj.height, obj.top + obj.height];
    var xp = [item.left, item.left + item.width];
    var yp = [item.top, item.top + item.height];
    // $('body').append('<div class="point" style="top: ' + yp[0] + 'px; left: ' + xp[0] + 'px"></div>')
    // $('body').append('<div class="point" style="top: ' + yp[1] + 'px; left: ' + xp[1] + 'px"></div>')
    // $('body').append('<div class="point" style="top: ' + yp[2] + 'px; left: ' + xp[2] + 'px"></div>')
    // $('body').append('<div class="point" style="top: ' + yp[3] + 'px; left: ' + xp[3] + 'px"></div>')
    var res = false;
    for (var s = 0; s < xo.length; s++){
        if (xo[s] >= xp[0] && xo[s] <= xp[1] && yo[s] >= yp[0] && yo[s] <= yp[1]) {
            return res = true;
        }
    }
    return res;
}


//Хаотичное движение Ghosts
var timerId = setInterval(function() {
    ghosts.forEach(function(item, i, arr) {
        var rnd = Math.random() * 100;
        if (rnd < 50) {
            if (rnd < 25) {
                moveUp(ghosts[i], ghosts[i].step).buildme();
            } else {
                moveDown(ghosts[i], ghosts[i].step).buildme();
            }
        } else {
            if (rnd < 75) {
                moveLeft(ghosts[i], ghosts[i].step).buildme();
            } else {
                moveRight(ghosts[i], ghosts[i].step).buildme();
            }
        }
        ghosts[i].step = pcman.step * (gnumb - ghosts.length + 1);
    })
}, 500)
