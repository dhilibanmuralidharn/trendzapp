import React, { useContext } from "react";
import TrendzContext from "../../context/TrendzContext";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import "./CartListView.css";
import CartSummary from "../cartSummary/CartSummary";

const CartListView = () => {
  const {
    cartList,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItem,
  } = useContext(TrendzContext);

  const handleDecreamentQuantity = (id) => {
    decrementCartItemQuantity(id);
  };

  const handleIncrementQuantity = (id) => {
    incrementCartItemQuantity(id);
  };

  const handleRemoveCartItem = (id) => {
    removeCartItem(id);
  };
  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul
                role="list"
                className="divide-y divide-gray-200 border-b border-t border-gray-200"
              >
                {cartList.map((product, productIdx) => (
                  <li key={product.id} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <p className="font-medium text-gray-700 hover:text-gray-800">
                                {product.title}
                              </p>
                            </h3>
                          </div>
                          <div className="mt-1 flex text-sm">
                            <p className="text-gray-500">
                              Quantity: {product.quantity}
                            </p>
                          </div>
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            Price : $ {product.price}
                          </p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <label
                            htmlFor={`quantity-${productIdx}`}
                            className="sr-only"
                          >
                            Quantity, {product.title}
                          </label>
                          <div className="card">
                            <button
                              type="button"
                              onClick={() =>
                                handleDecreamentQuantity(product.id)
                              }
                            >
                              -
                            </button>
                            <p>{product.quantity}</p>
                            <button
                              type="button"
                              onClick={() =>
                                handleIncrementQuantity(product.id)
                              }
                            >
                              +
                            </button>
                          </div>

                          <div className="absolute right-0 top-0">
                            <button
                              type="button"
                              className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => handleRemoveCartItem(product.id)}
                            >
                              <span className="sr-only">Remove</span>
                              <XMarkIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                        <CheckIcon
                          className="h-5 w-5 flex-shrink-0 text-green-500"
                          aria-hidden="true"
                        />
                        In stock
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Order summary */}
            <CartSummary />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CartListView;
