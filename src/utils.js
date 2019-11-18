export function getFilterKeyValue(filter) {
  let tmpFilter = [];
  if (filter !== null) {
    if (filter.sort !== "") {
      tmpFilter.push({ key: "sort", value: filter.sort });
    }
    if (!isNaN(filter.priceMin) && filter.priceMin !== "") {
      tmpFilter.push({ key: "priceMin", value: filter.priceMin });
    }
    if (!isNaN(filter.priceMax) && filter.priceMax !== "") {
      tmpFilter.push({ key: "priceMax", value: filter.priceMax });
    }
    if (filter.title !== "") {
      tmpFilter.push({ key: "title", value: filter.title });
    }
  }
  return tmpFilter;
}

export function generateFilterParameters(tabFilter, parameters) {
  tabFilter.forEach(element => {
    if (parameters === "") {
      parameters = "?" + element.key + "=" + element.value;
    } else {
      parameters = parameters + "&" + element.key + "=" + element.value;
    }
  });
  return parameters;
}
