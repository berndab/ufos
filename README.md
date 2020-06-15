# UFOs Finder

## UFO Finder GitHup Pages Link
The UFOs Finder webpage can be view on Github Pages

<a href="https://berndab.github.io/ufos">UFOs Finder (ctrl-click to open in a new tab)</a>

## Overview

This project displays a webpage with that contains an article on UFO's and a filterable data table to search for UFO information

## Technical Discussion
This project use the following web technologies
* HTML
* CSS
* [Bootstrap CSS Framework 4,0](https://getbootstrap.com/)
* Javascript
* [d3 Javascript API 5.0](https://d3js.org/)

### Webpage HTML Design
The UFO Finder webpage following Bootstrap CSS framework to render the webpage’s HTML.

* A Bootstrap Grid system to organize the page. 
* A Bootstrap Utility CSS Colors  are used to style the pages the pages color scheme. 
* A Bootstrap Jumbotron component is used for the heading of the page and a CSS class selector is used to stet the CSS background-image property of the Jumbotron component. 
* A  Bootstrap Table component is used to display the UFO data
* Additional CSS classes to style the UFO table to make it a scrollable.
* The UFO data is filterable. When filtered data is displayed  in the table, the column widths may change because the maximum with of a data field displayed may change because other data field values are excluded by the filter. CSS classes were created to give each field, the width of the largest string value for that field. These CSS class keep the table column widths constant
* A CSS class was created to make the table header stationary to make the data more readable
* A CSS class was created to make the table rows scrollable. To make the table rows scrollable, the CSS class set a fixed height for the table body and set the CSS overflow-y property to scroll. The height of the table body was set so that it would fit in the browser window when the browser was maximized.


With all the content on the page, the user may be able to better analyze the information in the table if it could be viewed by itself. A control was create using a HTML span that allows the user to hide all the content of the page except the UFO data table. When the display control "Display Data Only" is visible and clicked all content on the page except the table is hidden. When the display control "Display All is visible and is click all the hidden content on the page is made visible". This is accomplished by toggling the CSS Display property. To hide object on the page the display property is  set to none. To make these object visible again the display property of the object is set to either block or inline depending on the object

A YouTube video and a link to a newspaper article was added to the page to add credibility of the original information presented in the webpage. The video was recorded on Nov. 14, 2004 by a US Navy F-18 Hornet plane operating with the aircraft carrier Nimitz off the coast of San Diego. The cockpit video show the F-18 following a UFO. The object being recorded is seemingly maneuvering in a manner not consistent with the capability of any known aircraft. In addition a link to a San Diego Union newspaper article about the video was added to the page. This is the best evidence yet from one of the most credible sources that ... we are not alone. the truth is out there!
Data Cleaning
The UFO data is provided by a JavaScript file that contains an array of data object with the following fields.
•	Date
•	City
•	State
•	Country
•	Shape
•	Duration
•	Comments

The City, State, and Country fields are all lower case. Because of this, the data is cleaned when loaded into the webpage's main JavaScript file app.js. The City name components are all capitalized, and the State and Country field values are converted to upper case.

## Data Filtering Using JavaScript
The UFO Finder webpage allows the user to filter the UFO data by specifying filter values for these fields
•	Date
•	City
•	State
•	Country
•	Shape

Since these field have a finite set of unique values, the best approach filtering the data is to get the unique values of these field, sort them, and create a multiselect control for each field populated with the data field’s unique values. Textboxes could be used to enter filter value for each field to filter but this would require the user to scroll through the entire table to find the desired field value to filter on. In addition, the use would be limited to only specifying one filter value for each data field. By using a select control to filter each field the user can scroll though the unique value for a data field and select multiple values to filter on.
In order to implement filtering, the filter values have to be stored in JavaScript. A TableFilter class was created that contains an array property to hold the filter values for each filter data field. An array is used because the data field’s multiselect filter control can return multiple values. The updateFilters(0 function is attached to all the select controls using d3's on("eventName", onChangeEventHandler) method.

When a option is selected in any of the filter select controls, the updateFilter() function attached to the on change event of the select controls is executed. The function uses d3's d3.event.target object to access all the select controls select options, Then the data field name that the select control is filtering to is retrieved from the id property of the d3.event.target object. The Table filter’s update() method is called to update the data fields array of filter values with the currently selected option of that fields select control. Finally the updateTable() method is called to filter the table data and display this filtered data in the HTM table. 


Multiple filter values can be selected on a filter select control by used Ctrl-Click and any selected option in a filter select control can be unselected also by using Ctrl-Click.
