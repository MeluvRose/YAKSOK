console.log('searchTag');
//search_form
//search
let search = document.querySelector('#search');
search.addEventListener('keydown',(e)=>{
    if(e.key==="Enter"){
        console.log(e.target.value);
        let form = document.querySelector('#search_form');
        console.log(form);
        form.submit();
    }
});