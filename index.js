import { handleFormSubmit } from "./bookmark.js";

const form = document.querySelector("form");
form.addEventListener('submit', handleFormSubmit);