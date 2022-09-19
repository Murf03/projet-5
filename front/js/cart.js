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
        }
        else {
            if (/[a-zA-Z\-]{2,}/g.test(v)) {
                var pC = document.getElementById(errorId);
                if (pC.childNodes.length > 0) pC.removeChild(pC.childNodes[0]);
            }
        }
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
        }
        else {
            if (/[a-zA-Z0-9]{1,}[a-zA-Z\.0-9\ \'\,]{4,}/g.test(v)) {
                var pC = document.getElementById(errorId);
                if (pC.childNodes.length > 0) pC.removeChild(pC.childNodes[0]);
            }
        }
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
        }
        else {
            if (/[a-zA-Z\.0-9]+@+[a-zA-Z\.0-9]{3,}/g.test(v)) {
                var pC = document.getElementById(errorId);
                if (pC.childNodes.length > 0) pC.removeChild(pC.childNodes[0]);
            }
        }
        //console.log(/[a-zA-Z\.0-9]+@+[a-zA-Z\.0-9]{3,}/g.test(v));
    });
}

function getTextById(id) {
    var el = document.getElementById(id);
    let txt = el.getAttribute('value');
    return txt;
}

async function handleOrder() {
    let firstName = getTextById('firstName');
    let lastName = getTextById('lastName');
    let address = getTextById('address');
    let city = getTextById('city');
    let email = getTextById('email');
    console.log(firstName, lastName, address, city, email);
    let contact = {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email
    };
    let products = []
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i).split(" ");
        let id = key[0];
        products.push(id);
    };

    //Je suis là
    var api = "http://localhost:3000/api/products/order";
    var body = {
        contact: contact,
        products: products
    };
    let response = await fetch(api, {
        method: 'POST',
        body: JSON.stringify(body)
    });

    console.log(response);
}

async function commander(params) {
    var btn = document.getElementById('order');
    btn.setAttribute(
        'formaction',
        './confirmation.html',
    );
    btn.addEventListener('click', handleOrder);
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
                console.log(document.getElementById(laCle + " input").getAttribute('value'));
                var kName = document.createTextNode((priceValue * event.target.value) + " €");
                priceElm.appendChild(kName);

                let v = Number(localStorage.getItem(laCle));
                localStorage.setItem(laCle, event.target.value);
                console.log(localStorage);

                var nbTotal = document.getElementById("totalQuantity");
                var enf = nbTotal.childNodes;
                for (let i = 0; i < enf.length; i++) {
                    nbTotal.removeChild(enf[i]);
                }
                if (childs.length > 0) {
                    for (let i = 0; i < enf.length; i++) {
                        nbTotal.removeChild(enf[i]);
                    }
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
        });
        var cart_qtite = document.createElement('div');
        cart_qtite.classList.add('cart__item__content__settings__quantity');
        cart_qtite.appendChild(p3);
        cart_qtite.appendChild(inpt);


        var p4 = document.createElement('p');
        p4.classList.add('deleteItem');
        var q2 = document.createTextNode("Supprimer");
        p4.appendChild(q2);
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
    var total = document.getElementById("totalQuantity");
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

function displayCart(params) {
    editPageN();
}

displayCart();
commander();

/*

    Méthode avec petites fonctions pour plus de lisibilité et de compréhension ! 
    Mais je me suis perdu !


function cartItemImg(name, url) {
    var cart_item_img = document.createElement('img');
    let imgAlt = "Image de " + name;
    cart_item_img.setAttribute(
        'alt',
        imgAlt,
    );
    cart_item_img.setAttribute(
        'src',
        url,
    );
    var cart_item_img_div = document.createElement('div');
    cart_item_img_div.classList.add('cart__item__img');
    cart_item_img_div.appendChild(cart_item_img);
    return cart_item_img_div;
}

function cartItemDesc(name, color, price) {
    var h2 = document.createElement('h2');
    var pName = document.createTextNode(name);
    h2.appendChild(pName);

    var p1 = document.createElement('p');
    var pColor = document.createTextNode(color);
    p1.appendChild(pColor);

    var p2 = document.createElement('p');
    p2.setAttribute(
        'id',
        'price',
    );
    var pPrice = document.createTextNode(price + " €");
    p2.appendChild(pPrice);

    var cart_desc = document.createElement('div');
    cart_desc.classList.add('cart__item__content_description');
    cart_desc.appendChild(h2);
    cart_desc.appendChild(p1);
    cart_desc.appendChild(p2);
    return cart_desc;
}

function itemTxt(name, id) {
    var title = document.getElementById(id);
    var kName = document.createTextNode(name);
    title.appendChild(kName);
}

function cartItemQtity(value) {
    var p1 = document.createElement('p');
    var q = document.createTextNode("Qté : ");
    p1.appendChild(q);

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
        value,
    );
    inpt.setAttribute(
        'pattern',
        "^[1-9][0-9]?$|^100$",
    );

    inpt.addEventListener('input', (event) => {
        inpt.setAttribute(
            'value',
            event.target.value,
        );
        if (event.target.value > 0 && event.target.value < 101) {
            removeItemTxt("price");
            var parent = document.getElementById("price");
            var childs = parent.childNodes;
            if (childs.length > 0) {
                removeItemTxt("price");
            }
            itemTxt(price * event.target.value, "price");
        }
    });

    var cart_qtite = document.createElement('div');
    cart_qtite.classList.add('cart__item__content__settings__quantity');
    cart_qtite.appendChild(p1);
    cart_qtite.appendChild(inpt);
    return cart_qtite;
}

function cartItemDel(params) {
    var p1 = document.createElement('p');
    p1.classList.add('deleteItem');
    var q = document.createTextNode("Supprimer");
    p1.appendChild(q);

    var cart_del = document.createElement('div');
    cart_del.classList.add('cart__item__content__settings__delete');
    cart_del.appendChild(p1);
    return cart_del;
}

function cartItemSettings(value) {
    var qtity = cartItemQtity(value);
    var del = cartItemDel();
    var settings = document.createElement('div');
    settings.classList.add('cart__item__content__settings');
    settings.appendChild(qtity);
    settings.appendChild(del);
    return settings;
}

function cartItemContent(product, value, color) {
    var cart_desc = cartItemDesc(product.name, color, product.price);
    var cart_sett = cartItemSettings(value);

    var cart_content = document.createElement('div');
    cart_content.classList.add('cart__item__content');
    cart_content.appendChild(cart_desc);
    cart_content.appendChild(cart_sett);
    return cart_content;
}


function cartItem(product, id, color, value) {
    var img = cartItemImg(product.name, product.imageUrl);
    var content = cartItemContent(product, value, color);

    var item = document.createElement('article');
    item.classList.add('cart__item');
    item.setAttribute(
        'data-id',
        id,
    );
    item.setAttribute(
        'data-color',
        color,
    );
    item.appendChild(img);
    item.appendChild(content);
    return item;
}

async function editPage(params) {
    document.title = "Panier";

    var cart_items = document.getElementById("cart__items");
    for (let i = 0; i < localStorage.length; i++) {

        let key = localStorage.key(i).split(" ");
        let id = key[0];
        let col = key[1];
        let val = localStorage.getItem(id + " " + col);
        console.log(id, val);

        var product = await getItemData(id);
        console.log(product);
        cart_items.appendChild(cartItem(product, id, product.colors[col], val));
    }
}
*/