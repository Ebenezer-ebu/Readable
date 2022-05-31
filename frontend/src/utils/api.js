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
    .then((data) => data.data);

export const vote = (id, option, voterId) =>
  fetch(`/posts/${id}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ option, voterId }),
  })
    .then((res) => res.json())
    .then((data) => data.data);

export const getCommentByParent = (id) =>
  fetch(`/posts/${id}/comments`, { headers })
    .then((res) => res.json())
    .then((data) => data);

export const getPostsByID = (id) =>
  fetch(`/posts/${id}`, { headers })
    .then((res) => res.json())
    .then((data) => data.data);

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

export const post = ({ author, authorId, title, body, category }) =>
  fetch("/posts", {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ author, authorId, title, body, category }),
  })
    .then((res) => res.json())
    .then((data) => data);

export const postComment = ({ author, authorId, body, parentId }) =>
  fetch("/comments", {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ author, authorId, body, parentId }),
  })
    .then((res) => res.json())
    .then((data) => data);

export const deleteCommentByID = (id) =>
  fetch(`/comments/${id}`, { method: "DELETE", headers })
    .then((res) => res.json())
    .then((data) => data);

export const editPostByID = ({ body, title }, id) =>
  fetch(`/posts/${id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body, title }),
  })
    .then((res) => res.json())
    .then((data) => data.data);

export const editCommentByID = ({ body }, id) =>
  fetch(`/comments/${id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body }),
  })
    .then((res) => res.json())
    .then((data) => data);

export const signupUser = ({ username, email, imageUrl, password }) =>
  fetch("/signup", {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, imageUrl, password }),
  })
    .then((res) => res.json())
    .then((data) => data);

export const loginUser = ({ email, password }) =>
  fetch("/login", {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => data);

export const confirmPasswordChange = ({ email }) =>
  fetch("/changePasswordNotification", {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then((res) => res.json())
    .then((data) => data);

export const changePassword = ({ newPassword, userId, token }) =>
  fetch("/auth/resetPassword", {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ newPassword, userId, token }),
  })
    .then((res) => res.json())
    .then((data) => data);
