var readlineSync = require('readline-sync');
var figlet = require('figlet');
var chalk = require('chalk');
var Table = require('cli-table');
const table = new Table({
    head: ['Name', 'Score']
  , colWidths: [30, 30]
});

var score = 0;
var questionBank = [  
  {
    question : 'Where do I live?',
    options :['Delhi','Mumbai','Chennai','Kolkata'],
    corretAnswerIndex : 2
  },  
  {
    question : 'What is my star sign?',
    options :['Scorpio','Capricorn','Gemini','Virgo'],
    corretAnswerIndex : 1
  },
  {
    question : 'Which is my favourite movie?',
    options :['Godfather', 'Interstellar', 'Pulp Fiction', 'The Departed'],
    corretAnswerIndex : 1
  },
  {
    question : 'What is my favourite genre?',
    options :['Action','Comedy','Thriller','Horror'],
    corretAnswerIndex : 2
  },
  {
    question : 'Who is my favourite director?',
    options :['Christopher Nolan','Martin Scorsese','Francis Ford Coppola', 'Quentin Tarantino'],
    corretAnswerIndex : 3
  },
];
var highScores = [
  {
    name : "Ashwin",
    score : 5,
  },
  {
    name : "Akhil",
    score : 5,
  },
  {
    name : "Anand",
    score : 4,
  },
];

function greet(){
  console.log('--------------------------------------');
  console.log('|' + chalk.yellow(' Welcome to HOW WELL DO YOU KNOW ME?') + ' |');
  console.log('--------------------------------------');
  var userName = readlineSync.question('May I have your name? ');

  figlet('Welcome ' + userName + '!' , function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.log(err);
          return;
      }
      console.log(data);
      dashBoard();
  });
}

function dashBoard(){
  console.log(chalk.yellow('\n-----------DASHBOARD-----------'));
  console.log('Select an option!')
  console.log(' 1. Play \n 2. Rules \n 3. Hall of fame');
  dashBoardChoice();
}

function dashBoardChoice(){  
  var input = readlineSync.keyIn('User input: ');
  switch(input){
      case '1':
        play();
        break;
      case '2':
        rules();
        break;
      case '3':
        displayHighscores();
        break;
      default:
        console.log(chalk.red('Invalid input.'));
        dashBoardChoice();
    }
}

function play(){

  console.log(chalk.yellow('\n-----------PLAY-----------'));

  for(var i = 0 ; i < questionBank.length ; i++){
    console.log(chalk.bold.yellow(`\nQuestion ${i+1}/${questionBank.length}: ${questionBank[i].question}`));
    var options = questionBank[i].options;
    var index =  readlineSync.keyInSelect(options, 'User input: ',{cancel: false});
    if(index === questionBank[i].corretAnswerIndex){
      console.log(chalk.green('Correct answer!'));
      score++;
    }
    else{
      console.log(chalk.red('Oops! Wrong answer.'));
    }
    console.log(chalk.blueBright(`Current score : ${score}`))
  }

  if(score>highScores[2].score){
    console.log(chalk.green('\n\nCongrats! You have entered the hall of fame. Send a screenshot of your score to update the scores.'))
  }
  else{
    console.log(chalk.red('\n\nYou did not enter the hall of fame. :('))
  }
}

function displayHighscores(){
  console.log(chalk.yellow('\n-----------Hall of Fame-----------'));
  for(var i = 0 ; i < highScores.length ; i++){
    table.push([highScores[i].name,highScores[i].score]);
  }

  console.log(table.toString());

  console.log(chalk.green('Returning to dashboard...'));
  dashBoard();
}

function rules(){
  console.log(chalk.yellow('\n-----------RULES-----------'));
  console.log(' 1. Total of 5 questions.');
  console.log(' 2. Each correct answer gets a +1.');
  console.log(' 3. No negs for wrong answers.');
  console.log(' 4. If you make it to the hall of fame, send a screenshot with your score.');
  console.log(' 5. Have fun!');

  console.log(chalk.green('Returning to dashboard...'));
  dashBoard();
}


greet();

