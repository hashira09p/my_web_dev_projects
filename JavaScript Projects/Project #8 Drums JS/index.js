for(var i =0; i<document.querySelectorAll(".drum").length; i++){   // Solution Number 1
    document.querySelectorAll(".drum")[i].addEventListener("click", function insturments(){
        switch(this.innerHTML){
            case "a":
                var crash = new Audio('sounds/crash.mp3');
                crash.play();
                break;
            case "s":
                var kick = new Audio("sounds/kick-bass.mp3");
                kick.play();
                break;
            case "d":
                var snare = new Audio("sounds/snare.mp3");
                snare.play();
                break;
            case "f":
                var snare = new Audio("sounds/tom-1.mp3");
                snare.play();
                break;
            case "h":
                var snare = new Audio("sounds/tom-2.mp3");
                snare.play();
                break;
            case "j":
                var snare = new Audio("sounds/tom-3.mp3");
                snare.play();
                break;
            case "k":
                var snare = new Audio("sounds/tom-2.mp3");
                snare.play();
                break;
        }
    })
}



for(var i = 0; i < document.querySelectorAll(".drum").length; i++){     // Solution number 2
    document.querySelectorAll(".drum")[i].addEventListener("click", instruments);
}

function instruments(){
    for (let x = 0; x < document.querySelectorAll(".drum").length; x++) {
        instrumentsSounds(this.innerHTML);
        animation(this.innerHTML);
        
    }
};

document.addEventListener("keypress", function(event){
    console.log(event);
    instrumentsSounds(event.key);
    animation(event.key)
});

function instrumentsSounds(key){
    switch(key){
        case "a":
            var crash = new Audio('sounds/crash.mp3');
            crash.play();
            break;
        case "s":
            var kick = new Audio("sounds/kick-bass.mp3");
            kick.play();
            break;
        case "d":
            var snare = new Audio("sounds/snare.mp3");
            snare.play();
            break;
        case "f":
            var snare = new Audio("sounds/tom-1.mp3");
            snare.play();
            break;
        case "h":
            var snare = new Audio("sounds/tom-2.mp3");
            snare.play();
            break;
        case "j":
            var snare = new Audio("sounds/tom-3.mp3");
            snare.play();
            break;
        case "k":
            var snare = new Audio("sounds/tom-2.mp3");
            snare.play();
            break;
    }
};

function animation(currentkey){
    switch(currentkey){
        case "a":
            document.querySelectorAll(".drum")[0].classList.add("pressed");
            setTimeout(function (){
                document.querySelectorAll(".drum")[0].classList.remove("pressed");
            }, 100);
            break;
        case "s":
            document.querySelectorAll(".drum")[1].classList.add("pressed");
            setTimeout(function (){
                document.querySelectorAll(".drum")[1].classList.remove("pressed");
            }, 100);
            break;
        case "d":
            document.querySelectorAll(".drum")[2].classList.add("pressed");
            setTimeout(function (){
                document.querySelectorAll(".drum")[2].classList.remove("pressed");
            }, 100);
            break;
        case "f":
            document.querySelectorAll(".drum")[3].classList.add("pressed");
            setTimeout(function (){
                document.querySelectorAll(".drum")[3].classList.remove("pressed");
            }, 100);
            break;
        case "h":
            document.querySelectorAll(".drum")[4].classList.add("pressed");
            setTimeout(function (){
                document.querySelectorAll(".drum")[4].classList.remove("pressed");
            }, 100);
            break;
        case "j":
            document.querySelectorAll(".drum")[5].classList.add("pressed");
            setTimeout(function (){
                document.querySelectorAll(".drum")[5].classList.remove("pressed");
            }, 100);
            break;
        case "k":
            document.querySelectorAll(".drum")[6].classList.add("pressed");
            setTimeout(function (){
                document.querySelectorAll(".drum")[6].classList.remove("pressed");
            }, 100);
            break;
    }
    
}


/* pag gumamit ako ng for loop document.querySelectorAll(".drum")[x]; sa loob ng case sa switch parang pinapasok ko lng ung 
document.querySelectorAll(".drum")[6].classList.add("pressed"); */