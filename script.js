document.addEventListener("DOMContentLoaded", function() {
    // Define category URLs
    const categories = [
        { name: 'Breakfast', url: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=breakfast' },
        { name: 'Vegan Meals', url: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegan' },
        { name: 'Vegetarian Meals', url: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian' },
        { name: 'Desserts', url: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert' }
    ];

    // Fetch and display meals for each category
    categories.forEach(category => {
        fetchMeals(category.name, category.url);
    });
});

// Function to fetch meals for a specific category and display them
function fetchMeals(categoryName, categoryUrl) {
    fetch(categoryUrl)
        .then(response => response.json())
        .then(data => {
            displayCategoryMeals(categoryName, data.meals);
        })
        .catch(error => console.error(`Error fetching ${categoryName} meals:`, error));
}

// Function to display meals under a specific category with a headline and hover effect
function displayCategoryMeals(categoryName, meals) {
    const menuContent = document.getElementById('menu-content');

    // Create and append category headline
    const categoryHeadline = document.createElement('h2');
    categoryHeadline.textContent = categoryName;
    menuContent.appendChild(categoryHeadline);

    // Limit meals to the first 3
    const limitedMeals = meals.slice(0, 3);

    // Display meals in the category
    limitedMeals.forEach(meal => {
        const mealElement = document.createElement('ul');
        mealElement.innerHTML = `
            <li>
                ${meal.strMeal}
                <div class="tooltiptext" data-meal-id="${meal.idMeal}">
                    <h4>${meal.strMeal}</h4>
                    <p>Description: Loading...</p>
                    <img class="thumbImage" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                </div>
            </li>
        `;
        mealElement.classList.add('menu-item');
        menuContent.appendChild(mealElement);

        // Add event listener to fetch full details on hover
        mealElement.addEventListener('mouseenter', function() {
            fetchMealDetails(meal.idMeal, mealElement.querySelector('.tooltiptext'));
        });
    });
}
// Function to fetch full meal details
function fetchMealDetails(mealId, tooltipElement) {
    const detailUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    fetch(detailUrl)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            const ingredients = [];

            // Loop through ingredients and measures (up to 10)
            for (let i = 1; i <= 10; i++) {
                const ingredient = meal[`strIngredient${i}`];
                if (ingredient && ingredient.trim()) {
                    ingredients.push(`${ingredient}`);
                }
            }

            // Join ingredients into a comma-separated list
            const ingredientsText = ingredients.join(', ');

            // Update tooltip with full meal details
            tooltipElement.innerHTML = `
                <h4>${meal.strMeal}</h4>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="100" class="thumbImage";>
                <p class="ingredients">${ingredientsText}</p>
            `;
        })
        .catch(error => console.error('Error fetching meal details:', error));
}

