const readLineSync = require('readline-sync');
//Object quiz having all questions, answers and methods to calculate result
const quiz =
{
  finalScore: 0,
  //Array of questions to be asked in quiz.
  Ques:
    [
      'One thing I can\'t live without?\n',
      'What am I afraid of?\n',
      'My favourite color?\n',
      'My favourite TV show?\n',
      'My favourite pizza topping?\n',
      'What kind of persoanlity I\'m\n?'
    ],

  //Total number of questions
  numQues() {
    return this.Ques.length;
  },
  //numQues: 6,
  //Array of options corresponding to every question.
  Options:
    [
      ['Music', 'Good Food', 'Webseries'],
      ['Darkness', 'Death', 'Heights', 'Future'],
      ['Dark Blue', 'White', 'Black', 'Grey'],
      ['HIMYM', 'The Young Sheldon', 'TMKOC', 'Breaking Bad'],
      ['Cheese', 'Olives', 'Mushrooms', 'Brocolli'],
      ['Extrovert', 'Ambivert', 'Introvert']
    ],

  //Array of correct options
  AnswerInOptions: [2, 4, 1, 3, 4, 3],

  //Array in which user responses will be stored.
  UserResponses: [],

  //Prints ith question 
  throwQues(i) {
    console.log(`Que ${i + 1}. ${this.Ques[i]}`);
    this.throwOptions(this.Options[i])

    const response = readLineSync.question("Please provide your answer\n");

    //pushes user's response into UserResponses[]
    this.UserResponses.push(response);
    this.throwResult(i);
  },

  //Prints options of ith question with serial number
  throwOptions(OptionArr) {
    for (let serialNumber = 1; serialNumber <= OptionArr.length; serialNumber++) {
      console.log(serialNumber + '. ' + OptionArr[serialNumber - 1]);
    }
  },

  //for every response,prints result and correct answer and calculates final score
  throwResult(i) {
    if (this.UserResponses[i] == this.AnswerInOptions[i]) {
      console.log("Ahoy! Right answer!\n");
      this.finalScore++;
    }
    else {
      console.log(`Nah, right option is ${this.AnswerInOptions[i]}\n`)
    }
  },

  //prints final score after all questions are asked
  FinalScore() {
    console.log(`Great, you've completed the quiz. Your final score is ${this.finalScore}/${this.numQues()}`);

    //if all questions are correct, shows a cheer text
    //else asks user to re-take the quiz
    if (this.finalScore === this.numQues()) {
      console.log("A perfect score. You must be my best friend!");
    }
    else {
      const retakeOption = readLineSync.question('Nevermind, Wanna re-take the quiz?(Y/N)\n');

      if (retakeOption === 'Y') {
        //cleans the previous responses and set finalScore = 0
        this.UserResponses.length = 0;
        this.finalScore = 0;

        //calls all the questions again and recalls FinalScore()
        for (let i = 0; i < quiz.numQues(); i++) {
          this.throwQues(i);
        }
        this.FinalScore();

      }
      else {
        console.log('Okay, Have a nice day! :)');
      }

    }
  }
};

const name = readLineSync.question('Hey, What is your name?\n');
console.log(`Hello ${name}!\n`);

//Introductory question before starting the quiz.
const introQues = readLineSync.question('How do you know me?\nA. Office Colleague.\nB. College friend.\nC. Linkedin connection)\n\n');

if (introQues === 'A') {
  console.log('Lets dig in anyway, Colleague!\n')
}
else if (introQues === 'B') {
  console.log('This will be fun anyway:D\n');
}
else if (introQues === 'C') {
  console.log('Lets dig in anyway, Connection!\n')
}
console.log('Let\'s see how well you know me!\n')

//Asks each question iteratively and processes the user input to calculate results.
for (let i = 0; i < quiz.Ques.length; i++) {
  quiz.throwQues(i);
}

//Calls FinalScore() to print final results.
quiz.FinalScore();
