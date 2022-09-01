import React from "react"

const Input = (props) => {
    return (
        <input type={props.type} placeholder={props.placeholder}
            value={props.value} 
            onChange={(e) => { 
                props.setValue(e.target.value) 
                props.setErrorMesageState(null)
            }} />
    )
}

export default Input