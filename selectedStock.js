const selectedStockEl = document.getElementById("selectedStockWrapper");

export function renderSelectedStock({ stockName, stockValue, profit }) {
  const html = `<h2>
	<span>${stockName}</span>
	<span style="margin:10px;display:inline-block" class="${
    profit <= 0 ? "loss" : "profit"
  }">${profit}%</span>
	<span>$${stockValue}</span>
	</h2>`;

  selectedStockEl.innerHTML = html;
}