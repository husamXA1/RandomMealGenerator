// Getting page elements
const mealBtn = document.getElementById("get_meal");
const mealDiv = document.getElementById("meal");

// Event to get meal button
mealBtn.onclick = () => {
    refreshMeal();
}

// Uses TheMealDB's public API to get a random meal and returns a JSON containing its data
// https://www.themealdb.com/api/json/v1/1/random.php
async function getRandomMeal() {
    const fetchRequest = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    return await fetchRequest.json();
}

// Changes the content of the div containing the meal with a random meal
function refreshMeal() {
    mealDiv.style.display = "flex";
    getRandomMeal().then((data) => {
        let randomMeal = data["meals"][0];
        console.log(randomMeal);
        // Set main title
        document.getElementById("meal-name").innerText = randomMeal.strMeal;
        // Set description
        document.getElementById("meal-description").innerText = randomMeal.strInstructions;
        // Set image
        document.getElementById("meal-image").src = randomMeal.strMealThumb;
        document.getElementById("meal-image").alt = randomMeal.strMeal;
        // Set category
        document.getElementById("meal-category").innerHTML = "<b>Category: </b>" + randomMeal.strCategory;
        // Set area
        document.getElementById("meal-area").innerHTML = "<b>Area: </b>" + randomMeal.strArea;
        // Set tags
        document.getElementById("meal-tags").innerHTML = (randomMeal.strTags)? "<b>Tags: </b>" + randomMeal.strTags : "";
        // Set ingreadients
        document.getElementById("ingredients-label").innerText = "Ingredients: ";
        let ingredientsList = document.getElementById("meal-ingredients");
        ingredientsList.innerHTML = "";
        for (let i = 1; i <= 20; i++) {
            if (randomMeal[`strIngredient${i}`]) {
                let listItem = document.createElement("li");
                listItem.appendChild(document.createTextNode(randomMeal[`strIngredient${i}`] + " - " + randomMeal[`strMeasure${i}`]));
                ingredientsList.appendChild(listItem);
            }
        }
        // Set video
        if (randomMeal.strYoutube) {
            document.getElementById("video-container").style.display = "flex";
            document.getElementById("video-title").innerText = "Recipe Video";
            document.getElementById("meal-video").src = `https://www.youtube.com/embed/${randomMeal.strYoutube.match(/v=\w+/)[0].substring(2)}`;
        } else {
            document.getElementById("video-container").style.display = "none";
            document.getElementById("video-title").innerText = "";
            document.getElementById("meal-video").src = "";
        }
    });
}

// remove the iframe video when the page is closed
window.addEventListener('unload', function() {
    const iframe = document.querySelector('iframe');
    iframe.removeAttribute('src');
});
  