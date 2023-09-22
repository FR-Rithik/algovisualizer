class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.svgCircle = null;
    this.svgText = null;
    this.svgLine=null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;

    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          break;
        }
        current = current.left;
      } else if (value > current.value) {
        if (!current.right) {
          current.right = newNode;
          break;
        }
        current = current.right;
      } else {
        // Value already exists in the tree
        return;
      }
    }
  }

  createSVGElement(tagName, attributes = {}) {
    const element = document.createElementNS(
      "http://www.w3.org/2000/svg",
      tagName
    );
    Object.entries(attributes).forEach(([key, value]) =>
      element.setAttribute(key, value)
    );
    return element;
  }

  createCircle(value, x, y) {
    const circle = this.createSVGElement("circle", {
      cx: x,
      cy: y,
      r: 20,
      class: "node",
    });

    const text = this.createSVGElement("text", {
      x,
      y: y + 5,
      "text-anchor": "middle",
      "alignment-baseline": "middle",
    });
    text.textContent = value;

    return [circle, text];
  }

  createLine(x1, y1, x2, y2) {
    return this.createSVGElement("line", {
      x1,
      y1,
      x2,
      y2,
      class: "line",
    });
  }

  visualize() {
    const svg = document.getElementById("tree-svg");
    svg.innerHTML = "";

    const self = this;

    function traverse(node, x, y, level) {
      if (node) {
        const [circle, text] = self.createCircle(node.value, x, y);
        node.svgCircle = circle;
        node.svgText = text;
        svg.appendChild(circle);
        svg.appendChild(text);

        if (node.left) {
          const line = self.createLine(
            x,
            y + 20,
            x - 200 / Math.pow(2, level),
            y + 80
          );
          node.svgLine=line;
          svg.appendChild(line);
          traverse(
            node.left,
            x - 200 / Math.pow(2, level),
            y + 80,
            level + 1
          );
        }

        if (node.right) {
          const line = self.createLine(
            x,
            y + 20,
            x + 200 / Math.pow(2, level),
            y + 80
          );
          svg.appendChild(line);
          traverse(
            node.right,
            x + 200 / Math.pow(2, level),
            y + 80,
            level + 1
          );
        }
      }
    }

    traverse(this.root, 400, 50, 1);
  }

  async search(value) {
    //const svg = document.getElementById("tree-svg");

    if (this.root === null) return;

    let current = this.root;

    while (current) {
      // Delay for 1 second
      let currentColor=current.svgCircle.style.fill;
      current.svgCircle.style.fill="green";
      await new Promise(resolve => setTimeout(resolve, 300)); 
      //console.log(currentColor);
      if (value < current.value) {
        current.svgCircle.style.fill=currentColor;
        current = current.left;
      } else if (value > current.value) {
        current.svgCircle.style.fill=currentColor;
        current = current.right;
      } else {
        current.svgCircle.style.fill="red";
        return; // Value found in the tree
      }
      
      //setTimeout(loop, 300);
      
    }
  }

  //deleting Element
  async delete(value){
    if (this.root === null) return;

    let current = this.root;
    let keyPrev=this.root;

    while(current){
          let currentColor=current.svgCircle.style.fill;
      current.svgCircle.style.fill="green";
      await new Promise(resolve => setTimeout(resolve, 300)); 
      //console.log(currentColor);
      if (value < current.value) {
        keyPrev= current;
        current.svgCircle.style.fill=currentColor;
        current = current.left;
      } else if (value > current.value) {
        keyPrev=current
        current.svgCircle.style.fill=currentColor;
        current = current.right;
      } else {
        //console.log(keyPrev.value);
        let currentTemp= current;
        let prev= current;
        current.svgCircle.style.fill="red";
        await new Promise(resolve => setTimeout(resolve, 300)); 
      if(!current.left && !current.right){
        if(keyPrev.left.value== current.value) keyPrev.left=null;
        else keyPrev.right=null;
      }
      else if(current.left && !current.right){
        current.left.svgCircle.style.fill="yellow";
        await new Promise(resolve => setTimeout(resolve, 300)); 
        if(keyPrev.left.value== current.value) keyPrev.left=current.left;
        else keyPrev.right=current.left;
        }
      else if(current.right && !current.left){
        current.right.svgCircle.style.fill="yellow";
        await new Promise(resolve => setTimeout(resolve, 300)); 
        if(keyPrev.left.value== current.value) keyPrev.left=current.right;
        else keyPrev.right=current.right;
          
        }
        else{
          //current.left=null;
          let prev= current;
          current.left.svgCircle.style.fill="yellow";
          await new Promise(resolve => setTimeout(resolve, 300)); 
          current= current.left;
          while(current.right){
            console.log(current.value);
            current.svgCircle.style.fil="yellow";
            await new Promise(resolve => setTimeout(resolve, 300)); 
            prev= current;
            current= current.right;
          }
          console.log(current.value+" "+currentTemp.value+" "+currentTemp.left.value);
          if(currentTemp.left.value == current.value){
            console.log("ekhane");
            currentTemp.value= current.value;
            currentTemp.left=current.left;
          }
          else{
          console.log("here: ");
          console.log(current.value+"prev: "+prev.value);
          current.svgCircle.style.fill="yellow";
          await new Promise(resolve => setTimeout(resolve, 300)); 
          currentTemp.value= current.value;
          prev.right= current.left;
          }
          
          
          //delete current;
        }
        await new Promise(resolve => setTimeout(resolve, 300)); 
        this.visualize();
        return; // Value found in the tree
      }
    }

  }
}

const bst = new BinarySearchTree();

// Insert values into the tree
bst.insert(100);
bst.insert(50);
bst.insert(25);
bst.insert(75);
bst.insert(12);
bst.insert(30);
bst.insert(80);

// Visualize the initial tree
bst.visualize();
//funciton for deleting
function deleteNode(){
  const value = parseInt(document.getElementById("userInput").value);
  bst.delete(value);
}

// Event handler for inserting a value
function handleInsert() {
  const value = parseInt(document.getElementById("userInput").value);
  bst.insert(value);
  bst.visualize();
  document.getElementById("userInput").value = "";
}

// Event handler for searching a value
function handleSearch() {
  const value = parseInt(document.getElementById("userInput").value);
  bst.search(value);
  document.getElementById("userInput").value = "";
}

// Attach event listeners to buttons
document.getElementById("inputButton").addEventListener("click", handleInsert);
document.getElementById("searchButton").addEventListener("click", handleSearch);
document.getElementById("userInput").addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    handleInsert();
  }
});
