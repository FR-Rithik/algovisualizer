let array=[];
let speed=[1000,500,300,200,100,50];
let flag=1;
let inc= 0;
function randomArray(){
    array=[];
    for(let i=0;i<20;i++){
    array.push(Math.floor(Math.random() * (100)) + 40);
  }
}
randomArray();
let parentDiv= document.querySelector("#parentDiv");
let btn= document.getElementById("startBtn");
for(let i=0;i<20;i++){
    let childDiv= document.createElement("div");
    childDiv.style.width = "10px";
    //childDiv.style.backgroundColor="red";
    childDiv.classList.add("childDiv");
    const childLab= document.createElement("label");
    childLab.classList.add("label")
    childDiv.appendChild(childLab);
    parentDiv.appendChild(childDiv);
    
}
let child=parentDiv.children;

reformStyle();


function reformStyle(){

    for(let i=0;i<20;i++){
        console.log(array[i]);
    //console.log(child[i]);
    child[i].style.width= "10px";
    //console.log(child[i].style.width)
    child[i].style.height= 3*array[i]+"px";
    child[i].children[0].innerHTML=array[i];
    }
    
}

async function sorting(){
    let smallest;
    let originalColor= child[0].style.backgroundColor;
    for(let i=0;i<20;i++){
        //console.log(child[i]);
        smallest=array[i];
        child[i].style.backgroundColor= "blue";
        child[i].style.color="white";
        for(let j=i+1;j<20;j++){
            if(flag==0){
                child[i].style.backgroundColor= originalColor;
                flag=1;
                return;
            }
            if(array[j]< array[i]){
                
                child[j].style.backgroundColor="red";
                child[j].style.color="white";
                let temp=array[j];
                array[j]=array[i];
                array[i]= temp;
                await new Promise((resolve) => setTimeout(resolve, speed[inc]));
                reformStyle();
                child[j].style.backgroundColor= originalColor;
            }
            else{
                child[j].style.backgroundColor="green";
                child[j].style.color="white";
                await new Promise((resolve) => setTimeout(resolve, speed[inc]));
                child[j].style.backgroundColor= originalColor;
            }
           
        }
        child[i].style.backgroundColor= originalColor;

    }
}
//parentDiv.style.transformOrigin= "0 0"

function stop(){
    flag=0;
    inc=0;
    randomArray();
    console.log("stop");
    reformStyle();
    
}
function increment(){
    inc++
}

