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

/////////// new card
let test=new Array();
test[0]={
    status:'spending',
    to:'박원종',
    title:'gajksndkgjaskdfjajshdfkjashdfa',
    content:'agojsdhfoajsdiofjasodijfoaisjdfoiasdf'
};

test[1]={
    status:'done',
    to:'박원종',
    title:'gajksndkgjaskdfjajshdfkjashdfa',
    content:'agojsdhfoajsdiofjasodijfoaisjdfoiasdf'
};

test[2]={
    status:'cancel',
    to:'박원종',
    title:'gajksndkgjaskdfjajshdfkjashdfa',
    content:'agojsdhfoajsdiofjasodijfoaisjdfoiasdf'
};


function CardAssembler(data){
    let div = document.createElement('div');
    div.dataset.status=data.status;
    div.dataset.to=data.to;
    div.dataset.title=data.title;
    div.dataset.content=data.content;
    div.classList.add('w3-container');
    div.classList.add('w3-margin-bottom');
    let card=make_new_card(data);
    console.log(card);
    div.appendChild(card);
    return div;
}


function make_new_card(data){
    let div=document.createElement('div');
    div.classList.add('w3-card-4');
    let header = make_new_card_header(data);
    let container=make_new_card_container(data);
    let green_button=make_green_button();
    let red_button=make_red_button();
    div.appendChild(header);
    div.append(container);
    div.append(green_button);
    div.append(red_button);
    return div;
}

function make_new_card_header(data){
   let header = document.createElement('header');
   header.classList.add('w3-container');
   header.classList.add('w3-light-grey');
   let h3=document.createElement('h3');
   let textNode=document.createTextNode(data.to);
   h3.appendChild(textNode);
   header.appendChild(h3);
   return header;
}


function make_new_card_container(data){
    let container = document.createElement('div');
    container.classList.add('w3-container');
    container.classList.add('w3-margin-bottom');
    
    let p=document.createElement('p');
    let pText=document.createTextNode(data.title);
    p.appendChild(pText);
    container.appendChild(p);

    let hr=document.createElement('hr');
    container.appendChild(hr);

    let i = make_icons(data.status);
    container.appendChild(i);

    let content = document.createElement('p');
    content.appendChild(document.createTextNode(data.content));
    container.appendChild(content);

    return container;
}

function make_icons(status){
    let text;
    if(status==='spending'){
        text='autorenew';
    }else if(status==='cancel'){
        text='clear';
    }else if(status==='done'){
        text='done';
    }
    
    let i = document.createElement('i');
    i.classList.add('material-icons','w3-xxlarge','w3-left','w3-margin-right');
    if(text==='autorenew'){
        i.classList.add('w3-spin');
    }
    let content=document.createTextNode(text);

    i.appendChild(content);

    return i;
}

function make_green_button(){
    let button=document.createElement('button');
    button.classList.add('w3-button','w3-green','next');
    
    let text=document.createTextNode('+ next');
    button.appendChild(text);
    return button;
}

function make_red_button(){
    let button=document.createElement('button');
    button.classList.add('w3-button','w3-red','w3-right','fail');
    
    let text=document.createTextNode('+ fail');
    button.appendChild(text);
    return button;
}




buttons.addEventListener('click',function(e){
    // let t=cards[i].dataset;
    // console.log(t);
    // let content=document.querySelector('.content');
    // let new_card=make_cards(t);
    // content.appendChild(new_card);
    // i++;
    // i=i%3;
    let t=test[i];
    console.log(t);
    let content=document.querySelector('.content');
    let new_card=CardAssembler(t);
    content.appendChild(new_card);
    i++;
    i=i%3;
});