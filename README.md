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
The UFO Finder webpage uses the Bootstrap [Grid](https://getbootstrap.com/docs/4.5/layout/grid/) system to organize the page. In addition the webpage used the Bootstrap Utility [Colors](https://getbootstrap.com/docs/4.5/utilities/colors/) CSS to style the pages components, text, and background color scheme. The display heading of the page uses the Bootstrap [Jumbotron](https://getbootstrap.com/docs/4.5/components/jumbotron/) component and uses a CSS class selector and CSS background-image property to display the background image of the Jumbotron component. In addition the webpage uses a Bootstrap [Table](https://getbootstrap.com/docs/4.5/content/tables/) component and additional CSS classes to style the UFO data filterable table to make it a scrollable table. Given that it is filterable, depending on what UFO data rows are selected by the filter, the field widths vary. In order to maintain fixed widths for each field CSS class were created to give each field the width of the longest string value for that field. To makd the table more readable a CSS class was created to make the table header stationary, fixed-header tbod, and a CSS class was created to make the table rows scrollable, fixed-header tbody. To make the table body scrollable, the CSS class set a fixed height for the table body and the overflow-y property was set to scroll. The hight of the table body was set to that it would fit in the browser window when the browser was maximized. Because of the fixed header of the UFO data table and the scrollabble body of the table, the UFO data filter controls were located above the table headers so that the table could be be displayed with the maximun horizontal width. 

## UFO Data Filtering Using Javascript

