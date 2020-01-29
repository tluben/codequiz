var currentAns;
var score = 120 
var questionCounter = 0
var ansButtons = document.getElementsByClassName("ans")
var runningTime;

function myFunction() {
    //document.getElementById("start").style.color = "blue";
    document.getElementById("quiz").classList.remove("hide")
    document.getElementById("start").classList.add("hide")
    loadQuestion(questions[questionCounter]) //reload question 
    document.getElementById("timer").innerText=score 
    runningTime = setInterval(timer,1000)
}

function timer (){
 score --
 document.getElementById("timer").innerText=score 
 if (score <= 0){
     clearInterval(runningTime)
 }
}



function loadQuestion(questionObject) {
    var selector = document.getElementById("question") //selector
    var choices = questionObject.choices
    selector.innerText = questionObject.title
    for (var i = 0; i < choices.length; i++) {
        document.getElementById(i).innerText = choices[i]
    }
    
}


Array.from(ansButtons).forEach(function(element)  {
    element.addEventListener("click", function(event){
        var userInput = questions[questionCounter].choices[parseInt(event.target.id)]
        var answer = questions[questionCounter].answer
        console.log(userInput)
        if (userInput===answer){
         console.log("correct")   
        }
        else {
            console.log("incorrect")
            score -= 20 
            document.getElementById("timer").innerText=score 
        }
            questionCounter++
            var max = questions.length
            if (questionCounter < max ){
                loadQuestion(questions[questionCounter]) 
            }
            else {
                clearInterval(runningTime)
                questionCounter = 0
                document.getElementById("quiz").classList.add("hide")
                document.getElementById("results").classList.remove("hide")
                document.getElementById("score").innerText = score 
            }
        })
});
function allStorage() {

    var archive = [],
        keys = Object.keys(localStorage),
        i = 0, key;

    for (; key = keys[i]; i++) {
        archive.push( key + ': ' + localStorage.getItem(key));
    }

    return archive;
}
document.getElementById("score-btn").addEventListener("click", function(event){
    var userInput = document.getElementById("score-input").value
    console.log(userInput)
    localStorage.setItem(userInput, score)
    var values=allStorage()
    var superString = ""
    for(var i = 0; i < values.length; i++){
superString+=`<li>${values[i]}</li>`
    }
    document.getElementById("top").innerHTML=superString
    document.getElementById("results").classList.add("hide")
    document.getElementById("top-scores").classList.remove("hide")
})  
