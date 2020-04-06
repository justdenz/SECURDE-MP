//ACTION CREATORS
import { actionTypes } from "./reducers/simpleReducer"

export const loginAsUser = (data) => dispatch => {
  dispatch({
    type: actionTypes.LOGIN_AS_USER,
    payload: data
  })
}

export const loginAsGuest = () => dispatch => {
  dispatch({
    type: actionTypes.LOGIN_AS_GUEST,
    payload: {role_name: "GUEST"}
  })
}

export const logout = () => dispatch => {
  dispatch({
    type: actionTypes.LOGOUT,
    payload: {},
  })
}
