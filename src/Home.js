import React, { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios'

function Home() {

    const [data, setData] = useState({
        celcius:10,
        name: 'London',
        humidity:10,
        speed:2,
        image:'/images/clouds.png'
    })

    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleClick =  () => {
        if(name !== ""){
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=93215b327c644c570853d52dc39e8096&units=metric`;
            axios.get(apiUrl)
            .then(res => {
                let imagePath = '';
                if(res.data.weather[0].main === "Clouds"){
                    imagePath = "/images/clouds.png"
                }else if(res.data.weather[0].main === "Clear"){
                    imagePath = "/images/clear.png"
                }else if(res.data.weather[0].main === "Rain"){
                    imagePath = "/images/rain.png"
                }else if(res.data.weather[0].main === "Drizzle"){
                    imagePath = "/images/drizzle.png"
                }else if(res.data.weather[0].main === "Mist"){
                    imagePath = "/images/mist.png"
                }else{
                    imagePath = "/images/clouds.png"
                }
                setData({...data, celcius: res.data.main.temp, name:res.data.name, 
                    humidity:res.data.main.humidity, speed: res.data.wind.speed, image: imagePath})
                    setError('');
            })
            .catch(err => {
                if(err.response.status === 404){
                    setError("Invalid City Name")
                }else{
                    setError('');
                }
                console.log(err)
            });
        }
    }

  return (
    <div className='container'>
        <div className='weather'>
            <div className='search'>
                <input type='text' placeholder='Enter city name' onChange={e => setName(e.target.value)}/>
                <button><img src='/images/search.png' onClick={handleClick} alt='' /></button>
            </div>
            <div className="error">
                <p>{error}</p>
            </div>
            <div className="winfo">
                <img src={data.image} alt='' className='image'></img>
                <h1>{Math.round(data.celcius)}°c</h1>
                <h2>{data.name}</h2>
                <div className="details">
                    <div className="col">
                        <img src='/images/humidity.png' alt=''></img>
                        <div className='humidity'>
                            <p>{Math.round(data.humidity)}%</p>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className="col">
                        <img src='/images/wind.png' alt=''></img>
                        <div className='wind'>
                            <p>{Math.round(data.speed)}km/h</p>
                            <p>wind</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home