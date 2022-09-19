/* Dynamic for product.html */

function initProductPage(params) {
    var pageUrlString = window.location.href;
    var pageUrl = new URL(pageUrlString);
    var searchParams = new URLSearchParams(pageUrl.search);
    var id = '';
    if (searchParams.has('id')) {

        id = searchParams.get('id');
    }
    return id;
}

function addAnimations(params) {
    var animations = document.createElement("style");
    let slidein = " @keyframes slidein {from {transform: translateX(60%);opacity: 0;}to {transform: translateX(0%);opacity: 1;}}";
    let slideinInv = "@keyframes slideinInv {from {transform:  translateX(60%) ;opacity: 0;}to {transform: translateX(0%);opacity: 0;}}";
    let slideout = "@keyframes slideout {from {transform:  translateX(0%) ;opacity: 1;}to {transform: translateX(60%);opacity: 0;}}";
    let content = slidein + "\n" + slideinInv + "\n" + slideout;

    animations.textContent = content;
    var head = document.querySelector("head");
    head.appendChild(animations);
}

function itemImg(name, imageUrl) {
    var img = document.createElement('img');
    let imgAlt = "Image de " + name;
    img.setAttribute(
        'alt',
        imgAlt,
    );
    img.setAttribute(
        'src',
        imageUrl,
    );

    var item_img = document.getElementsByClassName("item__img");
    item_img[0].appendChild(img);
}

function itemTxt(name, id) {
    var title = document.getElementById(id);
    var kName = document.createTextNode(name);
    title.appendChild(kName);
}

function handleChange(event) {
    var colors = document.getElementById("colors");
    var childs = colors.childNodes;
    colors.removeChild(childs[0]);
    colors.removeChild(childs[0]);
    colors.removeEventListener("change", handleChange);
    colors.setAttribute(
        'value',
        event.target.value,
    );
    colors.addEventListener('change', (event) => {
        colors.setAttribute(
            'value',
            event.target.value,
        );
        console.log(event.target.value);
    });
}

function itemColors(cols) {
    var colors = document.getElementById("colors");
    colors.setAttribute(
        'style',
        "padding: 5px; margin-top: 5px; margin-bottom: 5px;",
    )
    for (let i = 0; i < cols.length; i++) {
        var option = document.createElement('option');
        option.setAttribute(
            'value',
            i,
        )
        var colName = document.createTextNode(cols[i]);
        option.appendChild(colName);
        colors.appendChild(option);
    }
    colors.setAttribute(
        'value',
        0,
    );
    colors.setAttribute(
        'colors',
        cols,
    );
    colors.addEventListener('change', handleChange);
}

function removeItemTxt(id) {
    var parent = document.getElementById(id);
    var childs = parent.childNodes;
    for (let i = 0; i < childs.length; i++) {
        parent.removeChild(childs[i]);
    }
}

function qtityCount(price) {
    var qtity = document.getElementById("quantity");
    qtity.setAttribute(
        'value',
        1,
    );
    qtity.setAttribute(
        'pattern',
        "100|[1-9][0-9]|[1-9]",
    );
    qtity.setAttribute(
        'style',
        "padding: 2.5px; margin-top: 5px; margin-bottom: 5px;",
    );
    qtity.addEventListener('input', (event) => {
        qtity.setAttribute(
            'value',
            event.target.value,
        );
        if (event.target.value > 0 && event.target.value < 101) {
            removeItemTxt("price");
            removeItemTxt("price");
            var parent = document.getElementById("price");
            var childs = parent.childNodes;
            if (childs.length > 0) {
                removeItemTxt("price");
            }
            itemTxt(price * event.target.value, "price");
        }
    });
}

function editPage(product) {
    document.title = product.name;
    itemImg(product.name, product.imageUrl);
    itemTxt(product.name, "title");
    itemTxt(product.price, "price");
    itemTxt(product.description, "description");
    itemColors(product.colors);
    qtityCount(product.price);
}

function handleAddToCart(id) {
    let colors = document.getElementById("colors");
    if (colors.value != null && colors.value != "") {
        var qtity = document.getElementById("quantity").getAttribute("value");
        var color = colors.getAttribute("value");

        let k = id + " " + color;
        let v = Number(localStorage.getItem(k));
        if (v != null) {
            v += Number(qtity);
            localStorage.setItem(k, v);
        }
        else {
            let key = id + " " + color;
            let value = qtity;
            localStorage.setItem(key, value);
        }
        addToast(true);
    }
    else {
        addToast(false);
    }
}

let intrvalID = null;

function butListen(id) {
    var btn = document.getElementById("addToCart");
    btn.addEventListener('click', (event) => {
        handleAddToCart(id);
    });
}

function success(params) {
    let topM = "Ajouté(s) au panier !";
    let topColor = "green";
    let timerColor = 'blue';
    return [topM, topColor, timerColor];
}

function fail(params) {
    let topM = "Erreur ..";
    let topColor = "red";
    let timerColor = 'orange';
    return [topM, topColor, timerColor];
}

function addToast(isSuccess) {
    var lastToast = document.getElementById("toast");
    var m = document.querySelector("main > div > section > article");
    if (lastToast != null) {
        lastToast.style.animation = "0s slideout";
        m.removeChild(lastToast);
    }
    let data = [];
    if (isSuccess) {
        data = success();
    }
    else {
        data = fail();
    }
    var topDiv = document.createElement('div');
    topDiv.setAttribute(
        'style',
        "color: " + data[1] + "; font-size: 22px; padding-left: 15px;  padding-top: 10px;",
    );
    var topTxt = document.createTextNode(data[0]);
    topDiv.appendChild(topTxt);

    var botDiv = document.createElement('div');
    botDiv.setAttribute(
        'style',
        "color: black; font-size: 17px; padding-left: 15px; padding-bottom: 18px;",
    );
    var desc;
    if (isSuccess) {
        var qtity = Number(document.getElementById("quantity").getAttribute("value"));
        var name = document.querySelector('title').text;
        var colorsEl = document.getElementById("colors");
        var colIndex = colorsEl.getAttribute('value');
        var colors = colorsEl.getAttribute('colors').split(',');
        var color = colors[colIndex];
        desc = qtity + " " + name + " - couleur : " + color;
    }
    else {
        desc = "Aucun élément n'a été ajouté au panier !";
    }
    var botTxt = document.createTextNode(desc);
    botDiv.appendChild(botTxt);

    var crossbtn = document.createElement('button');
    crossbtn.setAttribute(
        'style',
        'position: absolute; cursor: pointer; top: 5px; right: 16px; border: none; background-color: white; font-size: 22px; font-weight: 700; color: rgba(0,0,0,0.75);',
    );
    var btnTxt = document.createTextNode("x");
    crossbtn.appendChild(btnTxt);
    crossbtn.addEventListener('click', (event) => {
        removeToast();
    });

    var timeBarBack = document.createElement('div');
    var timeBarFront = document.createElement('div');
    var timerColor = data[2];
    timeBarBack.setAttribute(
        'style',
        'background-color: white; width: 100%; height: 2.5px; position: absolute; bottom: 0px; overflow: hidden; align-items: end;',
    );
    timeBarFront.setAttribute(
        'style',
        'background-color: ' + timerColor + '; width: 100%; height: 3px;',
    );
    timeBarFront.setAttribute(
        'id',
        'toastAnim',
    );
    let w = window.screen.width * 0.25;
    timeBarFront.setAttribute(
        'v',
        w,
    );
    timeBarFront.setAttribute(
        'minus',
        w / 256,
    );
    timeBarBack.appendChild(timeBarFront);

    var toastDiv = document.createElement('div');
    toastDiv.setAttribute(
        'id',
        'toast',
    );
    toastDiv.setAttribute(
        'style',
        "background-color: snow; overflow: hidden; color: red; width: 25%; min-width: 350px; height: 90px; max-height: 125px; animation: 1s slidein; max-height: 90px; border-radius: 15px 2.5px 2.5px 15px; display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between; position : fixed; top: 6%; right: 1%; z-index: 100; translateX: 0%; rotate: 0deg;",
    );
    toastDiv.appendChild(topDiv);
    toastDiv.appendChild(botDiv);
    toastDiv.appendChild(crossbtn);
    toastDiv.appendChild(timeBarBack);

    m.appendChild(toastDiv);

    if (intrvalID == null) {
        intrvalID = setInterval(decreaseAnim, 15.625, [timerColor]);
    }
}

function decreaseAnim(color) {
    var toastAnim = document.getElementById('toastAnim');
    var v = Number(toastAnim.getAttribute('v'));
    var minus = Number(toastAnim.getAttribute('minus'));
    var l = v - minus;
    if (l <= 0) {
        removeToast();
    }
    else {
        toastAnim.style.color = color;
        toastAnim.style.width = l + 'px';
        toastAnim.setAttribute(
            'v',
            l,
        );
    }

}

function rmToast() {
    var m = document.querySelector("main > div > section > article");
    var toast = document.getElementById('toast');
    if (toast != null) {
        m.removeChild(toast);
    }
    clearInterval(intrvalID);
    intrvalID = null;
}

function removeToast() {
    var toast = document.getElementById('toast');
    toast.style.animation = "1s slideout";

    setTimeout(rmToast, 1000);
}

async function getProductData(params) {
    let ID = initProductPage();
    addAnimations();

    var api = "http://localhost:3000/api/products/" + ID;
    var product = await fetch(api)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (value) {
            let v;
            if (value != undefined) {
                v = value;
            }
            else v = {};
            return v;
        })
        .catch(function (err) {
            console.log("Une erreur est survenue");
            return {};
        });

    editPage(product);
    butListen(product._id);
}

getProductData();