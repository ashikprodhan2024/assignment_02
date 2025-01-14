let allProducts = [];

const loadAllproduct = () => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=a")
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);

            allProducts = data.drinks; 
            displayProduct(allProducts);
        });
};

const displayProduct = (products) => {
    const productsContainer = document.getElementById("product_container");
    productsContainer.innerHTML = "";

    if (!products || products.length === 0) {
        productsContainer.innerHTML = `<h5>No Products Found</h5>`;
        return;
    }

    products.forEach((product) => {
        // console.log(product);
        const div = document.createElement("div");

        div.classList.add("card");
        div.innerHTML = `
            <img class="card-img" src="${product.strDrinkThumb}" alt="Product Image">
            <h5>Name: ${product.strDrink}</h5>
            <h3>Price: ${Math.floor(Math.random() * 100) + 1}</h3> <!-- ডামি প্রাইস -->
            <p>Title: ${product.strInstructions?.slice(0, 50) || "No description available"}...</p>
            <button onclick="silgleProduct('${product.idDrink}')">Details</button>
            <button onclick="handleAddToCart('${product.strDrink}', ${Math.floor(Math.random() * 100) + 1})">Add to Cart</button>
        `;
        productsContainer.appendChild(div);
    });
};

const handleAddToCart = (name, price) => {
    const cartCount = document.getElementById("count");
    const convert = parseInt(cartCount.innerText);
    cartCount.innerText = convert + 1;

    const container = document.getElementById("card_main_cintainer");
    // console.log(name, price);

    const div = document.createElement("div");

    div.classList.add("cart_info");
    div.innerHTML = `
        <p>${name}</p>
        <h3 class="price">${price}</h3>
    `;
    container.appendChild(div);
    updatePrice();
};

const updatePrice = () => {
    const allPrice = document.getElementsByClassName("price");
    
    let total = 0;
    for (const element of allPrice) {
        total += parseFloat(element.innerText);
    }
    document.getElementById("add_total").innerText = total.toFixed(2);
};

const silgleProduct = (id) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => res.json())
        .then((data) => {
            const product = data.drinks[0];
            alert(`
                Title: ${product.strDrink}
                Category: ${product.strCategory}
                Alcoholic: ${product.strAlcoholic}
                Instructions: ${product.strInstructions}
            `);
        });
};

const handleSearch = () => {
    const searchValue = document.getElementById("search_field").value.toLowerCase();
    const filteredProducts = allProducts.filter((product) =>
        product.strDrink.toLowerCase().includes(searchValue)
    );
    displayProduct(filteredProducts);
};

loadAllproduct();