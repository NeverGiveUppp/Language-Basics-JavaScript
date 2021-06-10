1. Для практикума из занятия 7 продумать, где можно применить замыкания.
Ответ: Затрудняюсь 

a. 
if (!("a" in window)) {
    var a = 1;
} alert(a);

Ответ: undefined

b. 
var b = function a(x) {
    x && a(x);
}; alert(a);

Ответ: undefined

c. 

function a(x) {
    return x * 2;
}
var a;
alert(a);

Ответ: Выведит сама себя

d.

function b(x, y, a) {
    arguments[2] = 10;
    alert(a);
}
b(1, 2, 3);

Ответ: 10

e.
function a() {
    alert(this);
}
a.call(null);

Ответ: Window