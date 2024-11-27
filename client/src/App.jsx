import {} from 'react'
import Header from './components/header'
import Content from './components/Content'
import { ToasterProvider } from './providers/toast-provider'

const App = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }} >
      <ToasterProvider />
      <Header />
      <Content />
    </div>
  )
}

export default App