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
The UFO Finder webpage uses the Bootstrap [Grid](https://getbootstrap.com/docs/4.5/layout/grid/) system to organize the page. In addition the webpage used the Bootstrap Utility [Colors](https://getbootstrap.com/docs/4.5/utilities/colors/) CSS to style the pages components, text, and background color scheme. The display heading of the page uses the Bootstrap [Jumbotron](https://getbootstrap.com/docs/4.5/components/jumbotron/) component and uses a CSS class selector and CSS background-image property to display the background image of the Jumbotron component. In addition the webpage uses a Bootstrap [Table](https://getbootstrap.com/docs/4.5/content/tables/) component and additional CSS classes to style the UFO data filterable table to make it a scrollable table. Given that it is filterable, depending on what UFO data rows are selected by the filter, the field widths vary. In order to maintain fixed widths for each field CSS class were created to give each field the width of the longest string value for that field. To make the table more readable a CSS class was created to make the table header stationary, fixed-header tbody, and a CSS class was created to make the table rows scrollable, fixed-header tbody. To make the table body scrollable, the CSS class set a fixed height for the table body and the overflow-y property was set to scroll. The height of the table body was set to that it would fit in the browser window when the browser was maximized. Because of the fixed header of the UFO data table and the scrollable body of the table, the UFO data filter controls were located above the table headers so that the table could be be displayed with the maximum horizontal width. With all the content on the page, the user may be able to better analyze the information in the table if it could be viewed by itself. A control was create using a HTML span that allow the user to view the table by itself on the page. The display control show the option, "Display Data Only", when clicked all content on the page is hidden except the table and the filter controls. The display control is also change to display the option "Display All". When clicked, the hidden content of the page become visible again. This was accomplished by added a class to the div sections to be hidden called "article-section". WHen the "Display Data Only" section is clicked, the JavaScript function assigned to the on click event, sets the CSS display property to none. When the "Display All" option is visible and clicked, the on click Javascript function set the display CSS property of the div with the article-section class to block which allow those section to become visible again.

Additional content was added to the page to enhance the UFO credibility of the information that is presented in the webpage. A YouTube video was added to the page. The video was recorded on Nov. 14, 2004 by a US Navy F18 Hornet plane operating off the aircraft carrier Nimitz off the coast of San Diego. It is a cockpit video of a F18 following a UFO. The recording shows the object seeming maneuvering in a manner not consistent with the capability of any known aircraft. Also, under the YouTube video, is a link to a The San Diego Union paper article about the video. This is the best evidence yet from one of the most credible sources that ... we are not alone. the truth is out there!

## Data Cleaning 
The UFO data is provided by a Javascript file that contains an array of data object with the following fields. 
* Date
* City
* State
* Country
* Shape
* Duration
* Comments

The City, State, and Country fields are all lower case. Because of this, the data is iterated through and cleaned when loaded into the webpage's main JavaScript file app.js. The City name commponents are all capitalized and the State and Country field value are converted to upper case

## Data Filtering Using Javascript

The UFO Finder webpage allows the user to filter the UFO data by specifying filter value for these fields
* Date
* City
* State
* Country
* Shape

Since these field have a finite set of unique values, the best approach to created a filter capability is to get the unique values of these field, sort them, and create multiselect control for each field and populate the select control option with the fields unique values. Textboxes could be used to enter the value for a field to filter on but this would require the user to possible scroll though the entire table to find the desired field value to filter on and the user would be limited to only filtering on one field value at time for each filter field. By using select control for each filter field populated with the field's unique values, can scroll though the unique value for a field listed iand select multiple values to filter on. 
