var myGamePiece;

function startGame() {
    blocker = new component(80,140,"blue",300,0);
    blockerb = new component(80,140,"yellow",70,0);
    rl = new component(40,80,"blue",300,0);
    rla = new component(40,80,"white",180,0);
    rlb = new component(40,80,"white",180,150);
    rlc = new component(40,80,"white",180,300);
    rld = new component(40,80,"white",180,450);
    rle = new component(40,80,"white",180,600);
    rlf = new component(40,80,"white",180,750);
    myGamePiece = new component(80, 140, "red", 70, 750);
    
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 400;
        this.canvas.height = 900;
        this.canvas.style.cursor = "none";
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

    },
    stop: function() {
        clearInterval(this.interval);
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
    this.crashWith = function(blocker) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = blocker.x;
        var otherright = blocker.x + (blocker.width);
        var othertop = blocker.y;
        var otherbottom = blocker.y + (blocker.height);
        var crash = true;
        if ((mybottom < othertop) ||
        (mytop > otherbottom) ||
        (myright < otherleft) ||
        (myleft > otherright)) {
          crash = false;
        }
        return crash;
      }
      this.crashWithb = function(blockerb) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = blockerb.x;
        var otherright = blockerb.x + (blockerb.width);
        var othertop = blockerb.y;
        var otherbottom = blockerb.y + (blockerb.height);
        var crash = true;
        if ((mybottom < othertop) ||
        (mytop > otherbottom) ||
        (myright < otherleft) ||
        (myleft > otherright)) {
          crash = false;
        }
        return crash;
      }
}

function updateGameArea() {
    if (myGamePiece.crashWith(blocker) || myGamePiece.crashWithb(blockerb)) {
        myGameArea.stop();
      } else {
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -6; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 6; }
    rla.update();
    rlb.update();
    rlc.update();
    rld.update();
    rle.update();
    rlf.update();
    myGamePiece.newPos();
    myGamePiece.update();
    let blockerspeed = 0;
    blocker.y += blockerspeed;
    let blockerspeedb = 0;
    blockerb.y += blockerspeedb;
    if (blockerb.y > 900) {
        score++;
        scorebox.innerHTML = score;
        blockerb.y = -10;
        blockerb.x = Math.random() * (400 - 0);
    }
    if (blocker.y > 900) {
        blocker.y = -10;
        blocker.x = Math.random() * (400 - 0);
    }
    blocker.update();
    blockerb.update();
}

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

let score = 0;

const scorebox = document.getElementById("score");


function easy() {
  blockerspeed = 5;
}