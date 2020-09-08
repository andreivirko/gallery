import "./style.css";
import "./fetch.js";
import getData from "./fetch.js";
import template from "./template.hbs";
import debounce from "lodash.debounce";

const baseUrl = `https://pixabay.com/api/`;

const form = document.querySelector(".search-form");
const input = document.querySelector(".search-input");
const ul = document.querySelector(".gallery");
const button = document.querySelector(".load_more");

form.addEventListener(
  "input",
  debounce(() => {
    setUrl();
  }, 400),
);

function setUrl() {
  getData.query = input.value;
  getData.resetPage();
  ul.innerHTML = "";
  getData.fetchArticles().then((data) => {
    console.log(data);
    const item = template(data);
    ul.insertAdjacentHTML("beforebegin", item);
  });
}

button.addEventListener("click", () => {
  getData.fetchArticles().then((hits) => {
    const item = template(hits);
    ul.insertAdjacentHTML("beforebegin", item);
  });
});
