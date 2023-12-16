const randomMealImg = document.getElementById("randomMeal")
const randomName = document.getElementById("randomName")
const randomCategory = document.getElementById("randomcategory")
const randomArea = document.getElementById("randomarea")
const cardContainer = document.getElementById("card-container")
const searchBar = document.getElementById("search-bar")
const resultsFor = document.getElementById("resultsfor")
const explore = document.getElementById("Explore")

explore.onclick =()=>{
    window.scroll({
        top:756 , behavior:"smooth"
    })
}

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

async function getSearchedCategory(category) {
    try {
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
                let data = await response.json()
                console.log(data.meals)
                cardContainer.innerHTML = "" 
                data.meals.forEach((dish)=>{
                    let newDish = 
                    `<div class="card">
                        <img src="${dish.strMealThumb}" id="dishImg">
                        <h2 id="dishName">${dish.strMeal}</h2>
                    </div>`
                    cardContainer.innerHTML += newDish 
                })

    } catch (err) {
        console.error("Error fetching data:", err);
    }
}

searchBar.addEventListener("keypress" , (e)=>{
    if (e.key == "Enter"){
        resultsFor.innerHTML = searchBar.value
        getSearchedCategory(searchBar.value)
        window.scroll({top:1300 , behavior:"smooth"})
    }
})