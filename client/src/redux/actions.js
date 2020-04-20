//ACTION CREATORS
import { actionTypes } from "./reducers/simpleReducer"

export const loginAsUser = (data) => dispatch => {
  dispatch({
    type: actionTypes.LOGIN_AS_USER,
    payload: data
  })
}

export const loginAsAdmin = (data) => dispatch => {
  dispatch({
    type: actionTypes.LOGIN_AS_ADMIN,
    payload: {...data, role_name: "ADMIN"}
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

export const startTimer = () => dispatch => {
  dispatch({
    type: actionTypes.START_TIMER,
    payload: {expireTime: Date.now() + 30000}
  })
}

export const decrementAttempts = () => dispatch => {
  dispatch({
    type: actionTypes.DECREMENT_ATTEMPTS,
  })
}

export const resetAttempts = () => dispatch => {
  dispatch({
    type: actionTypes.RESET_ATTEMPTS,
  })
}