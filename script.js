const accessKey = "uFl_AcrINXWumYzgX94T_0x4NqqtVwYWS8s0O3Bksi8";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-box");
const searchResults = document.querySelector(".images-list");
const showMore = document.getElementById("show-more-button");
const searchButton = document.getElementById("search-button"); // Select the "Search" button by ID

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const results = data.results;

    if (page === 1) {
      searchResults.innerHTML = "";
    }

    results.forEach((result) => {
      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add("image-list");
      const image = document.createElement('img');
      image.src = result.urls.small; // Use 'small' size for the image
      const imageLink = document.createElement('a');
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
      imageLink.textContent = result.alt_description;

      imageWrapper.appendChild(image);
      imageWrapper.appendChild(imageLink);
      searchResults.appendChild(imageWrapper);
    });

    page++;

    if (page > 1) {
      showMore.style.display = "block";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

// Add a click event to the "Search" button
searchButton.addEventListener("click", () => {
  page = 1;
  searchImages();
});

showMore.addEventListener("click", () => {
  page++;
  searchImages();
});