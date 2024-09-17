const getChartDataFilterEvent = (detail) => {
    return new CustomEvent("stockmarket-applyChartFilter", { detail });
  };
  
  function chartFiltersClickHandler(event) {
    const element = event.target;
    if (element) {
      const id = element.dataset.id; // element.getAttribute('data-id')
      const event = getChartDataFilterEvent(id);
      document.dispatchEvent(event);
    }
  }