import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import { food_list as static_food_list } from '../../assets/assets'

const FoodDisplay = ({category}) => {
  const {food_list}=useContext(StoreContext);

  const itemsToShow = (food_list && food_list.length>0) ? food_list : static_food_list;

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {itemsToShow.map((item)=>{
          if(category==="All"|| category===item.category){
            return (
              <FoodItem
                key={item._id}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            )
          }
          return null;
        })}

        {itemsToShow.filter(i => category === 'All' || i.category === category).length === 0 && (
          <p className="food-display-empty">No items available.</p>
        )}

      </div>

    </div>
  )
}

export default FoodDisplay