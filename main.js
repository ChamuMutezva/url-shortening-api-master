const menuCtl = document.querySelector('.fa-bars');
const modal = document.querySelector('.modal');
console.log(menuCtl);
console.log(modal);
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