/*global kakao*/ 
import React, { useCallback, useEffect, useState } from 'react'
import './App.css'
import {BiCurrentLocation} from "react-icons/bi"
import { firestore } from './firebase'
import { getLocation } from './components/getLocation'
import axios from 'axios'
import { createMatching } from './lib/maching'

const App=()=>{
  const [location, setLocation] = useState("")
  const [deliveryPay, setDeliveryPay] = useState(0)
  const [imageUrl, setImageUrl] = useState("")
  const [itemName, setItemName] = useState("")
  const [timeLimit, setTimeLimit] = useState("")
  //const [coordinate, setCoordinate] = useState({})
  const [address, setAddress] = useState("")
  const [postId, setPostId] = useState("")
  const user = "user"
  let deliveryTime = 0
  let current = ""
  let coordinate = {latitude: 37.4019822, longitude: 126.9218479};
  const [posts, setPosts] = useState([])

  const onMessageHandler = (e) => {
    const event = JSON.parse(e.data)
    console.log(event)
  }

  const submit = useCallback(async(deliveryTime, address, coordinate) => {
    try {
        console.log("deliveryTime: ", deliveryTime)
      await createMatching({user, coordinate, address, deliveryTime, postId})
    } catch (error) {
      console.log(error)
    }
  }, [user, coordinate, address, deliveryTime, postId])

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
        setDeliveryPay(list[1].deliveryPay)
        setLocation(list[1].location)
        setTimeLimit(list[1].timeLimit)
        setItemName(list[1].itemName)
        setImageUrl(list[1].imageUrl)
        setPostId(list[1].id)
      }
    })
   
    return () => post()
    
  },[])

  useEffect(()=>{
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(37.4019822, 126.9218479),
      level: 3
    };
    var map = new kakao.maps.Map(container, options);
    var markerPosition = new kakao.maps.LatLng(37.4019822, 126.9218479); 

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
    deliveryTimeInputBox.id = "deliveryTime"
    
    deliveryTimeInnerContent.append(deliveryTime, deliveryTimeInputBox)

    var currentLocInnerContent = document.createElement("div")
    currentLocInnerContent.className = "innerContent"

    var currentLoc = document.createElement("span")
    currentLoc.className = "label"
    currentLoc.innerHTML = "현재 위치"

    var currentLocInputBox = document.createElement("div")
    currentLocInputBox.className = "currentBox"
    currentLocInputBox.innerHTML = current
    currentLocInputBox.id = "currentBox"

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
      document.getElementById("deliveryTime").value = ""
      current = ""
      currentLocInputBox.innerHTML = current
      document.querySelector("div.marker").style.background = "#ffffff";
      infoOverlay.setMap(null);
    })

    submitBtn.addEventListener("click", function() {
      deliveryTime = document.getElementById("deliveryTime").value
      current = document.getElementById("currentBox").innerHTML
      
      submit(deliveryTime, current, coordinate)
      document.getElementById("deliveryTime").value = ""
      current = ""
      currentLocInputBox.innerHTML = current
      document.querySelector("div.marker").style.background = "#ffffff";
      infoOverlay.setMap(null);
      
    })

    btn.addEventListener("click", async function() {
      const {latitude, longitude} = await getLocation()
      /*setCoordinate({
        latitude,
        longitude
      })*/
      coordinate = {latitude, longitude};
      try {
        await axios({
          url: `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}&input_coord=WGS84`,
				  method: "GET",
				  headers: {
					  "Authorization": "KakaoAK 535ef2884fbade72a8ae2b063fe0bd55"
				  }
			  }).then((response) => {
				  console.log(response)
				  const locationData = response.data.documents[0]
				  console.log(locationData)
          current = 
            locationData.address.region_2depth_name + " " + locationData.address.region_3depth_name + " " +
            locationData.address.main_address_no + "-" + locationData.address.sub_address_no
          setAddress(current)
          currentLocInputBox.innerHTML = current
        })
      } catch (error) {
        console.log(error)
      }
    })

  marker.setMap(map);
    }, [deliveryPay, imageUrl, itemName, location, timeLimit])

    async function panTo() {
      const coords = await getLocation()
      var moveLatLon = new kakao.maps.LatLng(coords.latitude, coords.longitude)

      var options = {
        center: moveLatLon,
        level: 3
      };

      var map = new kakao.maps.Map(document.getElementById('map'), options)
    }

    const post = () => {
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage("Hello")
      } else {
        alert({message: "eeeerrr"})
      }
    }
    
    return (
        <div>
        	<div id="map" style={{width:"500px", height:"900px"}}>
            <button className='locationBtn' onClick={panTo}>
              <BiCurrentLocation size={30}/>
            </button>
          </div> 
          
        </div>
    )
}

export default App;
