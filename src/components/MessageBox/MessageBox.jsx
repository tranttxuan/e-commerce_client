import { Alert } from '@material-ui/lab'
import React from 'react'
import "./MessageBox.scss"

function MessageBox(props) {
    return (
        <Alert
            variant="filled"
            severity={props.error ? "error" : "info"}
            className="message-box">
            {props.children}
        </Alert>

    )
}

export default MessageBox
