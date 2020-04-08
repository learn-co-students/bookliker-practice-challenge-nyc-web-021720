document.addEventListener("DOMContentLoaded", function() {

    let listBooks = document.querySelector('#list-panel')
    let showBook = document.querySelector('#show-panel')
    getBooks()

    function getBooks() {
        fetch(`http://localhost:3000/books`)
        .then(r => r.json())
        .then(books => renderBooks(books))
    }

    function getBook(id) {
        return fetch(`http://localhost:3000/books/${id}`)
        .then(r => r.json())
    }

    function updateBook(id, currentUsers){
        return fetch(`http://localhost:3000/books/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                users: currentUsers
        })
      })
    }


    function renderBooks(books) {
        console.log(books)
        for (let book of books) {
            let list = document.querySelector('#list')
            let newLi = document.createElement('li')
            newLi.className = 'book'
            newLi.dataset.id = book.id
            newLi.innerHTML = `${book.title}`
            list.appendChild(newLi)
            list.addEventListener("click", selectBook)
        }
    }

    function selectBook(e){
        //console.log(e.target)
        if (e.target.className === 'book') {
            getBook(e.target.dataset.id)
            .then(book => renderBookPane(book))
        }
    }

    function renderBookPane(book){
        showBook.innerHTML = ''
        let newBook = document.createElement('div')
        newBook.className = 'bookPanel'
        newBook.dataset.bookId = book.id
        newBook.innerHTML = `<h3>${book.title}</h3>
        <img src="${book.img_url}>"
        <p>${book.description}</p>
        <ul>
        ${book.users.map(user => {
            return `<li data-id="${user.id}">${user.username}</li>`
        }).join('')}
        </ul>
        <button class='readButton' data-id=${book.id}>Read Book</button>`
        showBook.appendChild(newBook)
        newBook.addEventListener("click", handleReader)
    }

    function handleReader(e){
        if (e.target.className === 'readButton') {
            getBook(e.target.dataset.id)
            .then(book => updateBookHandler(book))
        }
    }

    function updateBookHandler(book) {
        let currentUsers = book.users
        currentUsers.push({id: 1, username:"pouros"})
        updateBook(book.id, currentUsers)
        .then(r => r.json())
        .then(book => renderBookPane(book))
    }
        
        
});


