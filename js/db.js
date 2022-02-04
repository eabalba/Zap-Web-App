//offline data
db.enablePersistence()
    .catch(err => {
        if(err.code == 'failed-precondition'){
            //probably multiple tabs opened
            console.log('Persistence failed');
        } else if (err.code == 'unimplemented'){
            //lack if browser support
            console.log('Persistence is not available')
        }
    });

//real-time listener
db.collection('entries').onSnapshot((snapshot) => {
    //console.log(snaphot.docChanges());
    snapshot.docChanges().forEach(change => {
        //console.log(change, change.doc.data(), change.doc.id);
        if(change.type === 'added'){
            //add document data to web page
            renderEntry(change.doc.data(), change.doc.id)
        }
        if(change.type === 'removed'){
            //remove document data from web page
            removeEntry(change.doc.id);
        }
    });
});



//add new entry
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
    evt.preventDefault();

    const entry = {
        title: form.title.value,
        status: form.status.value,
        cause: form.cause.value,
        lat: latitude.textContent,
        lon: longitude.textContent
    };

    db.collection('entries').add(entry)
        .catch(err => console.log(err));

    form.title.value = '';
    form.status.value = '';
    form.cause.value = '';
    latitude.textContent = '';
    longitude.textContent = '';
});

//delete entry
const entryContainer = document.querySelector('.entries');
entryContainer.addEventListener('click', evt => {
    //console.log(evt);
    if(evt.target.tagName === 'I'){
        const id = evt.target.getAttribute('data-id');
        db.collection('entries').doc(id).delete();
    }
});