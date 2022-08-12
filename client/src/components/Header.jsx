import React, { useContext } from 'react'
import { RestaurantsContext } from '../context/RestaurantsContext';

const Header = () => {
  const { hamburgerOpen, setHamburgerOpen } = useContext(RestaurantsContext)  

  return (
    <>
      <div className="text-left pl-4 pt-3">
        <h2 className="display-4 font-weight-bold " style={{ color: '#ff3547' }}>ATX Eats</h2>
        <h2 className="font-weight-bold display-5 pb-2" style={{ color: 'white' }}>Eat. Review. Repeat. 🍔</h2>
        <button onClick={() => setHamburgerOpen(!hamburgerOpen)} type="button" class="btn btn-lg btn-danger px-3"><i class="fas fa-list" aria-hidden="true"></i></button>
      </div>
    </>
  )
}

export default Header
