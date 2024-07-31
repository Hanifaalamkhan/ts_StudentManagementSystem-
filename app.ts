#! /usr/bin/env node

import inquirer from 'inquirer';

const randomNumber: number = Math.floor(10000 + Math.random() * 90000);
let myBalance: number = 0;

interface Answers {
  student: string;
  course: string;
}

interface PaymentAnswers {
  payment: string;
  amount: string;
}

const tutionFee: { [key: string]: number } = {
  "Ms office": 2000,
  "HTML": 2500,
  "Javascript": 5000,
  "Typescript": 6000,
  "Python": 10000,
};

const answer: Answers = await inquirer.prompt([
  {
    name: "student",
    type: "input",
    message: "Enter student name:",
    validate: function (value: string): boolean | string {
      if (value.trim() !== "") {
        return true;
      }
      return "Please enter a non-empty value.";
    },
  },
  {
    name: "course",
    type: "list",
    message: "Select the course to enroll:",
    choices: Object.keys(tutionFee),
  },
]);

console.log(`\nTuition Fees: ${tutionFee[answer.course]}/-\n`);
console.log(`Balance: ${myBalance}\n`);

const paymentType: PaymentAnswers = await inquirer.prompt([
  {
    name: "payment",
    type: "list",
    message: "Select payment method:",
    choices: ["Bank transfer", "Easypaisa", "JazzCash"],
  },
  {
    name: "amount",
    type: "input",
    message: "Transfer Money:",
    validate: function (value: string): boolean | string {
      const numValue = parseFloat(value);
      if (value.trim() !== "" && !isNaN(numValue) && numValue > 0) {
        return true;
      }
      return "Please enter a valid amount.";
    },
  },
]);

console.log(`\nYou selected payment method: ${paymentType.payment}\n`);

const tutionFees: number = tutionFee[answer.course];
const paymentAmount: number = parseFloat(paymentType.amount);

if (tutionFees === paymentAmount) {
  console.log(`Congratulations, you have successfully enrolled in ${answer.course}.\n`);

  const nextAction: { select: string } = await inquirer.prompt([
    {
      name: "select",
      type: "list",
      message: "What would you like to do next?",
      choices: ["View status", "Exit"],
    },
  ]);

  if (nextAction.select === "View status") {
    console.log("\n****** Status ******\n");
    console.log(`Student Name: ${answer.student}`);
    console.log(`Student ID: ${randomNumber}`);
    console.log(`Course: ${answer.course}`);
    console.log(`Tuition Fees Paid: ${paymentAmount}`);
    console.log(`Balance: ${myBalance += paymentAmount}`);
  } else {
    console.log("\nExiting student management system\n");
  }
} else {
  console.log("Invalid amount. The payment does not match the course fee.\n");
}
