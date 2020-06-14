// import the data from data.js
const tableData = data;

// *********************************************
// ******         Table Data         ***********
// ******       Cleaning Section     ***********
// *********************************************

// ***** Change the case of data fieldsc *****
// Capitalize city name and multipart city names
// States to upper case
// Counties to upper case
for (const dataRow of data ) {

    let cityName = "";
    //capitalize all parts of a city's name
    dataRow["city"].split(" ").forEach((cityNamePart) => {
        if (cityName.length > 0){
            cityName += " ";
        }
        cityName += cityNamePart.replace(/^[a-z]{1}/, cityNamePart.substring(0,1).toUpperCase());
    });
    dataRow["city"]    = cityName;
    
    // Change the stte and county codes to upper case
    dataRow["state"]   = dataRow["state"].toUpperCase();
    dataRow["country"] = dataRow["country"].toUpperCase();
};


// ***** Get a unique set of value for each  *****
// ***** data field used to filter data rows *****

// Creates an object that stores the unique sorted values
// of the data field used to filter the rows of the table.
filterFieldValues = {
    datetime: new Set(),
    city:     new Set(),
    state:    new Set(),
    country:  new Set(),
    shape:    new Set()
};

// Populate each field of the the filterFieldValues
// object by iterating through the tableaData object's
// data rows and row fields
tableData.forEach((dataRow) => {

    // For each column name in the data row
    for ( const columnName in dataRow ){

        // If the object does not have a set property
        // "columnName" continue
        if (filterFieldValues[columnName] === undefined){
            continue;
        }

        // Add the field value to the set property "columnName"
        filterFieldValues[columnName].add(dataRow[columnName]);
    }

});

// ***** Sort the data field unique values  *****

// The date mm/dd/yyyy regular expression is used to 
// determine if the data field contains a date value
let datetimeRegExp = new RegExp("\\d{1,2}/\\d{1,2}/\\d{4}")


// Sort the each data field's unique data value
for ( const fieldName in filterFieldValues) {

    let dataFieldSet = filterFieldValues[fieldName];

    let arrayToSort = Array.from(dataFieldSet).sort();

    // Test to see if the array contains date strings
    // Date strings cannot be sorted using array sort method
    // Example of the erroneous sort of date strings:
    //   1/1/2020
    //   1/10/2020
    //   1/2/2020
    if (datetimeRegExp.test(arrayToSort[0]) === true){
        
        // Create new array to hold the milisecond value 
        // conversion of each date string
        let dateArrayToSort = new Array(arrayToSort.length);

        // Poulate the dateArrayToSort with milisecond value
        // conversion of each date string
        arrayToSort.forEach((value) => { dateArrayToSort.push(Date.parse(value)) });
        
        // Sort the date milisecond values
        dateArrayToSort.sort();

        // Assign arrayToSort reference to a new array
        arrayToSort = new Array(dateArrayToSort.length);

        // Populate the arrayToSort array by converting the sorted  
        // milizsecond value date to date string equivalents
        dateArrayToSort.forEach((value) => { arrayToSort.push((new Date(value)).toLocaleDateString('en-US')) })
    };

    // Clear the data field value set
    dataFieldSet.clear();

    // Repopulate the data field value set with the sorted field values
    arrayToSort.forEach((value) => {dataFieldSet.add(value)});
};


// *********************************************
// ******    Code to Manage the      ***********
// ******  Filter Select Elements    ***********
// *********************************************

// Function to populate the filter select elements
function populateFilterSelects(optionValues, onChangeEventHandler) {
    
    // Get an d3 collection of all the filter select elements
    let d3SelectCollection = d3.selectAll("select");

    // Set the onchange event handler for all select elements in the d3 collection
    d3SelectCollection.on("change", onChangeEventHandler);

    
    // Get an array of the filter select javascript objects
    let selectelementArray = d3SelectCollection._groups[0]

    // Populate the select options of  data 
    // field's HTML javascript select element
    let selectOptionData;
    let d3Select;

    for (const select of selectelementArray){

        // Get the data field's unique sorted field values
        selectOptionData = optionValues[select.id];
        
        // Doing it using d3 way
        // Get the d3 select control object
        d3Select = d3.select("#" + select.id);

        // Append select options to the select object for each filter data field unique value
        selectOptionData.forEach((value) => {d3Select.append("option").attr("value", value).text(value)});
        
    }
}


// function that clears the selected option 
// of the the filter select elements
function clearFilterSelects() {
    
    // Get an array of all the filter data field select elements
    let selectelementArray = d3.selectAll("select")._groups[0];

    // Interate through each select element's option objects
    // and set the option object's selected property to false
    selectelementArray.forEach((select) => 
        {
            Object.values(select.options).forEach((option) => 
            { 
                option.selected = false;} 
            )
        }
    );


    // Clear all filter values
    // from the filter object
    ufoTableFilter.clear();

    // Rebult the HTML table with
    // unfiltered tableData
    buildTable(tableData);
}

// *********************************************
// ******       Code to Manage       ***********
// ******   Table Data Filtering     ***********
// *********************************************
let spanArticleVisShow = d3.select("#article-vis-show")
let spanArticleVisHide = d3.select("#article-vis-hide")
let divArticleSections   = d3.selectAll(".article-section")

function articleToggleVisible(){
    let show = true;

    if (d3.event.target.id === "article-vis-hide") {
        show = false;
    }

    divArticleSections.style("display", show?"block":"none");
    spanArticleVisShow.style("display", !show?"inline":"none");
    spanArticleVisHide.style("display", show?"inline":"none");

}

spanArticleVisShow .on("click", articleToggleVisible);
spanArticleVisHide.on("click", articleToggleVisible);

// *********************************************
// ******       Code to Manage       ***********
// ******   Table Data Filtering     ***********
// *********************************************

// Reference the data HTML table
let tbody = d3.select("tbody");


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
    
        for (fieldName in dataRow){
            let cell = row.append("td");
            cell.text(dataRow[fieldName]);
            cell.attr("class", fieldName + "-column");
        };
    });
};


// This class stores the data field filter values
// from each filter select control element
class TableFilter {

    constructor() {

        this.filterValueArrays = {
            // data field filter value arrays
            datetime  : new Array(),
            city      : new Array(),
            state     : new Array(),
            country   : new Array(),
            shape     : new Array()
        };
    }

    // Method to test if a data objects field values match the filter values
    filter(tableRow){ 

        let isRowFiltered = true;

        // Loop though fields in a table data row and compare
        // the field values match the field's filter values
        // 
        // Using for ... in ... to loop through the filter values is 
        // more efficient than using object.forEach() to loop.
        // Once a data field value does not match any filter value,
        // the row is filtered and the filter method can return false.
        // There is no need to test any addition field values agains 
        // their filter values. 
        for (const fieldName in tableRow) {
            // If the data fields' filter value array has value and the 
            // data rows's file value is not in the field's filter array
            // filter the row
            if (  this.filterValueArrays[fieldName] !== undefined && 
                  this.filterValueArrays[fieldName].length > 0 && 
                 !this.filterValueArrays[fieldName].includes(tableRow[fieldName]) )
                return false;
        }
        
        return true;
    }

    // Method to Set a data field's filter values
    setFilter(dataFieldName, filterDataArray){
        this.filterValueArrays[dataFieldName] = filterDataArray;
    }

    // Method to clear all data field filter values
    clear(){
        this.filterValueArrays.datetime  = new Array();
        this.filterValueArrays.city      = new Array();
        this.filterValueArrays.state     = new Array();
        this.filterValueArrays.country   = new Array();
        this.filterValueArrays.shape     = new Array();
    }
}


// Create and instance of a table filter object
let ufoTableFilter = new TableFilter();


// Filter select elements' on change event handler function
function updateFilter() {
    
    let filterValues = new Array();
    
    // Iterate through options for the
    // changed filter select element
    // and select the option value where
    // the option property selected=true.
    //
    // NOTE:
    // d3 attaches each selected option element
    // to the d3.event.target object with an 
    // integer property name instead of using
    // a single property that contains an array
    // of the selecte option.
    //
    // d3.event.target.0 = selectedOption_0
    // d3.event.target.1 = selectedOption_1
    // ...
    // d3.event.target.n = selectedOption_n
    //
    // An integer index is needed to use as a
    // option property name until
    // 
    // d3.event.target[index] returns undefined
    //
    
    let index = 0;
 
    let selectOption = d3.event.target[index];
    
    while(selectOption != undefined){

        // Store the value of the option in the array
        // if the option property selected=true
        if (selectOption.selected === true){
            filterValues.push(selectOption.value);
        }

        selectOption = d3.event.target[++index];
    }
    
    // Set the filter values for data field that is equal the 
    // the filter select elements id
    ufoTableFilter.setFilter(d3.event.target.id, filterValues);

    filterTable();
}


// Funtion to filter the tableData based 
//on the the filter's  data fields filter values
function filterTable(tableFilter) {

    // Create copy of tableData
    let filteredData = tableData;
 
    // Filter copy of table data
    filteredData = filteredData.filter((row) => { return ufoTableFilter.filter(row) });

    // Rebuild the table using the filtered data
    // @NOTE: If no select element options are selected
    // table will contain all the rows in thetableData object.
    buildTable(filteredData);
};


// *********************************************
// ******  Initialze the Webpage     ***********
// *********************************************

// Attach the filter clear function to the 
// clear filter button
d3.selectAll("#clear-filter").on("click", clearFilterSelects);


// Build the html table displaying all rows
buildTable(tableData);

// Populate filter data field select elements with 
// the data field unique data values and add the 
// attach the updateFilter function to the 
// filter data field select elements.
populateFilterSelects(filterFieldValues, updateFilter);
