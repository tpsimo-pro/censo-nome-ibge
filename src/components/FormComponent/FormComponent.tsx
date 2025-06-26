import { Button, TextField } from "@mui/material"
import { ChangeEvent} from "react"

type FormComponentProps = {
    fetchApi: () => void
    handleChangeText: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const FormComponent = ({fetchApi, handleChangeText}: FormComponentProps) => {
    return(
        <>
        <h2>Input</h2>
        <TextField onChange={handleChangeText} id="outlined-basic" label="Outlined" variant="outlined" placeholder="Lista de nomes separados por vírgula"/>
        <Button onClick={fetchApi} variant="contained">Contained</Button>
        </>
    )
}

export default FormComponent