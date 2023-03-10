console.log('client');

const option = {
    animation: true,
    delay: 900
};
function toastClicked () {
    const toastHTMlelement = document.getElementById('toast');
    // eslint-disable-next-line no-undef
    const toastElement = new bootstrap.Toast(toastHTMlelement, option);
    toastElement.show();
}

const itemList = [];
function saveData (data) {
    itemList.push(data);
}

// const orders = []

let arts = [];
const artTemplate = document.querySelector('[art-template]');
const artContainer = document.querySelector('[art-cards-container]');
const searchInput = document.querySelector('[art-search]');
searchInput.addEventListener('input', e => {
    const value = e.target.value.toUpperCase();
    arts.forEach(art => {
        const isVisable = art.name.toUpperCase().includes(value) || art.artist.toUpperCase().includes(value);
        art.element.classList.toggle('hidden', !isVisable);
    });
});

fetch('/item')
    .then(res => res.json())
    .catch(error => window.alert(error))
    .then(data => {
        let totalPrice = 0;
        let seq = 0;
        // Render Items
        arts = data.map(art => {
            saveData(art);
            const card = artTemplate.content.cloneNode(true).children[0];
            const price = card.querySelector('[art-price]');
            const name = card.querySelector('[art-name]');
            const artist = card.querySelector('[art-artist]');
            const src = card.querySelector('[art-src]');
            price.textContent = '$' + art.price;
            name.textContent = art.name;
            artist.textContent = art.artist;
            src.src = art.src;
            artContainer.append(card);
            return { name: art.name, artist: art.artist, element: card };
        });
        // Purchase
        const buyBtn = document.querySelectorAll('.purchaseBtn');
        for (let itemID = 0; itemID < buyBtn.length; itemID++) {
            // add button clicked
            buyBtn[itemID].addEventListener('click', () => {
                toastClicked();
                console.log(`seq    ${seq}`);

                // Render purchase
                const order = document.getElementById('order');
                const itemTemplate = `<div class="purchase">
                    <div class="remove-item">
                        <button type="button" class=" btn-close removeBtn" aria-label="Close"></button>
                    </div>
                    <div class="purchase-info col-10">
                    <div class="item-img"><img src="${data[itemID].src}" alt=""></div>
                    <div class="purchase-text">
                        <div class="purchase-name">${data[itemID].name}</div>
                        <div class="purchase-artist">${data[itemID].artist}</div>
                    </div>
                    </div>
                    <div class="purchase-price col-2">${data[itemID].price}</div>
                </div>`;
                order.innerHTML += itemTemplate;

                const item = document.querySelectorAll('.purchase');
                const index = (item.length - 1);
                console.log(`item id    ${itemID}`);
                console.log(`items index    ${index}`);
                console.log('');

                item[index].setAttribute('price', `${data[itemID].price}`);
                item[index].setAttribute('itemID', `${itemID}`);
                item[index].setAttribute('seq', `${seq}`);

                const price = parseInt(item[index].getAttribute('price'));

                totalPrice += price;
                const total = document.getElementById('total-price');
                total.innerText = totalPrice;

                const removeBtn = document.querySelectorAll('.removeBtn');
                removeBtn[index].setAttribute('seq', `${seq}`);

                for (let index = 0; index < removeBtn.length; index++) {
                    removeBtn[index].addEventListener('click', () => {
                        const btnSeq = removeBtn[index].getAttribute('seq');
                        const removeItem = document.querySelectorAll(`[seq="${btnSeq}"]`)[0];
                        const price = parseInt(removeItem.getAttribute('price'));
                        console.log(price);
                        removeItem.remove();
                        totalPrice -= price;
                        const total = document.getElementById('total-price');
                        total.innerText = totalPrice;
                    });
                }
                seq++;
        });
        }

        const checkout = document.querySelector('#checkout');
        checkout.addEventListener('click', () => {
            toastClicked();
            const item = document.querySelectorAll('.purchase');
            const purchases = [];
            for (let PID = 0; PID < item.length; PID++) {
                const item = document.querySelectorAll('.purchase');
                const itemid = item[PID].getAttribute('itemid');
                const purchase = { purchaseId: PID, itemID: itemid };
                purchases.push(purchase);
            }
            const order = { total: totalPrice, purchases };
            console.log((order));

            const option = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            };
            fetch('/postorder', option)
            .catch(error => window.alert(error + '\n' + 'Server disconnected'));

            // Removing item in cart and reset values
            for (let i = 0; i < item.length; i++) {
                item[i].remove();
            }
            totalPrice = 0;
            const total = document.getElementById('total-price');
            total.innerText = totalPrice;
            seq = 0;
        });
    });

const refrashOrder = document.getElementById('refresh-order');
refrashOrder.addEventListener('click', () => {
    fetch('/orders')
    .then(res => res.json())
    .catch(error => window.alert(error + '\n' + 'Server disconnected'))
    .then(orders => {
        console.log(orders);
        toastClicked();
    const reset = document.querySelectorAll('[order]');
    for (let i = 0; i < reset.length; i++) {
        reset[i].remove();
    }
    for (let orderIndex = 0; orderIndex < orders.length; orderIndex++) {
        const reviewOrderTem = `
        <div id="review-order" order="${orderIndex}">
            <div class="orderNum">Order ${orderIndex + 1}</div>
            <table class="table">
            <thead>
                <tr>
                <th scope="col">#id</th>
                <th scope="col">Product</th>
                <th scope="col">Total Price</th>
                <th scope="col">Quantity</th>
                </tr>
            </thead>
            <tbody tbody="${orderIndex}">
            </tbody>
            </table>
        </div>`;
        const orderSect = document.getElementsByClassName('review-head')[0];
        // orderSect.innerHTML += reviewOrderTem
        orderSect.insertAdjacentHTML('afterend', reviewOrderTem);
        const orderArr = orders[orderIndex].purchases;
        console.log('order arr');
        console.log(orderArr);

            // Get the frequency of itemID values
        const itemFeq = orderArr.reduce((acc, itemFreq) => {
            acc[itemFreq.itemID] = (acc[itemFreq.itemID] || 0) + 1;
            return acc;
            }, {});
        const keys = Object.keys(itemFeq);
        const values = Object.values(itemFeq);
        console.log(`keys   ${keys}`);
        console.log(`values ${values}`);
        const tbody = document.querySelector(`[tbody="${orderIndex}"]`);

        for (let Itemindex = keys.length - 1; Itemindex >= 0; Itemindex--) {
            console.log(`number of unique item ${Itemindex}`);
            const reviewOrderItem = `<tr class="order-item">
        <th scope="row" class="itemid">${keys[Itemindex]}</th>
        <td class="item-image"><img src=${itemList[keys[Itemindex]].src} alt=""></td>
        <td class="item-total">${parseInt(itemList[keys[Itemindex]].price) * values[Itemindex]}</td>
        <td class="item-quantity">${values[[Itemindex]]}</td>
        </tr>`;
            // tbody.innerHTML += reviewOrderItem
            tbody.insertAdjacentHTML('afterend', reviewOrderItem);
        }
    }

    console.log('done');
    });
});

const productForm = document.querySelector('#order-form');
productForm.addEventListener('submit', () => {
    toastClicked();
    const formData = new FormData(productForm);
    const newItem = Object.fromEntries(formData);
    const imageID = document.querySelectorAll('.art-card').length;
    newItem.id = imageID;
    newItem.price = parseInt(newItem.price);
    newItem.src = `image/${newItem.src.name}`;
    console.log(newItem);
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
    };
    fetch('/postitem', option)
    .catch(error => window.alert(error + '\n' + 'Server disconnected'));
});
