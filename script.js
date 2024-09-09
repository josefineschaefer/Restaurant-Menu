document.addEventListener("DOMContentLoaded", function() {
    // URL to get breakfast meals
    const breakfastUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=breakfast';
    const veganUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegan';
    const vegetarianUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian'; 
    const dessertUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert';


    // Fetch data from the API
    fetch(breakfastUrl)
        .then(response => response.json()) // Parse the JSON data
        .then(data => {
            // Call a function to display the data on the page
            displayCategoryMeals('Breakfast', data.meals);
        })
        .catch(error => {
            console.error('Error fetching breakfast meals:', error);
        });

    fetch(veganUrl)
        .then(response => response.json())
        .then(data => {
            displayCategoryMeals('Vegan Meals', data.meals);
        })
        .catch(error => {
            console.error('Error fetching Vegan meals:', error);
        });

    fetch(vegetarianUrl)
        .then(response => response.json())
        .then(data => {
            displayCategoryMeals('Vegetarian Meals', data.meals);
        })
        .catch(error => {
            console.error('Error fetching Vegetarian meals:', error);
        });

  fetch(dessertUrl)
        .then(response => response.json())
        .then(data => {
            displayCategoryMeals('Desserts', data.meals);
        })
        .catch(error => {
            console.error('Error fetching Desserts:', error);
        });
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
        const mealElement = document.createElement('div');
        mealElement.innerHTML = `
        <ul>
            <li>${meal.strMeal}</li>
        </ul>
        `;
        menuContent.appendChild(mealElement);
    });
}