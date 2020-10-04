const mysql = require('mysql');
const inquirer = require('inquirer');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'murderdb'
});

con.connect((err) => {
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
                searchCity()

            }
        })
};
// This function will query for the state 
const searchState = () => {
    inquirer.prompt({
        name: 'userStateAnswer',
        type: 'input',
        message: 'Enter the state you would like search: '
    }).then(answer => {
        const query = 'SELECT * FROM murderdb.murder_per_city WHERE state = ?;';
        con.query(query, answer.userStateAnswer, (err, state) => {
            // validates that the user did not enter an empty string
            if (answer.userStateAnswer.trim() === "") {
                console.log('Please enter a valid input');
                searchState()
            } else {
                if (err) throw err;
                console.table(state);
                runSearch()
            };
        });
    });
};

const searchCity = () => {
    inquirer.prompt({
        name: 'userCityAnswer',
        type: 'input',
        message: 'Enter the city you would like to search:'
    }).then(answer2 => {
        const query2 = 'SELECT * FROM murderdb.murder_per_city WHERE city = ?;';
        con.query(query2, answer2.userCityAnswer, (err, city) => {
            if (answer2.userCityAnswer.trim() === "") {
                console.log('Please enter a valid input');
                searchCity()
            } else {
                if (err) throw err;
                console.table(city);
                runSearch()
            }
        });
    })
}

// Give user the option to continue or quit
// write code to take care if state not in data