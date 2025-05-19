# Student Registration System

A web-based student regitration system built with HTML,CSS(Tailwind CDN), and JavaScript.
This application allows user to add,edit,remove student records.

## Repository

[GitHub Repository](https://github.com/Adrish24/assignment-student-registration-system)

## Features

- **Student Record Management**
  - Add new student with name,ID,email and contact number.
  - Edit existing student records
  - Delete studen records
  - Save data using localStorage

- **Form Validation**
  - Validates student ID (numbers only)
  - Validates contact number (10 digits)
  - Ensures unique student IDs
  - Prevents empty submissions

## Technology Used
- HTML5
- CSS3
- Javascript
- Web Storage API(localStorage) for data persisence

## Implementation Details
- **Data Structure**: Student records are stored as objects with properties - name, ID, email and contact number.
- **Data Persistence**: All data is saved to the browser's localStorage to avoid data wipe on page refresh or on window close.
- **Dynamic DOM manuplation** : Table rows and form fields are dynamicaly rendered.
- **Event Handling**: Used event listeners for user interections

## How to Use

1. Click "Add Student" to open the registration form
2. Fill the required details.
3. Click "Register" to add new student
4. To edit a student record, click the "Edit" button next to there record
5. To remove a student record, click the "Delete" button next to there record





