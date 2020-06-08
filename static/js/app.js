// import the data from data.js
const tableData = data;

dataFieldValues = {
    datetime: new Set(),
    city:     new Set(),
    state:    new Set(),
    country:  new Set(),
    shape:    new Set()
};

data.forEach((dataRow) => {
    dataFieldValues.datetime.add(dataRow["datetime"]);
    dataFieldValues.city.add(dataRow["city"]);
    dataFieldValues.state.add(dataRow["state"]);
    dataFieldValues.country.add(dataRow["country"]);
    dataFieldValues.shape.add(dataRow["shape"]);
});

Object.values(dataFieldValues).forEach((dataField) => {

    var arrayToSort = Array.from(dataField).sort();
    // if (new RegExp('\d{1:2}/\d{1:2}/\d{2:4}')).match(arrayToSort[0]) == True
    //     console.log(Array.from(dataField)[0]);
    dataField.clear();
    dataField.add("");
    arrayToSort.forEach((value) => {dataField.add(value)});
});


function populateSelect(selectId, selectOptionData){
    
    // Get select boxselectOptionData
    var select = d3.select("#" + selectId)

    //populate select box with data
    selectOptionData.forEach((value) => {select.append("option").attr("value", value).text(value)});
}


// Reference the HTML table using d3
var tbody = d3.select("tbody");

function buildTable(data) {
    // First, clear out any existing data 
    // from the HTML table
    tbody.html("");

    // Add a HTML table row for each element object
    // in the data array with each HTML row containing
    // an HTML cells populates with each element object value
    data.forEach((dataRow) => {
        let row = tbody.append("tr");
    
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
        });
    });
};

function handleClick() {
    // Grab the datetime value from the filter
    let datetime = d3.select("#datetime").property("value");
    let city     = d3.select("#city").property("value");
    let state    = d3.select("#state").property("value");
    let country  = d3.select("#country").property("value");
    let shape    = d3.select("#shape").property("value");

    let filteredData = tableData;

     // Check to see if a date was entered and filter the
     console.log(country);
    // data using that date.
    if (datetime.length + city.length + state.length + country.length + shape.length > 0) {
      // Apply `filter` to the table data to only keep the
      // rows where the `datetime` value matches the filter value
      filteredData = filteredData.filter(row => 
        (datetime.length === 0 | row.datetime === datetime)
        &
        (city.length === 0 | row.city === city)
        &
        (state.length === 0 | row.state === state)
        &
        (country.length === 0 | row.country === country)
        &
        (shape.length === 0 | row.shape === shape)
        );
    }
    else {
        console.log("No filter values selected")
    }
    
    // Rebuild the table using the filtered data
    // @NOTE: If no date was entered, then filteredData will
    // just be the original tableData.
    buildTable(filteredData);
};

// Attach an event to listen for the form button
d3.selectAll("#filter-btn").on("click", handleClick);

// Build the table when the page loads
buildTable(tableData);

//Populate form select controls
populateSelect("datetime", dataFieldValues["datetime"]);
populateSelect("city", dataFieldValues["city"]);
populateSelect("state", dataFieldValues["state"]);
populateSelect("country", dataFieldValues["country"]);
populateSelect("shape", dataFieldValues["shape"]);

