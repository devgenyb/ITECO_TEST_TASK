import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import { Providers } from './app/Providers/Providers.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Providers>
    <App />
  </Providers>
)
