import jwtdecode from "jwt-decode";

export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString("en-US");
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfTheWeek = days[d.getDay()];
  return (
    dayOfTheWeek +
    " " +
    time.substr(0, 5) +
    time.slice(-2) +
    " | " +
    d.toLocaleDateString()
  );
}

export function timestamp() {
  return new Date().getTime();
}

export function uniqueId() {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substr(2);
  return dateString + randomness;
}

export function formatPost(data, author, authorId) {
  const { body, category, title } = data;
  return {
    title,
    body,
    category,
    author,
    authorId,
  };
}

export function formatPostComment(data, author, authorId, parentId) {
  const { body } = data;
  return {
    author,
    authorId,
    body,
    parentId,
  };
}

export function getUser() {
  try {
    let pass = document.cookie.split("=")[1];
    let decoded = jwtdecode(pass);
    return decoded;
    // valid token format
  } catch (error) {
    // invalid token format
    return undefined;
  }
}
