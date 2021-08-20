/* key: 9c5d07791c41f307a6cbba4762cdb20f
secret: c3b3ab4569b4ad84
*/

document.getElementById('searchButton').addEventListener('click', async () => {
  let images = await getImages();
  createPhotos(images);
}); //calls the getImages function when user click the search button and assigns the value to the images variable

// Retrieves images from API
async function getImages(img) {
  const apiKey = '9c5d07791c41f307a6cbba4762cdb20f'; // Stores API key
  let method = 'flickr.photos.search'; // Instruction for the API to search photos
  let text = document.getElementById('wordKey').value; // Gets the values for the search word from whatever user types inside the input
  const baseUrl = 'https://api.flickr.com/services/rest/'; // the URL addresse for the API
  const imgPerPage = 20; // how many pictures is going to show
  let currentPage = 1;

  let url = `${baseUrl}?api_key=${apiKey}&method=${method}&text=${text}&per_page=${imgPerPage}&page=${currentPage}&format=json&nojsoncallback=1`;
  try {
    let resp = await fetch(url); // calls fetch method to fetch Flicker API

    let data = await resp.json(); // Converts the data from JSON into a JavaScript object, so no need to use JSON.parse()
    console.log(data);
    return data; // returns the data or the images from getImages() call as objects
  } catch (err) {
    // if there is any error, the catch method catches the error and then displays it on the console
    console.error(err);
  }
}

// Creates a function to declare the size of the pictures
function imgUrl(img, size) {
  let imgSize = 'z';
  if (size == 'thumb') {
    imgSize = 'q';
  }
  if (size == 'large') {
    imgSize = 'b';
  }
}

// Creates an HTML element with JavaScript DOM
function createPhotos(data) {
  let main = document.querySelector('main');
  main.innerHTML = '';

  data.photos.photo.forEach((img) => {
    // loop through array "photo" that contains all objects

    // to create an img element in JS

    if (img.farm !== 0) {
      // builds up url string to be able to show all images properly.
      // Each IMG url needs necessary properties from object e.g farm, server, id and secret.
      let imgUrl = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_z.jpg`;
      let el = document.createElement('img');
      el.setAttribute('src', imgUrl);
      el.setAttribute('alt', img.title); // Gets the image title for each image

      main.appendChild(el); // Adds the img element between <main> </main>
    }
  });
}
