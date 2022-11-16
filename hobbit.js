function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function () {
    console.log(this.title + ', ' + this.author + ', ' + this.pages + ', ' + this.read);
}

function addBookToLibrary(library, book) {
    library.set(book.title, book);
}

function removeBook(e) {
    const card = e.target.parentElement.parentElement;
    card.remove();
}

function flipRead(e) {
    const book = myLibrary.get(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
    book.read = !book.read;
    addCard(book);
    removeBook(e);
}

function addCard(book) {
    const library = (book.read) ? document.querySelector(".finished_book_cards") :
        document.querySelector(".unfinished_book_cards");
    const card = document.createElement("div");
    card.classList.add("card");
    const title = document.createElement("h2");
    const author = document.createElement("p");
    const pages = document.createElement("div");
    const button_container = document.createElement("div");
    button_container.classList.add("card_button")
    const read_button = document.createElement("button");
    const remove_button = document.createElement("button");
    title.textContent = book.title;
    author.textContent = "By: " + book.author;
    pages.textContent = "Number of Pages: " + book.pages;
    read_button.textContent = (book.read) ? "Move to unread" : "Move to read";
    remove_button.textContent = "Remove from Library";

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(button_container);
    button_container.appendChild(read_button);
    button_container.appendChild(remove_button);
    remove_button.addEventListener("click", removeBook);
    read_button.addEventListener("click", flipRead);
    library.appendChild(card);
}

function reverseFormVisibility (e) {
    const book_form = document.querySelector(".form_container");
    if (book_form.id === "hidden_form") {
        book_form.id = "";
        e.target.textContent = "Hide Book Submission Form";
    } else {
        book_form.id = "hidden_form";
        e.target.textContent = "Show Book Submission Form";
    }
}

function formBookConstruct(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let title = formProps.title;
    let author = formProps.author;
    let pages = formProps.pages;
    let read = document.querySelector("#read_book").checked;
    const construct = new Book(title, author, pages, read);
    addBookToLibrary(myLibrary, construct);
    addCard(construct);
}

function radioButton(e) {
    const true_button = document.querySelector("#read_book");
    const false_button = document.querySelector("#not_read");
    if (e.target.id === "read_book") {
        if (false_button.checked) {
            false_button.checked = false;
        }
    } else {
        if (true_button.checked) {
            true_button.checked = false;
        }
    }
}

function startListening() {
    const header_button = document.querySelector("button");
    header_button.addEventListener("click", reverseFormVisibility);

    const form = document.querySelector("form");
    form.addEventListener("submit", formBookConstruct);

    const read = document.querySelector("#read_book");
    const not_read = document.querySelector("#not_read");
    read.addEventListener("click", radioButton);
    not_read.addEventListener("click", radioButton);
}

let myLibrary = new Map();
const thehobbit = new Book('The Hobbit', 'J.K. Rowlings', 300, true);
const warandpeace = new Book('War and Peace', 'Tolstoy', 1000, false);
thehobbit.info();
addBookToLibrary(myLibrary, thehobbit);
addBookToLibrary(myLibrary, warandpeace)

addCard(thehobbit);
addCard(warandpeace);


startListening();