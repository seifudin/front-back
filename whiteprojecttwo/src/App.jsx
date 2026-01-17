import { useState } from 'react'
import ServerFront from './ServerFront'
import Hone from './Hone'
import Htwo from './Htwo'
import GlavBlok from './GlavBlok'
import './App.css'
import SkeletonLoading from './SkeletonLoading'
import Button from './Button'

function App() {

  const components = [
    {id: 'oneList', label: 'первый лист', switch: <Hone/>},
    { id: 'twoList', label: 'второй лист', switch: <Button/>},
    {id: 'secondList', label: 'третий лист', switch: <SkeletonLoading/> },
    { id: 'serverFront', label: 'бекенд', switch: <ServerFront/>}
  ];

  const [konstruktor, setKonstruktor] = useState('secondList')

  const switchers = (id) => setKonstruktor (id);


  return (
    <>
      <div>
      <h1>учебный проект</h1>
        <Htwo/>
        <GlavBlok/>
        {components.map((blok)=> (
          <button 
          id= {blok.id}
          onClick={()=> switchers(blok.id)}
          >
            {blok.label}
          </button>
        ))}
          {components.find((blok) => blok.id === konstruktor)?.switch || <p>такого компонента не существует</p> }
      </div>
    </>
  )
}

export default App
