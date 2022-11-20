var myGamePiece;

function startGame() {
    blocker = new component(40,80,"blue",300,0);
    rl = new component(40,80,"blue",300,0);
    rla = new component(40,80,"white",180,0);
    rlb = new component(40,80,"white",180,150);
    rlc = new component(40,80,"white",180,300);
    rld = new component(40,80,"white",180,450);
    rle = new component(40,80,"white",180,600);
    rlf = new component(40,80,"white",180,750);
    myGamePiece = new component(40, 80, "red", 70, 800);
    
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 400;
        this.canvas.height = 900;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
          })
          window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
          })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;    
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -1; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 1; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -1; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 1; }
    rl.update();
    rla.update();
    rlb.update();
    rlc.update();
    rld.update();
    rle.update();
    rlf.update();
    myGamePiece.newPos();
    myGamePiece.update();
    blocker.y += 5;
    blocker.update();
  
}

function moveup() {
    myGamePiece.speedY -= 2;
  }
  
  function movedown() {
    myGamePiece.speedY += 2;
  }
  
  function moveleft() {
    myGamePiece.speedX -= 2;
  }
  
  function moveright() {
    myGamePiece.speedX += 2;
  }