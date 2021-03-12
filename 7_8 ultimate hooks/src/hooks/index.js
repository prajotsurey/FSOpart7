import axios from 'axios'
import { useEffect, useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  
  const reset = () => {
    setValue('')
  }
  return {
    attributes : {
      type,
      value,
      onChange,
    } ,
    reset
  }
}

export const useResource  = (baseUrl) => {
  const [resources, setResource] = useState([]) 


  useEffect(() => {
    axios.get(baseUrl)
    .then(response => setResource(response.data))
  },[baseUrl])
  
  const create = (newObject,buttons) => {  
    axios.post(baseUrl, newObject)
    .then(response => 
      { 
        setResource(resources.concat(response.data))
        buttons.map(button => button.reset())
      }
    )
  }
  return [resources,{create}]

}