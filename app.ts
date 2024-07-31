import inquirer from 'inquirer';

const randomNumber: number = Math.floor(10000 + Math.random() * 90000)

let myBalance : number = 0

let answer = await inquirer.prompt([
    {
        name: " students", 
        type : "input",
        message: "Enter student name :",
        validate: function (value) {
            if (value.trim() !== "") {
                return true ;
            }
            return "Please enter a non-empty value.";
        },

    },
    {
        name : "courses ",
        type: "list",
        message: "select the course to enrolled"
        choices: ["Ms office", "HTML","Javascript", "Typescript" ,"Python"]

    }
]);

const tutionFee: {[key : string]: number } = {
    "Ms office": 2000,
    "HTML": 2500,
    "Javascript": 5000,
    "Typescript" : 6000,
    "Python": 10000,
};

console.log(`\nTution Fees: ${tutionFee[answer.courses]}/-\n`);
console.log(`Balance : ${myBalance}\n`);

let paymentType = await inquirer.prompt([
    {
        name: "payment",
        type : "list",
        message: "Select payment method",
        choices: ["Banl transfer", "Easypaisa", "Jasscash"]
    },
    {
        name: "amount",
        type: "input",
        mesasge: "Transfer Money:",
        validate: function (value){
            if (value.trim() 1== ""){
                return true;
            }
            return "Please enter a non-empty value."
        },
    }
]);

console.log(`\nYou select payment method ${paymentType.payment}/n`);

const tutionFees = tutionFee [answer.courses];
const paymentAmount = parseFloat(paymentType.amount)

if (tutionFees === paymentAmount) {
    console.log(`Congratulations, ypu have successfully enrolled in ${answer.courses}.\n`);

let ans = await inquirer.prompt([
    {
        name : "select",
        typy : "list",
        message: "What would you like to do next?",
        choices: ["View status", "Exit"]
        
    }
])
if (ans.select === "View status"){
    console.log("\n******status*****\n");
    console.log(`student Name: ${answer.students}`);
    console.log(`student ID: ${randomNumber}`);
    console.log(`course: ${answer.courses}`);
    console.log(`Tution Fees Paid : ${paymentAmount}`);
    console.log(`Balance: ${myBalance += paymentAmount}`);

}else {
    console.log("\nExiting student management system\n")
}

}else{
    console.log("Invalid amount due to courses\n");
}
