import { CircularProgress } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import React from 'react'

function LoadingBox() {
    return (
        <div className="container">
            <CircularProgress />
            <Skeleton animation="wave" width="100%" height="100%" />
        </div>
    )
}

export default LoadingBox
