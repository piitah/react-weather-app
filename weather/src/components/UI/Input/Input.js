import React from 'react' 

import classes from "./Input.module.css"

const Input = (props) => {
    return (
        <div>
            <input 
                type="text" 
                className={[classes.searchInput, 'form-control'].join(' ')}
                value={props.value}
                onChange={props.inputChangedHandler}>
            </input>
        </div>
    )
}

export default Input