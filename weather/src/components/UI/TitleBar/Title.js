import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classes from './Title.module.css'

const Title = (props) => {
    return (
        <div>
            <div className={classes.weather_title}>
                <FontAwesomeIcon icon={props.icon} size={props.size} /> <span style={{ paddingLeft: '6px' }}>
                    {props.children}</span>
            </div>
        </div>
    )
}

export default Title