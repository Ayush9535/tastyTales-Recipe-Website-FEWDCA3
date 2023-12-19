// Getting all Required Html Elements 
const randomMealImg = document.getElementById("randomMeal")
const randomName = document.getElementById("randomName")
const randomCategory = document.getElementById("randomcategory")
const randomArea = document.getElementById("randomarea")
const cardContainer = document.getElementById("card-container")
const searchBar = document.getElementById("search-bar")
const resultsFor = document.getElementById("resultsfor")
const explore = document.getElementById("Explore")
const viewIngre = document.getElementById("viewIngredient")
const popup = document.getElementById("popup")
const ingredientlist = document.getElementById("ingredient-list")
const closePopup = document.getElementById("closePopup")

// This is made to keep track of id of meal to show ingredients 
let id;
let idArray = []

// Explore button functional
explore.onclick =()=>{
    window.scroll({
        top:756 , behavior:"smooth"
    })
}

// function to fetch random meal info 
async function getRandomMeal() {
    try {
            let response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
                let data = await response.json()
                console.log(data.meals)
                id = data.meals[0].idMeal

                // updating the random meal in html 
                randomMealImg.src = data.meals[0].strMealThumb
                randomName.innerHTML = data.meals[0].strMeal
                randomCategory.innerHTML = data.meals[0].strCategory
                randomArea.innerHTML = data.meals[0].strArea

    } catch (err) {
        console.error("Error fetching data:", err);
    }
}
getRandomMeal()

// function to fetch information of searched category 
async function getSearchedCategory(category) {
    try {
        document.getElementById("notfound").style.display = "none"
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
            let data = await response.json()
            console.log(data.meals)

            // adding dish cards to html 
            cardContainer.innerHTML = "" 
            data.meals.forEach((dish)=>{
                idArray.push(dish.idMeal)
                let newDish = 
                `<div class="card">
                    <img src="${dish.strMealThumb}" id="dishImg">
                    <h2 id="dishName">${dish.strMeal}</h2>
                </div>`
                cardContainer.innerHTML += newDish 
            })

            // adding eventlistners to dish names so as to show their ingredients 
            console.log(idArray)
            document.querySelectorAll("#dishName").forEach((ele , i)=>{
                ele.addEventListener("click" , (e)=>{
                    console.log(e.target.innerHTML)
                    console.log(idArray[i])
                    getIngredients(idArray[i])
                    popup.style.display = "block"
                })
            })
    } catch (err) {
        console.log("No results Found")
        document.getElementById("notfound").style.display = "block"
    }
}

// function to fetch ingredients of any meal 
async function getIngredients(param) {
    ingredientlist.innerHTML = ""
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${param}`)
        let data = await response.json()

        // adding ingredients to popup
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

// makeing input functional 
searchBar.addEventListener("keypress" , (e)=>{
    if (e.key == "Enter"){
        resultsFor.innerHTML = searchBar.value
        getSearchedCategory(searchBar.value)
        searchBar.value = ""
        window.scroll({top:1300 , behavior:"smooth"})
    }
})

// viewingredients button functional
viewIngre.onclick = () =>{
    console.log(id)
    getIngredients(id)
    popup.style.display = "block"
    
}

// making popup close button functional
closePopup.addEventListener("click" , ()=>{
    popup.style.display = "none"
})