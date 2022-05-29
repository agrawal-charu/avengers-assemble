let video = document.getElementById("video");
let model;

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let can = document.getElementById("can");
let cx = can.getContext("2d");

var move = 0;
var t = null;
document.getElementById("btn").style.display="none";  
let cur=0;
let angle=0;

const glass = ["Glass\\glasses1.png","Glass\\glasses2.png","Glass\\glasses3.png","Glass\\glasses4.png","Glass\\glasses5.png","Glass\\glasses6.png"];
const stones = ["The Power Stone","The Space Stone","The Mind Stone","The Reality Stone","The Soul Stone","The Time Stone"];

const setUpCamera =()=>{
    navigator.mediaDevices
    .getUserMedia({
        video: {width:400, height:200},
        audio:false,
    })
    .then((stream) => {
        video.srcObject = stream;
    });
};

const detectFace = async () => {
    const prediction = await model.estimateFaces(video, false);
    console.log(prediction);
    ctx.drawImage(video, 0,0,400,200);
    prediction.forEach((pred)=>{
        var x1 = pred.landmarks[0][0];
        var y1 = pred.landmarks[0][1];
        var x2 = pred.landmarks[1][0];
        var y2 = pred.landmarks[1][1];
        cur = angle;
        angle = Math.atan2(y2-y1, x2-x1) * 180 / Math.PI; 

        if(angle>5 && angle<15){
           move=1;
        }
        else if (angle>=15){
            move=2;
        }
        else if (angle<-5 && angle>-15){
            move=-1;
        }
        else if(angle<=-15){
            move=-2;
        }
        else{
           move=0;
        }
        
        var im = document.getElementById("image");
        cx.drawImage(im,pred.landmarks[0][0]-(pred.landmarks[1][0]-pred.landmarks[0][0])/2,pred.landmarks[0][1]-(pred.landmarks[2][1]-pred.landmarks[0][1])/2-Math.abs(Math.pow(angle-cur,2))*6,pred.landmarks[1][0]-pred.landmarks[0][0]+pred.landmarks[1][0]-pred.landmarks[0][0],pred.landmarks[2][1]-pred.landmarks[0][1]);        

        cx.clearRect(0,0,400,200);        
        cx.translate(200,100);
        cx.rotate((angle-cur)/180*Math.PI);
        cx.translate(-200,-100);
        cx.drawImage(im,pred.landmarks[0][0]-(pred.landmarks[1][0]-pred.landmarks[0][0])/2,pred.landmarks[0][1]-(pred.landmarks[2][1]-pred.landmarks[0][1])/2-Math.abs(Math.pow(angle-cur,2))*6,pred.landmarks[1][0]-pred.landmarks[0][0]+pred.landmarks[1][0]-pred.landmarks[0][0],pred.landmarks[2][1]-pred.landmarks[0][1]);        
    })
}
setUpCamera();

video.addEventListener("loadeddata",async ()=>{
    model = await blazeface.load();
    document.getElementById("btn").style.display="inline-block";
    var audio = document.getElementById("audio");
    audio.play();
  
})

var total = 6;
var time = null;
var counter = 0;

var block = document.getElementById("block");
var level = document.getElementById("level");

function start(){
    t = setInterval(detectFace,40); 
    document.getElementById("image").src=glass[0];
    counter=0;
    setInterval(checkf,40);
    var time = setInterval(check,1);
    document.getElementById("s").innerHTML=0;
    document.getElementById("l").innerHTML=1;
    document.getElementById("descp").innerHTML=stones[0];    

    for (var i =1;i<=6;i++){
        var id = "s"+i;
        document.getElementById(id).style.opacity=0.2;
    }
    block.style.animationDuration= total+"s";
    block.classList.add("animate");

    level.style.display="block";
    level.classList.add("animatelevel");

    document.getElementById("btn").style.display="none";
    document.getElementById("again").style.display="none";
}

function moveLeft1(){
    character.style.left = 100+"px";
}
function moveLeft2(){
    character.style.left = 0+"px";
}
function moveRight1(){
    character.style.left = 300+"px";
}
function moveRight2(){
    character.style.left = 400+"px";
}
function moveCenter(){
    character.style.left = 200+"px";
}

function checkf(){
    if (move==1){
        moveLeft1();
    }
    else if (move==2){
        moveLeft2();
    }
    else if (move==-1){
        moveRight1();
    }
    else if (move==-2){
        moveRight2();
    }
    else{
        moveCenter();
    }
    
}
block.addEventListener('animationiteration',()=>{
    var random = Math.floor(Math.random()*5);
    left = random*100;
    block.style.left=left+"px";
    
    counter++;
    document.getElementById("s").innerHTML=counter;
    if(counter==2*total){
        over();
    }else{
        var curlevel = parseInt(document.getElementById("l").innerHTML);
        if(counter==curlevel*2){
        curlevel=curlevel+1;
        document.getElementById("descp").innerHTML=stones[curlevel-1];
        document.getElementById("l").innerHTML=curlevel;
        level.style.display="block";
        level.classList.add("animatelevel");        
        var dur = total - (curlevel-1);
        block.classList.remove("animate");
        block.style.animationDuration= dur +"s";
        void block.offsetWidth; 
        block.classList.add("animate");

        var id = "s"+(curlevel-1);
        document.getElementById(id).style.opacity = 1;
        document.getElementById("image").src=glass[curlevel-1];
    }else{
        level.style.display="none";
    }
    }
})
function check (){
    var charleft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var blockleft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var blocktop = parseInt(window.getComputedStyle(block).getPropertyValue("top"));
    var level = parseInt(document.getElementById("l").innerHTML);
    if (charleft==blockleft && blocktop<500 && blocktop>300){
        over();
    }   
}
function over (){
    clearInterval(time);
    clearInterval(t);
    block.classList.remove("animate");
    level.style.display="none";

    if (counter==total*2){
        document.getElementById("text").innerHTML="You Won!";
        document.getElementById("s6").style.opacity=1;
    }else{
        document.getElementById("text").innerHTML="Game over!";
    }
        
    document.getElementById("again").style.display="block";
    document.getElementById("score1").innerHTML=counter;
}

var bt = document.getElementById("music");
var music = document.getElementById("icon");
bt.addEventListener("click", function(){
  if(audio.paused){
    audio.play();
    icon.style.opacity=1;
  } else {
    audio.pause();
    icon.style.opacity=0.5;
  }
});
