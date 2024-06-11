
import { useState } from 'react'
import {
  Radio,
  RadioGroup,
} from '@headlessui/react'

import { CheckCircleIcon } from '@heroicons/react/20/solid'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import Modal from '../modal/Modal'

const deliveryMethods = [
  { id: 1, title: 'Standard', turnaround: '4–10 business days', price: '$5.00' },
  { id: 2, title: 'Express', turnaround: '2–5 business days', price: '$16.00' },
]
const paymentMethods = [
  { id: 'credit-card', title: 'Credit card' },
  { id: 'debit-card', title: 'Debit card' },
  { id: 'onDelivery', title: 'cash On Delivery' },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CheckoutView() {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(deliveryMethods[0])
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0].id)
  const [formDetails, setFormDetails] = useState({
    email: "",
    firstName: '',
    lastName: '',
    address:"",
    apartment:"",
    city: "",
    state: "",
    postalCode: "",
    phone:"",
    cardNumber: "",
    cardName: "",
    expirationDate:"",
    cvc: "",
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const handleChange = (e) => {
   const {name,value}=e.target;
   setFormDetails({
    ...formDetails,
    [name]:value
   })
  }

  const validateForm = () => {
    const errors = {}
    const requiredFields = [
      'email',
      'firstName',
      'lastName',
      'address',
      'city',
      'state',
      'postalCode',
      'phone',
    ]

    if (selectedPaymentMethod === ('credit-card'|| 'debit-card')) {
      requiredFields.push('cardNumber', 'cardName', 'expirationDate', 'cvc')
    }

    requiredFields.forEach(field => {
      if (!formDetails[field]) {
        errors[field] = 'This field is required'
      }
    })

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (validateForm()){
      setIsModalOpen(true)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className="bg-gray-50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h1 className="sr-only">Checkout</h1>

          <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16" onSubmit={handleSubmit}>
            <div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">Contact information</h2>

                <div className="mt-4">
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email-address"
                      name="email"
                      autoComplete="email"
                      value={formDetails.email}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg pt-1 pl-2 pb-1"
                      
                    />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">Shipping information</h2>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      First name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="first-name"
                        name="firstName"
                        autoComplete="given-name"
                        value={formDetails.firstName}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg pt-1 pl-2 pb-1"
                      />
                      {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="last-name"
                        name="lastName"
                        value={formDetails.lastName}
                        onChange={handleChange}
                        autoComplete="family-name"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg pt-1 pl-2 pb-1"
                      />
                      {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="address"
                        id="address"
                        value={formDetails.address}
                        onChange={handleChange}
                        autoComplete="street-address"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg pt-1 pl-2 pb-1"
                      />
                      {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">
                      Apartment, suite, etc.
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="apartment"
                        id="apartment"
                        onChange={handleChange}
                        value={formDetails.apartment}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg pt-1 pl-2 pb-1"
                      />
                      {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.apartment}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="city"
                        id="city"
                        value={formDetails.city}
                        onChange={handleChange}
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg pt-1 pl-2 pb-1"
                      />
                      {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                      State / Province
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="state"
                        id="region"
                        value={formDetails.state}
                        onChange={handleChange}
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg pt-1 pl-2 pb-1"
                      />
                      {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.state}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                      Postal code
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="postalCode"
                        id="postal-code"
                        value={formDetails.postalCode}
                        onChange={handleChange}
                        autoComplete="postal-code"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg pt-1 pl-2 pb-1"
                      />
                      {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.postalCode}</p>}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={formDetails.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg pt-1 pl-2 pb-1"
                      />
                      {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">Delivery method</h2>

                <fieldset aria-label="Delivery method" className="mt-4">
                  <RadioGroup
                    value={selectedDeliveryMethod}
                    onChange={setSelectedDeliveryMethod}
                    className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4"
                  >
                    {deliveryMethods.map((deliveryMethod) => (
                      <Radio
                        key={deliveryMethod.id}
                        value={deliveryMethod}
                        aria-label={deliveryMethod.title}
                        aria-description={`${deliveryMethod.turnaround} for ${deliveryMethod.price}`}
                        className={({ checked, focus }) =>
                          classNames(
                            checked ? 'border-transparent' : 'border-gray-300',
                            focus ? 'ring-2 ring-indigo-500' : '',
                            'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                          )
                        }
                      >
                        {({ checked, focus }) => (
                          <>
                            <span className="flex flex-1">
                              <span className="flex flex-col">
                                <span className="block text-sm font-medium text-gray-900">{deliveryMethod.title}</span>
                                <span className="mt-1 flex items-center text-sm text-gray-500">
                                  {deliveryMethod.turnaround}
                                </span>
                                <span className="mt-6 text-sm font-medium text-gray-900">{deliveryMethod.price}</span>
                              </span>
                            </span>
                            {checked ? (
                              <CheckCircleIcon className="h-5 w-5 text-indigo-600" aria-hidden="true" />
                            ) : null}
                            <span
                              className={classNames(
                                checked ? 'border-indigo-500' : 'border-transparent',
                                focus ? 'border' : 'border-2',
                                'pointer-events-none absolute -inset-px rounded-lg'
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>

              {/* Payment */}
              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">Payment</h2>

                <fieldset className="mt-4">
                  <legend className="sr-only">Payment type</legend>
                  <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                    {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                      <div key={paymentMethod.id} className="flex items-center">
                        <input
                          id={paymentMethod.id}
                          name="payment-type"
                          type="radio"
                          checked={selectedPaymentMethod === paymentMethod.id}
                          onChange={() => setSelectedPaymentMethod(paymentMethod.id)}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={paymentMethod.id} className="ml-3 block text-sm font-medium text-gray-700">
                          {paymentMethod.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
                
                {(selectedPaymentMethod === 'credit-card' || selectedPaymentMethod === 'debit-card') && (
                  <div className="mt-6 grid grid-cols-4 gap-x-4 gap-y-6">
                    <div className="col-span-4">
                      <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                        Card number
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="card-number"
                          name="cardNumber"
                          value={formDetails.cardNumber}
                          onChange={handleChange}
                          autoComplete="cc-number"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg pt-1 pl-2 pb-1"
                        />
                        {formErrors.cardNumber && <p className="text-red-500 text-xs mt-1">{formErrors.cardNumber}</p>}
                      </div>
                    </div>

                    <div className="col-span-4">
                      <label htmlFor="name-on-card" className="block text-sm font-medium text-gray-700">
                        Name on card
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="name-on-card"
                          name="cardName"
                          value={formDetails.cardName}
                          onChange={handleChange}
                          autoComplete="cc-name"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg pt-1 pl-2 pb-1"
                        />
                        {formErrors.cardName && <p className="text-red-500 text-xs mt-1">{formErrors.cardName}</p>}
                      </div>
                    </div>

                    <div className="col-span-3">
                      <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                        Expiration date (MM/YY)
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="expirationDate"
                          id="expiration-date"
                          value={formDetails.expirationDate}
                          onChange={handleChange}
                          autoComplete="cc-exp"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg pt-1 pl-2 pb-1"
                        />
                        {formErrors.expirationDate && <p className="text-red-500 text-xs mt-1">{formErrors.expirationDate}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                        CVC
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="cvc"
                          id="cvc"
                          value={formDetails.cvc}
                          onChange={handleChange}
                          autoComplete="csc"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg pt-1 pl-2 pb-1"
                        />
                        {formErrors.cvc && <p className="text-red-500 text-xs mt-1">{formErrors.cvc}</p>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <button
                        type="submit"
                        className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                      >
                        Confirm order
                      </button>
                  </div>
            </div>
          </form>
        </div>
      </main>
       {isModalOpen && <Modal closeModal={closeModal} />}
      <Footer/>
    </div>
  )
}
