'use strict';


const BASE_URL = '/api/cupcakes';


const $cupcakesArea = $('ul');

/** Initialize app */
async function initApp() {
  const cupcakes = await initCupcakeData();
  showCupcakes(cupcakes);
}


/** Query database from the API and return an array of cupcakes. */
async function initCupcakeData() {
  const response = await axios.get(BASE_URL);

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

// Add Form event listener
$('form').on('submit', handleAddCupcake);

initApp();