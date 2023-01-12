import { useState } from 'react'  
import {FcSearch} from "react-icons/Fc";
import './service/Api'
import Api from './service/Api';
import './app.css'

function App() {

  const[cep , setCep] = useState('');
  const[objeto, setObjeto] =useState({})

  async function handleCep(){
    if(cep === ''){
      alert("preencha o cep")
    }

    try {
      const response = await Api.get(`${cep}/json`)
      console.log(response.data)
      setObjeto(response.data)
      setCep("")

    } 
    catch (error) {
      alert("cep não encontrado")
      setCep("");
    }
    
    return;
  }

  return (
    <div className='container'>
      <h1 className='title'>Buscador de CEP</h1>
        
      <div className='conteinerInput'>
        <input 
          placeholder='CEP'
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />
          
        <button 
          className='button'
          onClick={handleCep}>
            
          <FcSearch size={25} />

        </button>
      </div>
       
      {Object.keys(objeto).length >0 &&(
        //comparação esse componente só vai aparece se passar pela avaliação
          <div className='main'>
            <h2> CEP:  {objeto.cep}</h2>

            <span>{objeto.logradouro}</span>
            <span>complemento: {objeto.complemento}</span>
            <span>Bairro: {objeto.bairro}</span>
            <span>localidade {cep.localidade} - {objeto.uf}</span>
          </div>
        )}
    </div>
  )
}

export default App
