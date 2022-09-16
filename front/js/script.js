/* Dynamic for index.html */

function isEmpty(params) {
    var emptyTxt = document.createElement('h4');
    emptyTxt.classList.add('isEmpty');
    var kName = document.createTextNode("Aucun canapé disponible !");
    emptyTxt.setAttribute(
        'style',
        'background-color: transparent; color: white;',
    );
    emptyTxt.appendChild(kName);
    var items = document.getElementById('items');
    items.appendChild(emptyTxt);
}

function createKanap(product) {
    var kanapElmDesc = document.createElement('p');
    kanapElmDesc.classList.add('productDescription');
    var desc = document.createTextNode(product.description);
    kanapElmDesc.setAttribute(
        'style',
        'background-color: transparent; color: white; font-size: 15px;',
    );
    kanapElmDesc.appendChild(desc);

    var kanapElmName = document.createElement('h3');
    kanapElmName.classList.add('productName');
    var kName = document.createTextNode(product.name);
    kanapElmName.appendChild(kName);

    var kanapElmImg = document.createElement('img');
    let imgAlt = "Image de " + product.name;
    kanapElmImg.setAttribute(
        'alt',
        imgAlt,
    );
    kanapElmImg.setAttribute(
        'src',
        product.imageUrl,
    );
    kanapElmImg.setAttribute(
        'style',
        'background-color: transparent;',
    );

    var kanapElmArt = document.createElement('article');
    kanapElmArt.appendChild(kanapElmImg);
    kanapElmArt.appendChild(kanapElmName);
    kanapElmArt.appendChild(kanapElmDesc);

    var kanapElm = document.createElement('a');
    var link = "./product.html?id=" + product._id;
    kanapElm.setAttribute(
        'href',
        link,
    );
    kanapElm.setAttribute(
        'alt',
        product.altTxt,
    );
    kanapElm.setAttribute(
        'style',
        'background-color: transparent; color: white;',
    );
    kanapElm.appendChild(kanapElmArt);

    var items = document.getElementById('items');
    items.appendChild(kanapElm);
}

async function getAllProducts(params) {
    var products = await fetch('http://localhost:3000/api/products')
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
            else v = [];
            return v;
        })
        .catch(function (err) {
            console.log("Une erreur est survenue");
            return [];
            // Une erreur est survenue
        });
    if (products.length == 0) {
        isEmpty();
    }
    else {
        for (let i = 0; i < products.length; i++) {
            createKanap(products[i]);
        }
    }

}

getAllProducts();