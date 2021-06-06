var array = new Array();
var speed = 10;
var timer = 10;


function slider(target, showfirst) {
    var slider = document.getElementById(target);
    var divs = slider.getElementsByTagName('div');
    var divslength = divs.length;
    for (i = 0; i < divslength; i++) {
        var div = divs[i];
        var divid = div.id;
        if (divid.indexOf("header") != -1) {
            div.onclick = new Function("processClick(this)");
        } else if (divid.indexOf("content") != -1) {
            var section = divid.replace('-content', '');
            array.push(section);
            div.maxh = div.offsetHeight;
            if (showfirst == 1 && i == 1) {
                div.style.display = 'block';
            } else {
                div.style.display = 'none';
            }
        }
    }
}


function processClick(div) {
    var catlength = array.length;
    for (i = 0; i < catlength; i++) {
        var section = array[i];
        var head = document.getElementById(section + '-header');
        var cont = section + '-content';
        var contdiv = document.getElementById(cont);
        clearInterval(contdiv.timer);
        if (head == div && contdiv.style.display == 'none') {
            contdiv.style.height = '0px';
            contdiv.style.display = 'block';
            initSlide(cont, 1);
        } else if (contdiv.style.display == 'block') {
            initSlide(cont, -1);
        }
    }
}


function initSlide(id, dir) {
    var cont = document.getElementById(id);
    var maxh = cont.maxh;
    cont.direction = dir;
    cont.timer = setInterval("slide('" + id + "')", timer);
}


function slide(id) {
    var cont = document.getElementById(id);
    var maxh = cont.maxh;
    var currheight = cont.offsetHeight;
    var dist;
    if (cont.direction == 1) {
        dist = (Math.round((maxh - currheight) / speed));
    } else {
        dist = (Math.round(currheight / speed));
    }
    if (dist <= 1) {
        dist = 1;
    }
    cont.style.height = currheight + (dist * cont.direction) + 'px';
    cont.style.opacity = currheight / cont.maxh;
    cont.style.filter = 'alpha(opacity=' + (currheight * 100 / cont.maxh) + ')';
    if (currheight < 2 && cont.direction != 1) {
        cont.style.display = 'none';
        clearInterval(cont.timer);
    } else if (currheight > (maxh - 2) && cont.direction == 1) {
        clearInterval(cont.timer);
    }
}
//////////////////////////////////////////////

var d = document,
    itemBox = d.querySelectorAll('.item_box'),
    cartCont = d.getElementById('cart_content');

function addEvent(elem, type, handler) {
    if (elem.addEventListener) {
        elem.addEventListener(type, handler, false);
    } else {
        elem.attachEvent('on' + type, function () { handler.call(elem); });
    }
    return false;
}

function getCartData() {
    return JSON.parse(localStorage.getItem('cart'));
}

function setCartData(o) {
    localStorage.setItem('cart', JSON.stringify(o));
    return false;
}
// Добавляем товар в корзину
function addToCart(e) {
    var cartData = getCartData() || {},
        parentBox = this.parentNode,
        itemId = this.getAttribute('data-id'),
        itemTitle = parentBox.querySelector('.item_title').innerHTML, // название товара
        itemPrice = parentBox.querySelector('.item_price').innerHTML; // стоимость товара
    if (cartData.hasOwnProperty(itemId)) { // если такой товар уже в корзине, то добавляем +1 к его количеству
        cartData[itemId][2] += 1;
    } else {
        // openCart()// если товара в корзине еще нет, то добавляем в объект
        cartData[itemId] = [itemTitle, itemPrice, 1];
    }
    // Обновляем данные в LocalStorage
    if (!setCartData(cartData)) {
    }
    return false;
}

for (var i = 0; i < itemBox.length; i++) {
    addEvent(itemBox[i].querySelector('.add_item'), 'click', addToCart);
}
// Открываем корзину со списком добавленных товаро
function openCart(e) {

    var cartData = getCartData(), // вытаскиваем все данные корзины
        totalItems = '';
    console.log(JSON.stringify(cartData));


    if (cartData !== null) {
        totalItems = '<table class="shopping_list"><tr><th>Наименование</th><th>Цена</th><th>Кол-во</th><th>Cтоймость</th></tr>';
        for (var items in cartData) {
            totalItems += '<tr>';
            for (var i = 0; i < cartData[items].length; i++) {
                totalItems += '<td>' + cartData[items][i] + '</td>';
            }
            //--------
            totalItems += `<td>${cartData[items][1] * cartData[items][2]}</td>`;
            //--------
            totalItems += '</tr>';
        }
        totalItems += '<table>';
        cartCont.innerHTML = totalItems;
    } else {
        // если корзина пуста
        cartCont.innerHTML = 'Корзина пуста!!!';
    }
    return false;
}
/* Открыть корзину */
addEvent(d.getElementById('checkout'), 'click', openCart);
/* Очистить корзину */
addEvent(d.getElementById('clear_cart'), 'click', function (e) {
    localStorage.removeItem('cart');
    cartCont.innerHTML = 'Корзина очищена.';
});


