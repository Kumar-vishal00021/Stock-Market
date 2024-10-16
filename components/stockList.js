import { stockListAPI } from "../const.js";
import { renderChartOnDataChange } from "./chart.js";
import { renderSummary } from "./details.js";
import { renderSelectedStock } from "./selectedStock.js";

let stockListData = {};
const rightContainerElement = document.getElementById("rightContainer");

function handleStockClick(data) {
  window.selectedStock = data.key;
  renderSelectedStock({
    stockName: data.key,
    stockValue: data.bookValue,
    profit: data.profit,
  });
  renderChartOnDataChange();
  renderSummary();
}

function getStockListData() {
  fetch(stockListAPI)
    .then((res) => res.json())
    .then((res) => {
      const { stocksStatsData } = res;
      const [data] = stocksStatsData;
      stockListData = { ...data };

      const [selectedKey] = Object.keys(stockListData);

      // Call the render function
      renderStockList();
      // Call render selected stock
      renderSelectedStock({
        stockName: selectedKey,
        stockValue: stockListData[selectedKey].bookValue,
        profit: stockListData[selectedKey].profit,
      });
    });
}

export function renderStockList() {
  Object.keys(stockListData).forEach((key) => {
    if (typeof stockListData[key] === "string") return;
    const { bookValue, profit } = stockListData[key];

    const stockStatDiv = document.createElement("div");
    stockStatDiv.classList.add("stock-stat");

    const button = document.createElement("button");
    button.innerText = key;
    button.addEventListener("click", () =>
      handleStockClick({ key, bookValue, profit })
    );

    const priceSpan = document.createElement("span");
    priceSpan.innerText = `$${bookValue}`;

    const profitSpan = document.createElement("span");
    profitSpan.innerText = `${profit.toFixed(2)}%`;
    if (profit <= 0) profitSpan.classList.add("loss");
    else profitSpan.classList.add("profit");

    stockStatDiv.append(button);
    stockStatDiv.append(priceSpan);
    stockStatDiv.append(profitSpan);

    rightContainerElement.append(stockStatDiv);
  });
}

export function init() {
  getStockListData();
}