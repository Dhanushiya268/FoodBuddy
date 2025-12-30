import React, { useContext, useState, useRef, useEffect } from 'react'
import './Navbar.css'
import {assets, food_list} from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {

  const [menu, setMenu]=useState("home");
  const {getTotalCartAmount, token , setToken}= useContext(StoreContext);
  const navigate= useNavigate();
  const logout=()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(()=>{
    if(searchOpen){
      setTimeout(()=> inputRef.current && inputRef.current.focus(), 50);
    }
  },[searchOpen]);

  useEffect(()=>{
    if(!query){
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const res = food_list.filter(f=> f.name.toLowerCase().includes(q));
    setResults(res.slice(0,8));
  },[query]);

  useEffect(()=>{
    const onDocClick = (e)=>{
      if(containerRef.current && !containerRef.current.contains(e.target)){
        setSearchOpen(false);
      }
    }
    document.addEventListener('click', onDocClick);
    return ()=> document.removeEventListener('click', onDocClick);
  },[]);

  return (
    <div className='navbar'>
      <div className="container" style={{display:'flex', alignItems:'center', gap:20}}>
        <Link to='/'><h2 className="logo" style={{color:"#FF6B35", margin:"0", fontSize:"28px", fontWeight:"bold"}}>FoodBuddy</h2></Link>
        <ul className="navbar-menu">
         <Link to='/' onClick={()=> setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
         <Link to={'/#explore-menu'} onClick={()=> setMenu("menu")} className={menu==="menu"?"active":""}>Menu</Link>
         <Link to={'/#app-download'} onClick={()=> setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Mobile-app</Link>
         <Link to={'/#footer'} onClick={()=> setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact us</Link>
        </ul>
        <div style={{marginLeft:'auto'}} className="navbar-right" ref={containerRef}>
         <button className="search-toggle" onClick={()=> setSearchOpen(s=>!s)} aria-label="Open search">
           <img src={assets.search_icon} alt="search" />
         </button>
         {searchOpen && (
           <div className="search-container">
             <input ref={inputRef} value={query} onChange={(e)=> setQuery(e.target.value)} className="search-input" placeholder="Search food..." />
             {results.length>0 && (
               <ul className="search-results">
                 {results.map(r=> (
                   <li key={r._id} className="search-item" onClick={()=>{ setQuery(""); setSearchOpen(false); navigate(`/#food-${r._id}`); }}>
                     <img src={r.image} alt={r.name} />
                     <span>{r.name}</span>
                   </li>
                 ))}
               </ul>
             )}
           </div>
         )}
         <div className="navbar-search-icon">
           <Link to='/cart'><img src={assets.basket_icon} alt="cart" /></Link>
           <div className={getTotalCartAmount()===0?"":"dot"}></div>
         </div>
         {!token? <button onClick={()=>setShowLogin(true)}>Sign in</button>:
         <div className='navbar-profile'>
           <img src={assets.profile_icon} alt="" />
           <ul className="nav-profile-dropdown">
             <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
             <hr />
             <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
           </ul>

         </div>
         }
        </div>
      </div>
    </div>
  )
}

export default Navbar

