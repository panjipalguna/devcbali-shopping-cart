import React from 'react'

import Price from './Price'

function ShoppingCart(props) {
  const totalPrice = props.cartItems.reduce((carrier, cartItem) => {
    return carrier + (cartItem.quantity * cartItem.product.price)
  }, 0)

  return (
    <div className="column">
      <h3 className="title is-4">Shopping Cart</h3>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {props.cartItems.map((cartItem, index) => (
            <tr key={index}>
              <td>{cartItem.product.name}</td>
              <td><Price value={cartItem.product.price} /></td>
              <td>{cartItem.quantity}</td>
              <td>
                <button className="button is-danger is-small" onClick={event => {
                  event.preventDefault()
                  props.onRemoveItemFromCart(cartItem.product)
                  }}
                >
                  -
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total : Rp <Price value={totalPrice} /></h3>
    </div>
  )
}

export default ShoppingCart