import React, { Fragment } from 'react'
import stylesLoading from "./Loading.module.css"

export default function Loading() {
    return (
        <Fragment>
            <div style={{
                position: "fixed", top: 0, left: 0, width: "100%",
                height: "100%", backgroundColor: "rgba(0,0,0,.5)", display: "flex",
                justifyContent: "center", alignItems: "center", zIndex: 99
            }}>
                <div className={stylesLoading.loader}></div>
            </div>
        </Fragment>
    )
}