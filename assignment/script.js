var pageLimit = 10;
let books = [];
    fetch('https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json')
      .then((response) => response.json())
      .then((json) => { 
        books = json;
        myData(json);
      });

    function myData(data) {
      document.getElementById("list").innerHTML = "";
      let content = "";
      for (let item in data) {
        const book = data[item];
        content += "<li class='li'>";
        content += "<div><strong>Title:</strong> " + (book.title || "") + "</div>";
        content += "<div><strong>Author:</strong> " + (book.author || "") + "</div>";
        content += "<div><strong>Subject:</strong> " + (book.language || "") + "</div>";
        content += "<div><strong>Publish:</strong> " + (book.year || "") + "</div>";
        content += "</li>";
      }
      document.getElementById("list").innerHTML = content;
      paginationStart();
      document.getElementById("filterCount").innerText = data.length;
      document.getElementById("totalCount").innerText = books.length;
    }

    function limit() {
      var x = document.getElementById("perPage").value;
      pageLimit = x;
      paginationStart();
    }

    function searchType() {
      var x = document.getElementById("searchType").value;
      document.getElementById("searchAuthor").classList.add("hidden");
      document.getElementById("searchSubject").classList.add("hidden");
      document.getElementById("searchPublish").classList.add("hidden");
      document.getElementById("searchTitle").classList.add("hidden");
      if (x === "author") {
        document.getElementById("searchAuthor").classList.add("show");
        document.getElementById("searchAuthor").classList.remove("hidden");
      } else if (x === "subject") {
        document.getElementById("searchSubject").classList.add("show");
        document.getElementById("searchSubject").classList.remove("hidden");
      } else if (x === "publish") {
        document.getElementById("searchPublish").classList.add("show");
        document.getElementById("searchPublish").classList.remove("hidden");
      } else {
        document.getElementById("searchTitle").classList.add("show");
        document.getElementById("searchTitle").classList.remove("hidden");
      }
    }

    function searchAuthor() {
      var x = document.getElementById("searchAuthor").value;

      var newArray = books.filter(function (item) {
        return item.author.toLowerCase().indexOf(x.toLowerCase()) >= 0;
      });
      myData(newArray);
    }

    function searchTitle() {
      var x = document.getElementById("searchTitle").value;

      var newArray = books.filter(function (item) {
        return item.title.toLowerCase().indexOf(x.toLowerCase()) >= 0;
      });
      myData(newArray);
    }

    function searchSubject() {
      var x = document.getElementById("searchSubject").value;

      var newArray = books.filter(function (item) {
        return item.language.toLowerCase().indexOf(x.toLowerCase()) >= 0;
      });
      myData(newArray);
    }

    function searchPublish() {
      var x = document.getElementById("searchPublish").value;

      var newArray = books.filter(function (item) {
        return item.year.toString().toLowerCase().indexOf(x.toString().toLowerCase()) >= 0;
      });
      myData(newArray);
    }

    function paginationStart(bookList) {
      const paginationNumbers = document.getElementById("pagination-numbers");
      const paginatedList = document.getElementById("list");
      const listItems = paginatedList.querySelectorAll("li");
      paginationNumbers.innerHTML = "";
      const pageCount = Math.ceil(listItems.length / pageLimit);
      let currentPage = 1;

      const appendPageNumber = (index) => {
        const pageNumber = document.createElement("button");
        pageNumber.className = "pagination-number";
        pageNumber.innerHTML = index;
        pageNumber.setAttribute("page-index", index);
        pageNumber.setAttribute("aria-label", "Page " + index);

        paginationNumbers.appendChild(pageNumber);
      };

      const getPaginationNumbers = () => {
        for (let i = 1; i <= pageCount; i++) {
          appendPageNumber(i);
        }
      };

      const handlePageNo = () => {
        document.querySelectorAll(".pagination-number").forEach((button) => {
          button.classList.remove("active");
          const pageIndex = Number(button.getAttribute("page-index"));
          if (pageIndex == currentPage) {
            button.classList.add("active");
          }
        });
      };

      const setCurrentPage = (pageNum) => {
        currentPage = pageNum;
        handlePageNo();

        const prevRange = (pageNum - 1) * pageLimit;
        const currRange = pageNum * pageLimit;

        listItems.forEach((item, index) => {
          item.style.display = index >= prevRange && index < currRange ? "flex" : "none";
        });
      };

      const goToPage = (event) => {
        const pageNum = Number(event.target.getAttribute("page-index"));
        setCurrentPage(pageNum);
      };
      getPaginationNumbers();
      handlePageNo();
      setCurrentPage(currentPage);
      paginationNumbers.addEventListener("click", goToPage);
    }