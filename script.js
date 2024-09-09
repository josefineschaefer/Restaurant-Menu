document.addEventListener("DOMContentLoaded", function() {
    // URL to get breakfast meals
    const breakfastUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=breakfast';

    // Fetch data from the API
    fetch(breakfastUrl)
        .then(response => response.json()) // Parse the JSON data
        .then(data => {
            // Call a function to display the data on the page
            displayMeals(data.meals);
        })
        .catch(error => {
            console.error('Error fetching breakfast meals:', error);
        });
});

// Function to display the breakfast meals on the page
function displayMeals(meals) {
    const menuContent = document.getElementById('menu-content');

    meals.forEach(meal => {
        const mealElement = document.createElement('div');
        mealElement.innerHTML = `
        <ul>
            <li>${meal.strMeal}</li>
        </ul>
        `;
        menuContent.appendChild(mealElement);
    });
}
