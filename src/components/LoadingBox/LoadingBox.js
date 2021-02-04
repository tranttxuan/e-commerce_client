import { CircularProgress } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'

function LoadingBox() {
    return (
        <div className="container">
            <CircularProgress />
        </div>
    )
}

export default LoadingBox
