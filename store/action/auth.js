import { fetchUserFollowings } from "../action/following";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

export const auth = (userId, token, email) => {
  return (dispatch) => {
    dispatch({
      type: AUTHENTICATE,
      userId: userId,
      token: token,
      userEmail: email,
    });
  };
};

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDELcxQeBpvaN2oF5mWIpTut6volbHCpXY",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_EXISTS") {
        message = "This email exists already!";
      }
      throw new Error(message);
    }
    const resData = await response.json();
    dispatch(
      addUserToDatabase(resData.localId, resData.idToken, resData.email)
    );
    dispatch(auth(resData.localId, resData.idToken, resData.email));
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDELcxQeBpvaN2oF5mWIpTut6volbHCpXY",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "This password is not valid!";
      }
      throw new Error(message);
    }
    const resData = await response.json();
    dispatch(auth(resData.localId, resData.idToken, resData.email));
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT });
  };
};

export const addUserToDatabase = (userId, token, email) => {
  return async (dispatch, getState) => {
    const date = new Date();
    const response = await fetch(
      `https://tweetx-24e5b.firebaseio.com/users/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: email,
          date: date.toISOString(),
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
  };
};

export const fetchRegisteredUser = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://tweetx-24e5b.firebaseio.com/users.json`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      let res = await dispatch(fetchUserFollowings());
      const loadedUsers = [];
      for (const key in resData) {
        let enable = false;
        if (key !== userId) {
          for (const k in res) {
            if (key === res[k].id) {
              enable = true;
              break;
            }
          }
          for (const i in resData[key]) {
            loadedUsers.push({
              userEmail: resData[key][i].userEmail,
              userId: key,
              enable: enable,
              userRegisterationDate: resData[key][i].date,
            });
          }
        }
      }
      return loadedUsers;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };
};
