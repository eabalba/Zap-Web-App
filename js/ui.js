const entries = document.querySelector('.entries');

document.addEventListener('DOMContentLoaded', function(){
    //nav menu
    const menus = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menus, {edge: 'right'});
    //add recipe form
    const forms = document.querySelectorAll('.side-form');
    M.Sidenav.init(forms, {edge: 'left'});
});

//Render entry data
const renderEntry = (data, id) => {

    const html = `
        <div class="card-panel entry white row" data-id="${id}">
            <img src="/img/icon/logo.png" alt="pangolin pic">
            <div class="entry-details">
                <div class="entry-title">${data.title}</div>
                <div class="entry-input"><span>Status: </span>${data.status}</div>
                <div class="entry-input"><span>Cause: </span>${data.cause}</div>
                <div class="location">
                <p>
                    latitude: <span id="latitude">${data.lat}</span>&deg;<br />
                    longitude: <span id="longitude">${data.lon}</span>&deg;
                </p>
            </div>
            </div>
            
            <div class="entry-delete">
                <i class="material-icons" data-id="${id}">delete_outlines</i>
            </div>
        </div>
    
    `;

    entries.innerHTML += html;
};

//remove entry from DOM
const removeEntry = (id) => {
    const entry = document.querySelector(`.entry[data-id=${id}]`);
    entry.remove();
};