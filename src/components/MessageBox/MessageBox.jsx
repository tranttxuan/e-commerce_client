import { Alert } from '@material-ui/lab'
import React from 'react'
import "./MessageBox.scss"

function MessageBox(props) {

    return (
        <Alert
            variant={props.filled && "filled"}
            severity={props.error ? "error" : props.success ? "success" : "info"}
            color={props.error ? "error" : props.success ? "success" : "info"}
            className={props.small? "message-box small" : "message-box large"}
            >
            {props.children}
        </Alert>

    )
}

export default MessageBox
