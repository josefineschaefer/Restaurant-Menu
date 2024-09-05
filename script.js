document.addEventListener("DOMContentLoaded", function () {
    fetch('menu.json')
        .then(response => response.json())
        .then(data => {
            // Get the menu content container
            const menuContent = document.getElementById('menu-content');

            // Iterate through the categories in the JSON
            for (const category in data) {
                // Create and append a heading for each category
                const heading = document.createElement('h2');
                heading.textContent = category;
                menuContent.appendChild(heading);

                // Create a list for the menu items
                const list = document.createElement('ul');

                // Add each item in the category to the list
                data[category].forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.textContent = item;
                    list.appendChild(listItem);
                });

                // Append the list to the menu content container
                menuContent.appendChild(list);
            }
        })
        .catch(error => {
            console.error('Error loading menu:', error);
        });
});
