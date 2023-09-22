let visDiv = document.querySelector(".visDiv");

let array=[];
let n=16;
//parentSecCou is the num of boxes for counting the number of array entering each recursion
let parentSecCou = 1;
console.log("log"+Math.log2(n));
//generating the array
function generateArray(){
  array=[];
  for(let i=0;i<16;i++){
    array.push(Math.floor(Math.random() * (50)) + 15);
  }
}
//creating the visual Div with inner Div
for (let i = 0; i <= Math.log2(n); i++) {

  //generateArray();
  //creating the outer horizontal boxes
  let parentFirst = document.createElement("div");
  parentFirst.classList.add("parentFirst");

  //let childCou = 8;
  let prevCou = 0;

  for (let j = 0; j < parentSecCou; j++) {
    let parentSecond = document.createElement("div");
    parentSecond.classList.add("parentSecond");

    for (let k = 0; k < n / parentSecCou; k++) {
      let childDiv = document.createElement("div");
      childDiv.classList.add("childDiv");
      childDiv.style.width=(window.innerWidth)/35 + "px"
      childDiv.style.height= 45+"px";
      let label = document.createElement("label");
      //label.innerHTML = childCou;
      label.style.textAlign = "center";
      childDiv.appendChild(label);
      parentSecond.appendChild(childDiv);

      //childCou--;
    }
    parentSecond.style.width= (window.innerWidth-800)/(parentSecCou) + "px";
    parentFirst.appendChild(parentSecond);
  }

  visDiv.appendChild(parentFirst);

  parentSecCou *= 2; //Incrementing the parentSecCou for the next iteration
}


// Visualizing an array
function createArray(){
  generateArray();
  let arrayVisual= visDiv.children[Math.log2(n)].children;
  for(let i=0;i<16;i++){
    arrayVisual[i].children[0].children[0].innerHTML=array[i];
    arrayVisual[i].children[0].style.height=array[i]+"px";
    console.log(arrayVisual[i].children[0].children[0])
  }
}

//sorting

async function sorting() {
 // let visDiv = document.querySelector(".visDiv");
  let firstChild = visDiv.children;

  for (let i = firstChild.length - 1; i > 0; i--) {
    //firstChild[i].style.backgroundColor = "white";

    // Delay the loop for 1 second
    await new Promise((resolve) => setTimeout(resolve,100));

    let arr1 = firstChild[i].children;
    let arr2= firstChild[i-1].children;

    //console.log(arr1.length+" "+arr2.length);
    for (let j = 0; j < arr2.length; j++) { 
      console.log(arr2[j].children.length);

      //for (let k = 0; k < arr2[j].children.length; k++) {
      //
        let k1=0, k2=0,k=0;
        while(k1<arr1[2*j].children.length && k2<arr1[2*j+1].children.length){

          //getting the original background color of the innermost div
          let originalColor1= arr1[j*2 + 1].children[k2].style.backgroundColor;
          let originalColor2= arr1[j*2].children[k1].style.backgroundColor;
          let originalColor3=  arr2[j].children[k].style.backgroundColor;

          //giving blue to the position 
          arr2[j].children[k].style.backgroundColor="blue";
          arr1[j*2 + 1].children[k2].style.backgroundColor="red";
          arr1[j*2].children[k1].style.backgroundColor="red";

          //comparing the innerHTMLs
          if (parseInt(arr1[2*j].children[k1].children[0].innerHTML) > parseInt(arr1[2*j + 1].children[k2].children[0].innerHTML)) {
            arr2[j].children[k].children[0].innerHTML=arr1[j*2 + 1].children[k2].children[0].innerHTML;

            //height of the div
            arr2[j].children[k].style.height=parseInt(arr1[2*j + 1].children[k2].children[0].innerHTML)+"px";
            //arr1[j*2].children[k2].style.backgroundColor=originalColor2;
            await new Promise((resolve) => setTimeout(resolve,100));
            arr2[j].children[k].style.backgroundColor=originalColor1;
            arr1[j*2 + 1].children[k2].style.backgroundColor=originalColor2;
            arr1[j*2].children[k1].style.backgroundColor=originalColor3;

            k2++;
          }
          else{
            arr2[j].children[k].children[0].innerHTML=arr1[j*2].children[k1].children[0].innerHTML;

            //height of the div
            arr2[j].children[k].style.height=parseInt(arr1[2*j].children[k1].children[0].innerHTML)+"px";

            await new Promise((resolve) => setTimeout(resolve,100));
            //arr1[j*2+1].children[k2].style.backgroundColor= originalColor1;
            arr2[j].children[k].style.backgroundColor=originalColor1;
            arr1[j*2 + 1].children[k2].style.backgroundColor=originalColor1;
            arr1[j*2].children[k1].style.backgroundColor=originalColor3;

            k1++;
          }
          k++;

          //arr2[j].children[k].style.backgroundColor= originalColor3;
          
        }
       while(k1<arr1[2*j].children.length){
        let originalColor3=  arr2[j].children[k].style.backgroundColor;
        let originalColor2= arr1[j*2].children[k1].style.backgroundColor;

        arr2[j].children[k].style.backgroundColor="blue";
        arr1[j*2].children[k1].style.backgroundColor="red";
        arr2[j].children[k].children[0].innerHTML=arr1[j*2].children[k1].children[0].innerHTML;
        
        //changing height
        arr2[j].children[k].style.height=parseInt(arr1[j*2].children[k1].children[0].innerHTML)+"px";
        await new Promise((resolve) => setTimeout(resolve,100));
        arr2[j].children[k].style.backgroundColor= originalColor3;
        arr1[j*2].children[k1].style.backgroundColor=originalColor2;
        k1++;
        k++;
        
       } 
       while(k2<arr1[2*j+1].children.length){
         let originalColor3=  arr2[j].children[k].style.backgroundColor;
         let originalColor1= arr1[j*2 + 1].children[k2].style.backgroundColor;

         arr2[j].children[k].style.backgroundColor="blue";
         arr1[j*2 + 1].children[k2].style.backgroundColor="red";
         
         arr2[j].children[k].children[0].innerHTML=arr1[j*2+1].children[k2].children[0].innerHTML;
        //changing height
         arr2[j].children[k].style.height=parseInt(arr1[j*2+1].children[k2].children[0].innerHTML)+"px";

         await new Promise((resolve) => setTimeout(resolve,100));
         arr2[j].children[k].style.backgroundColor= originalColor3;
         arr1[j*2 + 1].children[k2].style.backgroundColor=originalColor1;
         k2++;
         k++;
         
       }
       //console.log(arr2[Math.floor(j)].children[k].children[0].innerHTML);

       

        //delaying the loop
        await new Promise((resolve) => setTimeout(resolve,100));
      //}
    }
  }
  //final sorted array color
  for(let i=0;i<16;i++){
    firstChild[0].children[0].children[i].style.backgroundColor="#00ffff";
    firstChild[0].children[0].style.borderColor="#00ffff";
    firstChild[0].children[0].children[i].children[0].style.color="black";
    firstChild[0].children[0].children[i].style.height= 2*parseInt(firstChild[0].children[0].children[i].children[0].innerHTML)+"px";
  }
}


