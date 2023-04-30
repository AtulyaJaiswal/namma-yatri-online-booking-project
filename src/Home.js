import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import "./Home.css";
import { toast } from "react-toastify";
import { verifyPhone } from "./firebase";
import Namma2 from "./Images/namma2.jpeg";
import axios from "axios";
import DetailCardSource from "./DetailCardSource.js";
import DetailCardDestination from "./DetailCardDestination.js";


mapboxgl.accessToken =
  "pk.eyJ1Ijoic2FoaWx0aGFrYXJlNTIxIiwiYSI6ImNrbjVvMTkzNDA2MXQydnM2OHJ6aHJvbXEifQ.z5aEqRBTtDMWoxVzf3aGsg";

const Home = () => {

     const mapContainer = useRef(null);
     const map = useRef(null);
     const [sourceAddress, setSourceAddress] = useState();
     const [destinationAddress, setDestinationAddress] = useState();
     const [sourceAddIsFocused, setSourceAddIsFocused] = useState(false);
     const [destinationAddIsFocused, setDestinationAddIsFocused] = useState(false);
     const [sourceAddressDetails, setSourceAddressDetails] = useState([]);
     const [destinationAddressDetails, setDestinationAddressDetails] = useState([]);
     const [lng, setLng] = useState(77.580643);
     const [lat, setLat] = useState(12.972442);
     const [number, setNumber] = useState();
     const [otp, setOtp] = useState();
     const [showNumber, setShowNumber] = useState(false);
     const [showOtp, setShowOtp] = useState(false);
     const [otpObj, setOtpObj] = useState("");
     const [showAddress, setShowAddress] = useState(true);
     const [sourceAddressMarker, setSourceAddressMarker] = useState(null);
     const [destinationAddressMarker, setDestinationAddressMarker] = useState(null);

     const bookRide = () => {
          // canCheckHereForAvailableDrivers
          // Book an auto
          toast.success("Ride Booked");
     }

     const setSourceAddressFromChild = (newAddress,newCenter) => {
          if(newCenter[0]<77.4 || newCenter[0]>77.8 || newCenter[1]<12.8 || newCenter[1]>13.1){
               return toast.error("We do not serve in this location");
          }
          setSourceAddress(newAddress);
          setSourceAddIsFocused(false);
          if(sourceAddressMarker!==null) sourceAddressMarker.remove();
          setSourceAddressMarker(new mapboxgl.Marker().setLngLat(newCenter).addTo(map.current));
     };

     const setDestinationAddressFromChild = (newAddress,newCenter) => {
          if(newCenter[0]<77.4 || newCenter[0]>77.8 || newCenter[1]<12.8 || newCenter[1]>13.1){
               return toast.error("We do not serve in this location");
          }
          setDestinationAddress(newAddress);
          setDestinationAddIsFocused(false);
          if(destinationAddressMarker!==null) destinationAddressMarker.remove();
          setDestinationAddressMarker(new mapboxgl.Marker({ color: 'black'}).setLngLat(newCenter).addTo(map.current));
     };

     const sendOtp = async (e) => {
          e.preventDefault();

          if(number.trim==="" || number===undefined || number.length!==10){
               return toast.error("Enter a proper phone number");
          }
          else{
               try {
                    toast.success("Sending OTP, please wait");
                    const response = await verifyPhone("+91"+number);
                    setShowNumber(false);
                    setShowOtp(true);
                    setOtpObj(response);
               } catch (error) {
                    toast.error("Not able to send otp. Please reload the page and try again.");
                    console.log(error);
               }
          }
     }
     const verifyOtp = async (e) => {
          e.preventDefault();
      
          if(otp.trim()==="" || otp==null){
              return toast.error("Fill the OTP field properly OTP");
          }
          try{
              await otpObj.confirm(otp);
              toast.success("OTP verified successfully");
              setShowOtp(false);
              setShowAddress(true);
              setMap();
          }catch(err){
              toast.error("Wrong OTP");
          }
     };

     const setMap = async () => {
          if (map.current) return;
          map.current = new mapboxgl.Map({
               container: mapContainer.current,
               style: 'mapbox://styles/mapbox/satellite-streets-v12',
               center: [lng,lat],
               zoom: 11,
          });            
     }

     useEffect(() => {
          setMap();
     },[showAddress,lng,lat]);

     useEffect(() => {
          axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${sourceAddress}.json?country=in&proximity=ip&types=address%2Cpoi&access_token=pk.eyJ1Ijoic2FoaWx0aGFrYXJlNTIxIiwiYSI6ImNrbjVvMTkzNDA2MXQydnM2OHJ6aHJvbXEifQ.z5aEqRBTtDMWoxVzf3aGsg`)
          .then(function (data){
               setSourceAddressDetails(data.data.features);
          })
          .catch(function (error){
               toast.error(error);
          })
     },[sourceAddress]);
     useEffect(() => {
          axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${destinationAddress}.json?country=in&proximity=ip&types=address%2Cpoi&access_token=pk.eyJ1Ijoic2FoaWx0aGFrYXJlNTIxIiwiYSI6ImNrbjVvMTkzNDA2MXQydnM2OHJ6aHJvbXEifQ.z5aEqRBTtDMWoxVzf3aGsg`)
          .then(function (data){
               setDestinationAddressDetails(data.data.features);
          })
          .catch(function (error){
               toast.error(error);
          })
     },[destinationAddress]);

     return (
          <div className='home'>
               <div className='home_map'>
                    {showAddress && 
                         <div ref={mapContainer} className='map-container' />
                    }
                    {!showAddress && 
                         <img
                              // ref={mapContainer}
                              className='map-container'
                              src={Namma2}
                              alt="Namma"
                         />
                    }
                    {showNumber && 
                         <div className='login_form'>
                              <input
                                   placeholder='Enter your phone number'
                                   type="number"
                                   required
                                   value={number}
                                   onChange={(e) => setNumber(e.target.value)}
                              />
                              <button onClick={sendOtp}>Send OTP</button>
                         </div> 
                    }
                    {showOtp && 
                         <div className='login_form'>
                              <input
                                   placeholder='Enter OTP'
                                   type="number"
                                   required
                                   value={otp}
                                   onChange={(e) => setOtp(e.target.value)}
                              />
                              <button onClick={verifyOtp}>Verify OTP</button>
                         </div> 
                    }  
                    {showAddress && 
                         <div className='login_form'>
                              <input
                                   placeholder='Source Address'
                                   required
                                   value={sourceAddress}
                                   onChange={(e) => setSourceAddress(e.target.value)}
                                   onFocus={() => setSourceAddIsFocused(true)}
                              />
                              {sourceAddIsFocused && sourceAddressDetails && 
                                   <div className='sourceAddDetails'>
                                        {sourceAddressDetails.map((detail, i) => (
                                             <div key={i}>
                                                  <DetailCardSource detail={detail} setSourceAddressFromChild={setSourceAddressFromChild}/>
                                             </div>
                                        ))}
                                   </div>
                              }
                              <input
                                   placeholder='Destination Address'
                                   required
                                   value={destinationAddress}
                                   onChange={(e) => setDestinationAddress(e.target.value)}
                                   onFocus={() => setDestinationAddIsFocused(true)}
                              />
                              {destinationAddIsFocused && destinationAddressDetails && 
                                        <div className='destinationAddDetails'>
                                        {destinationAddressDetails.map((detail, i) => (
                                             <div key={i}>
                                                  <DetailCardDestination detail={detail} setDestinationAddressFromChild={setDestinationAddressFromChild}/>
                                             </div>
                                        ))}
                                   </div>
                              }
                              <button onClick={bookRide}>Book Ride</button>
                         </div> 
                    }  
               </div>
               <div id="sign-in-phone-number"/>
          </div>
     )
}

export default Home