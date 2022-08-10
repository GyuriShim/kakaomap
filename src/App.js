/*global kakao*/ 
import React, { useEffect, useState } from 'react'
import './App.css'
import {BiCurrentLocation} from "react-icons/bi"
import { firestore } from './firebase'
import Info from './Info'
import infowindow from './Info'

const App=()=>{

  const [location, setLocation] = useState("")
  const [deliveryPay, setDeliveryPay] = useState(0)
  const [imageUrl, setImageUrl] = useState("")
  const [itemName, setItemName] = useState("")
  const [timeLimit, setTimeLimit] = useState("")
  const [posts, setPosts] = useState([])

  useEffect(() => {
    let post = firestore.collection("posts").onSnapshot((snapshot) => {
      const list = []
      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          ...doc.data()
        })
      })
      setPosts(list)
      if (list !== []) {
        setDeliveryPay(list[0].deliveryPay)
        setLocation(list[0].location)
      }
    })
   
    return () => post()
    
  },[])

  useEffect(()=>{

    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3
    };
    var map = new kakao.maps.Map(container, options);
    var markerPosition = new kakao.maps.LatLng(37.365264512305174, 127.10676860117488); 

    var markerContent = document.createElement('div');
    markerContent.className = "marker";
    markerContent.innerHTML = `<span style="color:black; font-size: 15px; padding: 5px">${deliveryPay}</span>`;

    var content = document.createElement("div")
    content.className = "overlaybox"
    
    var locInnerContent = document.createElement("div")
    locInnerContent.className = "innerContent"

    var loc = document.createElement("span")
    loc.className = "label"
    loc.innerHTML = "위치"

    var locInfoBox = document.createElement("div")
    locInfoBox.className = "infoBox"
    locInfoBox.innerHTML = location
    
    locInnerContent.append(loc, locInfoBox)

    var timeInnerContent = document.createElement("div")
    timeInnerContent.className = "innerContent"

    var time = document.createElement("span")
    time.className = "label"
    time.innerHTML = "시간"

    var timeInfoBox = document.createElement("div")
    timeInfoBox.className = "infoBox"
    timeInfoBox.innerHTML = timeLimit

    timeInnerContent.append(time, timeInfoBox)

    var payInnerContent = document.createElement("div")
    payInnerContent.className = "innerContent"

    var pay = document.createElement("span")
    pay.className = "label"
    pay.innerHTML = "가격"

    var payInfoBox = document.createElement("div")
    payInfoBox.className = "infoBox"
    payInfoBox.innerHTML = deliveryPay

    payInnerContent.append(pay, payInfoBox)

    var itemInnerContent = document.createElement("div")
    itemInnerContent.className = "innerContent"

    var item = document.createElement("span")
    item.className = "label"
    item.innerHTML = "정보"

    var itemInfoBox = document.createElement("div")
    itemInfoBox.className = "infoBox"
    itemInfoBox.innerHTML = itemName

    itemInnerContent.append(item, itemInfoBox)

    var image = document.createElement("div")
    image.className = "image"
    image.innerHTML = `<img style="width: 70px; height: 70px; padding-bottom: 11px; align-self: flex-start; margin-left: 35px;" src=${imageUrl}/>`

    var line = document.createElement("hr")
    line.className = "line"

    var deliveryTimeInnerContent = document.createElement("div")
    deliveryTimeInnerContent.className = "innerContent"

    var deliveryTime = document.createElement("span")
    deliveryTime.className = "label"
    deliveryTime.innerHTML = "배송 예상 시간"

    var deliveryTimeInputBox = document.createElement("input")
    deliveryTimeInputBox.className = "deliveryTime"
    
    deliveryTimeInnerContent.append(deliveryTime, deliveryTimeInputBox)

    var currentLocInnerContent = document.createElement("div")
    currentLocInnerContent.className = "innerContent"

    var currentLoc = document.createElement("span")
    currentLoc.className = "label"
    currentLoc.innerHTML = "현재 위치"

    var currentLocInputBox = document.createElement("input")
    currentLocInputBox.className = "deliveryTime"

    var btn = document.createElement("button")
    btn.className = "currentLoc"

    var icon = document.createElement("i")
    icon.className = "fa-solid fa-location-crosshairs fa-xl"

    btn.appendChild(icon)

    currentLocInnerContent.append(currentLoc, currentLocInputBox, btn)

    var btnInnerContent = document.createElement("div")
    btnInnerContent.className = "btnLayout"

    var closeBtn = document.createElement("button")
    closeBtn.className = "closeBtn"
    closeBtn.innerHTML = "나가기"

    var submitBtn = document.createElement("button")
    submitBtn.className = "submitBtn"
    submitBtn.innerHTML = "매칭 요청"

    btnInnerContent.append(closeBtn, submitBtn)

    content.append(locInnerContent,timeInnerContent,payInnerContent,itemInnerContent,image,line,deliveryTimeInnerContent,currentLocInnerContent,btnInnerContent)


    var marker = new kakao.maps.CustomOverlay({
      position: markerPosition,
      content: markerContent
    });
    
    
    var infoOverlay = new kakao.maps.CustomOverlay({
      content: content,
      position: marker.getPosition(),
      map: null
    })

    markerContent.addEventListener('click', function() {
      document.querySelector("div.marker").style.background = "#E8FFC1";
      infoOverlay.setMap(map);
    });

    closeBtn.addEventListener("click", function(){
      document.querySelector("div.marker").style.background = "#ffffff";
      infoOverlay.setMap(null);
    })

    submitBtn.addEventListener("click", function() {
      document.querySelector("div.marker").style.background = "#ffffff";
      infoOverlay.setMap(null);
    })

  marker.setMap(map);
    }, [deliveryPay, imageUrl, itemName, location, timeLimit])

    const post = () => {
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage("Hello")
      } else {
        alert({message: "eeeerrr"})
      }
    }
    return (
        <div>
        	<div id="map" style={{width:"500px", height:"900px"}}></div> 
          <button className='locationBtn' onClick={post}>
            <BiCurrentLocation size={30}/>
          </button>
        </div>
    )
}

export default App;