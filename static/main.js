'use strict';


const BASE_URL = '/api/cupcakes';


const $cupcakesArea = $('ul');

/** Initialize app */
async function initApp() {
  const cupcakes = await initCupcakeData();
  showCupcakes(cupcakes);
}


/** Query database from the API and return an array of cupcakes. */
async function initCupcakeData(term) {
  let response;

  if (term) {
    response = await axios({
      method: "GET",
      url: BASE_URL,
      params: {term}
    });
  } else {
    response = await axios.get(BASE_URL);
  }
  const cupcakes = response.data.cupcakes;
  return cupcakes;
}

/** Generates all cupcakes on page on initial load. */
function showCupcakes(cupcakes) {
  for (let cupcake of cupcakes) {
    $cupcakesArea.append(showSingleCupcake(cupcake));
  }
}

/** showSingleCupcake ({cupcake: {id, flavor, size, rating, image}})
  - Accepts 1 cupcake data object
  - 'returns list item */
function showSingleCupcake(cupcake) {
  // TODO: make one string
  const $newItem = $("<li>", { id: `cupcake-${cupcake.id}` });
  const $img = $(`<img src=${cupcake.image} width="200px">`);
  const $flavor = $(`<p>${cupcake.flavor}</p>`);
  const $size = $(`<p>${cupcake.size}</p>`);
  const $rating = $(`<p>${cupcake.rating}</p>`);

  $newItem.append($img, $flavor, $size, $rating);

  return $newItem;
}

/** adds cupcake to database
 * -returns cupcake object
 */

async function addCupcake() {
  const data = {
    flavor: $('#flavor').val(),
    size: $('#size').val(),
    rating: $('#rating').val(),
    image: $('#image').val()
  };

  const response = await axios({
    method: "POST",
    url: BASE_URL,
    data
  });
  const cupcake = response.data.cupcake;
  return cupcake;
}


/** handles form submit */
async function handleAddCupcake(evt) {
  evt.preventDefault();
  const cupcake = await addCupcake();
  $cupcakesArea.append(showSingleCupcake(cupcake));

}

async function handleSearchCupcake(evt) {
  evt.preventDefault();
  const term = $('#searchterm').val()
  const cupcakes = await initCupcakeData(term);
  $('ul').empty();
  showCupcakes(cupcakes);

}

// Add Form event listener
$('#addform').on('submit', handleAddCupcake);
$('#searchform').on('submit', handleSearchCupcake);

initApp();