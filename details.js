import { detailsAPI } from "./constant.js";

let detailsData = {};
const detailsEl = document.getElementById("detailsWrapper");

function getDetailsData() {
  fetch(detailsAPI)
    .then((res) => res.json())
    .then((res) => {
      const { stocksProfileData } = res;
      const [data] = stocksProfileData;
      detailsData = { ...data };
      renderSummary();
    });
}

export function renderSummary() {
  detailsEl.innerText = detailsData[window.selectedStock].summary;
}

export function init() {
  getDetailsData();
}