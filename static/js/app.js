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
// using jscript for ... of ...
for (dataRow of data ) {
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
};


// ***** Get a unique set of value for each  *****
// ***** data field used to filter data rows *****

// Createa a data field unique sorted values object
// This object will contain the unique sorted values
// for each data field used to filter data rows.

// A javascript set objects is used to hold a data field's
// unique values. The set object itself will create the 
// the data field's unique value list. A set object will  
// only retain value once. If the same value is added to 
// the set multiple time, the set object will only keep
// the first instance of the value. 
uniqSortFldVals = {
    datetime: new Set(),
    city:     new Set(),
    state:    new Set(),
    country:  new Set(),
    shape:    new Set()
};


// Populate the uniqSortFldVals object with 
// table data from the tableData object
tableData.forEach((dataRow) => {

    // For each column name in the data row
    // Using the javascript statement for ... in ...
    for ( columnName in dataRow ){

        // If uniqSortFldVals does not have the property
        // with a name equal to the columnName value
        // continue.
        if (uniqSortFldVals[columnName] === undefined){
            continue;
        }

        // Add value of the field to the uniqSortFldVals
        // property whose name is equal to the columnName value
        uniqSortFldVals[columnName].add(dataRow[columnName]);
    }

});


// ***** Sort unique set of value for each   *****
// ***** data field used to filter data rows *****

// Date mm/dd/yyyy regular expression
// which is used to determine if the data field
// values being sorted below are string date values
var datetimeRegExp = new RegExp("\\d{1,2}/\\d{1,2}/\\d{4}")


// Sort the unique data value for each data field
for (dataFieldName in uniqSortFldVals) {

    let dataFldUnqValSet = uniqSortFldVals[dataFieldName];

    var arrayToSort = Array.from(dataFldUnqValSet).sort();

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
    //data field unique value set
    dataFldUnqValSet.clear();

    // Repopulate the data field unique value 
    // set with the values in sorted order 
    arrayToSort.forEach((value) => {dataFldUnqValSet.add(value)});
};


// *********************************************
// ******            END             ***********
// ******         Table Data         ***********
// ******       Cleaning Section     ***********
// *********************************************


// *********************************************
// ******    Code to Manage the      ***********
// ******  Filter Select Elements    ***********
// *********************************************

class UFOTableFilter {

    constructor() {
        this.datetime  = new Array();
        this.city      = new Array();
        this.state     = new Array();
        this.country   = new Array();
        this.shape     = new Array();
    }

    filter(dataObject){ 

        if (this.isEmpty() === true){
            return true;
        }

        let datetimeFilter = (this.datetime.length === 0 || this.datetime.includes(dataObject.datetime));

        let cityFilter     = (this.city.length === 0 || this.city.includes(dataObject.city));

        let stateFilter    = (this.state.length === 0 || this.state.includes(dataObject.state));

        let countryFilter  = (this.country.length === 0 || this.country.includes(dataObject.country));

        let shapeFilter    = (this.shape.length === 0 || this.shape.includes(dataObject.shape));

        let filterReturn   = datetimeFilter && cityFilter && stateFilter && countryFilter && shapeFilter;
        
        return filterReturn;
    }

    setFilter(dataFieldName, filterDataArray){
        this[dataFieldName] = filterDataArray;
    }

    clear(){
        this.datetiime  = new Array();
        this.city       = new Array();
        this.state      = new Array();
        this.country    = new Array();
        this.shape      = new Array();
    }
 
    isEmpty() {
        return this.datetime.length + this.city.length + this.state.length + this.country.length + this.shape.length === 0
    }
}

// Create and instance of a UFOTableFilterObject
let ufoTableFilter = new UFOTableFilter();

// Function to populate all filter select element
function populateFilterSelects(optionValues, onChangeEventHandler) {
    
    // Get an array of all the filter select elements
    let d3SelectCollection = d3.selectAll("select");

    // Set the onchange event handler for all filter select elements
    d3SelectCollection.on("change", onChangeEventHandler);

    let selectelementArray = d3SelectCollection._groups[0]

    // Interate through each select element's option objects
    // and set the option object's selected property to false

    let selectOptionData;
    let d3Select;

    for (select of selectelementArray){

        // Get the unique sorted field data to 
        // populate the filter select element
        selectOptionData = optionValues[select.id];
        
        // Doing it using d3 way
        d3Select = d3.select("#" + select.id);

        selectOptionData.forEach((value) => {d3Select.append("option").attr("value", value).text(value)});
        
        // Doing it the DOM way (Just having some fun. Use to be front end developer years ago.)
        // selectOptionData.forEach((value) =>
        // { 
        //     let selectOption    = document.createElement("option");
        //     selectOption.value  = value;
        //     selectOption.text   = value;
        //     select.add(selectOption);
        // });
        
    }
}


// function to clear the filter select elements
function clearFilterSelects() {
    
    // Get an array of all the filter select elements
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

    ufoTableFilter.clear();

    // The filter has been cleared.
    // Populate the table with all data.
    buildTable(tableData);
}

function updateFilter() {
    
    let filterValues = new Array();
    
    let index = 0;
    
    let selectOption = d3.event.target[index];
    
    while(selectOption != undefined){

        if (selectOption.selected === true){
            filterValues.push(selectOption.value);
        }

        selectOption = d3.event.target[++index];
    }
    
    ufoTableFilter.setFilter(d3.event.target.id, filterValues);

    filterTable();
}



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

// Attach the select elements clear selected option function
// to the clear filter element
d3.selectAll("#clear-filter").on("click", clearFilterSelects);


// Build the table when the page loads
buildTable(tableData);

// Populate form filter select elements with 
// the unique data values for each data field
populateFilterSelects(uniqSortFldVals, updateFilter); 