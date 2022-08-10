/* import React from "react";
import './App.css'
import ReactDOM from 'react-dom/client';

function infowindow({location, timeLimit, deliveryPay, itemName, imageUrl}){
    const Info = (
        <div className="overlaybox">
            <div className="innerContent">
                <span className="label">위치</span>
                <div className="infoBox">{location}</div>
            </div>
            <div className="innerContent">
                <span className="label">시간</span>
                <div className="infoBox">{timeLimit}</div>
            </div>
            <div className="innerContent">
                <span className="label">가격</span>
                <div className="infoBox">{deliveryPay}</div>
            </div>
            <div className="innerContent">
                <span className="label">정보</span>
                <div className="infoBox">{itemName}</div>
            </div>
            <img className="image" src={imageUrl}></img>
            <hr className="line"/>
            <div className="innerContent">
                <span className="label">배송 예상 시간</span>
                <input type="text" className="deliveryTime"></input>
            </div>
            <div className="innerContent">
                <span className="label">현재 위치</span>
                <input type="text" className="deliveryTime"></input>
                <button className="currentLoc">
                    <i class="fa-solid fa-location-crosshairs"></i>
                </button>
            </div>
            <div className="btnLayout">
                <button className="closeBtn">나가기</button>
                <button className="submitBtn">매칭 요청</button>
            </div>
        </div> 
 
)
    ReactDOM.render(Info, document.getElementById('map'))
}

    var info = document.createElement(
        "div",
        {id : "overlaybox"},
        document.createElement(
            "div",
            {id : "innerContent"},
            document.createElement("span", {id: "label"}, "위치"),
            document.createElement("div", {id: "infoBox"}, {location})
        ),
        document.createElement(
            "div",
            {id : "innerContent"},
            document.createElement("span", {id: "label"}, "시간"),
            document.createElement("div", {id: "infoBox"}, {timeLimit})
        ),
        document.createElement(
            "div",
            {id : "innerContent"},
            document.createElement("span", {id: "label"}, "가격"),
            document.createElement("div", {id: "infoBox"}, {deliveryPay})
        ),
        document.createElement(
            "div",
            {id : "innerContent"},
            document.createElement("span", {id: "label"}, "정보"),
            document.createElement("div", {id: "infoBox"}, {itemName})
        ),
        document.createElement("img", {id: "image", src:{imageUrl}}),
        document.createElement("hr", {id: "line"}),
        document.createElement(
            "div",
            {id : "innerContent"},
            document.createElement("span", {id: "label"}, "배송 예상 시간"),
            document.createElement("input", {id: "deliveryTime", type: "text"})
        ),
        document.createElement(
            "div",
            {id : "innerContent"},
            document.createElement("span", {id: "label"}, "현재 위치"),
            document.createElement("input", {id: "deliveryTime", type: "text"}),
            document.createElement("button", {id: "currentLoc"},
                document.createElement("i", undefined, <i class="fa-solid fa-location-crosshairs"></i>)
            )
        ),
        document.createElement(
            "div",
            {id: "btnLayout"},
            document.createElement("button", {id: "closeBtn"}, "나가기"),
            document.createElement("button", {id: "submitBtn"}, "매칭 요청")
        )


    )

export default infowindow */