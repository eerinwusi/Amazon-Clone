

function getItems(){
    db.collection("items").get().then((querySnapshot) => {
        let items = [];
        querySnapshot.forEach((doc) => {
            items.push({
                id: doc.id,
                image: doc.data().image,
                name: doc.data().name,
                make: doc.data().make,
                price: doc.data().price,
                rating: doc.data().rating
            })
        });
        generateItems(items);
    });
    
}

function addToCart(item) {
    let cartItem = db.collection("cart-items").doc(item.id);
    cartItem.get()
    .then(function(doc) {
        if(doc.exists) {
            cartItem.update({
                quantity: doc.data().quantity + 1
            })
        }

        else {
            cartItem.set({
                image: item.image,
                name: item.name,
                make: item.make,
                price: item.price,
                rating: item.rating,
                quantity: 1
            })
        }
    })
}

function generateItems(items) {
    let itemsHTML = "";

    items.forEach((item) => {
        let doc = document.createElement("div");
        doc.classList.add("items", "mr-5");
        doc.innerHTML = `
            <div class="item-image w-48 h-52 bg-white rounded-lg flex flex-wrap">
                <img class="w-full h-full object-contain p-2" src="${item.image}" alt="">
            </div>
            <div class="item-name font-bold">
                ${item.name}
            </div>
            <div class="item-brand font-bold text-gray-500 text-sm">${item.make}</div>
            <div class="item-rating">⭐⭐⭐⭐ ${item.rating}</div>
            <div class="item-price font-bold">$ ${item.price}   </div>
            
        `
        let addToCartEl = document.createElement("div");
        addToCartEl.classList.add("w-36", "bg-yellow-400", "p-2", "rounded-lg", "hover:bg-yellow-500", "font-bold", "text-sm", "my-4", "flex", "justify-center", "items-center", "cursor-pointer");
        addToCartEl.innerText = "Add to Cart";
        addToCartEl.addEventListener("click", function(){
            addToCart(item);
        })
        doc.appendChild(addToCartEl);
        document.querySelector(".items").appendChild(doc);
    })
}

getItems();