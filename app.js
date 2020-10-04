const mysql = require('mysql');
const inquirer = require('inquirer');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'murderdb'
});

con.connect(function (err) {
    if (err) {
        console.log('Error connecting to database')
        return;
    }
    console.log('Connection established');
    runSearch()
});
// Run search function
const runSearch = () => {
    inquirer.prompt(
        {
            name: 'search',
            type: 'list',
            message: 'Please choose an option on how you would like to search for murder statistics in the United States',
            choices: ["By state", "By city"]
        }).then(answer => {
            if (answer.search === 'By state') {
                searchState()
            }
            if (answer.search === 'By city') {
                searchCity2015()

            }
        })
};
// This function will query for the state 
const searchState = () => {
    inquirer.prompt({
        name: 'userAnswer',
        type: 'input',
        message: 'Enter the state you would like to do a search on: '
    }).then(answer => {
        const query = 'SELECT * FROM murderdb.murder_per_city WHERE state = ?;';
        con.query(query, answer.userAnswer, (err, state) => {
            // validates that the user did not enter an empty string
            if (answer.userAnswer.trim() === "") {
                console.log('Please enter a valid input')
                searchState()
            } else {
                if (err) throw err;
                console.table(state);
                runSearch()
            };
        });
    });

}
// Give user the option to continue or quit
// finish city search portion
// write code to take care if state not in data