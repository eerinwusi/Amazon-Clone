

function getCartItems() {
    db.collection("cart-items").onSnapshot((snapshot) => {
        let cartItems = [];
        snapshot.docs.forEach((doc) => {
            cartItems.push({
                id: doc.id,
                ...doc.data()
            })
        });
        generateCartItems(cartItems);
        getTotalCost(cartItems);
    })
}

function getTotalCost(items) {
    let totalCost = 0;
    items.forEach((item) => {
        totalCost += (item.price * item.quantity);
    })
    document.querySelector(".total-cost-number").innerText = `$${totalCost}`;
}

function decreaseCount(itemId) {
    let cartItem = db.collection("cart-items").doc(itemId);
    cartItem.get().then(function(doc) {
        if (doc.exists) {
            if (doc.data().quantity > 1) {
                    cartItem.update({
                    quantity: doc.data().quantity - 1
                })
            }
        }
    })
}

function increaseCount(itemId) {
    let cartItem = db.collection("cart-items").doc(itemId);
    cartItem.get().then(function(doc) {
        if (doc.exists) {
            if (doc.data().quantity >= 1) {
                    cartItem.update({
                    quantity: doc.data().quantity + 1
                })
            }
        }
    })
}

function deleteItem(itemId) {
    db.collection("cart-items").doc(itemId).delete();
}

function generateCartItems(cartItems) {
    let itemsHTML = "";
    let div = document.createElement("div")
    
    cartItems.forEach((item) => {
        itemsHTML += `
        <div class="cart-items items-center border-b p-6">
            <div class="cart-item-image w-40 h-24 p-1 rounded-lg">
                <img class="w-full h-full object-contain" src="${item.image}" alt="">
            </div>
            <div class="cart-item-details font-bold text-sm flex-grow">
                <div class="cart-item-name text-gray-600">${item.name}</div>
                <div class="cart-item-brand text-gray-400">${item.make}</div>
            </div>
            <div class="cart-item-counter w-48 flex items-center">
                <div data-id="${item.id}" class="chevron-left text-gray-400 bg-white rounded h-6 w-6 flex justify-center items-center mr-2 hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                </div>
                <h4 class="text-gray-400">x ${item.quantity}</h4>
                <div data-id="${item.id}" class="chevron-right text-gray-400 bg-white rounded h-6 w-6 flex justify-center items-center ml-2 hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
                </div>
            </div>
            <div class="cart-item-totalcost font-bold text-gray-400 w-48">
                $${item.price * item.quantity}
            </div>
            <div data-id="${item.id}" class="cart-item-delete w-10 text-gray-400 hover:text-gray-500 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </div>
        </div>
        `
    })
    document.querySelector(".cart-items").innerHTML = itemsHTML;
    createEventListeners();
}

function createEventListeners() {
    let decreaseButtons = document.querySelectorAll(".chevron-left");
    let increaseButtons = document.querySelectorAll(".chevron-right");
    let deleteButtons = document.querySelectorAll(".cart-item-delete");

    decreaseButtons.forEach((button) => {
        button.addEventListener("click", function() {
            decreaseCount(button.dataset.id);
        })
    })

    increaseButtons.forEach((button) => {
        button.addEventListener("click", function() {
            increaseCount(button.dataset.id);
        })
    })

    deleteButtons.forEach((button) => {
        button.addEventListener("click", function() {
            deleteItem(button.dataset.id);
        })
    })
}

getCartItems();