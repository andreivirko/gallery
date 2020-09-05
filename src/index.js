import debounce from "lodash.debounce";

const input = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const ul = document.querySelector(".gallery");
const button = document.querySelector(".load_more");
// console.log(button);

let query = "";

const page = 1;
const apiKey = "18183293-40fc17e913366deaf9b32cf9c";
const baseUrl = "https://pixabay.com/api/";
const queryParams = `?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=24&key=${apiKey}`;
const url = baseUrl + queryParams;
// console.log(url);

form.addEventListener(
  "input",
  debounce((e) => {
    e.preventDefault();
    console.log(e.target.value);
    query = e.target.value;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.hits);
        data.hits.forEach((elem) => {
          const li = document.createElement("li");
          const image = document.createElement("img");
          image.src = elem.largeImageURL;
          li.append(image);
          ul.append(li);
          button.addEventListener("click", () => {
            page += 1;
          });
        });
      });
  }, 400),
);
