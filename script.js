document.addEventListener("DOMContentLoaded", function() {
    const breakfastUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=breakfast';
    const veganUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegan';
    const vegetarianUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian'; 
    const dessertUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert';

    // Fetch data for each category and display on the page
    fetch(breakfastUrl)
        .then(response => response.json())
        .then(data => displayCategoryMeals('Breakfast', data.meals))
        .catch(error => console.error('Error fetching breakfast meals:', error));

    fetch(veganUrl)
        .then(response => response.json())
        .then(data => displayCategoryMeals('Vegan Meals', data.meals))
        .catch(error => console.error('Error fetching vegan meals:', error));

    fetch(vegetarianUrl)
        .then(response => response.json())
        .then(data => displayCategoryMeals('Vegetarian Meals', data.meals))
        .catch(error => console.error('Error fetching vegetarian meals:', error));

    fetch(dessertUrl)
        .then(response => response.json())
        .then(data => displayCategoryMeals('Desserts', data.meals))
        .catch(error => console.error('Error fetching dessert meals:', error));
});

// Function to display meals under a specific category with a headline
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

            // Loop through ingredients and measures (up to 20)
            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`];
                const measure = meal[`strMeasure${i}`];
                if (ingredient && ingredient.trim()) {
                    ingredients.push(`${ingredient}`);
                }
            }

            // Update tooltip with full meal details
            tooltipElement.innerHTML = `
                <h4>${meal.strMeal}</h4>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="100">
                <ul class="ingredients">${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
            `;
        })
        .catch(error => console.error('Error fetching meal details:', error));
}
