
let allBookUrl = (page) => {
  let urlOfPages = `https://api.freeapi.app/api/v1/public/books?page=${page}`;
  return urlOfPages;
};
const options = { method: "GET", headers: { accept: "application/json" } };

const bookContainer = document.getElementById("bookContainer");
let allBooks;
let sortedBooks = [];

async function fetchBooks() {
  try {
    const response = await fetch(allBookUrl(currentPage), options);
    const data = await response.json(); // Await here
    console.log("Api response for ", currentPage, ": ", data);
    allBooks = data.data;
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

displayBooks();

//PAGINATION
let currentPage = 1;
const prevButton = document.getElementById("prevPage");
const nextButton = document.getElementById("nextPage");
const pageNumber = document.getElementById("page-info");

function updatePage() {
  pageNumber.textContent = `Page: ${currentPage}`;
  displayBooks();
}

prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    nextButton.disabled = false;
    prevButton.disabled = currentPage === 1;
    updatePage();
  }
});

nextButton.addEventListener("click", () => {
  currentPage++;
  prevButton.disabled = false;
  nextButton.disabled = currentPage === 10;
  updatePage();
});



let searchTimeRender;
searchInput.addEventListener("input", () => {
  clearTimeout(searchTimeRender);
  searchTimeRender = setTimeout(displayBooks, 300);
});


//Refresh page and display books
function displayBooks() {

  setTimeout(() => {
    bookContainer.innerHTML = ""; 

    let searchBook = searchInput.value.toLowerCase();

    fetchBooks().then(() => {
        let filteredBooks = allBooks.data.filter((book) => {
        let title = book.volumeInfo.title?.toLowerCase() || "";
        let authors = book.volumeInfo.authors?.join(", ").toLowerCase() || "";
        return title.includes(searchBook) || authors.includes(searchBook);
      });

      if (filteredBooks.length === 0) {
        bookContainer.innerHTML = `<h2>No books found.</h2>`;
        return;
      }

      if (sortedBooks.length !== 0) {
        filteredBooks = sortedBooks; 
        sortedBooks = [];
      }

      filteredBooks.forEach((book, index) => {
        const bookItem = document.createElement("div");
        bookItem.classList.add("book-item");

        const {
          title,
          authors,
          publisher,
          publishedDate,
          imageLinks,
          canonicalVolumeLink,
        } = book.volumeInfo;
        const bookImage = imageLinks?.thumbnail || "./public/placeholder.jpg";

        

        bookItem.innerHTML = `
        <img src="${bookImage}" alt="${title}">
        <h3>${title}</h3>
        <div class="bookDetails">
          <p><strong>Author:</strong> ${authors?.join(", ") || "Unknown"}</p>
          <p><strong>Publisher:</strong> ${publisher || "Unknown"}</p>
          <p><strong>Published:</strong> ${publishedDate || "Not Available"}</p>
        </div>
        <a href="${canonicalVolumeLink}" target="_blank">More Info</a>
      `;

        bookContainer.appendChild(bookItem);

        setTimeout(() => {
          bookItem.classList.add("show");
        }, index * 100);
      });

      bookContainer.style.opacity = "1";
    }, 300);
  });
}

//*-----------Sorting------------//

document.getElementById("sortOptions").addEventListener("change", (e) => {
  if (!allBooks || !allBooks.data) return;

  const selectedSort = e.target.value;
  const sortedData = [...allBooks.data];

  if (selectedSort === "title") {
    sortedData.sort((a, b) => {
      const titleA = a.volumeInfo.title?.toLowerCase() || "";
      const titleB = b.volumeInfo.title?.toLowerCase() || "";
      return titleA.localeCompare(titleB);
    });
  } else if (selectedSort === "date") {
    sortedData.sort((a, b) => {
      const dateA = new Date(a.volumeInfo.publishedDate || "1900-01-01");
      const dateB = new Date(b.volumeInfo.publishedDate || "1900-01-01");
      return dateA - dateB;
    });
  }

  sortedBooks = sortedData;
  displayBooks();
});

// Toggle between grid and list view
const toggleViewButton = document.getElementById("toggleViewBtn");
let isGrid = true; //default

toggleViewButton.addEventListener("click", () => {
  isGrid = !isGrid;

  if (isGrid) {
    bookContainer.classList.remove("list-view");
    bookContainer.classList.add("grid-view");
  } else {
    bookContainer.classList.remove("grid-view");
    bookContainer.classList.add("list-view");
  }
});
