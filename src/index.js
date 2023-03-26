// Your code here

// HTML ELEMENTS:
const characterBar = document.querySelector('#character-bar')
const detailedInfo = document.getElementById("detailed-info");
const characterName = document.getElementById("name");
const characterImg = document.getElementById("image");
const characterVotes = document.getElementById("vote-count");
const votesForm = document.getElementById("votes-form");
const resetVote = document.getElementById("reset-btn")

// Functions:
fetchNames()


function fetchNames() {
    return fetch('http://localhost:3000/characters')
    .then(function(response) {
      return response.json();
    })
    .then(function(characters){
        renderNames(characters)
    })
}

  function renderNames(characters) {

    characters.forEach(character => {
      const span = document.createElement('span')
      span.innerHTML = character.name
      span.dataset.id = character.id;
      characterBar.appendChild(span)
      span.addEventListener("click", handleClick);
    })
}

function getCharacterDetails(id) {
    return fetch(`http://localhost:3000/characters`+ `/${id}`)
    .then(function(response) {
      return response.json();
    })
}

function handleClick (event) {
    getCharacterDetails(event.target.dataset.id)
    .then(renderCharacterDetails);

}

function renderCharacterDetails(characters) {
    characterName.innerHTML = characters.name
    characterImg.src = characters.image
    characterVotes.innerHTML = characters.votes
}

votesForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newVote = event.target;
    const votes = document.getElementById("vote-count")
    votes.innerText = parseInt(newVote.votes.value) + parseInt(votes.innerText);
    newVote.reset();
})

resetVote.addEventListener("click", () => {
    characterVotes.innerText = 0;
})