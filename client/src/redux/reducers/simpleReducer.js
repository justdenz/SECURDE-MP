//REDUCER
export const actionTypes = {
  LOGIN_AS_USER: "LOGIN_AS_USER",
  LOGIN_AS_GUEST: "LOGIN_AS_GUEST",
  LOGOUT: "LOGOUT",
}

const initialState = {
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
    case actionTypes.LOGOUT:
      return Object.assign({}, state, {
        user: {},
        userType: "",
      });
    default:
      return state
  }
}
