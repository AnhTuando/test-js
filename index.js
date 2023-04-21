let row = document.querySelector(".row");
let a = document.createElement("a");
let inputSearch = document.querySelector(".search-box");
let addPostBtn = document.querySelector(".add-post");
let deletePostBtn = document.querySelector(".delete-posts");
let postForm = document.querySelector(".post-form");

function randomID() {
  let randomId = Math.floor(Math.random() * 100);
  return randomId;
}
// Call API
async function getUsers() {
  let res = await fetch("https://dummyjson.com/posts");
  let data = await res.json();

  return data.posts;
}
//1. Render post
async function main() {
  row.innerHTML = "";
  try {
    let datas = await getUsers();

    datas.map(function (data) {
      let index = 5;
      let item = document.createElement("a");
      if (data.id <= index) {
        item.innerHTML = ` <a class="item" value="${
          data.userId
        }" href="detail.html?${data.id}" >
            <div class="title">
              ${data.title}
            </div>
            <div class="content">
               ${data.body}
            </div>
            <div class="tag">
            ${data.tags
              .map((tag) => `<span class="tag-name">${tag}</span>`)
              .join("")}                   
            </div>
            <div class="reactions">Reaction: <span class="count-reaction">${
              data.reactions
            }</span> </div>
          </div>
          <div class="delete-post none"><i class="fa-solid fa-circle-minus"></i></div>
            <div class="update-post-btn">Update</div>
            <div class="update-post-form">
            <input type="text" class="update-content none">
            </div>
        </a>`;
        row.append(item);
      }
    });
    //  Scroll event
    let index = 0;
    window.addEventListener("scroll", () => {
      let postlist = document.querySelectorAll(".item");
      let lastElement = postlist[postlist.length - 1];
      let lastElementPosision = lastElement.getBoundingClientRect().bottom;
      if (window.scrollY + window.innerHeight >= lastElementPosision) {
        index += 5;
        datas.map(function (data) {
          let item = document.createElement("a");
          if (data.id > index && data.id <= index + 5) {
            item.innerHTML = ` <a class="item" value="${
              data.userId
            }" href="detail.html?${data.id}" >
            <div class="title">
              ${data.title}
            </div>
            <div class="content">
               ${data.body}
            </div>
            <div class="tag">
            ${data.tags
              .map((tag) => `<span class="tag-name">${tag}</span>`)
              .join("")}                   
            </div>
            <div class="reactions">Reaction: <span class="count-reaction">${
              data.reactions
            }</span> </div>
          </div>
          <div class="delete-post none"><i class="fa-solid fa-circle-minus"></i></div>
          <div class="update-post-btn">Update</div>
            <div class="update-post-form">
            <input type="text" class="update-content none">
            </div>
        </a>`;
            row.append(item);
          }
        });
      }
      // Delete Post
      deletePostBtn.addEventListener("click", function () {
        let deletePostElements = document.querySelectorAll(".delete-post");
        let deletePostElementsArray = Array.from(deletePostElements);
        deletePostElementsArray = [...deletePostElements];
        deletePostElementsArray.map(function (deletePostElement) {
          deletePostElement.classList.toggle("none");
          deletePostElement.addEventListener("click", function (e) {
            e.preventDefault();
            let parent = this.closest(".item");
            parent.remove();
          });
        });
      });
      // Update Post
      let updatepostBtns = document.querySelectorAll(".update-post-btn");
      let updatepostBtnsArray = Array.from(updatepostBtns);
      updatepostBtnsArray = [...updatepostBtns];
      updatepostBtnsArray.map(function (updatepostBtn) {
        updatepostBtn.addEventListener("click", function (e) {
          e.preventDefault();
          let parent = this.closest(".item");
          let updateInput = parent.querySelector(".update-content");
          let content = parent.querySelector(".content");
          updateInput.classList.remove("none");
          updateInput.addEventListener("click", function (e) {
            e.preventDefault();
            updateInput.addEventListener("keydown", function (e) {
              if (e.key === "Enter") {
                let updatePostInputValue = updateInput.value;
                content.innerHTML = `${updatePostInputValue}`;
                updateInput.classList.add("none");
              }
            });
          });
        });
      });
    });
    // Delete Post
    deletePostBtn.addEventListener("click", function () {
      let deletePostElements = document.querySelectorAll(".delete-post");
      let deletePostElementsArray = Array.from(deletePostElements);
      deletePostElementsArray = [...deletePostElements];
      deletePostElementsArray.map(function (deletePostElement) {
        deletePostElement.classList.toggle("none");
        deletePostElement.addEventListener("click", function (e) {
          e.preventDefault();
          let parent = this.closest(".item");
          parent.remove();
        });
      });
    });
    // Update Post
    let updatepostBtns = document.querySelectorAll(".update-post-btn");
    let updatepostBtnsArray = Array.from(updatepostBtns);
    updatepostBtnsArray = [...updatepostBtns];
    updatepostBtnsArray.map(function (updatepostBtn) {
      updatepostBtn.addEventListener("click", function (e) {
        e.preventDefault();
        let parent = this.closest(".item");
        let updateInput = parent.querySelector(".update-content");
        let content = parent.querySelector(".content");
        updateInput.classList.remove("none");
        updateInput.addEventListener("click", function (e) {
          e.preventDefault();
          updateInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
              let updatePostInputValue = updateInput.value;
              content.innerHTML = `${updatePostInputValue}`;
              updateInput.classList.add("none");
            }
          });
        });
      });
    });
  } catch (error) {
    console.error(error);
  }
}
// Search Post
async function searchPost() {
  let datas = await getUsers();
  inputSearch.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      row.innerHTML = "";
      datas.filter((data) => {
        data.tags.filter((tag) => {
          if (tag.toLowerCase().includes(inputSearch.value.toLowerCase())) {
            let item = document.createElement("a");
            item.innerHTML = `<a class="item" value="${data.userId}" href="detail.html" >
            <div class="title">
              ${data.title}
            </div>
            <div class="content">
               ${data.body}
            </div>
            <div class="tag">
            <span class="tag-name">${tag}</span>

            </div>
            <div class="reactions">Reaction: <span class="count-reaction">${data.reactions}</span> </div>
          </div>
          <div class="delete-post none"><i class="fa-solid fa-circle-minus"></i></div>
        </a>`;

            row.append(item);
          }
        });
      });
    }
  });
}

searchPost();
main();

function addPost() {
  addPostBtn.addEventListener("click", function () {
    postForm.classList.remove("none");
  });
  let postTitleInput = document.querySelector(".post-form-title");
  let postTagsInput = document.querySelector(".post-form-tag");
  let postContentInput = document.querySelector(".post-form-content");
  let postFormAddBtn = document.querySelector(".add-btn");
  postFormAddBtn.addEventListener("click", function () {
    let titleValue = postTitleInput.value;
    let tagsValue = postTagsInput.value;
    let contentValue = postContentInput.value;
    let item = document.createElement("a");
    item.innerHTML = `<a class="item" value="${randomID()}" href="detail.html" >
            <div class="title">
              ${titleValue}
            </div>
            <div class="content">
               ${contentValue}
            </div>
            <div class="tag">
            <span class="tag-name">${tagsValue}</span>

            </div>
            <div class="reactions">Reaction: <span class="count-reaction"></span> </div>
          </div>
          <div class="delete-post none"><i class="fa-solid fa-circle-minus"></i></div>
        </a>`;

    row.insertBefore(item, row.firstChild);
  });
}
addPost();
