const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtn = document.querySelectorAll(".video__comment-delete");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = ` ❌`;
  span2.style = "cursor:pointer";
  span2.dataset.id = id;
  span2.addEventListener("click", handleDelete);
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

const deleteComment = (target) => {
  const videoComments = document.querySelector(".video__comments ul");
  videoComments.removeChild(target);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text.trim() === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const handleDelete = async (event) => {
  const commentId = event.target.dataset.id;

  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });

  if (response.status === 200) {
    deleteComment(event.target.parentNode);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

deleteBtn.forEach((elm) => elm.addEventListener("click", handleDelete));

// delete 기능 추가
// ❌표시에 이벤트리스터를 추가 한다.
// 동시에 html 삭제하는 함수도 만든다.
