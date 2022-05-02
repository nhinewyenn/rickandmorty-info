// API
const baseAPI = `https://api.disneyapi.dev/characters`;

// DOM MANIPULATION
const modal = document.querySelector(".modal");
const about = document.getElementById("about");
const closeButton = document.querySelector(".close__button");

// FUNCTION
const toggleModal = () => {
    modal.classList.toggle("show-modal");
}

const windowOnClick = (event) => {
    if (event.target === modal) toggleModal();
}

// ASYNC FUNCTION
async function getCharacters() {
    try {
        const res = await fetch(baseAPI);
        if (res.ok) { 
            const data = await res.json();
            console.log(data);
        }
    } catch(err) {
        alert(`Something went wrong`)
        }

}

getCharacters()

// EVENT LISTENER
about.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick); 