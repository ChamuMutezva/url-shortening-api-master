const menuCtl = document.querySelector('.fa-bars');
const modal = document.querySelector('.modal');
const btn = document.querySelector(".btn");
const container = document.querySelector(".urlContainer");
const lbl = document.querySelector("label");
console.log(lbl);
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

menuCtl.addEventListener("click", function() {
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
    lbl.style.display = "none";
    console.log(container);
    const inputField = document.getElementById("userInp");

   //container.innerHTML = '<div class="load-wrapper"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>';
    fetch("https://rel.ink/api/links/", {
            method: 'POST',
            body: JSON.stringify({ url: inputField.value }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => { 
          //  container.innerHTML = '';
            if (response.status == 400) {
                //alert("Please make sure you provided a valid url");
                lbl.style.display = "block";
                return;
            } else {
                return response.json();
            }
        })
        .then(data => {
            if (data === undefined) {
                return;
            }
            let urlDiv = document.createElement("div");
            const urlBox = document.createElement("input");
            const urlShort = document.createElement("input");
            const copyBtn = document.createElement("button");
            urlBox.style.rows = "2";
            urlDiv.classList.add("urlDiv");
            urlBox.classList.add("url-box");
            urlShort.classList.add("url-short");
            copyBtn.classList.add("copy-btn");
            copyBtn.textContent = "Copy";
            copyBtn.addEventListener("click", (e) => {
                console.log(e.target);
                //alert("Handle your copy link logic here");
                e.target.style.backgroundColor = "hsl(258, 35%, 47%)";
                e.target.innerHTML = "Copied!"
            })
            console.log(data);
            urlBox.value = `${inputField.value}`;
             urlShort.value = `https://rel.ink/${data.hashid}`;
            urlDiv.style.width = "90vw";
           // urlDiv.style.height = "20vh";           
            urlDiv.appendChild(urlBox);
            urlDiv.appendChild(urlShort);
            urlDiv.appendChild(copyBtn);
            container.appendChild(urlDiv);
            urlDiv.style.margin = "auto";
            urlDiv.style.marginBottom = "10px"
        }).catch(
            error => {
                // handle your errors here
                console.log(error);
            }
        )
}

btn.addEventListener("click", addDetails);