// dashboard.js

document.addEventListener("DOMContentLoaded", function () {
    const productNameInput = document.getElementById("product-name");
    const productQuantityInput = document.getElementById("product-quantity");
    const productPriceInput = document.getElementById("product-price");
    const addProductButton = document.getElementById("add-product");
    const productList = document.getElementById("product-list");

    let products = [];

    addProductButton.addEventListener("click", function () {
        const productName = productNameInput.value.trim();
        const productQuantity = parseInt(productQuantityInput.value);
        const productPrice = parseFloat(productPriceInput.value);

        if (productName && !isNaN(productQuantity) && !isNaN(productPrice)) {
            const product = {
                name: productName,
                quantity: productQuantity,
                price: productPrice
            };

            products.push(product);
            updateProductList();
            clearInputs();
        }
    });

    function updateProductList() {
        productList.innerHTML = "";
        products.forEach((product, index) => {
            const productItem = document.createElement("div");
            productItem.classList.add("product");

            const productName = document.createElement("span");
            productName.textContent = product.name;

            const productQuantity = document.createElement("span");
            productQuantity.textContent = `Quantity: ${product.quantity}`;

            const productPrice = document.createElement("span");
            productPrice.textContent = `Price: $${product.price.toFixed(2)}`;

            const removeButton = document.createElement("span");
            removeButton.classList.add("remove");
            removeButton.textContent = "Remove";
            removeButton.addEventListener("click", () => {
                if (product.quantity > 1) {
                    product.quantity--;
                } else {
                    products.splice(index, 1);
                }
                updateProductList();
            });

            const detailsButton = document.createElement("button");
            detailsButton.textContent = "Details";
            detailsButton.addEventListener("click", () => {
                if (product.quantity === 0) {
                    alert("Product is out of stock!");
                } else {
                    alert(`Product: ${product.name}\nQuantity: ${product.quantity}\nPrice: $${product.price.toFixed(2)}`);
                }
            });

            productItem.appendChild(productName);
            productItem.appendChild(productQuantity);
            productItem.appendChild(productPrice);
            productItem.appendChild(removeButton);
            productItem.appendChild(detailsButton);

            if (product.quantity == 0) {
                productItem.classList.add("out-of-stock");
                
            }

            productList.appendChild(productItem);
        });
    }
    

    function clearInputs() {
        productNameInput.value = "";
        productQuantityInput.value = "";
        productPriceInput.value = "";
    }

    updateProductList();
});
