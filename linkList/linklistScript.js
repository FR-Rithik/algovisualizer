function generateRandomHex(length) {
    const characters = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return '0x' + result;
  }
let nodes=[];
//creating Linklist
class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
}

class LinkedList {
    //let prev="iyg";
    constructor() {
      this.head = null;
      this.pointer = null; // Initializing the pointer to null
      this.object = { key: "value" }; // Object to be pointed to
      this.prev=generateRandomHex(8);
    }
    addNode(value) {
      this.prev=generateRandomHex(8);
      const newNode = new Node(value);
      
      if (!this.head) {
        this.head = newNode;
      } else {
        let current = this.head;
        while (current.next) {
          current = current.next;
          this.pointer = current; // Assigning the object to the pointer
        }
        current.next = newNode;
      }
      
      showNode(value,this.prev);
    }
    findNode(){
        let prev= this.head;
        if(prev.next!=null){
            let current= prev.next;
            while (current.next) {
                current = current.next;
            }
            CreateNode(current.value,this.prev);
        }
        else CreateNode(prev.value,5);
    }
    findKeyNode(key){
      console.log(key);
      let prev= this.head;
      let index=0;
      let current= prev;
            while (current.next) {
              console.log("cr"+current.value);
              if(current.value==key){
                searchDone(index);
                return;
              }
                current = current.next;
                index++;
            }
            return 0;
    }
}
const linkedList = new LinkedList();
//
//
//start from here
let container = document.querySelector(".container");
let input = document.querySelector(".inputElement");

//button
function addItem(Linklist){
    linkedList.findNode();
    let value=Math.floor(Math.random() * 11+10);
    linkedList.addNode(value);
}

//showing the input
function showNode(value, add) {
    input.children[0].children[0].children[0].innerHTML=value;
    input.children[0].children[0].children[1].innerHTML=add;
}

//visualizing the inputs
function visualizeInput(){
// putting address and item in a single div
  let listItem= document.createElement("div");
  let node = document.createElement("div");
  let address = document.createElement("div");
  let item = document.createElement("div");

  listItem.classList.add("listItem");
  address.classList.add("address");
  node.classList.add("node");
  item.classList.add("item");

  //item.innerHTML= value;
  //address.innerHTML= add;

  node.appendChild(item);
  node.appendChild(address);
  listItem.appendChild(node);

  input.appendChild(listItem);

  let value=Math.floor(Math.random() * 11+10);
  linkedList.addNode(value);

}
visualizeInput();


//adding in the main LinkList
let prev= null;
function CreateNode(value, next) {
  let listItem = document.createElement("div");

  // putiing address and item in a single div
  let node = document.createElement("div");
  let address = document.createElement("div");
  let item = document.createElement("div");

  let line=document.createElement("div");
  let label1 = document.createElement("label");
  let label2 = document.createElement("label");
  let addressText=document.createElement("div");
  let itemText=document.createElement("div");

  line.classList.add("line");
  listItem.classList.add("listItem");
  address.classList.add("address");
  node.classList.add("node");
  item.classList.add("item");
  label1.classList.add("label");
  label2.classList.add("label");
  addressText.classList.add("innerText");
  itemText.classList.add("innerText");

 
  label1.innerHTML="Element";
  label2.innerHTML="Next Address";
  
  itemText.innerHTML=value;
  addressText.innerHTML="next";

  item.appendChild(label1);
  address.appendChild(label2);
  item.appendChild(itemText);
  address.appendChild(addressText);
  node.appendChild(item);
  node.appendChild(address);
  listItem.appendChild(node);

  nodes.push(item);
  container.appendChild(listItem);
  container.appendChild(line);

  if (prev) {
    prev.children[1].children[1].innerHTML = next;
  }
  prev=node;
}
//CreateNode(10,20);


function searchNow(key){
  linkedList.findKeyNode(key);
}
//seach done function

function searchDone(value){
  console.log(value+"value");
  // console.log(value+" tir "+items[value]);
  nodes[value].style.backgroundColor= "red";
}

//key
function nodeSearch() {
  const value = parseInt(document.getElementById("inputBox").value);
  document.getElementById("inputBox").value = "hi";
  searchNow(value);
}

document.getElementById("searchBtn").addEventListener("click", nodeSearch);