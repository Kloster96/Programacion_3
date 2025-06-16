import { useState } from 'react'
import React from 'react'
import TraerPersonas from './components/traerPersonas'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <TraerPersonas />
    </div>
  );
}

export default App
