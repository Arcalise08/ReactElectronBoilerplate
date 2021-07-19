import * as Types from './constants'

export const setWindow = value => ({
  type: Types.SET_WINDOW, value
})

export const setDimBackground = value => ({
  type: Types.SET_DIM_BACKGROUND, value
})

export const setPopup = value => ({
  type: Types.SET_POP_UP, value
})

export const setSavedRequests = value => ({
  type: Types.SET_SAVED_REQUESTS, value
})

export const setNavigation = value => ({
  type: Types.SET_NAVIGATION, value
})

export const setSavedResults = value => ({
  type: Types.SET_SAVED_RESULTS, value
})

export const addMessages = value => ({
  type: Types.ADD_MESSAGE, value
})
export const setMessages = value => ({
  type: Types.SET_MESSAGES, value
})
export const clearMessages = value => ({
  type: Types.CLEAR_MESSAGES, value
})

export const setColors = value => ({
  type: Types.SET_COLORS, value
})

export const setSignalR = value => ({
  type: Types.SET_SIGNAL_R, value
})

export const setBaseURL = value => ({
  type: Types.SET_BASE_API_URL, value
})
