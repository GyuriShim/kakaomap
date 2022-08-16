import React, { useState } from "react";
import "./Toast.css"

function ToastNotification() {
    console.log("매칭 완료")
    let [state, setState] = useState(true)
    setTimeout(() => {
        setState(false)
    }, 2000);

    if (state){
        return(
            <div className="toastBox">
                <p className="text">매칭 요청이 완료되었습니다.</p>
            </div>
        )
    }
    
}

export {ToastNotification}