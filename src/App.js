/*global kakao*/ 
import React, { useEffect, useState } from 'react'
import './App.css'
import {BiCurrentLocation} from "react-icons/bi"
import { firestore } from './firebase'

const App=()=>{
  const [location, setLocation] = useState("")
  const [deliveryPay, setDeliveryPay] = useState(0)
  
  useEffect(()=>{
    const post = firestore.collection("posts")
    console.log(post.doc())
<<<<<<< HEAD
    post.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setDeliveryPay(doc.data().deliveryPay)
        setLocation(doc.data().location)
      })
=======
    post.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data())
      });
>>>>>>> d9d728a30fe5b876124b60ae9756450c924fb531
    })

    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3
    };
    var map = new kakao.maps.Map(container, options);
    var markerPosition  = new kakao.maps.LatLng(37.365264512305174, 127.10676860117488); 

    var markerContent = document.createElement('div');

    markerContentCustom(deliveryPay)

    function markerContentCustom(deliveryPay){
      markerContent.className = "marker";
      markerContent.innerHTML = `<span style="color:black; font-size: 11px">${deliveryPay}</span>`;
    }

    var marker = new kakao.maps.CustomOverlay({
      position: markerPosition,
      content: markerContent
    });
  
    function closeOverlay() {
      document.querySelector("div.marker").style.background = "#ffffff";
      infoOverlay.setMap(null);
    };

    function submitReq() {
      document.querySelector("div.marker").style.background = "#ffffff";
      infoOverlay.setMap(null);
    }

    var infoContent ='<div class="overlaybox">'+
        '	<div style="align-items: center">'+
        '		<span style="float:left;padding-right:5px;margin-bottom:11px">위치</span>'+
        `		<div style="align-items: stretch;padding: 4px;background-color:#fff;text-align: left;float:left;margin-bottom:11px">${location}</div>`+
        '	</div>'+
        '	<div style="align-items: center;">'+
        '		<span style="padding-right:5px;float:left;margin-bottom:11px">시간</span>'+
        '		<div style="align-items: stretch;padding: 4px;background-color:#fff;text-align: left; float:left;margin-bottom:11px">1시간 이내</div>'+
        '	</div>'+
        '	<div style="align-items: center;">'+
        '		<span style="padding-right:5px;float:left;margin-bottom:11px">가격</span>'+
        '		<div style="align-items: stretch;padding: 4px;background-color:#fff;text-align: left; float:left;margin-bottom:11px">1,000</div>'+
        '	</div>'+
        '	<div style="align-items: center;">'+
        '		<span style="padding-right:5px;float:left;margin-bottom:11px;">정보</span>'+
        '		<div style="align-items: stretch;padding: 4px;background-color:#fff;text-align: left; float:left;margin-bottom:11px">생수</div>'+
        '	</div>'+
        '	<hr/>'+
        '	<div style="align-items: center;">'+
        '		<span style="padding-right:5px;float:left;margin-bottom:11px;">배송 예상 시간</span>'+
        '		<input type="text" style="align-items: stretch; padding: 4px;background-color:#fff;text-align: left; float:left; margin-bottom:11px;border-width:0; font-size: 15px"/>'+
        '	</div>'+
        '	<div style="align-items: center; width: 270px">'+
        '		<span style="padding-right:5px;margin-bottom:11px;float:left;">현재 위치</span>'+
        '		<div style="align-items: center; width: 204px">'+
        '			<input type="text" style="width:100%; padding: 4px;background-color:#fff;text-align: left; float:left; margin-bottom:11px;border-width:0; font-size: 15px"/>'+
        '			<button style="float:left;">'+
        '				<i class="fa-solid fa-location-crosshairs"></i>'+
        '			</button>'+
        '		</div>'+
        '	</div>'+
        '	<div style="flex-direction:row; justify-content:space-evenly;">'+
        '		<button onclick="closeOverlay()" style="float:left; background: #F0F0F0;border-radius: 10px;width:105px;height:25px;border-width:0;margin-left:20px;margin-right:35px">나가기</button>'+
        '		<button onclick="submitReq()" style="float:left; background: #D5F999;border-radius: 10px;width:105px;height:25px;border-width:0;">매칭 요청</button>'+
        '	</div>'+
        '</div>';

    var infoOverlay = new kakao.maps.CustomOverlay({
      content: infoContent,
      position: marker.getPosition(),
    })

    markerContent.addEventListener('click', function() {
      document.querySelector("div.marker").style.background = "#E8FFC1";
      infoOverlay.setMap(map);
    });

    
  marker.setMap(map);
    }, [])

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