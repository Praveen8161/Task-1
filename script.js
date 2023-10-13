//API Details
let API = "https://wolnelektury.pl/api/audiobooks/?format=json";
let options = {
    method:"GET",
    Headers:{
        "Content-Type":"application-json",
    },
};

//selecting the element
let container = document.querySelector(".container");

let start = 0;
let end = 15;

//creating a Book Cards
function createBookCards(data){
    let arr = data.slice(start,end);
    arr.forEach((val) =>{
        let author = val.author;
        let bookImg = val.simple_thumb;
        let bookUrl = val.url;
        let title = val.title;
        let genre = val.genre || "-";
        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <div class="image"><img src="${bookImg}" alt="Title image" loading="lazy"></div>
        <div class="book-details">
            <p class="title"><b>Title:</b> ${title}</p>
            <p class="author"><b>Author:</b> ${author}</p>
            <p class="genre"><b>Genre:</b> ${genre}</p>
            <p class="url"><abbr title="To redirect to the Book page"><a href="${bookUrl}" target="_blank">Click Here</a></abbr></p>
        </div>
        `;
        container.appendChild(card);
    });
}

//Changing Pages


async function getBooksData(){
    try{
        let res = await fetch(API,options);
        let data = await res.json();
        createBookCards(data);
    }catch(err){
        console.log(err);
    }
}

getBooksData();