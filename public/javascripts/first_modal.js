let cards=document.querySelectorAll('.image');
let modal=document.querySelector('.modal');
let modal_in_modal=document.querySelector('.modal_in_modal');
let displayed_card=new Array();
let card_in_card = document.querySelectorAll('.card_in_card');
let Accepts = document.querySelectorAll('.Accept');
console.log(cards);
console.log(card_in_card);
for(let i=0;i<3;i++){
    displayed_card[i]=0;
}
function kill_modal_in_modal(){
    modal_in_modal.style.display="none";
    for(let i=0;i<3;i++){
        if(displayed_card[i]===1){
            console.log('turn oned '+ i);
        }
        displayed_card[i]=0;
        card_in_card[i].style.display='none';
        kill_text_area_value(card_in_card[i]);
    }
}

function kill_text_area_value(component){
    if(component.nodeName==='#text'){
        return;
    }
    if(component.nodeName==='TEXTAREA'){
        component.value='';
        return;
    }

    let childNodes = component.childNodes;

    for(let i=0;i<childNodes.length;i++){
        console.log(childNodes[i].nodeName);
        kill_text_area_value(childNodes[i]);
    }
}
window.onclick=function(e){
    if(e.target==modal_in_modal){
        console.log('modal_in_modal');
        kill_modal_in_modal();
    }
    else if(e.target==modal){
        console.log('modal_in_modal');
        kill_modal_in_modal();
        modal.style.display='none';
    }
}

for(let card of cards){
    console.log(card);
    console.log(card.dataset.card)
    card.addEventListener('click',(e)=>{
        console.log('Clicked');
        let number = e.target.dataset.card-1;
        console.log(e.target);
        console.log(number);
        modal_in_modal.style.display='block';
        console.log(card_in_card[number]);
        card_in_card[number].style.display='block';
        displayed_card[number]=1;
    });
}

for (let accept of Accepts){
    accept.addEventListener('click',(e)=>{
        modal.style.display='block';
    });
}