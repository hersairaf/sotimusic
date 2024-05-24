var cart = {};

document.querySelectorAll('.btn-primary').forEach(function(button) {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        var productData = this.getAttribute('data-product').split(',');
        var product = {
            name: productData[0],
            price: parseFloat(productData[1]),
            image: productData[2]
        };
        if (cart[product.name]) {
            cart[product.name].quantity+= 1;
        } else {
            product.quantity = 1;
            cart[product.name] = product;
        }
        updateCart();
    });
});



// Calcular el total
function calculateTotal() {
    var total = 0;
    for (var productName in cart) {
        var product = cart[productName];
        total += product.price * product.quantity;
    }
    return total;
}

// Actualiza el carrito
function updateCart() {
    var cartElement = document.getElementById('lista-carrito');
    cartElement.innerHTML = '<thead><tr><th>Imagen</th><th>Nombre</th><th>Precio</th><th>Cantidad</th></tr></thead>';

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    for (var productName in cart) {
        var product = cart[productName];
        var formattedPrice = product.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
        var tr = document.createElement('tr');
        tr.innerHTML = '<td><img src="' + product.image + '" alt="' + product.name + '" style="width: 50px; height: 50px;"></td><td>' + product.name + '</td><td>' + formattedPrice + '</td><td>' + product.quantity + ' <button onclick="updateQuantity(\'' + product.name + '\', -1)">-</button><button onclick="updateQuantity(\'' + product.name + '\', 1)">+</button></td><td><button onclick="removeFromCart(\'' + product.name + '\')">Remove</button></td>';
        cartElement.appendChild(tr);
    }

    // Calcular el valor total
    var total = calculateTotal();
    var totalElement = document.createElement('p');
    totalElement.textContent = 'Total: $' + total.toLocaleString('es-ES', {style: 'decimal'});
    totalElement.style.color = 'white';
    totalElement.style.marginRight = '30px';
    cartElement.appendChild(totalElement);

    document.querySelectorAll('.remove-button').forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            var productName = this.getAttribute('data-product-name');
            delete cart[productName];
            updateCart();
        });
    });
}

document.querySelector('#img-carrito').addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el enlace cambie la URL
    var carrito = document.querySelector('#carrito');
    if (carrito.style.display === 'none' || carrito.style.display === '') {
        carrito.style.display = 'block';
    } else {
        carrito.style.display = 'none';
    }
});

// Remover del carrito
function removeFromCart(productName) {
    delete cart[productName];
    updateCart();
}

// Vaciar carrito
document.getElementById('vaciar-carrito').addEventListener('click', function(event) {
    event.preventDefault();
    cart = {};
    updateCart();
});

// Modificar cantidad dentro del carrito
function updateQuantity(productName, quantity) {
    if (productName in cart) {
        cart[productName].quantity = parseInt(cart[productName].quantity) + quantity;
        if (cart[productName].quantity <= 0) {
            delete cart[productName];
        }
        updateCart();
    }
}
