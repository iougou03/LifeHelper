const ACCESS_KEY = "MuFKtCBOu1dfzh42NKuuBmBLrOyxqeIzjHNgnXlvClQ";
const COMMAND = 'topics/wallpapers/photos';    
const SIZE = 'h=1080';
let RANNUM = parseInt(Math.random()*100+1);
let RANNUM2 = parseInt(Math.random()*10);
const bkBody = document.querySelector('body');

function printImg(imgURL){

    const bgImage = new Image();
    bgImage.style.backgroundImage = `url(${imgURL})`;
    bgImage.style.backgroundSize = 'cover';
    bgImage.classList.add('bgImage');
    bkBody.appendChild(bgImage);
}

function getImage(){
    fetch(
        `https://api.unsplash.com/collections/1362854/photos?client_id=${ACCESS_KEY}&${SIZE}`
        // `https://api.unsplash.com/${COMMAND}/?client_id=${ACCESS_KEY}&${SIZE}&page=${RANNUM}`
    ).then(response =>(response.json())).then(function (json){
        const imgURL = json[RANNUM2].urls['raw'];
        // console.log(json);
        printImg(imgURL);
    });
}

function init(){
    getImage();
}

init();
