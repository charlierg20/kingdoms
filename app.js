//JSON for scenario data
var json = '{"scenarios":{"tax":{"text":"Hey. We\'re the regional alliance and we want some of your taxes. You better hand \'em over or we\'ll have to attack you.","no":{"population":-10,"happiness":-10,"resources":-10,"money":10},"yes":{"population":100,"happiness":0,"resources":0,"money":-10}},"protest":{"text":"We demand more rights for the peasants. Give us money or we strike.","no":{"population":-5,"happiness":-30,"resources":-20,"money":0},"yes":{"population":10,"happiness":20,"resources":10,"money":-20}},"petition":{"text":"Hey, your majesty. We\'re some teenagers working in the prison downstairs and we want you to get rid of Mike Chellin. He\'s annoying.","no":{"population":0,"happiness":-2,"resources":2,"money":-2},"yes":{"population":0,"happiness":2,"resources":-2,"money":2}},"deforestation":{"text":"Auf Wiedersehen my guy! It\'s been forever! Ich habe a huge company now and those forests look nice. I\'ll chuck you some gold for a chunk of that forest, yeah?","no":{"population":10,"happiness":10,"resources":10,"money":0},"yes":{"population":-10,"happiness":-20,"resources":-20,"money":40}},"invasion":{"text":"Surrender at once! We have already taken the perimeter!","no":{"population":-15,"happiness":-10,"resources":-10,"money":10},"yes":{"population":-40,"happiness":-40,"resources":-40,"money":-40}},"donation":{"text":"We, the Coral society, request some money so we can build a network for sickness victims to be revived.","no":{"population":-10,"happiness":-10,"resources":0,"money":0},"yes":{"population":20,"happiness":20,"resources":-10,"money":-10}},"merger":{"text":"We are the three stone mining companies. We would like to merge to form a monopoly on the mining industry and make our nation glorious.","no":{"population":10,"happiness":10,"resources":-10,"money":10},"yes":{"population":0,"happiness":-20,"resources":20,"money":-20}},"kites":{"text":"Können wir Drachen in den Gärten fliegen?","no":{"population":0,"happiness":-10,"resources":0,"money":0},"yes":{"population":0,"happiness":10,"resources":0,"money":0}},"dark":{"text":"We are the order of the dark. Give us money or else.","no":{"population":0,"happiness":0,"resources":-10,"money":0},"yes":{"population":0,"happiness":-10,"resources":0,"money":-10}},"magic":{"text":"We are the order of magic, and we have some experimental weapons for you to buy.","no":{"population":0,"happiness":0,"resources":0,"money":0},"yes":{"population":0,"happiness":0,"resources":5,"money":-5}},"reconstruction":{"text":"Your castle should be remade to be fit for a king!","no":{"population":0,"happiness":-10,"resources":0,"money":10},"yes":{"population":10,"happiness":10,"resources":10,"money":-10}},"party":{"text":"In order of your majesty, we want to throw a party in the streets!","no":{"population":0,"happiness":-10,"resources":0,"money":0},"yes":{"population":15,"happiness":20,"resources":0,"money":-5}},"viking":{"text":"Ja! We are the Vikings from the north! We are can have alliance?","no":{"population":0,"happiness":0,"resources":-5,"money":-5},"yes":{"population":-5,"happiness":-5,"resources":5,"money":5}},"ra":{"text":"Here\'s some money from the Regional alliance.","no":{"population":0,"happiness":-5,"resources":0,"money":0},"yes":{"population":9,"happiness":0,"resources":0,"money":20}},"opop":{"text":"Suffering from overpopulation issues? I\'ll cull a bunch of them; it\'ll make everything easier for you.","no":{"population":10,"happiness":20,"resources":0,"money":-10},"yes":{"population":-25,"happiness":-10,"resources":10,"money":25}},"musical":{"text":"May we play a version of Miracle the Musical in the town square? We have been training for years!","no":{"population":0,"happiness":-15,"resources":0,"money":5},"yes":{"population":10,"happiness":25,"resources":-5,"money":-10}},"tech":{"text":"We have advanced mechanical technology to increase your harvest yield. Wanna buy?","no":{"population":0,"happiness":0,"resources":-10,"money":10},"yes":{"population":5,"happiness":5,"resources":20,"money":-10}}}}'

//A list of JSON index names. I could have done something fancy with the "json" variable to get this, but I just bodged this together. Not very future-proofed, but it doesn't really matter here.
var scenarray = ["tax", "protest", "petition", "deforestation", "invasion", "donation", "merger", "kites", "dark", "magic", "reconstruction", "party", "viking", "ra", "opop", "musical", "tech"];

//Actual stat variables
var money = 50;
var resources = 50;
var happiness = 50;
var population = 50;

//Modifier variables - what gets applied to the main variables after a scenario is chosen.
var ymoney = 0;
var yresources = 0;
var yhappiness = 0;
var ypopulation = 0;
var nmoney = 0;
var nresources = 0;
var nhappiness = 0;
var npopulation = 0;

//Basic function to append stuff to the main span of the document.
function writeLine(input, color) {
  input = input.replace("\n", "<br>");
  document.getElementById("console").innerHTML += "<span style=\"color:" + color + "\">" + input + "</span><br>";
}

//Not actually a very helpful function, basically conveys buttons to newTurn().
function submit(response) {
  if (response != undefined) {
    newTurn(response);
  }
}

//Provides a link to reload the page
function endGame() {
  writeLine("Oh no! You ran out of something! <a href=\"index.html\">Start again?</a>", "red");
}

//Gets random index name from array which corresponds to a JSON elements that has details about a scenario.
function newTurn(res) {
  //Check if function is called from buttons.
  if (res != undefined) {
    if (res) {
      //If yes, set based on results of the scenario get.
      money += ymoney;
      resources += yresources;
      happiness += yhappiness;
      population += ypopulation;
    } else if (!res) {
      //If no, set based on results of the scenario get.
      money += nmoney;
      resources += nresources;
      happiness += nhappiness;
      population += npopulation;
    }
    //Check if the player is backrupt
    if (money <= 0 || resources <= 0 || population <= 0 || happiness <= 0) {
      endGame();
      return;
    }
  }

  //Gets the index name
  var corr = scenarray[Math.floor(Math.random() * scenarray.length)];

  //Parse the JSON
  var jsprse = JSON.parse(json);

  //Get the scenario text
  var text = jsprse["scenarios"][corr]["text"];
  
  //Set the modifier vars to no/yes modifiers
  nmoney = jsprse["scenarios"][corr]["no"]["money"];
  nresources = jsprse["scenarios"][corr]["no"]["resources"];
  nhappiness = jsprse["scenarios"][corr]["no"]["happiness"];
  npopulation = jsprse["scenarios"][corr]["no"]["population"];

  ymoney = jsprse["scenarios"][corr]["yes"]["money"];
  yresources = jsprse["scenarios"][corr]["yes"]["resources"];
  yhappiness = jsprse["scenarios"][corr]["yes"]["happiness"];
  ypopulation = jsprse["scenarios"][corr]["yes"]["population"];

  //Write the text
  writeLine(text, "orange");

  //Write stats
  writeLine("Current Stats:", "white");
  writeLine("Money: " + money + ", Resources: " + resources + ", Happiness: " + happiness + ", Population: " + population, "red");
  writeLine("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
}

//Function to hide/show buttons and create a turn
function startGame() {
  //Start a turn
  newTurn();

  //Declare variables
  var x = document.getElementById("strt");
  var y = document.getElementById("yn");

  //Hide/show
  x.style.display = "none";
  y.style.display = "block";
}

//Disable Yes/No Buttons
document.getElementById("yn").style.display = "none";

//Initialize by pushiing ascii art, copyright notice, etc.
writeLine(`&nbsp&nbsp_&nbsp&nbsp___&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp_&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp`, "#8300FF");
writeLine(`&nbsp|&nbsp|/&nbsp(_)&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp|&nbsp|&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp`, "#FF00DC");
writeLine(`&nbsp|&nbsp'&nbsp/&nbsp_&nbsp_&nbsp__&nbsp&nbsp&nbsp__&nbsp_&nbsp&nbsp__|&nbsp|&nbsp___&nbsp&nbsp_&nbsp__&nbsp___&nbsp&nbsp___&nbsp`, "#FF0054");
writeLine(`&nbsp|&nbsp&nbsp<&nbsp|&nbsp|&nbsp'_&nbsp\\&nbsp/&nbsp_&nbsp&nbsp|/&nbsp_&nbsp&nbsp|/&nbsp_&nbsp\\|&nbsp'_&nbsp&nbsp&nbsp_&nbsp\\/&nbsp__|`, "#FF0400");
writeLine(`&nbsp|&nbsp.&nbsp\\|&nbsp|&nbsp|&nbsp|&nbsp|&nbsp(_|&nbsp|&nbsp(_|&nbsp|&nbsp(_)&nbsp|&nbsp|&nbsp|&nbsp|&nbsp|&nbsp\\__&nbsp\\`, "#FF8C00");
writeLine(`&nbsp|_|\\_\\_|_|&nbsp|_|\\__,&nbsp|\\__,_|\\___/|_|&nbsp|_|&nbsp|_|___/`, "#FFF600");
writeLine(`&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp__/&nbsp|&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp`, "#8CFF00");
writeLine(`&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp|___/&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp`, "#00FF15");
writeLine("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
writeLine("A text-based kingdom monarch simulator. Copyright 2021 CRG Media Group. License Details and source available on <a href=\"https://github.com/charlierg20/kingdoms\">GitHub</a>.");
writeLine("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");