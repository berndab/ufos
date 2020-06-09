// import the data from data.js
const tableData = data;


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
        arrayToSort = new Array(dateArrayToSort.length);

        // Populate the arrayToSort array with a string representation
        // of the sorted dates expressed in miliseconds
        dateArrayToSort.forEach((value) => { arrayToSort.push((new Date(value)).toLocaleDateString('en-US')) })
    };

    // Clear all values in 
    // data field set object
    dataField.clear();

    // Repopulate the data field set with the sorted values
    // of the data field
    arrayToSort.forEach((value) => {dataField.add(value)});
});


// *********************************************
// ******  Functions to Manage the   ***********
// ******     Form Select Boxes      ***********
// *********************************************

// Function to populate form select box options
function populateSelectOptions(selectId, selectOptionData){
    
    // Get select boxselectOptionData
    var select = d3.select("#" + selectId)

    select.on("change", handleSelect);

    //populate select box with data
    selectOptionData.forEach((value) => {select.append("option").attr("value", value).text(value)});
}

function getSelectOptions(id) {

    let optionArray = new Array();
    
    // Find the select box by the id attribute
    // and interate through the select box options
    // to get the values from the selected options
    Object.values(d3.select("#" + id)
    .property("options"))
    .forEach((option) => { option.selected === true&option.value.length > 0?optionArray.push(option.value):'' });

    return optionArray;
}


function clearSelectBoxes() {

    let selectArray = d3.selectAll("select");
    

    Object.values(selectArray).forEach((select) => 
        // Find the select box by the id attribute
        // and interate through the select box options
        // setting selected to false
        Object.values(select).property("options").forEach((option) => { option.selected = false})
        );
}


// *********************************************
// ******  Functions to Manage the   ***********
// ******  Data in the HTML Table    ***********
// *********************************************


// Reference the HTML table using d3
var tbody = d3.select("tbody");


// Populate the HTML table rows with row values
// in the data object
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

function handleSelect() {

    // Get the field filter values from the multiple
    // select boxes in the form
    let datetimeArray = getSelectOptions("datetime");
    let cityArray     = getSelectOptions("city");
    let stateArray    = getSelectOptions("state");
    let countryArray  = getSelectOptions("country");
    let shapeArray    = getSelectOptions("shape");

    let filteredData = tableData;

    console.log(stateArray);

    // Check to see if any select boxes have options selected
    if (datetimeArray.length + cityArray.length + stateArray.length + countryArray.length + shapeArray.length > 0) {
 
      // Filter the data in the data array with the options 
      // selected in the filter form select boxes
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

// Attach the clear select to the Clear button
d3.selectAll("#clear-selected").on("click", clearSelectBoxes);


// Build the table when the page loads
buildTable(tableData);

// Populate form select controls used to filter the
// data displayed in the table
populateSelectOptions("datetime", dataFieldValues["datetime"]);
populateSelectOptions("city",     dataFieldValues["city"]);
populateSelectOptions("state",    dataFieldValues["state"]);
populateSelectOptions("country",  dataFieldValues["country"]);
populateSelectOptions("shape",    dataFieldValues["shape"]);

