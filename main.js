const menuCtl = document.querySelector('.fa-bars');
const modal = document.querySelector('.modal');
const btn = document.querySelector(".btn");
const container = document.querySelector(".urlContainer");
console.log(menuCtl);
console.log(modal);
console.log(btn);
console.log(container);
let count = 1;

//reset modal to be visible at all times
//when 680px or greater has been reached.
//below 680 can be toggled by the .fa-bars
window.onresize = function() {
    if (window.innerWidth >= 680) {
        modal.style.visibility = 'visible';
       // console.log(window.innerWidth);
    } else {
        modal.style.visibility = 'hidden';
    }
}

menuCtl.addEventListener("click", function () {
    console.log(window.innerWidth);
    if (modal.style.visibility == "hidden") {
        modal.style.visibility = 'visible';
    } else {
        modal.style.visibility = 'hidden';
    }
    console.log("item clicked" + count);
    count++;
})

function addDetails() {
  console.log(container);
  let urlDiv = document.createElement("div");
  urlDiv.style.width = "80%";
    urlDiv.style.height = "20vh";
    urlDiv.style.backgroundColor = "red";
    container.appendChild(urlDiv);
    urlDiv.style.margin = "auto";
    urlDiv.style.marginBottom = "10px"
}

btn.addEventListener("click", addDetails);
