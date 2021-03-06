import React, { Component } from 'react';

import Navbar from './Navbar'
import Product from './Product'
import ShoppingCart from './ShoppingCart'

class App extends Component {
  state = {
    products: [],
    cartItems: []
  }

  handleAddItemToCart = product => {
    let cartItemsState = this.state.cartItems
    
    const alreadyExists = cartItemsState.some(
      cartItem => cartItem.product.id === product.id
    )

    if (alreadyExists) {
      cartItemsState = cartItemsState.map(cartItem => {
        if (cartItem.product.id === product.id) {
          cartItem.quantity = cartItem.quantity + 1
        }
        return cartItem
      })
    } else {
      cartItemsState.push({
        product: product,
        quantity: 1
      })
    }

    this.setState({ cartItems: cartItemsState })
  }

  handleRemoveFromCart = product => {
    const cartItemsState = this.state.cartItems

    const selectedItemIndex = cartItemsState.findIndex(cartItem => {
      return cartItem.product.id === product.id
    })

    const selectedItem = cartItemsState[selectedItemIndex]
    if (selectedItem.quantity > 1) {
      selectedItem.quantity--
    } else {
      cartItemsState.splice(selectedItemIndex, 1)
    }

    this.setState({ cartItems: cartItemsState })
  }

  componentDidMount() {
    fetch('https://product-list.glitch.me/')
      .then(res => {
        return res.json()
      })
      .then(data => {
        this.setState({ products: data })
      })
  }

  render() {
    return (
      <div className="container">
        <Navbar />
        <div className="columns">
          <div className="column is-two-thirds">
            <div>
              <h3 className="title">Our Products</h3>
              <div className="columns">
                {this.state.products.map(product => (
                  <Product key={product.id} product={product} onAddItemToCart={this.handleAddItemToCart} />
                ))}
              </div>
            </div>
          </div>
          <ShoppingCart cartItems={this.state.cartItems} onRemoveItemFromCart={this.handleRemoveFromCart} />
        </div>
      </div>
    );
  }
}

export default App;
