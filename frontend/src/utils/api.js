// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token,
};

export const getCategories = () =>
  fetch("/categories", { headers })
    .then((res) => res.json())
    .then((data) => data.categories);

export const getPostByCategories = (category) =>
  fetch(`${category}/posts`, { headers })
    .then((res) => res.json())
    .then((data) => data);

export const getAllPost = () =>
  fetch("/posts", { headers })
    .then((res) => res.json())
    .then((data) => data);

export const vote = (id, option) =>
  fetch(`/posts/${id}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ option }),
  })
    .then((res) => res.json())
    .then((data) => data);

export const getCommentByParent = (id) =>
  fetch(`/posts/${id}/comments`, { headers })
    .then((res) => res.json())
    .then((data) => data);

export const getPostsByID = (id) =>
  fetch(`/posts/${id}`, { headers })
    .then((res) => res.json())
    .then((data) => data);

export const deletePostByID = (id) =>
  fetch(`/posts/${id}`, { method: "DELETE", headers })
    .then((res) => res.json())
    .then((data) => data);

export const voteComment = (id, option) =>
  fetch(`/comments/${id}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ option }),
  })
    .then((res) => res.json())
    .then((data) => data);

export const post = ({ id, timestamp, author, title, body, category }) =>
  fetch("/posts", {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, timestamp, author, title, body, category }),
  })
    .then((res) => res.json())
    .then((data) => data);

export const postComment = ({ id, timestamp, author, body, parentId }) =>
  fetch("/comments", {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, timestamp, author, body, parentId }),
  })
    .then((res) => res.json())
    .then((data) => data);

export const deleteCommentByID = (id) =>
  fetch(`/comments/${id}`, { method: "DELETE", headers })
    .then((res) => res.json())
    .then((data) => data);

export const editPostByID = ({ author, body, title }, id) =>
  fetch(`/posts/${id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ author, body, title }),
  })
    .then((res) => res.json())
    .then((data) => data);

export const editCommentByID = ({ author, body }, id) =>
  fetch(`/comments/${id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ author, body }),
  })
    .then((res) => res.json())
    .then((data) => data);
