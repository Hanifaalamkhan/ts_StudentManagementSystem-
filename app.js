"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = require("inquirer");
var randomNumber = Math.floor(10000 + Math.random() * 90000);
var myBalance = 0;
var questions = [
    {
        name: 'studentName', // Removed space from key
        type: 'input',
        message: 'Enter student name:',
        validate: function (value) {
            if (value.trim() !== '') {
                return true;
            }
            return 'Please enter a non-empty value.';
        },
    },
    {
        name: 'course',
        type: 'list',
        message: 'Select the course to enroll:',
        choices: ['Ms office', 'HTML', 'Javascript', 'Typescript', 'Python'],
    },
];
var answer = await inquirer_1.default.prompt(questions);
var tuitionFee = {
    'Ms office': 2000,
    'HTML': 2500,
    'Javascript': 5000,
    'Typescript': 6000,
    'Python': 10000,
};
console.log("\nTuition Fees: ".concat(tuitionFee[answer.course], "/-\n"));
console.log("Balance: ".concat(myBalance, "\n"));
var paymentQuestions = [
    {
        name: 'paymentMethod',
        type: 'list',
        message: 'Select payment method',
        choices: ['Bank transfer', 'Easypaisa', 'Jazzcash'],
    },
    {
        name: 'amount',
        type: 'input',
        message: 'Transfer Money:',
        validate: function (value) {
            var amount = parseFloat(value);
            if (isNaN(amount) || amount <= 0) {
                return 'Please enter a valid amount.';
            }
            return true;
        },
    },
];
var paymentType = await inquirer_1.default.prompt(paymentQuestions);
console.log("\nYou selected payment method ".concat(paymentType.paymentMethod, "\n"));
var tuitionFees = tuitionFee[answer.course];
var paymentAmount = parseFloat(paymentType.amount);
if (tuitionFees === paymentAmount) {
    console.log("Congratulations, you have successfully enrolled in ".concat(answer.course, ".\n"));
    var statusQuestion = [
        {
            name: 'select',
            type: 'list',
            message: 'What would you like to do next?',
            choices: ['View status', 'Exit'],
        },
    ];
    var ans = await inquirer_1.default.prompt(statusQuestion);
    if (ans.select === 'View status') {
        console.log('\n******Status*****\n');
        console.log("Student Name: ".concat(answer.studentName));
        console.log("Student ID: ".concat(randomNumber));
        console.log("Course: ".concat(answer.course));
        console.log("Tuition Fees Paid: ".concat(paymentAmount));
        console.log("Balance: ".concat((myBalance += paymentAmount)));
    }
    else {
        console.log('\nExiting student management system\n');
    }
}
else {
    console.log('Invalid amount paid for the selected course.\n');
}
