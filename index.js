document.addEventListener("DOMContentLoaded", () => {
  form();
});

//alert screen if character is invalid
//

//make a form---------------------------------------------------
function form() {
  //create element
  const container = document.querySelector("#main");
  const form = document.createElement("form");
  const nameInput = document.createElement("input");
  const btn = document.createElement("button");
  const randomSearch = document.createElement("button");
  const randomDiv = document.createElement("div");
  randomSearch.id = "randomSearch"
  

  const divForm = document.createElement("div");

  divForm.id = "divForm";

  //add info/ID even
  form.setAttribute("id", "form");
  nameInput.setAttribute("id", "name");
  nameInput.setAttribute("name", "name");
  // nameInput.name = "name"
  // btn.type = "submit";

  nameInput.placeholder = "Enter Character Name...";

  //Newly ADDED!!!!
  btn.id = "button";
  btn.textContent = "SEARCH";

  //append
  form.append(nameInput, btn);
  divForm.append(form, randomSearch);
  container.prepend(divForm);

  //add behviour
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log(e.target)
    // console.log(form)

    let nameValue = e.target.name.value;
    //conditional statemnt bc I don't want to show the entire result when the stirng is empty
    if (nameValue == "") {
      alert("Please Type a Valid Name"); //return ""// if you do return then you don't need the else
    } else {
      fetchCharacters(nameValue);
      e.target.name.value = ""; //to clear the input later
    }
  });
  
  randomSearch.id = "randomSearch"
  randomSearch.textContent = "Feeling Lucky"

  randomSearch.addEventListener("click", (e) => {
    document.querySelector("#info-container").innerHTML = "";
    fetch(`https://the-one-api.dev/v2/character`, {
    method: "GET",
    headers: {
      Authorization: "Bearer s39pkHFusu0wb3WuEZGq",
    },
  })
  .then(resp => resp.json())
  .then(data => {
      let random = Math.floor(Math.random() * data.total)
      data.docs.forEach(removeNaNs);
      renderNameCard(data.docs[random]);
  })
})
  
  
}

//GET----------------------------------------------------------
function fetchCharacters(name) {
  //console.log(`fetchCharacters(${name})`);
  document.querySelector("#info-container").innerHTML = "";

  //check the docs regex so it makes search case insensitive
  fetch(`https://the-one-api.dev/v2/character?name=/${name}/i`, {
    method: "GET",
    headers: {
      Authorization: "Bearer s39pkHFusu0wb3WuEZGq",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.docs.forEach(removeNaNs);
      data.docs.forEach(renderNameCard);
      //removeNaNs(data);
    });
}

//Rendering------------------------------------------------------
function renderNameCard(data) {
  //make Elements
  const infoContainer = document.querySelector("#info-container");
  const listContainer = document.createElement("ul");

  const characNameList = document.createElement("li");
  const characRace = document.createElement("li");
  const characGender = document.createElement("li");
  const characSpouse = document.createElement("li");
  const characBirth = document.createElement("li");
  const characDeath = document.createElement("li");
  const wikiLi = document.createElement("li");
  const characWiki = document.createElement("a");
  const btnDelete = document.createElement("img");

  let quoteh4 = document.createElement("h4");

  //Decided not to make cover to change the color whenit is hovered--------------------
  // let cover = document.createElement("div");
  // cover.className = 'cover'

  //Add Info
  listContainer.id = "listContainer";
  listContainer.class = "listC";
  quoteh4.id = "quoteh4";

  characNameList.textContent = `Name: ${data.name}`;
  characRace.textContent = `Race: ${data.race}`;
  characGender.textContent = `Gender: ${data.gender}`;
  characSpouse.textContent = `Spouse: ${data.spouse}`;
  characBirth.textContent = `Birth: ${data.birth}`;
  characDeath.textContent = `Death: ${data.death}`;
  characWiki.textContent = `WikiPage`;
  characWiki.href = `${data.wikiUrl}`;
  //characWiki.setAttribute('href', `${data.wikiUrl}`)

  let quoteBtn = document.createElement("button");

  //Newly Added
  quoteBtn.id = "quote-button";
  quoteBtn.textContent = "generate random quote";
  //quoteUl.append(quoteLi)

  quoteBtn.addEventListener("click", (e) => {
    console.log(e);
    fetch(`https://the-one-api.dev/v2/character/${data._id}/quote`, {
      method: "GET",
      headers: {
        Authorization: "Bearer s39pkHFusu0wb3WuEZGq",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        let random = Math.floor(Math.random() * json.total);
        if (json.total === 0) {
          alert("no quotes available");
        } else {
          console.log(json.docs[random].dialog);
          quoteh4.textContent = json.docs[random].dialog;
        }
      });
  });

  btnDelete.src = "https://img.icons8.com/dotty/80/000000/crossed-axes.png"
  btnDelete.id = "delete-button";

  btnDelete.addEventListener("click", (e) => {
    listContainer.remove();
  });

  //append
  wikiLi.append(characWiki);
  listContainer.append(
    btnDelete,
    characNameList,
    characRace,
    characGender,
    characSpouse,
    characBirth,
    characDeath,
    wikiLi,
    quoteBtn,
    quoteh4
  );
  infoContainer.append(listContainer);
}

function removeNaNs(data) {
  if (data.race === "NaN" || data.race === "") {
    data.race = "Not Available";
  }
  if (data.gender === "NaN" || data.gender === "") {
    data.gender = "Not Available";
  }
  if (data.spouse === "NaN" || data.spouse === "") {
    data.spouse = "Not Available";
  }
  if (data.birth === "NaN" || data.birth === "") {
    data.birth = "Not Available";
  }
  if (data.death === "NaN" || data.death === "") {
    data.death = "Not Available";
  }
}
