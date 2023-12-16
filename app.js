const randomMealImg = document.getElementById("randomMeal")
const randomName = document.getElementById("randomName")
const randomCategory = document.getElementById("randomcategory")
const randomArea = document.getElementById("randomarea")
async function getRandomMeal() {
    try {
            let response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
                let data = await response.json()
                console.log(data.meals)
                randomMealImg.src = data.meals[0].strMealThumb
                randomName.innerHTML = data.meals[0].strMeal
                randomCategory.innerHTML = data.meals[0].strCategory
                randomArea.innerHTML = data.meals[0].strArea

    } catch (err) {
        console.error("Error fetching data:", err);
    }
}
getRandomMeal()