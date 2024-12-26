// fakeBooksData.js faylından kitabları idxal edirik
import { books } from './fakeBooksData.js';

const bookList = document.getElementById('book-list');
const searchBar = document.getElementById('search-bar');
const filterAuthor = document.getElementById('filter-author');
const detailsSection = document.getElementById('details-section');

// Kitabları göstərən funksiya
function displayBooks(bookArray) {
    bookList.innerHTML = ''; // Siyahını təmizləyirik
    if (bookArray.length === 0) {
        bookList.innerHTML = '<p>No books found.</p>';
        return;
    }

    bookArray.forEach((book) => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';
        bookItem.innerHTML = `
            <h2>${book.title}</h2>
            <p><strong>Author:</strong> ${book.author}</p>
            <p>${book.description}</p>
            <p><strong>Price:</strong> $${book.price}</p>
            <a href="#book-${book.id}" class="details-link">View Details</a>
        `;
        bookList.appendChild(bookItem);
    });
}

// Axtarış funksiyası
function filterBooks() {
    const searchValue = searchBar.value.toLowerCase();
    const authorValue = filterAuthor.value;

    const filteredBooks = books.filter((book) => {
        const matchesSearch = book.title.toLowerCase().includes(searchValue) || 
                              book.author.toLowerCase().includes(searchValue);
        const matchesAuthor = authorValue ? book.author === authorValue : true;
        return matchesSearch && matchesAuthor;
    });

    displayBooks(filteredBooks);
}

// Enter ilə axtarışı aktivləşdirmək
searchBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        filterBooks();
    }
});

// Müəllif seçimini dəyişərkən filtrasiya
filterAuthor.addEventListener('change', filterBooks);

// Başlanğıcda bütün kitabları göstərmək
displayBooks(books);
