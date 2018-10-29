/**
 *
 * @param {any} object 
 * @param {number} time 
 * @param {number} intervel 
 * @returns {(show :boolean, startHandler :Function, completeHandler :Function) => void}
 */
function createOpacityAnimation(object, time, intervel) {
    let onAnimation = false;
    let timerIntervel;
    return function (show, startHandler, completeHandler) {
        if (!object) {
            return;
        }
        time = parseFloat(time);
        intervel = parseFloat(intervel);
        if ((!time || typeof time !== 'number') || (!intervel || typeof intervel !== 'number')) {
            return;
        } else if (time < intervel) {
            time = intervel;
        }
        if (show === null || show === undefined) {
            return;
        }
        let from = show ? 0 : 1;
        let to = show ? 1 : 0;
        //已经达到目标值，不需要执行动画
        if (object.style.opacity == to)
            return;
        if (startHandler) {
            startHandler();
        }
        //已有动画在执行中
        if (timerIntervel && onAnimation) {
            window.clearInterval(timerIntervel);
            object.style.opacity = from;
        }
        let cur = from;
        timerIntervel = window.setInterval(function () {
            console.log('object.style.opacity = ' + object.style.opacity);
            if (show && cur >= to) {
                console.log('cur >= to');
                window.clearInterval(timerIntervel);
                object.style.opacity = to;
                onAnimation = false;
                if (completeHandler) {
                    completeHandler();
                }
            } else if (!show && cur <= to) {
                console.log('cur <= to');
                window.clearInterval(timerIntervel);
                object.style.opacity = to;
                onAnimation = false;
                if (completeHandler) {
                    completeHandler();
                }
            } else if (show) {
                onAnimation = true;
                object.style.opacity = cur;
                cur += 1.0 / (time / intervel);
                console.log("show: " + cur);
            } else if (!show) {
                onAnimation = true;
                object.style.opacity = cur;
                cur -= 1.0 / (time / intervel);
                console.log('!show: ' + cur);
            }
        }, intervel);
    };
}

export { createOpacityAnimation };