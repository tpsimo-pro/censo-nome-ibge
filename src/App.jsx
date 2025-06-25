import { useState } from "react"
import FormComponent from "./components/FormComponent/FormComponent"
import ResultComponent from "./components/ResultComponent/ResultComponent"


function App() {
  const [text, setText] = useState("")
  const [data, setData] = useState([])

  const handleChangeText = (event) => {
    setText(event.target.value)
  }

  const fetchApi = async () => {
    const validTextUrl = text.replaceAll(',', '%7C')
    console.log(validTextUrl)

    const dados = await fetch(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${validTextUrl}`)
    const jsonDados = await dados.json()
    setData(jsonDados)
    console.log('setDados')
  }

  return (
    <>
    <FormComponent text={text} handleChangeText={handleChangeText} fetchApi={fetchApi}/>
    <ResultComponent data={data}/>
    </>
  )
}

export default App
