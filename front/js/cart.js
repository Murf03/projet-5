/* Dynamic for cart.html */

async function getItemData(ID) {
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
    return product;
}

function errorMessage(id, errorId) {
    let label = {
        firstName: 'Prénom',
        lastName: 'Nom',
        city: 'Ville'
    };

    var inpt = document.getElementById(id);
    inpt.setAttribute(
        'pattern',
        "[a-zA-Z\-]{2,}",
    );

    var pC = document.getElementById(errorId);
    pC.style.paddingTop = "10px";
    pC.style.color = "orange";
    if (pC.childNodes.length > 0) pC.removeChild(pC.childNodes[0]);

    inpt.addEventListener('input', (event) => {
        let v = event.target.value;
        inpt.setAttribute(
            'value',
            v,
        );
        var p = document.getElementById(errorId);
        if (p.childNodes.length > 0) p.removeChild(p.childNodes[0]);
        if (v.length == 0) {
            var t = document.createTextNode("Veuillez remplir votre " + label[id]);
            p.appendChild(t);
        }
        else if (v.length == 1) {
            var t = document.createTextNode("Votre " + label[id] + " doit faire au moins 2 caractères");
            p.appendChild(t);
        }/*
        else {
            if (/[a-zA-Z\-]{2,}/g.test(v)) {
                var pC = document.getElementById(errorId);
                if (pC.childNodes.length > 0) pC.removeChild(pC.childNodes[0]);
                inpt.setAttribute(
                    'test',
                    true,
                );
            }
            else {
                inpt.setAttribute(
                    'test',
                    false,
                );
            }
        }*/
    });
}

function errorAdresse() {
    let id = 'address';
    let errorId = "addressErrorMsg";
    var inpt = document.getElementById(id);
    inpt.setAttribute(
        'pattern',
        "[a-zA-Z0-9]{1,}[a-zA-Z\.0-9\ \'\,]{4,}",
    );

    var pC = document.getElementById(errorId);
    pC.style.paddingTop = "10px";
    pC.style.color = "orange";
    if (pC.childNodes.length > 0) pC.removeChild(pC.childNodes[0]);

    inpt.addEventListener('input', (event) => {
        let v = event.target.value;
        inpt.setAttribute(
            'value',
            v,
        );
        var p = document.getElementById(errorId);
        if (p.childNodes.length > 0) p.removeChild(p.childNodes[0]);
        if (v.length == 0) {
            var t = document.createTextNode("Veuillez remplir votre Adresse");
            p.appendChild(t);
        }
        else if (v.length >= 1 && v.length <= 5) {
            var t = document.createTextNode("Votre Adresse doit faire au moins 5 caractères");
            p.appendChild(t);
        }/*
        else {
            if (/[a-zA-Z0-9]{1,}[a-zA-Z\.0-9\ \'\,]{4,}/g.test(v)) {
                var pC = document.getElementById(errorId);
                if (pC.childNodes.length > 0) pC.removeChild(pC.childNodes[0]);
                inpt.setAttribute(
                    'test',
                    true,
                );
            }
            else {
                inpt.setAttribute(
                    'test',
                    false,
                );
            }
        }*/
    });
}

function errorMail() {
    let id = 'email';
    let errorId = "emailErrorMsg";
    var inpt = document.getElementById(id);
    inpt.setAttribute(
        'pattern',
        "[a-zA-Z\.0-9]+@+[a-zA-Z\.0-9]{3,}",
    );

    var pC = document.getElementById(errorId);
    pC.style.paddingTop = "10px";
    pC.style.color = "orange";
    if (pC.childNodes.length > 0) pC.removeChild(pC.childNodes[0]);

    inpt.addEventListener('input', (event) => {
        let v = event.target.value;
        inpt.setAttribute(
            'value',
            v,
        );
        var p = document.getElementById(errorId);
        if (p.childNodes.length > 0) p.removeChild(p.childNodes[0]);
        if (v.length == 0) {
            var t = document.createTextNode("Veuillez remplir votre Mail");
            p.appendChild(t);
        }
        else if (v.length >= 1 && v.length <= 5) {
            var t = document.createTextNode("Votre Mail doit faire au moins 5 caractères");
            p.appendChild(t);
        }
        else if (!v.includes('@')) {
            var t = document.createTextNode("Votre Mail doit contenir le caractère @");
            p.appendChild(t);
        }/*
        else {
            const reg = new RegExp("[a-zA-Z\.0-9]{3,}@[a-zA-Z\.0-9]{3,}");
            console.log(v);
            if (reg.test(v)) {
                var pC = document.getElementById(errorId);
                if (pC.childNodes.length > 0) pC.removeChild(pC.childNodes[0]);
                inpt.setAttribute(
                    'test',
                    true,
                );
            }
            else {
                inpt.setAttribute(
                    'test',
                    false,
                );
            }
        }*/
    });
}

function getTextById(id) {
    var el = document.getElementById(id);
    let txt = el.getAttribute('value');
    return txt;
}

function getReg(id) {
    if (id == 'address') return new RegExp("[a-zA-Z0-9]{1,}[a-zA-Z\.0-9\ \'\,]{4,}");
    if (id == 'email') return new RegExp("[a-zA-Z\.0-9]{3,}@[a-zA-Z\.0-9]{3,}");
    return new RegExp("[a-zA-Z\-]{2,}");
}

function getTestById(id) {
    var el = document.getElementById(id);
    let txt = el.getAttribute('value');

    const reg = getReg(id);
    if (txt == "" || txt == null) return false;
    return reg.test(txt);
}

let intrvalID = null;

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

function fail(params) {
    let topM = "Erreur ..";
    let topColor = "red";
    let timerColor = 'orange';
    return [topM, topColor, timerColor];
}

function errMsg(n) {
    if (n == 2) return "Veuillez entrer des informations valides !";
    return "Panier Vide !";
}

function addToast(err) {
    var lastToast = document.getElementById("toast");
    var m = document.querySelector("main");
    if (lastToast != null) {
        lastToast.style.animation = "0s slideout";
        m.removeChild(lastToast);
    }
    let data = fail();
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
    var desc = errMsg(err);
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
    var m = document.querySelector("main");
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

function formValid(f, l, a, v, m) {
    return f && l && a && v && m;
}

async function handleOrder() {
    let prenom = getTextById('firstName');
    let nom = getTextById('lastName');
    let addresse = getTextById('address');
    let ville = getTextById('city');
    let mail = getTextById('email');

    let prenomTest = getTestById('firstName');
    let nomTest = getTestById('lastName');
    let addresseTest = getTestById('address');
    let villeTest = getTestById('city');
    let mailTest = getTestById('email');
    //console.log(prenom, "=", prenomTest, nom, '=', nomTest, addresseTest, ville, '=', villeTest, mailTest);

    if (formValid(prenomTest, nomTest, addresseTest, villeTest, mailTest)) {
        let userInfos = {
            firstName: prenom,
            lastName: nom,
            address: addresse,
            city: ville,
            email: mail
        };
        let ids = []
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i).split(" ");
            let id = key[0];
            ids.push(id);
        };
        var api = "http://localhost:3000/api/products/order";
        if (ids.length == 0) {
            addToast(1);
        }
        else {
            let body = {
                contact: userInfos,
                products: ids
            };
            let response = await fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                let data = await response.json();
                var btn = document.getElementById('order');
                localStorage.clear();
                window.location.href = './confirmation.html?orderID=' + data["orderId"];
            }
            else {
                addToast(2);
            }
        }
    }
    else {
        addToast(2);
    }
}

async function commander(params) {
    var btn = document.getElementById('order');
    btn.setAttribute(
        'formmethod',
        'dialog',
    );
    btn.setAttribute(
        'formnovalidate',
        true,
    );
    btn.addEventListener('click', handleOrder);
}

function setFirstTotal() {
    var total = document.getElementById("totalQuantity");
    var enf = total.childNodes;
    for (let i = 0; i < enf.length; i++) {
        total.removeChild(enf[i]);
    }
    let n = localStorage.length;
    let nb = 0;
    for (let i = 0; i < n; i++) {
        let key = localStorage.key(i).split(" ");
        let id = key[0];
        let col = key[1];
        let val = localStorage.getItem(id + " " + col);
        nb += Number(val);
    }
    total.setAttribute(
        'nb',
        nb,
    );
    total.appendChild(document.createTextNode(nb));

    var lePrix = 0;
    var totalPrice = document.getElementById("totalPrice");
    for (let i = 0; i < n; i++) {
        let key = localStorage.key(i).split(" ");
        let id = key[0];
        let col = key[1];
        let val = Number(localStorage.getItem(id + " " + col));
        var amount = document.getElementById(id + " " + col).getAttribute('price');
        lePrix += Number(amount) * val;
    }
    totalPrice.appendChild(document.createTextNode(lePrix));
}

function updateTotal(id, col) {
    var nbTotal = document.getElementById("totalQuantity");
    var enf = nbTotal.childNodes;
    Array.from(enf).forEach(el => el.remove());
    let n = localStorage.length;
    let nb = 0;
    for (let i = 0; i < n; i++) {
        let key = localStorage.key(i).split(" ");
        let id = key[0];
        let col = key[1];
        let val = localStorage.getItem(id + " " + col);
        nb += Number(val);
    }
    nbTotal.setAttribute(
        'nb',
        nb,
    );
    if (enf.length > 0) {
        nbTotal.removeChild(enf[0]);
    }
    nbTotal.appendChild(document.createTextNode(nb));

    var lePrix = 0;
    var totalPrice = document.getElementById("totalPrice");
    var children = totalPrice.childNodes;
    for (let i = 0; i < n; i++) {
        let key = localStorage.key(i).split(" ");
        let id = key[0];
        let col = key[1];
        let val = Number(localStorage.getItem(id + " " + col));
        var amount = document.getElementById(id + " " + col).getAttribute('price');
        console.log(amount);
        lePrix += Number(amount) * val;
    }
    Array.from(children).forEach(el => el.remove());
    totalPrice.appendChild(document.createTextNode(lePrix));
}

async function editPageN(params) {
    document.title = "Panier";

    errorMessage('firstName', 'firstNameErrorMsg');
    errorMessage('lastName', 'lastNameErrorMsg');
    errorAdresse();
    errorMessage('city', 'cityErrorMsg');
    errorMail();

    var cart_items = document.getElementById("cart__items");
    for (let i = 0; i < localStorage.length; i++) {

        let key = localStorage.key(i).split(" ");
        let id = key[0];
        let col = key[1];
        let val = localStorage.getItem(id + " " + col);
        //console.log(id, val);

        var product = await getItemData(id);

        //Start here

        var cart_item_img = document.createElement('img');
        let imgAlt = "Image de " + product.name;
        cart_item_img.setAttribute(
            'alt',
            imgAlt,
        );
        cart_item_img.setAttribute(
            'src',
            product.imageUrl,
        );
        var cart_item_img_div = document.createElement('div');
        cart_item_img_div.classList.add('cart__item__img');
        cart_item_img_div.appendChild(cart_item_img);


        var h2 = document.createElement('h2');
        var pName = document.createTextNode(product.name);
        h2.appendChild(pName);

        var p1 = document.createElement('p');
        var pColor = document.createTextNode(product.colors[col]);
        p1.appendChild(pColor);

        var p2 = document.createElement('p');
        var pPrice = document.createTextNode((product.price * val) + " €");
        p2.setAttribute(
            'id',
            id + " " + col,
        );
        p2.setAttribute(
            'price',
            product.price,
        );
        p2.appendChild(pPrice);

        var cart_desc = document.createElement('div');
        cart_desc.classList.add('cart__item__content_description');
        cart_desc.appendChild(h2);
        cart_desc.appendChild(p1);
        cart_desc.appendChild(p2);


        var p3 = document.createElement('p');
        var q1 = document.createTextNode("Qté : ");
        p3.appendChild(q1);

        var inpt = document.createElement('input');
        inpt.classList.add('itemQuantity');
        inpt.setAttribute(
            'type',
            'number',
        );
        inpt.setAttribute(
            'name',
            'itemQuantity',
        );
        inpt.setAttribute(
            'min',
            1,
        );
        inpt.setAttribute(
            'max',
            100,
        );
        inpt.setAttribute(
            'value',
            val,
        );
        inpt.setAttribute(
            'id',
            id + " " + col + " input",
        );
        inpt.setAttribute(
            'pattern',
            "^[1-9][0-9]?$|^100$",
        );
        let laCle = id + " " + col;
        inpt.addEventListener('input', (event) => {
            var priceElm = document.getElementById(laCle);
            var priceValue = priceElm.getAttribute('price');

            if (event.target.value > 0 && event.target.value < 101) {

                var childs = priceElm.childNodes;
                for (let i = 0; i < childs.length; i++) {
                    priceElm.removeChild(childs[i]);
                }
                if (childs.length > 0) {
                    for (let i = 0; i < childs.length; i++) {
                        priceElm.removeChild(childs[i]);
                    }
                }
                // console.log(document.getElementById(laCle + " input").getAttribute('value'));
                var kName = document.createTextNode((priceValue * event.target.value) + " €");
                priceElm.appendChild(kName);

                localStorage.setItem(laCle, event.target.value);
                // console.log(localStorage);

                updateTotal(id, col);
            }
        });
        var cart_qtite = document.createElement('div');
        cart_qtite.classList.add('cart__item__content__settings__quantity');
        cart_qtite.appendChild(p3);
        cart_qtite.appendChild(inpt);

        var p4 = document.createElement('p');
        p4.classList.add('deleteItem');
        var q2 = document.createTextNode("Supprimer");
        p4.appendChild(q2);
        p4.addEventListener('click', (event) => {
            var keyEl = document.getElementById(laCle);
            var suppEl = keyEl.closest('article');
            localStorage.removeItem(laCle);
            suppEl.remove();
            updateTotal(id, col);
        });

        var cart_del = document.createElement('div');
        cart_del.classList.add('cart__item__content__settings__delete');
        cart_del.appendChild(p4);

        var settings = document.createElement('div');
        settings.classList.add('cart__item__content__settings');
        settings.appendChild(cart_qtite);
        settings.appendChild(cart_del);

        var cart_content = document.createElement('div');
        cart_content.classList.add('cart__item__content');
        cart_content.appendChild(cart_desc);
        cart_content.appendChild(settings);


        var item = document.createElement('article');
        item.classList.add('cart__item');
        item.setAttribute(
            'data-id',
            id,
        );
        item.setAttribute(
            'data-color',
            product.colors[col],
        );
        item.appendChild(cart_item_img_div);
        item.appendChild(cart_content);

        cart_items.appendChild(item);
    }

    setFirstTotal();
}

function displayCart(params) {
    editPageN();
}

addAnimations();
displayCart();
commander();