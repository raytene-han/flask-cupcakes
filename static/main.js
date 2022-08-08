/*
Init function (controller) runs getCupcakeData() and showCupcakes()

Run getCupcakeData() to query the list of cupcakes.

showCupcakes will loop over the array of cupcakes and passes in cupcake data
into function that shows one cupcake


showSingleCupcake ({cupcake: {id, flavor, size, rating, image}})
  - Accepts 1 cupcake data object
  - 'li' includes flavor, size, rating, image with id="cupcake-{id}"
  - append 'li' to 'ul'

addNewCupcake (attached to event listener for add button)
  - take data from a form that we create
  - submits axios POST request to API with that data as a JSON object
  - returns data of new cupcake object

handleAddButton
  - runs addNewCupcake
  - run showSingleCupcake

*/

const BASE_URL = '/api/cupcakes';

/** Query database from the API and return an array of cupcake objects. */
async function initCupcakeData() {
  const response = await axios.get(BASE_URL);

  const cupcakes = response.data.cupcakes;
  return cupcakes;
}

/** Generates all cupcakes on page on initial load. */
async function showCupcakes() {
  const cupcakes = await initCupcakeData();
  console.log(cupcakes);
  let $cupcakesArea = $('ul');

  for (let cupcake of cupcakes) {
    $cupcakesArea.append(showSingleCupcake(cupcake));
  }

}

/** showSingleCupcake ({cupcake: {id, flavor, size, rating, image}})
  - Accepts 1 cupcake data object
  - 'li' includes flavor, size, rating, image with id="cupcake-{id}"
  - append 'li' to 'ul' */
function showSingleCupcake(cupcake) {
  const $newItem = $("<li>", { id: `cupcake-${cupcake.id}`});
  const $img = $(`<img src=${cupcake.image} width="200px">`);
  const $flavor = $(`<p>${cupcake.flavor}</p>`);
  const $size = $(`<p>${cupcake.size}</p>`);
  const $rating = $(`<p>${cupcake.rating}</p>`);

  $newItem.append($img, $flavor, $size, $rating);

  return $newItem;
}

showCupcakes();