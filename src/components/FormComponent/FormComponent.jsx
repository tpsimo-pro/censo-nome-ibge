import { Button, TextField } from "@mui/material"
import styles from "./FormComponent.module.css"

const FormComponent = (props) => {
    return(
        <>
        <h2>Input</h2>
        <TextField text={props.text} onChange={props.handleChangeText} id="outlined-basic" label="Outlined" variant="outlined" />
        <Button onClick={props.fetchApi} variant="contained">Contained</Button>
        </>
    )
}

export default FormComponent