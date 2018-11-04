var sound = new Audio("https://www.freespecialeffects.co.uk/soundfx/music/fanfare1.wav");
        sound.loop = true;

//--------Digital Klukka---------//

function klukka() {
var time = new Date(),
    hour = time.getHours(),
    minute = time.getMinutes(),
    second = time.getSeconds();
    
document.querySelectorAll('.klukka')[0].innerHTML = stund(hour) + ":" + stund(minute) + ":" + stund(second);
  
  function stund(standIn) {
    if (standIn < 10) {
      standIn = '0' + standIn
    }
    return standIn;
  }
}
setInterval(klukka, 1000);

//-------Vekjaraklukka------
var hour = document.getElementById('alarmhrs');
var min = document.getElementById('alarmmins');
var sec = document.getElementById('alarmsecs');

fillDropdowns(hour, 23);
fillDropdowns(min, 59);
fillDropdowns(sec, 59);

function fillDropdowns(select, max) {
    for (i=0; i <= max; i++) {
        select.options[select.options.length] = new Option( i < 10 ? "0" + i : i, i);
    }
}

function getChoice(select) {
    return select.selectedOptions[0].value
}  

function alarmSet() {
    console.log(getChoice(hour))
    console.log(getChoice(min))
    console.log(getChoice(sec))
var hh = getChoice(hour);
var mm = getChoice(min);

return hh + ":" + mm + ":" + ss // returna streng með tímasetningunni.
}

// -----------Maze canvas
var canvas = document.getElementById('GameBoardCanvas');

// ----------- 0 = stigur, 1 = veggir,  -1 = mark
var board = [
    [ 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [ 1, 0, 1, 1, 0, 0, 0, 1, 1, 0],
    [ 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [ 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [ 0, 1, 1, 0, 0, 1, 1, 0, 1, 1],
    [ 0, 0, 1, 1, 1, 1, 1, 0, 1, 0],
    [ 1, 1, 1, 0, 0, 0, 1, 0, 1, 0],
    [ 1, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [ 0, 0, 1, 0, 1, 0, 0, 1, 1, 0],
    [-1, 1, 1, 0, 1, 1, 0, 0, 0, 0]
];
var player = {
    x: 0,
    y: 0
};


function draw(){
    var width = canvas.width;
    var blockSize = width/board.length;
    var ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, width);
    ctx.fillStyle="white";
    
    for(var y = 0; y < board.length; y++){
        for(var x = 0; x < board[y].length; x++){
            //Veggir
            if(board[y][x] === 1){
                ctx.fillRect(x*blockSize, y*blockSize, blockSize, blockSize);
            }
            //Mark
            else if(board[y][x] === -1){
                ctx.beginPath();
                ctx.lineWidth = 5;
                ctx.strokeStyle = "yellow";
                ctx.moveTo(x*blockSize, y*blockSize);
                ctx.lineTo((x+1)*blockSize, (y+1)*blockSize);
                ctx.moveTo(x*blockSize, (y+1)*blockSize);
                ctx.lineTo((x+1)*blockSize, y*blockSize);
                ctx.stroke();
            }
        }
    }
    //Spilari
    ctx.beginPath();
    var half = blockSize/2;
    ctx.fillStyle = "green";
    ctx.arc(player.x*blockSize+half, player.y*blockSize+half, half, 0, 2*Math.PI);
    ctx.fill();
}

//-------Hvar spilarinn ma fara-----//
function canMove(x, y){
    return (y>=0) && (y<board.length) && (x >= 0) && (x < board[y].length) && (board[y][x] != 1);
}

function isFinished(x, y) {
    return board[y][x] === -1
}

function setAlarm(timeStamp) {

}

function turnOffAlarm() {
    console.log('búið')
}

function directions(key){
    if(key == 38)
        return 'up';
    else if (key == 40)
        return 'down';
    else if (key == 37)
        return 'left';
    else if (key == 39)
        return 'right';
}

window.addEventListener('keyup', function(e){

    var direction = directions(e.which);

    if(isFinished(player.x, player.y))
        turnOffAlarm()

    if(direction === 'up' && canMove(player.x, player.y-1)){
        if(isFinished(player.x,player.y-1)){
            turnOffAlarm();
        }
        player.y--;
    }
    else if(direction === 'down' && canMove(player.x, player.y+1)){
        if(isFinished(player.x,player.y+1)){
            turnOffAlarm();
        } 
        player.y++;
    }
    else if(direction === 'left' && canMove(player.x-1, player.y)){
        if(isFinished(player.x-1,player.y)){
            turnOffAlarm();
        }
        player.x--;
    }
    else if((e.which == 39) && canMove(player.x+1, player.y)){
        if(isFinished(player.x+1,player.y)){
            turnOffAlarm();
        }
        player.x++;
    }
    draw();
    e.preventDefault();
});

draw();
