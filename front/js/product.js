/* Dynamic for product.html */

function initProductPage(params) {
    var pageUrlString = window.location.href;
    var pageUrl = new URL(pageUrlString);
    var searchParams = new URLSearchParams(pageUrl.search);
    var id = '';
    if (searchParams.has('id')) {

        id = searchParams.get('id');
        console.log(id);
    }
    return id;
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
    console.log(event.target.value);
    childs = colors.childNodes;
    let n = childs.length;
    colors.removeChild(childs[0]);
    colors.removeChild(childs[0]);
    colors.removeEventListener("change", handleChange);

    // colors.addEventListener('change', (e) => {
    //     qtity.setAttribute(
    //         'value',
    //         event.target.value,
    //     );
    //     console.log(event.target.value);
    // });

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

async function getProductData(params) {
    let ID = initProductPage();
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
}

getProductData();