console.log("JavaScript File is linked");

//variables
const labels = document.querySelectorAll(".label");
const labelBox = document.getElementById("label-box");
const resetButton = document.querySelector(".reset-btn");
const targetZones = document.querySelectorAll(".target-zone");
let currentDraggedElement = null;
let originalParent = null;

//functions

function dragStart() {
    console.log("Drag Start Called");
    currentDraggedElement = this;
    originalParent = this.parentElement;
    console.log(currentDraggedElement);
    setTimeout(() => {
        this.classList.add("dragging");
    }, 0.5);
}

function dragOver(event) {
    event.preventDefault();
}

function dragEnd(event)
{
    if(!this.parentElement.classList.contains("target-zone"))
    {
        console.log("Placing back to original parent");
        originalParent.appendChild(this);
    }
    this.classList.remove("dragging");
}

function drop(event) {
    event.preventDefault();
    if(this.children.length === 0)
    {
        this.appendChild(currentDraggedElement);
        currentDraggedElement.classList.remove("dragging");
    }
    currentDraggedElement = null;
}

//Event listeners

labels.forEach(label => {
    label.addEventListener("dragstart", dragStart);
    label.addEventListener("dragend", dragEnd);
});

targetZones.forEach(target => {
    target.addEventListener("dragover", dragOver);
    target.addEventListener("drop", drop);

    // highlight on drag enter
    target.addEventListener("dragenter", () => {
        if(target.children.length === 0) 
            target.classList.add("highlight");
    });
    // remove highlight on drag leave
    target.addEventListener("dragleave", () => {   
        if(target.children.length === 0) 
            target.classList.remove("highlight");
    });
});

resetButton.addEventListener("click", () => {
    console.log("Reset Button Clicked");
    targetZones.forEach(target => {
        target.classList.remove("highlight");
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