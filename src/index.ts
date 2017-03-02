
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
  <S>(window: Electron.BrowserWindow, state: S) =>
    (window as any)[REDUX_INITIAL_STATE] = JSON.stringify(state)

export const initalStateEnhancer: StoreEnhancer<any> =
  createStore => reducer => {
    const window: any = remote.getCurrentWindow()
    const initialState = JSON.parse(window[REDUX_INITIAL_STATE])
    return createStore(reducer, initialState)
  }
