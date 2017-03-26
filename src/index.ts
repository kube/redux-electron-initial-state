
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { remote } from 'electron'
import { StoreEnhancer } from 'redux'

const REDUX_INITIAL_STATE = '@@REDUX_INITIAL_STATE'

export const setWindowInitialState =
  <S>(window: Electron.BrowserWindow, state: S) => {
    (window as any)[REDUX_INITIAL_STATE] = JSON.stringify(state)
  }

export const initalStateEnhancer: StoreEnhancer<any> =
  createStore => reducer => {
    const window: any = remote.getCurrentWindow()
    const rawInitialState = window[REDUX_INITIAL_STATE]

    if (rawInitialState === undefined)
      return createStore(reducer)

    try {
      const initialState = JSON.parse(rawInitialState)
      return createStore(reducer, initialState)
    }
    catch (error) {
      throw new Error('Redux Initial State: Invalid State')
    }
  }
