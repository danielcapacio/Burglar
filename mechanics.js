var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[2]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        for (var i = 0; i < downItems.length; i++) {
            resetItem(downItems[i]);
        }
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}
var player;
var continueAnimating = false;
var itemWidth = 80;
var itemHeight = 50;
var downs = 11;
var downItems = [];
for (var i = 0; i < downs; i++) {
    addDownItem();
}

function startGame() {
    player = new component(80, 50, "police-car.png", 20, 230, "image", 0, 0);
    myGameArea.start();
}
function component(width, height, color, x, y, type, speedX, speedY) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = speedX;
    this.speedY = speedY;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
}
function updateGameArea() {
    myGameArea.clear();
    drawAll();
    if (!continueAnimating) {
        continueAnimating = true;
        animate();
    };
    player.newPos();
    player.update();
}

function moveleft() {
    player.speedX = -2; 
}

function moveright() {
    player.speedX = 2; 
}

function moveup() {
    player.speedY = 2; 
}

function movedown() {
    player.speedY = -2; 
}

function clearmove() {
    player.speedX = 0; 
    player.speedY = 0; 
}

//Add Cars 
function addDownItem() {
    var item = {
        width: itemWidth,
        height: itemHeight
    }
    resetItem(item);
    downItems.push(item);
}
function resetItem(item) {
    item.x = itemWidth + (Math.random() * (myGameArea.canvas.width - itemWidth));
    item.y = 0;
    item.speed = 1 + Math.random() * 0.5;
}
function animate() {
    if (continueAnimating) {
        requestAnimationFrame(animate);
    }
    for (var i = 0; i < downItems.length; i++) {
        var item = downItems[i];
        if (isColliding(item, player)) {
            resetItem(item);
            myGameArea.stop();
			continueAnimating=false;
            alert("you lose");
            //set to lose 
        }
        item.y += item.speed;
        if (item.y > myGameArea.canvas.height) {
            resetItem(item);
            //reverse direction
        }
    }
    drawAll();
}

function isColliding(a, b) {
    return !(
    b.x > a.x + a.width || b.x + b.width < a.x || b.y > a.y + a.height || b.y + b.height < a.y);
}

function drawAll() {
    for (var i = 0; i < downItems.length; i++) {
        var item = downItems[i];
        var itemimg = new Image();
        itemimg.src = "collision-car-blue.png";
        myGameArea.context.drawImage(itemimg, 
                item.x, 
                item.y,
                item.width, item.height);
    }
}
