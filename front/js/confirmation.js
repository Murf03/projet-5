/* Dynamic for confirmation.html */

function initProductPage(params) {
    var pageUrlString = window.location.href;
    var pageUrl = new URL(pageUrlString);
    var searchParams = new URLSearchParams(pageUrl.search);
    var id = '';
    if (searchParams.has('orderID')) {
        id = searchParams.get('orderID');
    }
    return id;
}

function done(params) {
    var id = initProductPage();
    var p = document.getElementById('orderId');
    var t = document.createTextNode(id);
    p.appendChild(t);
}

done();