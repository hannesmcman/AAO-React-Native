/**
 * @flow
 * Reducer for app settings
 */

import {getBalances} from '../../lib/financials'

import {loadAllCourses} from '../../lib/courses'

export const UPDATE_OLE_DOLLARS = 'sis/UPDATE_OLE_DOLLARS'
export const UPDATE_FLEX_DOLLARS = 'sis/UPDATE_FLEX_DOLLARS'
export const UPDATE_PRINT_DOLLARS = 'sis/UPDATE_PRINT_DOLLARS'
export const UPDATE_BALANCES = 'sis/UPDATE_BALANCES'
export const UPDATE_MEALS_DAILY = 'sis/UPDATE_MEALS_DAILY'
export const UPDATE_MEALS_WEEKLY = 'sis/UPDATE_MEALS_WEEKLY'
export const UPDATE_MEALS_REMAINING = 'sis/UPDATE_MEALS_REMAINING'
export const UPDATE_COURSES = 'sis/UPDATE_COURSES'

export function updateBalances(forceFromServer: boolean = false) {
  return async (dispatch: any => any, getState: any) => {
    const state = getState()
    const balances = await getBalances(state.app.isConnected, forceFromServer)
    dispatch({
      type: UPDATE_BALANCES,
      error: balances.error,
      payload: balances.value,
    })
  }
}

export function updateCourses(forceFromServer: boolean = false) {
  return async (dispatch: any => any, getState: any) => {
    const state = getState()
    const courses = await loadAllCourses(state.app.isConnected, forceFromServer)
    dispatch({
      type: UPDATE_COURSES,
      error: courses.error,
      payload: courses.value,
    })
  }
}

const initialBalancesState = {
  message: null,
  flex: null,
  ole: null,
  print: null,
  daily: null,
  weekly: null,
}
function balances(state = initialBalancesState, action) {
  const {type, payload, error} = action

  switch (type) {
    case UPDATE_OLE_DOLLARS:
      return {...state, ole: payload.balance}
    case UPDATE_FLEX_DOLLARS:
      return {...state, flex: payload.balance}
    case UPDATE_PRINT_DOLLARS:
      return {...state, print: payload.balance}
    case UPDATE_MEALS_DAILY:
      return {...state, daily: payload.mealsRemaining}
    case UPDATE_MEALS_WEEKLY:
      return {...state, weekly: payload.mealsRemaining}

    case UPDATE_BALANCES: {
      if (error) {
        return {...state, message: payload.message}
      }
      return {
        ...state,
        ...payload,
        message: null,
      }
    }

    default:
      return state
  }
}

const initialCoursesState = {}
function courses(state = initialCoursesState, action) {
  const {type, payload} = action

  switch (type) {
    case UPDATE_COURSES:
      return {...payload}

    default:
      return state
  }
}

const initialSisPageState = {}
export function sis(state: Object = initialSisPageState, action: Object) {
  return {
    balances: balances(state.balances, action),
    courses: courses(state.courses, action),
  }
}
