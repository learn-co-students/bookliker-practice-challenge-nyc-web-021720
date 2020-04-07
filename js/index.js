
    const bookURL='http://localhost:3000/books';

document.addEventListener("DOMContentLoaded", function(e) {
    // const userURL="http://localhost:3000/users"
    
    const booklist=document.getElementById("list")
    const listPanel=document.getElementById("list-panel")
    const showPanel = document.getElementById('show-panel');

       getBooks();
    
       showBooks();

function getBooks(){
    fetch(bookURL)
    .then(resp=>resp.json())
    .then(books=>renderBooks(books))

}

function renderBooks(books){

    books.forEach(book=>{
    const list=document.createElement("li")
    list.className="book-class"
	// list.dataset.bookId = book.id;
    list.innerHTML+=`
    <li id=${book.id}>${book.title}</li>
    `
    booklist.append(list)

    })
}


function showBooks(){

listPanel.addEventListener("click", function(e){

    let bookId=e.target.id
    fetch(`${bookURL}/${bookId}`)
    .then(resp=>resp.json())
    .then(book=>renderaBook(book))

})
}

function renderaBook(book){
    
    showPanel.innerHTML=`
    <h1>${book.title}</h1>
    <img src= ${book.img_url}>
    <p>Description: </p>
    <p>${book.description}</p>

    <button data-book-id=${book.id}  type="button" id="like-btn">Like ♥</button> 
    <ul id="fans">Fans of the book</ul>

    `
    book.users.forEach(user=>{
        let bookFanUl=document.getElementById('fans')
        let bookFanLi=document.createElement('li')
        bookFanLi.innerHTML=`
        ${user.username} 
        `
        bookFanUl.appendChild(bookFanLi)

    });
    likeBook()

}


function likeBook() {
	const likeButton = document.getElementById('like-btn');
	likeButton.addEventListener('click', function(event) {
		let newArrayOfUsers = undefined;
		let finalArrayOfUsers = undefined;
		let bookToLikeId = event.target.dataset.bookId;
		let bookFanUl = document.getElementById('fans');
		let newBookFanLi = document.createElement('li');
		newBookFanLi.innerText = 'pouros';
		bookFanUl.append(newBookFanLi);

		fetch(`${bookURL}/${bookToLikeId}`)
			.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				let arrayOfUsers = data.users;
				newArrayOfUsers = [ ...arrayOfUsers ];
				finalArrayOfUsers = newArrayOfUsers.push({ id: 1, username: 'pouros' });
			
			});

		fetch(`${bookURL}/${bookToLikeId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(finalArrayOfUsers)
		});
	});
}



});






