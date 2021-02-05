import { CircularProgress } from '@material-ui/core'
import React from 'react'

function LoadingBox() {
    return (
        <div className="container">
            <CircularProgress />
        </div>
    )
}

export default LoadingBox
