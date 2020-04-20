//REDUCER
export const actionTypes = {
  LOGIN_AS_ADMIN: "LOGIN_AS_ADMIN",
  LOGIN_AS_USER: "LOGIN_AS_USER",
  LOGIN_AS_GUEST: "LOGIN_AS_GUEST",
  LOGOUT: "LOGOUT",
  START_TIMER: "START_TIMER",
  DECREMENT_ATTEMPTS: "DECREMENT_ATTEMPTS",
  RESET_ATTEMPTS: "RESET_ATTEMPTS",
}

const initialState = {
  expireTime: Date.now(),
  attempts: 6,
  user: {},
  userType: ""
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_AS_USER:
      console.log("USER: ", action.payload);
      return Object.assign({}, state, {
        user: action.payload,
        userType: action.payload.role_name,
      });
    case actionTypes.LOGIN_AS_GUEST:
      console.log("GUEST: ", action.payload);
      return Object.assign({}, state, {
        userType: action.payload.role_name
      });
    case actionTypes.LOGIN_AS_ADMIN:
      console.log("ADMIN: ", action.payload);
      return Object.assign({}, state, {
        user: action.payload,
        userType: action.payload.role_name,
      })
    case actionTypes.LOGOUT:
      return Object.assign({}, state, {
        user: {},
        userType: "",
      });
    case actionTypes.START_TIMER:
      return Object.assign({}, state, {
        expireTime: action.payload.expireTime,
      });
    case actionTypes.DECREMENT_ATTEMPTS:
      console.log("DECREMENTED");
      return Object.assign({}, state, {
        attempts: state.attempts - 1,
      });
    case actionTypes.RESET_ATTEMPTS:
      return Object.assign({}, state, {
        attempts: 6
      });
    default:
      return state
  }
}
