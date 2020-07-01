var canvas = document.querySelector('#canvas-bg');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
var ar = [];
var maxCirc = 2000;
var speed = 2;

function Circle(x,y,dx,dy,rad){
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.dx = dx;
    this.dy = dy;

    this.red = randInt(0,255);
    this.green = randInt(0,255);
    this.blue = randInt(0,255);

    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,rad,0,Math.PI * 2,false);
        c.fillStyle = 'rgba('+this.red+','+this.green+','+this.blue+',1)';
        c.fill();
    }

    this.update = function(){
        if(this.x+this.rad > canvas.width || this.x-this.rad < 0){
            this.dx = -this.dx;
        }else if(this.y + this.rad > canvas.height || this.y - this.rad < 0){
            this.dy = -this.dy;
        }

        this.x+= this.dx;
        this.y+= this.dy;

        this.draw();
    }
}
function randInt(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);

    for(var i=0;i<ar.length;i++){
        ar[i].update();
    }
}
animate();

for(var i=0; i<maxCirc;i++){
    var x = randInt(0,canvas.width),
        y = randInt(0,canvas.height),
        dx = randInt(-speed,speed),
        dy = randInt(-speed,speed),
        rad = randInt(2,4);
    ar.push(new Circle(x,y,dx == 0 ? 1 : dx,dy == 0 ? 1 : dy,rad));
}