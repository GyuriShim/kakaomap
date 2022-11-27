/*global kakao*/ 
import React, { useCallback, useEffect, useState } from 'react'
import './App.css'
import {BiCurrentLocation} from "react-icons/bi"
import { firestore } from './firebase'
import { getLocation } from './components/getLocation'
import axios from 'axios'
import { createMatching } from './lib/maching'
import { ToastNotification } from './components/ToastNotification'

const App=()=>{
  const [user, setUser] = useState({})
  let current = ""
  let coordinate = {latitude: 37.4019822, longitude: 126.9218479};
  
  const [posts, setPosts] = useState([])
  //let [toastState, setToastState] = useState(false);
  let toastState = false;
  const onMessageHandler = (e) => {
    const event = JSON.parse(e.data)
    console.log(event)
    setUser(event)
  }

  const submit = useCallback(async(deliveryTime, address, coordinate, postId) => {
    try {
        console.log("deliveryTime: ", deliveryTime)
        console.log("user", user)
      await createMatching({user, coordinate, address, deliveryTime, postId})
    } catch (error) {
      console.log(error)
    }
  }, [user])

  useEffect(() => {
    let post = firestore.collection("posts").orderBy("createdAt", "asc").onSnapshot((snapshot) => {
      const list = []
      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          ...doc.data()
        })
      })
      setPosts(list)
    })
    return () => post()
    
  },[])

  useEffect(()=>{
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(37.3227831, 127.12505),
      level: 3
    };
    var map = new kakao.maps.Map(container, options);

    for (let i = 0; i < posts.length; i++) {
      var data = posts[i]
      displayMarker(data)
    }
        
    document.addEventListener("message", onMessageHandler)

    function displayMarker(data){
      let imageUrl = data.imageUrl
      let location = data.location
      let deliveryPay = data.deliveryPay
      let timeLimit = data.timeLimit
      let itemName = data.itemName
      let postId = data.id
      let deliveryTime = ""
      let writerEmail = data.user.email
      
      coordinate = {latitude: data.coordinate.latitude, longitude: data.coordinate.longitude};

      var markerPosition = new kakao.maps.LatLng(coordinate.latitude, coordinate.longitude);

      var markerContent = document.createElement('div');
      markerContent.className = "marker";
      markerContent.innerHTML = `<span style="color:black; font-size: 15px; padding: 5px">${deliveryPay}</span>`;
      
      console.log(deliveryPay)
      var marker = new kakao.maps.CustomOverlay({
          position: markerPosition,
          content: markerContent
      });

      marker.setMap(map);

      var infoOverlay = new kakao.maps.CustomOverlay({
          position: marker.getPosition(),
          map: null
      })

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

      var deliveryExTime = document.createElement("span")
      deliveryExTime.className = "label"
      deliveryExTime.innerHTML = "배송 예상 시간"

      var deliveryTimeInputBox = document.createElement("input")
      deliveryTimeInputBox.className = "deliveryExTime"
      deliveryTimeInputBox.id = "deliveryExTime"

      deliveryTimeInnerContent.append(deliveryExTime, deliveryTimeInputBox)

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
      if(writerEmail == user.email){
        submitBtn.disabled = true
      }

      btnInnerContent.append(closeBtn, submitBtn)

      content.append(locInnerContent,timeInnerContent,payInnerContent,itemInnerContent,image,line,deliveryTimeInnerContent,currentLocInnerContent,btnInnerContent)

      closeBtn.addEventListener("click", function(){
        document.getElementById("deliveryExTime").value = ""
        current = ""
        currentLocInputBox.innerHTML = current
        infoOverlay.setMap(null);
      })
  
      submitBtn.addEventListener("click", function() {
        deliveryTime = document.getElementById("deliveryExTime").value
        current = document.getElementById("currentBox").innerHTML
        
        submit(deliveryTime, current, coordinate, postId)
        document.getElementById("deliveryExTime").value = ""
        current = ""
        currentLocInputBox.innerHTML = current
        infoOverlay.setMap(null);
      })
  
      btn.addEventListener("click", async function() {
        const {latitude, longitude} = await getLocation()
        coordinate = {latitude, longitude};
        try {
          await axios({
            url: `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}&input_coord=WGS84`,
            method: "GET",
            headers: {
              "Authorization": "KakaoAK fb19fa5cfc0965a490753b8e7ac7898f"
            }
          }).then((response) => {
            console.log(response)
            const locationData = response.data.documents[0]
            console.log(locationData)
            current = 
              locationData.address.region_2depth_name + " " + locationData.address.region_3depth_name + " " +
              locationData.address.main_address_no + "-" + locationData.address.sub_address_no
            currentLocInputBox.innerHTML = current
          })
        } catch (error) {
          console.log(error)
        }
      })
  

      infoOverlay.setContent(content)
      
      markerContent.addEventListener('click', function() {
        //payInfoBox.innerHTML = `${deliveryPay}`
        infoOverlay.setMap(map);

      });
    }

    
    async function panTo() {
        const coords = await getLocation()
        var moveLatLon = new kakao.maps.LatLng(coords.latitude, coords.longitude)
        map.panTo(moveLatLon)
    }

    var currentLocationButton = document.querySelector(".locationBtn")
    currentLocationButton.addEventListener("click", panTo)

    })

    return (
        <div>
        	<div id="map" style={{width:"500px", height:"900px"}}>
            <button className='locationBtn' >
              <BiCurrentLocation size={30}/>
            </button>
          </div> 
          
        </div>
    )
}

export default App;

