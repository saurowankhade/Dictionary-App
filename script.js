const userInput = document.getElementById('search');
const searchBtn = document.querySelector('button');
const result = document.querySelector('.result');
let audio = document.querySelector('.audioPlay');

const dilog = document.querySelector('dialog');
    const dialogMessage = document.querySelector('.dialogMessage');


searchBtn.addEventListener('click',()=>{
    const input = document.getElementById('search').value;
    if(input!==''){
        let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${input.trim()}`;  
        result.innerHTML = `<div class="loader"></div>`; 
        result.classList.add('loader_div');
        let loader = document.querySelector('.loader');   
        loader.style.display = 'block'; 
        getData(url);
    }else{
        changeError('Enter Something to search!!');
    }
    
  
});


function getInnerHtml(data){
    result.classList.remove('loader_div');
    result.innerHTML = `<div class="text_audio"> 
    <h3>${userInput.value}</h3>
    <i class="fa-solid fa-volume-high sound"></i>
    </div>
    <div class="desci"><p class="partofspeech">${data[0].meanings[0].partOfSpeech} ${data[0].phonetic || ""}</p>
    <p class="meaning">${data[0].meanings[0].definitions[0].definition}</p>
    <p class="sentence">${data[0].meanings[0].definitions[0].example || ""}</p>
    </div></div>`;

    
    let audioPlay = document.querySelector('.sound');
    audioPlay.addEventListener('click',()=>{
        let a = -1;
        for(let i=0;i<(data[0].phonetics).length; i++){
            // 
            if(data[0].phonetics[i].audio !== ''){
                a = i;  
            } 
        }
        console.log('a = ',a);
        if((a === -1) || (data[0].phonetics[a].audio==='')){
            // console.log(a,data[0].phonetics[a].audio)
            changeError(`<i class="fa-solid fa-circle-xmark" style="color: #fa1e1e;"></i> Unable to play audio`);
        } else{
            audio.setAttribute("src",`${data[0].phonetics[a].audio}`);
            audio.play();
        }
       
    });

    
    
}

async function getData(url){
    try{
    let fet = await fetch(url);
    let data = await fet.json();
    getInnerHtml(data);
    console.log(data);
} catch(e){
    result.innerHTML = `<h1 class='error'>Sorry 😞 ! Unable to find. \n Try another word.</h1>`;
}
    
}




 async function changeError(str){
    
    dialogMessage.innerHTML = ` ${str}`;

    await setTimeout(()=>{
        dilog.style.animation = 'slider 1s 1';
        dilog.style.visibility = 'visible';
    },0);


     await setTimeout(()=>{
        dilog.style.animation = 'sliderre 1s 1';
    },3000);

   await setTimeout(()=>{
        dilog.style.visibility = 'hidden';
    },4000);
}