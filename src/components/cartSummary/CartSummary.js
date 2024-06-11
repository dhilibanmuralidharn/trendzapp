import React, { useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import TrendzContext from '../../context/TrendzContext'
import {QuestionMarkCircleIcon} from '@heroicons/react/20/solid'

const CartSummary = () => {
    const navigate = useNavigate()
    const clickToCheckOut = () => {
        navigate("/check")
    }
    const { cartList} = useContext(TrendzContext)
    const calculateSubtotal = () => {
        return cartList.reduce((acc, item) => acc + item.price * item.quantity, 0)
      }
    
      const calculateTax = (subtotal) => {
        const taxRate = 0.08
        return subtotal * taxRate
      }
    
      const calculateShipping = () => {
        const shippingRate = 5.00
        return shippingRate
      }
    
      const subtotal = calculateSubtotal()
      const tax = calculateTax(subtotal)
      const shipping = calculateShipping()
      const total = subtotal + tax + shipping
  return (
    <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
            >
              <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                Order summary
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex items-center text-sm text-gray-600">
                    <span>Shipping estimate</span>
                    <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Learn more about how shipping is calculated</span>
                      <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">${shipping.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex text-sm text-gray-600">
                    <span>Tax estimate</span>
                    <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Learn more about how tax is calculated</span>
                      <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">${tax.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">Order total</dt>
                  <dd className="text-base font-medium text-gray-900">${total.toFixed(2)}</dd>
                </div>
              </dl>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  onClick={clickToCheckOut}
                >
                  Checkout
                </button>
              </div>
            </section>
  )
}

export default CartSummary