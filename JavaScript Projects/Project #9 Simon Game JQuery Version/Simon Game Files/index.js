var arr = ["green","red","yellow","blue"];
var toggle = false;
var userPattern = [];
var gamePattern = [];
var lvl = 1;

$("body").on("keydown", function(){
    if(toggle == false){
        $("h1").html(`Lvl ${lvl}`);
        toggle = true;
        sequence();
        userColorPicking();
    }
})


$(".btn").click(function(){
    var color = $(this).attr("id");
    $(`.${color}`).addClass("pressed");
    setTimeout(function(){
        $(`.${color}`).removeClass("pressed");
    },200);
    sounds(color);
    userPattern.push(color);
    checking(userPattern.length-1);
})

function sequence(){
    setTimeout(function(){
        var randomNumber = Math.floor(Math.random() * 4);
        var randomColor =  arr[randomNumber];

        $(`#${randomColor}`).fadeOut("400", function(){
            $(`#${randomColor}`).fadeIn("400");
        });

        sounds(randomColor)
        gamePattern.push(arr[randomNumber]);
    },500); 
}

function sounds(id){
    var audio = new Audio(`sounds/${id}.mp3`);
    audio.play();
}

function checking(length){
    if(userPattern[length] == gamePattern[length]){
        if(userPattern.length == gamePattern.length){
            userPattern = [];
            lvl ++;
            $("h1").html(`Lvl ${lvl}`);
            sequence();
        }
    }
    else{
        lvl = 1;
        userPattern = [];
        gamePattern = [];
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("h1").html(`Press Any Key To Restart`);
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        toggle = false;
        
    }
}




