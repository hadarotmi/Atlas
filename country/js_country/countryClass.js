import { createBordersToCountry, doApi } from "./app_country.js"

export default class Country {
  constructor(_parent, _item) {
    this.parent = _parent;
    this.name = _item.name.common;
    this.population = Number(_item.population).toLocaleString("en-US");
    this.capital = _item.capital;
    this.languages = _item.languages ? Object.values(_item.languages).join() : "none";
    this.flags = _item.flags.png;
    this.currencies = _item.currencies? Object.keys(_item.currencies):"none";
    this.borders = _item.borders;
    this.lat = _item.latlng[0];
    this.lon = _item.latlng[1];
    if(parseInt(_item.area).toString().length<=3){
      this.zoomMap=13
    }else{
      this.zoomMap=10-parseInt(_item.area).toString().length
    }

  }

  reder() {
    
    document.querySelector(this.parent).innerHTML =``
    let div = document.createElement("div")
    document.querySelector(this.parent).append(div)
    div.innerHTML = `
        <div class="card country h-100 shadow bg-dark" data-aos="zoom-in" data-aos-duration="1000"   data-aos-offset="300">
          <div class="row"  >
            <div class="col-md-5">
              <img class="img-fluid m-2 mt-3" src="${this.flags}" alt="">
            </div>
            <div class="col-md-7">
               <h2 class="card-title display-4">${this.name}</h2>
               <p class="card-text"><b>population:</b> ${this.population} </p>
               <p class="card-text"><b>languages:</b> ${this.languages} </p>
               <p class="card-text"><b>capital:</b> ${this.capital} </p>
               <p class="card-text"><b>coin:</b> ${this.currencies} </p>
            </div>    
          </div>
          <div id="border" class="d-flex px-3 flex-wrap"><b>borders:</b> </div>
            <iframe class="m-3 responsive-map" style="border:0;" frameborder="0" scrolling="no" src="https://www.google.com/maps?q=${this.lat},${this.lon}&z=${this.zoomMap}&amp;output=embed" ></iframe>
       </div>`


    if (this.borders) {
      let i=0;
      this.borders.forEach(async (item) => {
        let fullNmae = await createBordersToCountry(item);
        let a =  document.createElement("a")
        let span =  document.createElement("span")

        a.className = "btn text-warning p-0 ps-2"
        a.innerHTML = `${fullNmae}`
        if(i<this.borders.length-1)
        {
          span.className = "pe-2 ps-1"
          span.innerHTML= " ,"
          i++

        }else{
          span.innerHTML= "."

        }
        document.querySelector("#border").append(a)
        document.querySelector("#border").append(span)

        a.addEventListener("click", () => {
          doApi(fullNmae)
        })
      });



    } else {
      document.querySelector("#border").innerHTML += `<div class="px-2 text-danger">none border</div>`
    }

  }


  card() {

    let card = document.createElement("div")
    card.className = "card flag h-150 shadow m-3"
    card.innerHTML += `
          <img class="img-fluid shadow" src="${this.flags}" >
          <div class="card-body">
            <h3 class="card-title text-dark">${this.name}</h3>
          </div>`
    document.querySelector("#cards").append(card)
    card.addEventListener("click", () => {
      this.reder()
    })
  }
}

