import { Fragment } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/index.css';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <Fragment>
    <App />
  </Fragment>,
)
