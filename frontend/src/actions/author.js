import {
  signupUser,
  loginUser,
  confirmPasswordChange,
  changePassword,
} from "../utils/api";

export const Author = "Author";
export const Message = "Message";
// export const

export function setAuthor(info) {
  return {
    type: Author,
    info,
  };
}

export function setMessage(info) {
  return {
    type: Message,
    info,
  };
}

export function handleSignupUser(info) {
  return (dispatch) => {
    return signupUser(info).then((data) => {
      if (data.error) {
        dispatch(setMessage(data));
      } else {
        dispatch(setMessage(data));
      }
    });
  };
}

function setCookie(token) {
  document.cookie = `user=${token}`;
}

export function handleLoginUser(info) {
  return (dispatch) => {
    return loginUser(info)
      .then((data) => {
        if (data.error) {
          dispatch(setMessage(data));
        } else {
          setCookie(data.token);
          dispatch(setAuthor(data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function handleSendEmailForPasswordChange(info) {
  return (dispatch) => {
    return confirmPasswordChange(info)
      .then((data) => {
        if (data.error) {
          dispatch(setMessage(data));
        } else {
          dispatch(setMessage(data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function handleChangePassword(info) {
  return (dispatch) => {
    return changePassword(info)
      .then((data) => {
        if (data.error) {
          dispatch(setMessage(data));
        } else {
          console.log(data);
          dispatch(setMessage(data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
