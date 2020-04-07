document.addEventListener("DOMContentLoaded", function() {
    
    function doesMyFetch(){
    let list = document.getElementById("list-panel")
    fetch('http://localhost:3000/books')
    .then((response) => {
        return response.json();
      })
      .then((books) => {
          console.log(books)
        books.forEach(book => {
            let newLine = document.createElement('li')
            newLine.textContent = `${book.title}`
            newLine.className = `${book.id}`
            list.appendChild(newLine)
        });
        list.addEventListener("click", function (event){
          let show = document.getElementById("show-panel")
          let target = event.target.className - 1
          let users = books[target].users
          console.dir(users)
          let allUsers = function (){
              users.forEach(user =>{
              let newLine = document.createElement('li')
              newLine.innerText = user.username
            })
        }
          show.innerHTML = `
          <h3> ${books[target].title} </h3>
          <img src=${books[target].img_url}>
          <li> ${books[target].description} </li>
          <li> ${users.forEach(user =>{
            user.username 
        })}</li>
          `
        })
    });
}
doesMyFetch()

document.addEventListener("click", function (event){
    console.dir(event.target)
})

});

//<li>${users.forEach(user =>{
 // return `<li>${user.username}</li>`
 // })}</li>