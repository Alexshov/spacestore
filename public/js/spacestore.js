$('#liver').on('click', function(){wishlist('liver')})
$('#bladder').on('click', function(){wishlist(1)})
$('#intestines').on('click', function(){wishlist(2)})
$('#lungs').on('click', function(){wishlist(1)})
$('#heart').on('click', function(){wishlist('heart')})
$('#brain').on('click', function(){wishlist('brain')})



function wishlist(selector) {
    $.post('/spacestore/goods', {group: selector}, function(data) {
        console.log(data);
        if (data) {
            for (var i = 0; i < data.length; i++) {
                var name = '<h5 class="good_header">' + data[i].name + '</h5>',
                    desc = '<p>Description: ' + data[i].description + '</p>',
                    calories = '<p>Calories: ' + data[i].calories + '</p>',
                    vitamins = '<p>Vitamins: ' + data[i].vitamins + '<p>',
                    price = '$' + data[i].price,
                    quantity = data[i].quantity,
                    image = '<img src = /images/spacestore' + data[i].image + '>';

                $('#preset table > tbody:last-child').
                     append('<tr><td class="product"><div class="good_img">'
                        + image + '</div><div class="good_info">'
                        + name + desc + calories + vitamins + '</div></td><td class="price">'
                        + price + '</td><td class="quantity">' + quantity + '</td></tr>');
            };
        };
    });
}






// $('body').html('<p>Test2</p>');

// onclc.addEventListener('click', function(event) {
//     event.preventDefault();
//     if (event.target.className == 'menu') {
//         var selItem = event.target.id;
//         var resp;
//         console.log('Hello ' + selItem);
//
//         $.post('/spacestore/sel', {store: selItem}, function(data) {
//                     resp = data.store;
//                     console.log('Test1 '+ resp);
//                     showData(resp);
//                 }, "json").then((data) => {
//                     showData(data.store);
//                     console.log('Test2 ', data);
//                 });
//
//
//     }
// })
//
// function showData(rdata) {
//     $('p.outpt').text(rdata);
// }


// $('#click_me').on('click', function(e) {});
