import Country from "./countryClass.js";
import { declareEvents } from "./event.js"
let ar_allCountry = []

const init = () => {
  allCountry()
  goHome()
  declareEvents(goHome, doApi)
}

const goHome = () => {
  document.querySelector("#show").innerHTML = `
    <div class="home" data-aos="zoom-in" data-aos-duration="1000" data-aos-offset="300">
        <div class="column">
          <div class="image-mobile">
            <h2>Get start...</h2>
            <p>Let's check information about all the countries of the world. the information will appear: the name of the country, the map of the country, flag, population, currency, language, and borders</p>
          </div>
        </div>
        <div class="column">
          <img class="image-mobile" src="images/world1.jpg">
          <img class="image" src="images/paris.jpg">
          <img class="image" src="images/new-york.jpg">
        </div>
        <div class="column">
          <img class="image" src="images/israel.jpeg">
        </div>
        <div class="column">
          <img class="image" src="images/thailand.jpg" >
          <img class="image" src="images/england.jpg">
          <img class="image" src="images/world2.jpg">
        </div>
      </div>`
}

const allCountry = async () => {
  let url = `https://restcountries.com/v3.1/all`;
  let resp = await fetch(url)
  let data = await resp.json()
  ar_allCountry = data.map(item => item.name.common)
  createSelect(ar_allCountry)
}

const createSelect = (arr_country) => {
  arr_country.forEach(item => {
    document.querySelector("datalist").innerHTML += `<option>${item}</option>`

  })
}



export const doApi = async (_searchQ) => {

  document.querySelector("#show").innerHTML = `
    <div class="text-center mt-5 w-100">
      <img src="images/loading.gif" alt="loading" width="300">
    </div>`

  if (_searchQ == "") {
    document.querySelector("#show").innerHTML = `<div class="text-center">
    <h1 class=" bg-dark ">You weren't looking for anything</h1>
    <img id="id_not_found" class="m-3" src="images/notFound.gif" alt="" height="350">
    </div>`
  } else {
    let url = `https://restcountries.com/v3.1/name/${_searchQ}`;
    let resp = await fetch(url)
    let data = await resp.json()
    console.log(data)
    createCountry(data)
  }


}

const createCountry = (ar_Country) => {

  if (ar_Country.status != "404") {
    if (ar_Country.length == 1) {
      let country = new Country("#show", ar_Country[0])
      country.reder()
    } else {
      document.querySelector("#show").innerHTML = `<div id="cards" class="row row-cols-lg-4 g-3 justify-content-center" data-aos="zoom-out" data-aos-duration="1000"   data-aos-offset="300"></div>`
      ar_Country.forEach(item => {
        let country = new Country("#show", item)
        country.card()
      })
    }


  } else {
    document.querySelector("#show").innerHTML = `<div class="text-center">
        <h1 class=" bg-dark ">the page not found</h1>
        <img id="id_not_found" class="m-3" src="images/notFound.gif" alt="" height="350">
        </div>`

  }

}

export const createBordersToCountry = async (country) => {
  let url = `https://restcountries.com/v3.1/alpha/${country}`;
  let resp = await fetch(url)
  let data = await resp.json()
  return data[0].name.common


}



init()


