var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as ID:  " + connection.threadId + "\n");
    //Call a variety of functions, depending upon what you want to do
    //runSearch();
    //createProduct();
    start();
});

function start(){
    var questions = {
        name: "idOrQuantity", 
        type: "rawlist",
        message: "Would you like to enter an [ID] or [QUANTITY] for an item to purchase?", 
        choices: ["ID", "QUANTITY", "EXIT"]
    };

    inquirer.prompt(questions).then(function(answer){
        //based on the user's answer, either enter the ID or quantity of the item they'd like to purchase
        if(answer.idOrQuantity.toUpperCase() === "ID"){
            idAction();
        }
        else if(answer.idOrQuantity.toUpperCase() === "POST"){
            postAction();
        }
        else{
            //Exit the application
            connection.end();
            return;
        }
    });
}

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Enter the ID of the product I wish to purchase", 
                "Enter the number of units of the product I'd like to buy"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Enter the ID of the product I wish to purchase":
                    artistSearch();
                    break;

                case "Enter the number of units of the product I wish to purchase":
                    multiSearch();
                    break;
            }
        });
}

function createProduct(){
    //This function adds a product to the product table in the bamazon database
    console.log("Inserting a new product ...\n");
    var query = connection.query(
        "INSERT INTO products SET ?",
        {
            product_name: "Whisk",              //VARCHAR(45) NULL,
            department_name: "Kitchen&Bath",    //VARCHAR(45) NULL,
            price: 7.99,                        //FLOAT (11,2) NULL,
            stock_quantity: 22                  //INT (11)
        }
    )
    connection.end();
}