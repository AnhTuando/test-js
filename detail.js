let commentInput = document.querySelector(".text-comment");
let addBtn = document.querySelector(".add");
let commentBox = document.querySelector(".comment-box");

// Get location
function getUrlId() {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  let urlStrId = url.search;
  let numStr = urlStrId.replace(/\D/g, "");
  let postID = parseInt(numStr);
  return postID;
}

// Get Comments
async function getComments() {
  let res = await fetch("https://dummyjson.com/comments");
  let data = await res.json();
  return data.comments;
}
// Get posts
async function getPosts() {
  let res = await fetch("https://dummyjson.com/posts");
  let data = await res.json();

  return data.posts;
}

// Handle Comments
async function handleComment() {
  let randomId = Math.floor(Math.random() * 100);
  // Render Comments
  let datas = await getComments();
  datas.map(function (data) {
    let commentEle = document.createElement("div");
    if (data.id < 5) {
      commentEle.innerHTML = ` <div class="comment">
          <div class="wrap-user-info">
            <div class="user">
              User: <span class="username">${data.user.username} </span>
            </div>
            <div class="user-id">User-ID: <span class="id">${data.user.id}</span></div>
            <div class="text">${data.body}</div>
            <input type="text" class="update-input none" />
          </div>
          <div class="wrap-btn">
            <div class="delete">Delete</div>
            <div class="edit">Edit</div>
          </div>
        </div>`;
      commentBox.append(commentEle);
    }
  });
  // Add Comment
  //   Enter
  commentInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      let text = commentInput.value;
      let commentEle = document.createElement("div");
      if (text) {
        commentEle.innerHTML = ` <div class="comment">
          <div class="wrap-user-info">
            <div class="user">
              User: <span class="username">eburras1q </span>
            </div>
            <div class="user-id">User-ID: <span>${randomId}</span></div>
            <div class="text">${text}</div>
            <input type="text" class="update-input none" />
          </div>
          <div class="wrap-btn">
            <div class="delete">Delete</div>
            <div class="edit">Edit</div>
          </div>
        </div>`;
      }
      commentBox.append(commentEle);
      commentInput.innerHTML = "";
      // Delete comment

      let deleteBtns = document.querySelectorAll(".delete");
      deleteBtns.forEach(function (btn) {
        btn.onclick = function () {
          this.closest(".comment").remove();
          console.log(deleteBtns);
        };
      });
    }
  });
  //   Add Cmt Btn onlick

  addBtn.onclick = function (event) {
    let text = commentInput.value;
    let commentEle = document.createElement("div");
    if (text) {
      commentEle.innerHTML = ` <div class="comment">
          <div class="wrap-user-info">
            <div class="user">
              User: <span class="username">eburras1q </span>
            </div>
            <div class="user-id">User-ID: <span>${randomId}</span></div>
            <div class="text">${text}</div>
            <input type="text" class="update-input none" />
          </div>
          <div class="wrap-btn">
            <div class="delete">Delete</div>
            <div class="edit">Edit</div>
          </div>
        </div>`;
    }
    commentBox.append(commentEle);
    // Delete Btn
    let deleteBtns = document.querySelectorAll(".delete");
    let deleteBtnsArr = Array.from(deleteBtns);
    deleteBtnsArr = [...deleteBtns];
    console.log(deleteBtnsArr);
    deleteBtnsArr.map(function (deleteBtn) {
      deleteBtn.addEventListener("click", function () {
        let parent = this.closest(".comment");
        parent.remove();
      });
    });
    // Edit Btn
    let editBtns = document.querySelectorAll(".edit");
    let editBtnsArr = Array.from(editBtns);
    editBtnsArr = [...editBtns];
    editBtnsArr.map(function (editBtn) {
      editBtn.addEventListener("click", function () {
        let parent = this.closest(".comment");

        let input = parent.querySelector(".update-input");
        input.classList.toggle("none");
        input.addEventListener("keydown", function (e) {
          if (e.key === "Enter") {
            let commentText = parent.querySelector(".text");
            let inputValue = input.value;
            commentText.innerHTML = `${inputValue}`;
            input.classList.add("none");
          }
        });
      });
    });
  };
  // Edit Btn
  let editBtns = document.querySelectorAll(".edit");
  let editBtnsArr = Array.from(editBtns);
  editBtnsArr = [...editBtns];
  editBtnsArr.map(function (editBtn) {
    editBtn.addEventListener("click", function () {
      let parent = this.closest(".comment");

      let input = parent.querySelector(".update-input");
      input.classList.toggle("none");
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          let commentText = parent.querySelector(".text");
          let inputValue = input.value;
          commentText.innerHTML = `${inputValue}`;
          input.classList.add("none");
        }
      });
    });
  });
  // Delete Btn
  let deleteBtns = document.querySelectorAll(".delete");
  let deleteBtnsArr = Array.from(deleteBtns);
  deleteBtnsArr = [...deleteBtns];
  deleteBtnsArr.map(function (deleteBtn) {
    deleteBtn.addEventListener("click", function () {
      let parent = this.closest(".comment");
      parent.remove();
    });
  });
}
handleComment();

async function renderPost() {
  let datas = await getPosts();
  let curentPostId = getUrlId();
  let singglePost = document.querySelector(".single-post");
  datas.map(function (data) {
    if (data.id == curentPostId) {
      singglePost.innerHTML = `<div class="user-id">User-ID: <span class="id-value">${
        data.userId
      }</span></div>

        <div class="title">${data.title}</div>
        <div class="description">
          ${data.body}
        </div>
        <div class="tags">
          ${data.tags
            .map((tag) => `<span class="tag-name">${tag}</span>`)
            .join("")}
        </div>
        <div class="reactions">Reactions: <span class="count">${
          data.reactions
        }</span></div>`;
    }
  });
}
renderPost();
