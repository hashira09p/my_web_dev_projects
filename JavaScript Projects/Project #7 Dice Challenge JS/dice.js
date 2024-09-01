function randomizer(){
    var num1 = Math.floor((Math.random()*6) +1);
    var num2 = Math.floor((Math.random()*6) +1);
    
    if(num1 > num2){
        document.getElementById("dice1").setAttribute("src", `./images/dice${num1}.png`);
        document.getElementById("dice2").setAttribute("src", `./images/dice${num2}.png`);
        document.getElementById("flag1").style.visibility = "visible";
        document.querySelector("h1").textContent = "Player 1 Wins.";
    }

    else if(num1 == num2){
        document.getElementById("dice1").setAttribute("src", `./images/dice${num1}.png`);
        document.getElementById("dice2").setAttribute("src", `./images/dice${num2}.png`);
        document.getElementById("flag1").style.visibility = "visible";
        document.getElementById("flag2").style.visibility = "visible";
        document.querySelector("h1").textContent = "They Are Equal.";
    }

    else{
        document.getElementById("dice1").setAttribute("src", `./images/dice${num1}.png`);
        document.getElementById("dice2").setAttribute("src", `./images/dice${num2}.png`);
        document.getElementById("flag2").style.visibility = "visible";
        document.querySelector("h1").textContent = "Player 2 Wins.";
    }
}