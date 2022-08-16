
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import './style.css'

function App() {

  const [erro, setErro] = useState(false);

  const {register, handleSubmit, setValue, setFocus} = useForm()

  const onSubmit = (e) => {
    console.log(e)
  }

  const checkCep = (e) => {
    if(!e.target.value) return;
    //impedindo que qualquer simbolo ou letra sejam enviados para a requisdição da api
    const cep = e.target.value.replace(/\D/g, "")
    console.log(cep)
    //consumindo a api com fetch api
    fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res=> res.json()).then(data => {
      console.log(data)
      setValue("address", data.logradouro)
      setValue("neighborhood", data.bairro)
      setValue("city", data.localidade)
      setValue("uf", data.uf)
    setFocus("addressNumber")
    }).catch ((erro) => {
      setErro(true)
      console.log(erro)
    })
    
  }


  return (
    <div className='container'>
      <form onSubmit={handleSubmit(onSubmit)}>

        <label>
          CEP: 
        <input type="text" {...register("cep")} onBlur={checkCep}/>
        </label>
        
        <label>
          Rua: 
        <input type="text" {...register("address")}/>
        </label>

        
        <label>
          Número: 
        <input type="text" {...register("addressNumber")} />
        </label>

        
        <label>
          Bairro: 
        <input type="text" {...register("neighborhood")} />
        </label>

        
        <label>
          Cidade: 
        <input type="text" {...register("city")} />
        </label>

      
        <label>
          Estado: 
        <input type="text" {...register("uf")} />
        </label>

      <button type='submit'>Enviar</button>
      {erro && <span className='sp'>Ocorreu algum erro, tente novamente.</span>}
      </form>
    
    
    </div>
  );
}

export default App;
