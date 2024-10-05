const headingInput = document.getElementById('heading');
const paragraphInput = document.getElementById('paragraph');
const addButton = document.getElementById('add');
const contentDiv = document.getElementById('content');

// Load data from local storage on page load
const storedData = JSON.parse(localStorage.getItem('data')) || [];
storedData.forEach(data => createItem(data));

addButton.addEventListener('click', () => {
    const heading = headingInput.value;
    const paragraph = paragraphInput.value;

    if (heading && paragraph) {
        const newItem = {
            heading,
            paragraph,
        };

        createItem(newItem);
        storedData.push(newItem);
        localStorage.setItem('data', JSON.stringify(storedData));

        headingInput.value = '';
        paragraphInput.value = '';
    }
});

function createItem(data) {
    const item = document.createElement('div');
    item.classList.add('item');

    item.innerHTML = `
        <h2>${data.heading}</h2>
        <p>${data.paragraph}</p>
        <button class="delete-btn">Delete</button>
    `;

    contentDiv.appendChild(item);

    item.querySelector('.delete-btn').addEventListener('click', () => {
        item.remove();
        const index = storedData.findIndex(item => item.heading === data.heading && item.paragraph === data.paragraph);
        storedData.splice(index, 1);
        localStorage.setItem('data', JSON.stringify(storedData));
    });
}