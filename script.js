        let tableNumber = 'Table 1';
        let itemCounts = {};

        function addToOrder(item, element) {
            if (!itemCounts[item]) {
                itemCounts[item] = 0;
            }
            itemCounts[item]++;
            updateButton(element, item);
            updateOrderButtons();
        }

        function updateButton(element, item) {
            const button = element.querySelector('.order-button');
            button.textContent = `${itemCounts[item]}x Add`;
            button.style.backgroundColor = '#25d366';
            button.style.color = '#fff';
        }

        function updateOrderButtons() {
            const orderButtons = document.querySelector('.order-buttons');
            orderButtons.innerHTML = '';

            for (const item in itemCounts) {
                if (itemCounts.hasOwnProperty(item)) {
                    const count = itemCounts[item];
                    const button = document.createElement('button');
                    button.textContent = `${item} x${count}`;
                    button.className = 'order-button';
                    button.dataset.item = item;
                    button.onclick = () => removeFromOrder(item);
                    orderButtons.appendChild(button);
                }
            }

            const clearButton = document.createElement('button');
            clearButton.textContent = 'Clear';
            clearButton.className = 'order-button';
            clearButton.onclick = clearOrder;
            orderButtons.appendChild(clearButton);
        }

        function removeFromOrder(item) {
            itemCounts[item]--;
            if (itemCounts[item] === 0) {
                delete itemCounts[item];
            }
            updateOrderButtons();
        }

        function clearOrder() {
            itemCounts = {};
            updateOrderButtons();
        }

        function sendOrder() {
            const orderItems = [];
            for (const item in itemCounts) {
                if (itemCounts.hasOwnProperty(item)) {
                    orderItems.push(`${itemCounts[item]} ${item}`);
                }
            }

            if (orderItems.length === 0) {
                alert('Your order is empty. :)');
                return;
            }

            const orderSummary = orderItems.join(', ');
            const whatsappMessage = `*${tableNumber} - Total Items: ${orderItems.length} - Order: ${orderSummary}*`;

            // Add the formatted order to the WhatsApp URL
            const whatsappLink = 'https://wa.me/387603166607?text=' + encodeURIComponent(whatsappMessage);
            window.open(whatsappLink, '_blank');
        }
