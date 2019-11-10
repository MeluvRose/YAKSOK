console.log('test');
let cards=document.querySelectorAll('.card');
let buttons=document.querySelector('#testButton');
let i =0;

function make_cards(data){
    let card=document.createElement('div');
    card.classList.add('card');
    card.dataset={
        status:data.status,
        personFrom:data.personFrom,
        personTo:data.personTo,
        tx:data.tx,
    };
    let status;
    if(data.status==='done')
        status='done';
    else if(data.status==='cancel')
        status='clear';
    else
        status='autorenew';
    
    let left_icons=make_left_icons(status);
    card.appendChild(left_icons);
    
    let p =document.createElement('p');
    let p_text=document.createTextNode('Transaction : '+data.tx);
    p.appendChild(p_text);
    card.appendChild(p);

    let person=make_person(data.personFrom,data.personTo);
    card.appendChild(person);
    return card;
}

function make_left_icons(status){
    let left_icons=document.createElement('div');
    left_icons.classList.add('left_icons');
    
    let i = document.createElement('i');
    i.classList.add('material-icons','w3-xxlarge','left_icons');
    if(status==='autorenew'){
        i.classList.add('w3-spin');
        i.classList.remove('left_icons');
    }
    let text=document.createTextNode(status);
    i.appendChild(text);

    left_icons.appendChild(i);

    return left_icons;

}

function make_person(from,to){
    let person=document.createElement('div');
    person.classList.add('Person');


    let _from=document.createElement('span');
    _from.classList.add('name');
    let _from_text=document.createTextNode(from);
    console.log(_from);
    
    _from.appendChild(_from_text);


    let _to=document.createElement('span');
    _to.classList.add('name');
    let _to_text=document.createTextNode(to);
    _to.appendChild(_to_text);
    
    let i = document.createElement('i');
    i.classList.add('material-icons');
    let i_text=document.createTextNode('arrow_forward');
    i.appendChild(i_text);

    person.appendChild(_from);
    person.appendChild(i);
    person.appendChild(_to);
    return person;
}


buttons.addEventListener('click',function(e){
    let t=cards[i].dataset;
    console.log(t);
    let content=document.querySelector('.content');
    let new_card=make_cards(t);
    content.appendChild(new_card);
    i++;
    i=i%3;
});