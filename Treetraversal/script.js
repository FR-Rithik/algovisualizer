const graphContainer = document.getElementById('graph-container');
 let flag=1;
// Create a graph using adjacency list representation
function createRandomTree(nodes) {
  const tree = {
    nodes: [],
    edges: [],
  };

  // Create root node
  tree.nodes.push({ id: 0 });

  // Create child nodes and edges
  for (let i = 1; i < nodes; i++) {
    const parentId = Math.floor(Math.random() * i);
    tree.nodes.push({ id: i });
    tree.edges.push({ source: parentId, target: i });
  }

  return tree;
}


let graph={
  nodes: [],
  edges: [],
};

// Function to visualize the graph
function visualizeGraph(){
  while (graphContainer.firstChild) {
    graphContainer.removeChild(graphContainer.firstChild);
  }
  graph={
    nodes: [],
    edges: [],
  };
  graph= createRandomTree(12);
  const svgNS = "http://www.w3.org/2000/svg";
  const nodeRadius = 20;
  const horizontalSpacing = 200;
  const verticalSpacing = 80;
  const svgContainer = document.createElementNS(svgNS, 'svg');
  svgContainer.setAttributeNS(null, 'width', '100%');
  svgContainer.setAttributeNS(null, 'height', '100%');
  graphContainer.appendChild(svgContainer);

  // Helper function to create SVG circle element
  function createCircle(cx, cy) {
    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttributeNS(null, 'cx', cx);
    circle.setAttributeNS(null, 'cy', cy);
    circle.setAttributeNS(null, 'r', nodeRadius);
    circle.setAttributeNS(null, 'fill', '#333');
    circle.setAttributeNS(null, 'stroke', '#333');
    circle.setAttributeNS(null, 'stroke-width', '2');
    return circle;
  }

  // Helper function to create SVG text element
  function createText(x, y, value) {
    const text = document.createElementNS(svgNS, 'text');
    text.setAttributeNS(null, 'x', x);
    text.setAttributeNS(null, 'y', y);
    text.setAttributeNS(null, 'fill', '#FFF');
    text.setAttributeNS(null, 'font-size', '14px');
    text.setAttributeNS(null, 'font-family', 'Arial');
    text.setAttributeNS(null, 'text-anchor', 'middle');
    text.setAttributeNS(null, 'alignment-baseline', 'central');
    text.textContent = value;
    return text;
  }

  // Helper function to create SVG line element
  function createLine(x1, y1, x2, y2) {
    const line = document.createElementNS(svgNS, 'line');
    line.setAttributeNS(null, 'x1', x1);
    line.setAttributeNS(null, 'y1', y1);
    line.setAttributeNS(null, 'x2', x2);
    line.setAttributeNS(null, 'y2', y2);
    line.setAttributeNS(null, 'stroke', '#333');
    line.setAttributeNS(null, 'stroke-width', '2');
    return line;
  }

  // Function to recursively create SVG elements for the graph
  function createGraphElements(node, x, y, level) {
    const group = document.createElementNS(svgNS, 'g');
    const circle = createCircle(x, y);
    const text = createText(x, y, node.id);
    group.setAttribute('data-node', node.id); // Assign a data attribute for node identification
    group.appendChild(circle);
    group.appendChild(text);
    svgContainer.appendChild(group);

    const children = graph.edges.filter(edge => edge.source === node.id);
    
    if (!children) {
      return;
    }
    const childCount = children.length;
    const spaceBetweenNodes = horizontalSpacing / (Math.pow(2, level))+50;
    const startX = x - (spaceBetweenNodes * (childCount - 1)) / 2;
    const startY = y + verticalSpacing;

    for (let index = 0; index < childCount; index++) {
      const childX = startX + spaceBetweenNodes * index;
      const childY = startY;
      const line = createLine(x, y + nodeRadius, childX, childY - nodeRadius);
      svgContainer.appendChild(line);

      const childNode = graph.nodes.find(node => node.id === children[index].target);
      createGraphElements(childNode, childX, childY, level + 1);
    }
  }

  // Start creating the graph elements from root node
  const rootNode = graph.nodes[0];
  createGraphElements(rootNode, 400, 50, 1);
}

// Function to traverse the graph (BFS traversal)
function traverseGraph() {
 
  const visited = new Set();
  const traversalQueue = [];
  traversalQueue.push(graph.nodes[0]); // Start traversal from root node

  const interval = setInterval(() => {
     if(!flag){
      flag=1;
    clearInterval(interval);
    return;
  } 
    if (traversalQueue.length === 0) {
      clearInterval(interval);
      return;
    }

    const currentNode = traversalQueue.shift();
    visited.add(currentNode);

    const groupElement = graphContainer.querySelector(`[data-node="${currentNode.id}"]`);
    const circleElement = groupElement.querySelector('circle');
    circleElement.style.fill = '#00FF00'; // Change the color of the visited node to green

    const children = graph.edges.filter(edge => edge.source === currentNode.id);
    children.forEach(child => {
      const childNode = graph.nodes.find(node => node.id === child.target);
      if (!visited.has(childNode)) {
        traversalQueue.push(childNode);
      }
    });
  }, 500);
}

//
visualizeGraph();
//
function createTree(){
  flag=0;
  visualizeGraph();
}
// Visualize the graph on page load

