console.log("JavaScript File is linked");

//variables
const labels = document.querySelectorAll(".label");
const labelBox = document.getElementById("label-box");
const resetButton = document.querySelector(".reset-btn");
const targetZones = document.querySelectorAll(".target-zone");
let currentDraggedElement = null;

//functions

function dragStart() {
    console.log("Drag Start Called");
    currentDraggedElement = this;
    console.log(currentDraggedElement);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    if(this.children.length === 0)
      this.appendChild(currentDraggedElement);
    currentDraggedElement = null;
}

//Event listeners

labels.forEach(label => {
    label.addEventListener("dragstart", dragStart);
});

targetZones.forEach(target => {
    target.addEventListener("dragover", dragOver);
    target.addEventListener("drop", drop);
});

resetButton.addEventListener("click", () => {
    console.log("Reset Button Clicked");
    targetZones.forEach(target => {
        while (target.firstChild) {
            const newDiv = document.createElement("div");
            newDiv.className = "label";
            newDiv.textContent = target.firstChild.textContent;
            newDiv.draggable = true;
            newDiv.addEventListener("dragstart", dragStart);
            labelBox.appendChild(newDiv);
            target.removeChild(target.firstChild);
        }
    });
    labels.forEach(label => {
        label.style.display = "block";
    });
});