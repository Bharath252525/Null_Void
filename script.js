// Sample data for demonstration
let items = [
    { id: 1, title: 'Arduino Uno', description: 'Microcontroller board based on ATmega328P', price: 25, image: 'https://cdn.sparkfun.com/assets/9/1/e/4/8/515b4656ce395f8a38000000.png', datasheet: 'arduino_datasheet.pdf' },
    { id: 2, title: 'Raspberry Pi 4', description: 'Single-board computer with quad-core processor', price: 35, image: 'https://robu.in/wp-content/uploads/2020/05/Raspberry-Pi-4-Model-B-with-8-GB-RAM.jpg', datasheet: 'raspberrypi_datasheet.pdf' },
    { id: 3, title: 'ESP32', description: 'Low-power Wi-Fi and Bluetooth microcontroller', price: 15, image: 'https://quartzcomponents.com/cdn/shop/products/ESP32S-Development-Board_1024x1024.jpg?v=1654673368', datasheet: 'esp32_datasheet.pdf' }
];

// Listen for typing in the search box
document.getElementById("searchInput").addEventListener("input", function() {
    filterItems(this.value.trim());
});

// Function to filter items
function filterItems(searchTerm) {
    //let searchTerm = document.getElementById('searchInput').value.toLowerCase();

    let minPrice = parseFloat(document.getElementById('minPriceInput').value);
    let maxPrice = parseFloat(document.getElementById('maxPriceInput').value);

    let filteredItems = items.filter(item => {
        let matchesSearchTerm = item.title.toLowerCase().includes(searchTerm);

        let withinPriceRange = true;
        if (!isNaN(minPrice) && !isNaN(maxPrice)) {
            withinPriceRange = item.price >= minPrice && item.price <= maxPrice;
        }

        return matchesSearchTerm && withinPriceRange;
    });

    displayItems(filteredItems);
}

// Function to display items
function displayItems(itemsToDisplay) {
    let itemList = document.getElementById('itemList');
    itemList.innerHTML = '';

    itemsToDisplay.forEach(item => {
        let itemCard = document.createElement('div');
        itemCard.classList.add('item-card');
        itemCard.innerHTML = `
            <img src="${item.image}" alt="${item.title}" style="max-width: 100px;">
            <h3>${item.title}</h3>
            <p>$${item.price}</p>
            <button onclick="showItemModal(${item.id})">Details</button>
            <button onclick="promptForEmail(${item.id}, ${item.price})">Order</button>
        `;
        itemList.appendChild(itemCard);
    });
}



// Function to generate unique 10-digit code
function generateUniqueCode() {
    let code = '';
    for (let i = 0; i < 10; i++) {
        code += Math.floor(Math.random() * 10);
    }
    return code;
}

// Function to simulate sending email (replace with actual email sending code)
function sendEmail(email, uniqueCode) {
    console.log(`Sending unique code ${uniqueCode} to ${email}...`);
    // Here you would implement actual email sending logic using a service like SMTP or an API
}

// Function to show item details modal
function showItemModal(itemId) {
    let item = items.find(item => item.id === itemId);
    if (!item) return;

    let modal = document.getElementById('itemModal');
    modal.style.display = 'block';

    document.getElementById('modalTitle').textContent = item.title;

    let modalDescription = document.getElementById('modalDescription');
    modalDescription.innerHTML = `
        <p>${item.description}</p>
        <img src="${item.image}" alt="${item.title}" style="max-width: 200px;">
        <p><a href="${item.datasheet}" target="_blank">Download Pre-Purchace Datasheet</a></p>
    `;
}

// Function to close item details modal
function closeModal() {
    let modal = document.getElementById('itemModal');
    modal.style.display = 'none';
}

// Function to show unique code modal
function showUniqueCodeModal(uniqueCode) {
    let modal = document.getElementById('uniqueCodeModal');
    let codeDisplay = document.getElementById('uniqueCode');
    codeDisplay.textContent = uniqueCode;
    
    modal.style.display = 'block';

    // Select and copy code to clipboard
    let copyButton = document.getElementById('copyCode');
    copyButton.addEventListener('click', function() {
        copyToClipboard(uniqueCode);
        alert('Code copied to clipboard!');
    });
}

// Function to close unique code modal
function closeUniqueCodeModal() {
    let modal = document.getElementById('uniqueCodeModal');
    modal.style.display = 'none';
}

// Function to copy text to clipboard
function copyToClipboard(text) {
    let textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// Initial display of items when page loads
displayItems(items);
