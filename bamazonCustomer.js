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
    start();
});

function start() {
    //Call the displayItems function, so as to display all items for sale.
    displayItems();
    var questions = {
        name: "purchase",
        type: "rawlist",
        message: "Would you like to purchase an item or exit the program? [TYPE 1, OR 2]",
        choices: ["PURCHASE", "EXIT"]
    };

    inquirer.prompt(questions).then(function (answer) {
        //based on the user's answer, either enter the ID or quantity of the item they'd like to purchase
        if (answer.purchase.toUpperCase() === "PURCHASE") {
            purchase();
            return;
        }
        // else if (answer.idOrQuantity.toUpperCase() === "QUANTITY") {
        //     postAction();
        // }
        else {
            //Exit the application
            connection.end();
            return;
        }
    });
}

function purchase(){
    //Assign the user's input from the product they want to purchase to a variable
    var intID;
    var intUnits;
    var questions = [
        {
            name: "id_item",
            type: "input",
            message: "What is the ID of the item that you would like to purchase?",
            validate: function(value){
                if(isNaN(value) === false){
                    intID = value;
                    console.log("intID is:  " + intID);
                    return true;
                }
                    return false;
            }
        },
        {
            name: "units",
            type: "input", 
            message:  "How many units of the item would you like to purchase?",
            validate:  function(value){
                if(isNaN(value) === false){
                    intUnits = value;
                    return true;
                }
                return false;
            }
        }
    ];
    inquirer.prompt(questions).then(function(answer){
        var sqlString = "SELECT item_id, price, stock_quantity FROM products WHERE item_id = " + intID;
        connection.query(sqlString, intID, function(err, res){
            if (err) throw err;
            if(res[0].stock_quantity >= intUnits){
                //There is sufficient quantity
                var purchaseTotal = intUnits * res[0].price;
                var newInventory = res[0].stock_quantity - intUnits;
                sqlString = "UPDATE products SET stock_quantity = " + newInventory + " WHERE item_id = " + res[0].item_id;
                connection.query(sqlString, function(error){
                    if (error) throw error;
                    //console.log("\nInventory updated successfully");
                });
                console.log("\nYour purchase total is:  $" + purchaseTotal);
            }
            else{
                console.log("\nThere is insufficient quantity");
            }
            start();
        });
    });
}

// function createProduct() {
//     //This function adds a product to the product table in the bamazon database
//     console.log("Inserting a new product ...\n");
//     var query = connection.query(
//         "INSERT INTO products SET ?",
//         {
//             product_name: "Whisk",              //VARCHAR(45) NULL,
//             department_name: "Kitchen&Bath",    //VARCHAR(45) NULL,
//             price: 7.99,                        //FLOAT (11,2) NULL,
//             stock_quantity: 22                  //INT (11)
//         }
//     )
//     connection.end();
// }

function displayItems() {
    //This function displays all of the items available for sale. 
    //Item aspects include the ids, names, and prices of products for sale.
    var query = connection.query(
        "SELECT item_id AS Product_ID, product_name AS Product, price As Price FROM products", function (err, res) {
            if (err) throw err;
            //Log all of the results of the SELECT statement
            console.log('\n');
            for (var k = 0; k < res.length; k++) {
                console.log(res[k].Product_ID + ' ' + res[k].Product + ' ' + res[k].Price ); //+ '\n'
            }
            console.log('\n');
            console.log('\n');
        });
}