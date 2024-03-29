import {GET_ERRORS, CLEAR_ERRORS} from './types'

export const returnErrors = (data, status, id =null) => {
  return {
    type: GET_ERRORS,
    payload: {msg: data.msg, status, id}
  }
}

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}
