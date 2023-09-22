//<![CDATA[


const sorting = document.querySelector(".sorting");
const treeTraverse = document.querySelector(".treeTraversal");
const linklist = document.querySelector(".linklist");
const bst = document.querySelector(".bst");
const imageList= document.querySelector(".imageLinkList");

//buttons height and width
const boxHeight = 250;
const boxWidth = 250;
sorting.style.height = boxHeight + "px";
sorting.style.width = boxWidth + "px";
treeTraverse.style.height = boxHeight + "px";
treeTraverse.style.width = boxWidth + "px";
linklist.style.height = boxHeight + "px";
linklist.style.width = boxWidth + "px";
bst.style.height = boxHeight + "px";
bst.style.width = boxWidth + "px";

// Sorting box
const sortingBox = document.createElement("div");
sortingBox.classList.add("sortingBox");
sortingLabelUp = document.createElement("div");
sortingLabelUp.classList.add("sortingLabelUp");
sortingBox.style.height = (2 * boxHeight) / 3 + "px";
sortingBox.style.width = boxWidth - 50 + "px";

//buttonBox
const buttonBox = document.createElement("div");
const insertionBtn = document.createElement("div");
const margeBtn = document.createElement("div");
buttonBox.classList.add("buttonBox");
//creating Button

insertionBtn.classList.add("insertionBtn");
margeBtn.classList.add("margeBtn");
insertionBtn.innerHTML = "Selection";
margeBtn.innerHTML = "Marge";
console.log(insertionBtn.style.width);
margeBtn.style.width = insertionBtn.style.width;
buttonBox.appendChild(insertionBtn);
buttonBox.appendChild(margeBtn);
let sortingArr = [];

//adding the upper label
sorting.appendChild(sortingLabelUp);
//const sortingBoxHeight=
function createArray() {
  sortingArr = [];
  for (let i = 0; i < 8; i++)
    sortingArr.push(Math.floor(Math.random() * 150) + 1);
  for (let i = 0; i < 8; i++) {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    sortingBox.appendChild(bar);
  }

  sorting.appendChild(sortingBox);

  visualizeSorting();
}
// Visualizing the array
function visualizeSorting() {
  //await new Promise((resolve) => setTimeout(resolve,200));
  for (let index = 0; index < sortingArr.length; index++) {
    sortingBox.children[index].style.height = sortingArr[index] + "px";
  }
}

// First visualization
createArray();

// Visualization after hovering
const tempHeight = parseInt(getComputedStyle(sortingBox).height);
function arraySort() {
  console.log("height" + tempHeight);
  sortingArr.sort((a, b) => a - b);
  visualizeSorting();
  //taking new set of array
  sortingArr = [];
  for (let i = 0; i < 8; i++)
    sortingArr.push(Math.floor(Math.random() * 150) + 1);
}
const sortingLabelDown = document.createElement("div");
sortingLabelDown.classList.add("sortingLabelDown");
sortingLabelDown.innerHTML = "Sorting";
sorting.appendChild(sortingLabelDown);
sorting.appendChild(buttonBox);
sorting.onmouseenter = function () {
  sorting.style.cursor="pointer";
  arraySort();
  sortingLabelUp.innerHTML = "Select Any...";
};
sorting.onmouseleave = function () {
  visualizeSorting();
  sortingLabelUp.innerHTML = "";
};
insertionBtn.onclick = function () {
  window.location.href = "../insertionSort/insertionsort.html";
};
margeBtn.onclick = function () {
  window.location.href = "../margesort/margeSort.html";
};
//sorting button close

//tree traverse start

const ttBox = document.createElement("div");
const ttLabel = document.createElement("label");
const ttLabelUp = document.createElement("label");
ttLabelUp.classList.add("ttLabelUp");
ttLabel.classList.add("ttLabel");
ttLabel.innerHTML = "Tree Traverse";
ttBox.style.height = boxHeight - 50 + "px";
ttBox.style.width = boxWidth - 50 + "px";
ttBox.classList.add("ttBox");
const ttBoxHeight = parseInt(ttBox.style.height);
const ttBoxWidth = parseInt(ttBox.style.width);
console.log(ttBoxHeight + " " + ttBoxWidth);
for (let rw = 0; rw < 7; rw++) {
  const row = document.createElement("div");
  row.classList.add("ttRow");
  for (let cl = 0; cl < 7; cl++) {
    const col = document.createElement("div");
    col.classList.add("ttCol");
    col.innerHTML = rw + 1 + ", " + (cl + 1);
    col.style.height = (ttBoxHeight - 20) / 7 + "px";
    col.style.width = ttBoxWidth + "px";
    //col.style.backgroundColor = "#FF6347";

    row.appendChild(col);
  }
  ttBox.appendChild(row);
}

treeTraverse.appendChild(ttLabelUp);
treeTraverse.appendChild(ttBox);
treeTraverse.appendChild(ttLabel);
console.log(treeTraverse.children);
let counter = 0;

function ttVisualize() {
  console.log("counter " + counter);

  let x1 = 7,
    y1 = 7,
    x2 = 0,
    y2 = 0;
  while (x1 >= 4) {
    x1 = Math.floor(Math.random() * 7) + 1;
  }
  while (y1 >= 4) {
    y1 = Math.floor(Math.random() * 7) + 1;
  }
  while (x2 <= 4) {
    x2 = Math.floor(Math.random() * 7) + 1;
  }
  while (y2 <= 4) {
    y2 = Math.floor(Math.random() *7) + 1;
  }

  console.log("x1 " + x1 + " y1 " + y1 + " x2 " + x2 + " y2 " + y2);
  const prevColor = ttBox.children[0].children[0].style.backgroundColor;
  const rowTraverse = ttBox.children[y1 - 1].children;
  console.log(rowTraverse.length);
  let i = x1; // Variable to control the iteration
  rowTraverse[x1 - 1].style.backgroundColor = "#00FF00";
  ttBox.children[y2 - 1].children[x2 - 1].style.backgroundColor = "#00FF00";

  function traverseX() {
    if (i <= x2) {
      console.log("time traverse");
      rowTraverse[i - 1].style.backgroundColor = "#FF6347";
      setTimeout(function () {
        //if(i!=x1)
        rowTraverse[i - 1].style.backgroundColor = prevColor;
        // else  rowTraverse[i - 1].style.backgroundColor = "#00FF00";
        i++;
        console.log("go" + i + " " + x2);
        traverseX(); // Call the next iteration
      }, 100);
    } else {
      console.log("traverseX completed");
      traverseY(); // Call traverseY after traverseX is completed
    }
  }
  traverseX(); // Start the first iteration

  let j = y1; // Variable to control the iteration

  function traverseY() {
    if (j <= y2) {
      ttBox.children[j - 1].children[x2 - 1].style.backgroundColor = "#FF6347";
      setTimeout(function () {
        ttBox.children[j - 1].children[x2 - 1].style.backgroundColor =
          prevColor;
        j++;
        traverseY(); // Call the next iteration
      }, 100);
    }
  }
  //rowTraverse[x1-1].style.backgroundColor=prevColor;
  //ttBox.children[y2 - 1].children[x2 - 1].style.backgroundColor = prevColor;
  counter++;
}
let interInterval;

treeTraverse.onmouseenter = function () {
  ttVisualize();
  ttLabelUp.innerHTML = "Click Here...";
  interInterval = setInterval(ttVisualize, 1500);
};
treeTraverse.onmouseleave = function () {
  ttLabelUp.innerHTML = "";
  clearInterval(interInterval);
};
treeTraverse.onclick = function () {
  window.location.href = "../Treetraversal/html.html";
};



//
//Linklist
const linkListLabelUp= document.querySelector(".linkListLabelUp");
const linkListLabelDown= document.getElementsByClassName("linkListLabelDown");

linkListLabelUp.style.height=20+"px";

imageList.style.height=(boxHeight-50)+"px";
imageList.style.width=(boxWidth-50) +"px";
imageList.style.backgroundColor="black";

linklist.onclick= function(){
   window.location.href = "../linklist/linklist.html";
}
linklist.onmouseenter= function(){
  linkListLabelUp.innerHTML="Click here...";
}
linklist.onmouseleave= function(){
  linkListLabelUp.innerHTML="";
}

//bst starting

const svgNS = "http://www.w3.org/2000/svg";
const svgContainer = document.createElementNS(svgNS, "svg");
const circles = [];
svgContainer.classList.add("svgContainer");
svgContainer.setAttribute("height", boxHeight - 50 + "px");
svgContainer.setAttribute("width", boxWidth - 50 + "px");
const bstLabelUp= document.createElement("label");
bstLabelUp.classList.add("bstLabelUp");
bst.appendChild(bstLabelUp);

// Create a circle
function createCircle(x, y, r) {
  const circle = document.createElementNS(svgNS, "circle");
  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
  circle.setAttribute("r", r);
  circle.setAttribute("fill", "#333");
  svgContainer.appendChild(circle);
  circles.push(circle);
}

// Creating a line
function createLine(x1, y1, x2, y2) {
  const line = document.createElementNS(svgNS, "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", "white");
  svgContainer.appendChild(line);
}
let lines = [];
let index = 0;
function createBinaryTree() {
  lines[index] = createLine("50%", "10%", "35%", "40%");
  lines[index] = createLine("50%", "10%", "65%", "40%");
  createCircle("50%", "10%", 13);
  index++;
  lines[index] = createLine("35%", "40%", "25%", "70%");
  lines[index] = createLine("35%", "40%", "45%", "70%");
  createCircle("35%", "40%", 13);
  index++;
  lines[index] = createLine("65%", "40%", "60%", "70%");
  lines[index] = createLine("65%", "40%", "75%", "70%");
  createCircle("65%", "40%", 13);
  createCircle("25%", "70%", 13);
  createCircle("45%", "70%", 13);
  createCircle("60%", "70%", 13);
  createCircle("75%", "70%", 13);
}
bst.appendChild(svgContainer);


// adding the lower label

const bstLabelDown= document.createElement("label");
bstLabelDown.classList.add("bstLabelDown");
bstLabelDown.innerHTML="Binary Search Tree";
bst.appendChild(bstLabelDown);
//visualizing tree
function visualizeTree() {
  let rndm1,rndm2,rndm3;
  //
  console.log(svgContainer.children[2]); 
  svgContainer.children[2].setAttribute("fill", "white");
  setTimeout(() => {
     svgContainer.children[2].setAttribute("fill", "#333");
  }, 300);


  //
  rndm1 = Math.floor(Math.random() * 2) + 1;
  setTimeout(() => {
    
    
    circles[rndm1].setAttribute("fill", "white");
  }, 300);
  
  setTimeout(() => {
    circles[rndm1].setAttribute("fill", "#333");
  }, 600);
  

  //
  if(rndm1==1)
  rndm2 = Math.floor(Math.random() *2) + 3;
  else rndm2 = Math.floor(Math.random() *2) + 5;
  setTimeout(() => {
    console.log("rndm1"+rndm1+" "+"2"+rndm2);
    circles[rndm2].setAttribute("fill", "white");
  }, 600);
  
  setTimeout(() => {
    circles[rndm2].setAttribute("fill", "#333");
  }, 900);
  
}
createBinaryTree();
// Variables to store interval ID
let intervalId;

// Start interval when mouse is over the div
bst.onmouseenter= function () {
  bst.style.cursor="pointer";
  bstLabelUp.innerHTML="Click here...";
  intervalId = setInterval(visualizeTree, 1000); // Call function every 1 second
};

// Stop interval when mouse leaves the div
bst.onmouseleave = function () {
  bstLabelUp.innerHTML="";
  clearInterval(intervalId); // Clear the interval using its ID
};

//directing the link
bst.onclick= function(){
  window.location.href = "../binarySearchTree/bst.html";
} 

//]]>
