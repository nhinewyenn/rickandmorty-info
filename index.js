const url = `https://rickandmortyapi.com/api/character`;

//* DOM MANIPULATION
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.close__button');
const about = document.getElementById('about');
const main = document.getElementById('main');
const infoForm = document.getElementById('infoForm');
const infoSearch = document.getElementById('infoSearch');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let counter = 1;

//* FUNCTION
function toggleModal() {
  modal.classList.toggle('show-modal');
}

function windowOnClick(e) {
  if (e.target === modal) toggleModal();
}

// Display API call function
function showCharacter(data) {
  main.innerHTML = data
    .map(el => {
      return `  
            <div class="card">
             <figure class="img-container">
                <img src="${el.image}" alt="${el.name}" />
              </figure>
              <div class="card-content">
                <h3 class="card-title">${el.name}</h3>
                <p class="card-body"><b>Location:</b> ${el.location.name}</p>
                <p class="card-body"><b>Gender:</b> ${el.gender}</p>
                <p class="card-body"><b>Species:</b> ${el.species}</p>
                <p class="card-body"><b>Status:</b> ${el.status}</p>
              </div>
            </div>`;
    })
    .join('');
}

//* ASYNC FUNCTION
async function mainData(id) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    showCharacter(data.results);
  } catch (err) {
    alert(`Something went wrong while getting your data`);
  }
}
mainData();

//* EVENT LISTENER
// Toggle modal
about.addEventListener('click', toggleModal);
closeButton.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);

// Next page
next.addEventListener('click', async () => {
  const res = await fetch(`${url}/?page=${counter++}`); // increment page
  const data = await res.json();
  showCharacter(data.results);
});

// Previous page
prev.addEventListener('click', async () => {
  const res = await fetch(`${url}/?page=${counter--}`); // decrement page
  const data = await res.json();
  showCharacter(data.results);
});

// Search input
infoSearch.addEventListener('keyup', async e => {
  let res;
  const target = e.target.value;
  if (target) res = await fetch(`${url}/?name=${target}`);
  else res = await fetch(url);
  const data = await res.json();
  showCharacter(data.results);
});
