import React, {useState, useEffect} from "react"
import {commerce} from "./lib/commerce"
//import Products from "./components/products/Products"
//import Navbar from "../src/components/Navbar/Navbar"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { Products, Navbar, Cart, Checkout} from "./components"


const App = () => {
   
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    
  
    const fetchProducts = async () => {
      const { data } = await commerce.products.list();
  
      setProducts(data);
    };
  
    const fetchCart = async () => {
      setCart(await commerce.cart.retrieve());
    };
  
    const handleAddToCart = async (productId, quantity) => {
      const response = await commerce.cart.add(productId, quantity);
  
      setCart(response.cart);
    };

    const handleUpdateCartQty = async (lineItemId, quantity) => {
      const response = await commerce.cart.update(lineItemId, { quantity });
  
      setCart(response.cart);
    };
  
    const handleRemoveFromCart = async (lineItemId) => {
      const response = await commerce.cart.remove(lineItemId);
  
      setCart(response.cart);
    };
  
    const handleEmptyCart = async () => {
      const response = await commerce.cart.empty();
  
      setCart(response.cart);
    };
    useEffect(()=>{
        fetchProducts()
        fetchCart()
    }, [])
    console.log(cart)

    
    return(
        <Router>
            <div>
                <Navbar  totalItems={cart.total_items}/>

                <Switch>
                    <Route exact path="/">
                    <Products products={products} onAddToCart={handleAddToCart}/>
                    </Route>

                    <Route exact path="/cart">
                    <Cart cart={cart}
                    handleUpdateCartQty={handleUpdateCartQty}
                    handleRemoveFromCart={handleRemoveFromCart}
                    handleEmptyCart={handleEmptyCart} />   
                    </Route> 

                    <Route exact path="/checkout">
                      <Checkout />
                    </Route>
                </Switch>
                
            </div>

        </Router>
      
    )
}


export default App




