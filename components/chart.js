import { chartAPI } from "../const.js";

const ctx = document.getElementById("stockChart");

const defaultDataFilter = "1mo";
let stocksData = {};

function getChartData() {
  fetch(chartAPI)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      const [data] = res.stocksData;
      stocksData = data;
      renderChartOnDataChange();
    });
}

export function renderChartOnDataChange(id = defaultDataFilter) {
  const xAxisValues = stocksData[window.selectedStock][id].timeStamp;
  const yAxisValues = stocksData[window.selectedStock][id].value;

  renderChart(xAxisValues, yAxisValues);
}

document.addEventListener("stockmarket-applyChartFilter", function (event) {
  const id = event.detail;
  renderChartOnDataChange(id);
});

const plugin = {
  id: "customCanvasBackgroundColor",
  beforeDraw: (chart, args, options) => {
    const { ctx } = chart;
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = options.color || "#99ffff";
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};
let stockChart;
function renderChart(xAxisValues, yAxisValues) {
  if (stockChart) {
    stockChart.destroy();
  }
  stockChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: xAxisValues,
      datasets: [
        {
          data: yAxisValues,
          borderWidth: 1,

          borderColor: "#39FF15",
        },
      ],
    },
    options: {
      plugins: {
        customCanvasBackgroundColor: {
          color: "#020145",
        },
        legend: {
          display: false, // This hides the legend
        },
      },
      scales: {
        x: {
          display: false,
          type: "time", // Ensure the type is 'time' for timeseries data
          // time: {
          //   unit: "day",
          //   parser: "yyyy-mm-dd", // Moment.js format for parsing dates
          //   tooltipFormat: "yyyy-mm-dd",
          // },
        },
        y: {
          beginAtZero: false,
          display: false,
        },
      },
    },
    plugins: [plugin],
  });
}

export function init() {
  getChartData();
}