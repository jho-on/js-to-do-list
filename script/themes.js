let themeBtn = document.getElementById("themeBtn");
let content = document.getElementById("themeContent");

const themes = [
['#FBF6D9', '#F4AC36', '#21181B'], 
['#F6F7EB', '#E94F37', '#393E41'],
['#FCFAF9', '#48E5C2', '#333333'],
['#181425', '#ff0044', '#FFFFFF'],
['#222222', '#B774FF', '#FFFFFF'],
['#00171F', '#00A7E1', '#FFFFFF']
];

function saveTheme(target){
    content = document.getElementById("themeContent");
    localStorage.setItem("choosedTheme", Array.from(content.children).indexOf(target));
    if(target.id == "customTheme"){
        for(let i = 1; i <= Array.from(target.children).length - 1; i++){
            localStorage.setItem("color" + String(i), Array.from(target.children)[i].value);
            localStorage.setItem("customIndex", Array.from(content.children).indexOf(target));
        }
    }
}

function loadTheme(){
    if(localStorage.getItem("choosedTheme") != null){
        let index = Number(localStorage.getItem("customIndex"));
        if(Array.from(content.children)[index] != undefined){
            let childs = Array.from(Array.from(content.children)[index].children);
            childs[1].value = localStorage.getItem("color1");
            childs[2].value = localStorage.getItem("color2");
            childs[3].value = localStorage.getItem("color3");
        }
       setTheme(Array.from(content.children)[Number(localStorage.getItem("choosedTheme"))]);
    }else{
        console.log(Array.from(Array.from(content.children)[5].children)[0].checked = true)
    }
}

function showThemes(){
    if(content.style.display == "block"){
        content.style.display = "none";
    }else{
        content.style.display = "block";
    }
}

function setTheme(target){
    let childs = Array.from(target.children);
    if(target.id == "theme"){
        document.documentElement.style.setProperty("--BGColor", childs[1].style.backgroundColor);
        document.documentElement.style.setProperty("--detailColor", childs[2].style.backgroundColor);
        document.documentElement.style.setProperty("--textColor", childs[3].style.backgroundColor);
    }else if(target.id == "customTheme"){
        document.documentElement.style.setProperty("--BGColor", childs[1].value);
        document.documentElement.style.setProperty("--detailColor", childs[2].value);
        document.documentElement.style.setProperty("--textColor", childs[3].value);
    }
    childs[0].checked = true;
    saveTheme(target);
}

themes.forEach(theme => {
    content.insertAdjacentHTML("afterbegin", 
    `<div id='theme'>
        <input type="radio" name="checkTheme" onclick="setTheme(this.parentNode)" id="themeRadio">
        <div style="background-color: ${theme[0]};" title="Background"></div>
        <div style="background-color: ${theme[1]};" title="Details"></div>
        <div style="background-color: ${theme[2]};" title="Text"></div>
    </div>`
    )
})

themeBtn.onclick = showThemes;

loadTheme();