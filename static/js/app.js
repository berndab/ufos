// import the data from data.js
const tableData = data;

// Clean the data
// Capitalize city name and multipart city names
// States to upper case
// Counties to upper case


data.forEach((dataRow) => {

    var cityName = "";

    dataRow["city"].split(" ").forEach((cityNamePart) => {
        if (cityName.length > 0){
            cityName += " ";
        }
        cityName += cityNamePart.replace(/^[a-z]{1}/, cityNamePart.substring(0,1).toUpperCase());
    });
    dataRow["city"]    = cityName;
    dataRow["state"]   = dataRow["state"].toUpperCase();
    dataRow["country"] = dataRow["country"].toUpperCase();
});


// *********************************************
// ******  Get unique field values   ***********
// ****** from the data array object ***********
// *********************************************

// Create a data field values object that has
// properties which contains sets collections.
// Populating these data field set collections
// generates unique set of values for each
// data field
dataFieldValues = {
    datetime: new Set(),
    city:     new Set(),
    state:    new Set(),
    country:  new Set(),
    shape:    new Set()
};

// Populate data field set collections in the 
// the data field values object
data.forEach((dataRow) => {
    dataFieldValues.datetime.add(dataRow["datetime"]);
    dataFieldValues.city.add(dataRow["city"]);
    dataFieldValues.state.add(dataRow["state"]);
    dataFieldValues.country.add(dataRow["country"]);
    dataFieldValues.shape.add(dataRow["shape"]);
});

// Date mm/dd/yyyy regular expression
// which is used to determine if the data field
// values being sorted below are string date values
var datetimeRegExp = new RegExp("\\d{1,2}/\\d{1,2}/\\d{4}")


// Sort the unique data field values
Object.values(dataFieldValues).forEach((dataField) => {

    var arrayToSort = Array.from(dataField).sort();

    // Test to see if the array contains date string
    // Date strings must be sorted using a custome
    // sort algorithm since date strings sort by charcter
    // not date value. 
    // Example of the erroneous sort of date strings:
    //   1/1/2020
    //   1/10/2020
    //   1/2/2020
    if (datetimeRegExp.test(arrayToSort[0]) === true){
        // Create new array to hold the milisecond value
        // for the date string from the Date.parse() method
        var dateArrayToSort = new Array(arrayToSort.length);

        // Poulate the dateArrayToSort array with milisecond values for
        // the date represented by the date string
        arrayToSort.forEach((value) => { dateArrayToSort.push(Date.parse(value)) });
        
        // Sort the milisecond values
        dateArrayToSort.sort();

        // Assign a new array object to the arrayToSort reference
        // This array will hold converted string reprentation of the  
        // of sorted milisecond date values
        arrayToSort = new Array(dateArrayToSort.length);

        // Populate the arrayToSort array by converting to 
        // a date string the sorted milisecond dates values
        dateArrayToSort.forEach((value) => { arrayToSort.push((new Date(value)).toLocaleDateString('en-US')) })
    };

    // Clear all values in 
    // data field unique value set
    dataField.clear();

    // Repopulate the data field unique value 
    // set with the sorted values 
    arrayToSort.forEach((value) => {dataField.add(value)});
});


// *********************************************
// ******  Functions to Manage the   ***********
// ******     Form Select Boxes      ***********
// *********************************************

// Function to populate form select box options
function populateSelectOptions(selectId, selectOptionData, format="none"){
    
    // Get all select control by id
    var select = d3.select("#" + selectId)

    // Set the function to handle
    // select control onChange events
    select.on("change", selectOnChange);

    //Add the option for the select control
    //from the sorted unique value data field set
    selectOptionData.forEach((value) => {select.append("option").attr("value", value).text(value);});
}

function getSelectOptions(id) {

    let optionArray = new Array();
    
    // Find the select box by the id attribute
    // and get the values from the selected options
    Object.values(d3.select("#" + id)
    .property("options"))
    .forEach((option) => { option.selected === true&option.value.length > 0?optionArray.push(option.value):'' });

    return optionArray;
}


// Function to unset selected options
// in the filter select controls
function clearSelectBoxes() {

    
    let selection = d3.selectAll("select");

    Object.values(selection._groups).forEach((selectArray) => {
        // Find the select box by the id attribute
        // and interate through the select box options
        // setting selected property to false
        selectArray.forEach((select) => { Object.values(select.options).forEach((option) => { option.selected = false;}) })
    });

    buildTable(tableData);
}


// *********************************************
// ******  Functions to Manage the   ***********
// ******  Data in the HTML Table    ***********
// *********************************************


// Reference the data HTML table
var tbody = d3.select("tbody");


// Populate the HTML table rows with filtered
// row values in the dataArray  object
function buildTable(dataArray) {

    // Clear the HTML table body tag
    tbody.html("");

    // Create a HTML table row for each data row
    // in the data array object and populate the 
    // columns with the data row field values;
    dataArray.forEach((dataRow) => {
        let row = tbody.append("tr");
    
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
        });
    });
};

function selectOnChange() {

    // Get the selected option values from the select 
    // filter controls with the multiselect property
    // set to true.
    // Store the selected options values for each select
    // control and store them into an array
    let datetimeArray = getSelectOptions("datetime");
    let cityArray     = getSelectOptions("city");
    let stateArray    = getSelectOptions("state");
    let countryArray  = getSelectOptions("country");
    let shapeArray    = getSelectOptions("shape");

    let filteredData = tableData;

    // Check to see if any select controls have one or more options selected
    if (datetimeArray.length + cityArray.length + stateArray.length + countryArray.length + shapeArray.length > 0) {
 
      // Filter the data in the data with the selected 
      // option values for each filter select control
      filteredData = filteredData.filter((row) => 
      
        (datetimeArray.length === 0 | datetimeArray.includes(row.datetime))
        &
        (cityArray.length === 0 | cityArray.includes(row.city))
        &
        (stateArray.length === 0 | stateArray.includes(row.state))
        &
        (countryArray.length === 0 | countryArray.includes(row.country))
        &
        (shapeArray.length === 0 | shapeArray.includes(row.shape))
    );
}

    // Rebuild the table using the filtered data
    // @NOTE: If no select box options are selected
    //the data in the table will just be the original tableData.
    buildTable(filteredData);
};





// *********************************************
// ******  Initialze the Webpage     ***********
// *********************************************

// Attach the select controls clear selected option function
// to the clear filter control
d3.selectAll("#clear-filter").on("click", clearSelectBoxes);


// Build the table when the page loads
buildTable(tableData);

// Populate form filter select controls with 
// the unique data values for each data field
populateSelectOptions("datetime", dataFieldValues["datetime"]);
populateSelectOptions("city",     dataFieldValues["city"], format="capitalize");
populateSelectOptions("state",    dataFieldValues["state"], format="uppercase");
populateSelectOptions("country",  dataFieldValues["country"], format="uppercase");
populateSelectOptions("shape",    dataFieldValues["shape"], format="capitalize");
