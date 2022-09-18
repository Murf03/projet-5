/* Dynamic for cart.html */

async function editPageN(params) {
    document.title = "Panier";

    var cart_items = document.getElementById("cart__items");
    for (let i = 0; i < localStorage.length; i++) {

        let key = localStorage.key(i).split(" ");
        let id = key[0];
        let col = key[1];
        let val = localStorage.getItem(id + " " + col);
        //console.log(id, val);

        var product = await getItemData(id);
        console.log(product);

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
        console.log(amount);
        lePrix += Number(amount) * val;
    }
    totalPrice.appendChild(document.createTextNode(lePrix));

}

function displayCart(params) {
    editPageN();
}

displayCart();

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