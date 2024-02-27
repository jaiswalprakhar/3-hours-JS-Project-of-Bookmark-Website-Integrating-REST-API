const ul = document.getElementById('savedBookmarks');

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/a16ae45f81144301b03d392ac0a3128f/bookmarks")
    .then((response) => {
        //console.log(response);
        console.log(response.data);
        
        for(let i = 0; i < response.data.length; i++)
        {
            showBookmarks(response.data[i]);
        }
        //console.log(document.getElementById('bus').value);
        console.log("All Bookmarks are being displayed");
    })
    .catch((err) => {
        ul.innerHTML = ul.innerHTML + `<h4>Something went wrong(${err})</h4>`;
        console.log(err);
    })
});

export const handleFormSubmit = (event) => {
        event.preventDefault();
    const webtitle = event.target.webtitle.value;
    const weburl = event.target.weburl.value;
    const obj = {
        webtitle,
        weburl  
    }

    event.target.webtitle.value = "";
    event.target.weburl.value = "";

    postBookmarks(obj);
}

const postBookmarks = (obj) => {
axios.post("https://crudcrud.com/api/a16ae45f81144301b03d392ac0a3128f/bookmarks", obj)
    .then((response) => {
        showBookmarks(response.data);
        console.log("Bookmarks Saved");
    })
    .catch((err) => {
        console.log(err);
    })
}

const showBookmarks = (bookmark) => {
    const childNode = `<li id = ${bookmark._id} class = "bookmarking"> ${bookmark.webtitle} > 
                        <a href="${bookmark.weburl}" target="_blank">${bookmark.weburl}</a>
                            <button onclick = deleteBookmarks('${bookmark._id}')> Delete </button>
                            <button onclick = editBookmarks('${bookmark._id}','${bookmark.webtitle}','${bookmark.weburl}')> Edit </button>
                        </li>`;
    //console.log(`${user.busnumber}`);
    ul.innerHTML = ul.innerHTML + childNode;
}

window.deleteBookmarks = (bookmarkId) => {
    axios.delete(`https://crudcrud.com/api/a16ae45f81144301b03d392ac0a3128f/bookmarks/${bookmarkId}`)
    .then((response) => {
        console.log(`${bookmarkId} Bookmarks deleted`);
        removeBookmarks(bookmarkId);
    })
    .catch((err) => {
        console.log(err);
    })
}

const removeBookmarks = (bookmarkId) => {
    const childElement = document.getElementById(bookmarkId);
    if(childElement)
    {
        ul.removeChild(childElement);
    }
}

window.editBookmarks = (bookmarkId, bookmarkTitle, bookmarkUrl) => {
    document.getElementById('webtitle').value = bookmarkTitle;
    document.getElementById('weburl').value = bookmarkUrl;

    deleteBookmarks(bookmarkId);
    console.log("Bookmark Edited");
}