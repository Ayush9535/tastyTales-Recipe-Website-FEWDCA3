const randomMealImg = document.getElementById("randomMeal")
const randomName = document.getElementById("randomName")
const randomCategory = document.getElementById("randomcategory")
const randomArea = document.getElementById("randomarea")
const cardContainer = document.getElementById("card-container")
const searchBar = document.getElementById("search-bar")
const resultsFor = document.getElementById("resultsfor")
const explore = document.getElementById("Explore")
const viewIngre = document.getElementById("viewIngredient")
let id;

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
                id = data.meals[0].idMeal
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
                document.querySelectorAll(".card").forEach((ele)=>{
                    console.log(ele)
                    ele.addEventListener("click" , (e)=>{
                        console.log(e.target.parentElement)
                        e.stopPropagation()
                    })
                })
    } catch (err) {
        console.error("Error fetching data:", err);
    }
}

const popup = document.getElementById("popup")
const ingredientlist = document.getElementById("ingredient-list")
const closePopup = document.getElementById("closePopup")

async function getIngredients(id) {
    try {
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                let data = await response.json()
                for (let i=1 ; i<21 ; i++){
                    if (data.meals[0][`strIngredient${i}`] !== ""){
                        console.log(data.meals[0][`strIngredient${i}`])
                        let a = data.meals[0][`strIngredient${i}`]
                        ingredientlist.innerHTML += `<li>${a}</li>`
                    }
                }
                
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

viewIngre.onclick = () =>{
    console.log(id)
    ingredientlist.innerHTML = ""
    getIngredients(id)
    popup.style.display = "block"
    
}

closePopup.addEventListener("click" , ()=>{
    popup.style.display = "none"
})