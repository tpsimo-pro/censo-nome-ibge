import { useState } from "react"
import FormComponent from "./components/FormComponent/FormComponent.tsx"
import ResultComponent from "./components/ResultComponent/ResultComponent"
import { DataFormat } from "./types.ts"
import LoadingComponent from "./components/LoadingComponent/LoadingComponent.tsx"


function App() {
  const [text, setText] = useState("")
  const [data, setData] = useState<DataFormat[]>([])

  const handleChangeText = (event) => {
    setText(event.target.value)
  }

  const [isLoading, setIsLoading] = useState(false)

  const fetchApi = async () => {
    setIsLoading(true)

    const validTextUrl = text.replaceAll(',', '%7C')
    console.log(validTextUrl)

    try {
      const dados = await fetch(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${validTextUrl}`)
      const jsonDados = await dados.json()
      console.log(dados)
      console.log(jsonDados)
      const result = jsonDados.map((el: any) => {
        return {
          nome: el.nome,
          res: [
            ...el.res
          ]
        }
      })
      setData(result)
      console.log('setDados')
    }
    catch (error) {
      console.error("Error fetching data:", error)
    }
    finally {
      setIsLoading(false)
    }
    
  }

  return (
    <>
      <FormComponent handleChangeText={handleChangeText} fetchApi={fetchApi} />
      {isLoading ? <LoadingComponent /> : <ResultComponent data={data} />}
    </>
  )
}

export default App
