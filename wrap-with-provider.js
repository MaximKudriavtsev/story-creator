import React from "react"
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './src/components/reducers'

const store = createStore(rootReducer);

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts
  return <Provider store={store}>{element}</Provider>
}