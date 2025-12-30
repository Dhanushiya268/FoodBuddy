import React, { useState, useEffect } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import { useLocation } from 'react-router-dom'
const Home = () => {
  const [category, setCategory]=useState("All");
  const location = useLocation();

  useEffect(()=>{
    if(location.hash){
      const id = location.hash.replace('#','');
      const el = document.getElementById(id);
      if(el){
        setTimeout(()=> el.scrollIntoView({behavior:'smooth'}), 50);
      }
    }
  },[location]);

  return (
    <div>
      <div className="container">
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category}/>
        <AppDownload/>
      </div>
    </div>
  )
}

export default Home
