import * as animation from './animation.js';

console.log = console.log.bind(
    console,
    new Date().toLocaleTimeString(),
);
Object.prototype.print = function () {
    if (typeof this === 'function') {
        console.log(this());
    } else {
        console.log(this);
    }
};
let DivCreater = function (color) {
    let div = window.document.createElement('div');
    div.style.backgroundColor = color;
    div.style.height = 300;
    div.style.width = 300;
    window.document.body.appendChild(div);
    let handlers = {
        bigger: function () {
            console.log('exec bigger');
            if (parseInt(div.style.height) > 500 || parseInt(div.style.width) > 500) {
                return;
            }
            div.style.height = parseInt(div.style.height) + 100;
            div.style.width = parseInt(div.style.width) + 100;
        },
        smaller: function () {
            console.log('exec smaller');
            if (parseInt(div.style.height) <= 100 || parseInt(div.style.width) <= 100) {
                return;
            }
            div.style.height = parseInt(div.style.height) - 100;
            div.style.width = parseInt(div.style.width) - 100;
        },
    };
    let op = 1;
    div.onclick = function () {
        console.log('onclicked');
        console.log('height = ' + div.style.height);
        console.log('width = ' + div.style.width);
        if (parseInt(div.style.height) > 500 || parseInt(div.style.width) > 500) {
            console.log('onclicked smaller');
            op = -1;
            handlers.smaller();
        } else if (parseInt(div.style.height) <= 100 || parseInt(div.style.width) <= 100) {
            console.log('onclicked bigger');
            op = 1;
            handlers.bigger();
        } else if (op === 1) {
            console.log('onclicked bigger');
            handlers.bigger();
        } else if (op === -1) {
            console.log('onclicked smaller');
            handlers.smaller();
        }
    };
    return div;
};

let blueDiv = DivCreater('#1E90FF');
let greenDiv = DivCreater('#32CD32');
let yellowDiv = DivCreater('#FFFF00');

let menu = window.document.getElementsByClassName('contextMenu');
if (menu && menu.length > 0) {
    menu = menu[0];
}

// 构造动画
let opacityAnimation = animation.createOpacityAnimation(menu, 500, 10);
let contextMenuHandler = function (event) {
    event.preventDefault();
    if (menu) {
        menu.style.left = event.clientX;
        menu.style.top = event.clientY;
        //显示动画
        opacityAnimation(true, function () {
            menu.style.visibility = 'visible';
        });

    }
};

(function () {
    blueDiv.addEventListener('contextmenu', contextMenuHandler, false);
    greenDiv.addEventListener('contextmenu', contextMenuHandler, false);
    yellowDiv.addEventListener('contextmenu', contextMenuHandler, false);
})();

document.addEventListener('click', function (event) {
    if (menu) {
        //消失动画
        opacityAnimation(false, function () {
            menu.style.visibility = 'visible';
        }, function () {
            menu.style.visibility = 'hidden';
        });
    }
}, false);