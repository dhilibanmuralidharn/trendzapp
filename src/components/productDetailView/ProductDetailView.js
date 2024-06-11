import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/20/solid'
import { CurrencyDollarIcon, GlobeAmericasIcon } from '@heroicons/react/24/outline'
import './ProductDetailView.css'
import TrendzContext from '../../context/TrendzContext'

import Footer from '../footer/Footer'
import Header from '../header/Header';

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

const policies = [
    { name: 'International delivery', icon: GlobeAmericasIcon, description: 'Get your order in 2 years' },
    { name: 'Loyalty rewards', icon: CurrencyDollarIcon, description: "Don't look at other tees" },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetailView() {
    const [productData, setProductData] = useState(null)
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
    
    const { id } = useParams()
    const {cartList, addCartItem, incrementCartItemQuantity, decrementCartItemQuantity} = useContext(TrendzContext)

    useEffect(() => {
        const getProductData = async () => {
            try {
                setApiStatus(apiStatusConstants.inProgress)
                const apiUrl = `https://fakestoreapi.com/products/${id}`
                const response = await fetch(apiUrl)
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()
                console.log(data)
                if (data) {
                    const updatedData = {
                        id: data.id,
                        title: data.title,
                        price: data.price,
                        description: data.description,
                        category: data.category,
                        image: data.image,
                        rating: data.rating.rate,
                        count: data.rating.count,
                    }
                    setProductData(updatedData)
                    setApiStatus(apiStatusConstants.success)
                } else {
                    setApiStatus(apiStatusConstants.failure)
                }
            } catch (error) {
                console.log(error)
                setApiStatus(apiStatusConstants.failure)
            }
        }
        getProductData()
    }, [id])

    const exisitingCartItem = cartList.find(item => item.id === productData?.id)
    const initialQuantity = exisitingCartItem ? exisitingCartItem.quantity : 0

    const [quantity, setQuantity] = useState(initialQuantity)

    const clickToAddCart = (event) => {
        setQuantity(1)
        event.preventDefault()
        addCartItem({...productData, quantity: 1})
    }

    const decreaseItemQuantity = (id) =>{
        if (quantity > 1){
            const newQuantity = quantity - 1
            setQuantity(newQuantity)
        }
        decrementCartItemQuantity(id)        
    }

    const increaseItemQuantity = (id) => {
        const newQuantity = quantity + 1
        setQuantity(newQuantity)
        incrementCartItemQuantity(id)
    }

    const renderSuccessView = () =>(
        <div className="bg-white">
                <div className="pb-16 pt-6 sm:pb-24">
                    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <ol role="list" className="flex items-center space-x-4">
                            <li key={productData?.id}>
                                <div className="flex items-center">
                                    <p className="mr-4 text-sm font-medium text-gray-900">
                                        {productData?.category}
                                    </p>
                                    <svg viewBox="0 0 6 20" aria-hidden="true" className="h-5 w-auto text-gray-300">
                                        <path d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z" fill="currentColor" />
                                    </svg>
                                </div>
                            </li>

                            <li className="text-sm">
                                <p href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                    {productData?.title}
                                </p>
                            </li>
                        </ol>
                    </nav>
                    <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
                            <div className="lg:col-span-5 lg:col-start-8">
                                <div className="flex justify-between">
                                    <h1 className="text-xl font-medium text-gray-900">{productData?.title}</h1>
                                    <p className="text-xl font-medium text-gray-900">${productData?.price}</p>
                                </div>
                                {/* Reviews */}
                                <div className="mt-4">
                                    <h2 className="sr-only">Reviews</h2>
                                    <div className="flex items-center">
                                        <p className="text-sm text-gray-700">
                                            {productData?.rating}
                                            <span className="sr-only"> out of 5 stars</span>
                                        </p>
                                        <div className="ml-1 flex items-center">
                                            {[0, 1, 2, 3, 4].map((rating) => (
                                                <StarIcon
                                                    key={rating}
                                                    className={classNames(
                                                        productData?.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                                                        'h-5 w-5 flex-shrink-0'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            ))}
                                        </div>
                                        <div aria-hidden="true" className="ml-4 text-sm text-gray-300">
                                            ·
                                        </div>
                                        <div className="ml-4 flex">
                                            <p className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                                See all {productData?.count} reviews
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Image gallery */}
                            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-5 lg:row-start-1 lg:mt-0">
                                <h2 className="sr-only">Images</h2>
                                <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-4 lg:gap-8">
                                    <img
                                        key={productData?.id}
                                        src={productData?.image}
                                        alt={productData?.title}
                                        className="rounded-lg lg:col-span-2 lg:row-span-4"
                                    />
                                </div>
                            </div>

                            <div className="mt-8 lg:col-span-5">
                                <div className='quantity-container'>
                                    <h4>Quantity : </h4>
                                    <button onClick={() => decreaseItemQuantity(productData?.id)}>
                                        -
                                    </button>
                                    <p>{quantity}</p>
                                    <button onClick={() => increaseItemQuantity(productData?.id)}>
                                        +
                                    </button>
                                </div>
                                <form>                                
                                    <button
                                        type="submit"
                                        className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={clickToAddCart}
                                    >
                                        Add to cart
                                    </button>
                                </form>

                                {/* Product details */}
                                <div className="mt-10">
                                    <h2 className="text-sm font-medium text-gray-900">Description</h2>

                                    <div
                                        className="prose prose-sm mt-4 text-gray-500"
                                        dangerouslySetInnerHTML={{ __html: productData?.description }}
                                    />
                                </div>

                                <div className="mt-8 border-t border-gray-200 pt-8">
                                    <h2 className="text-sm font-medium text-gray-900">Fabric &amp; Care</h2>
                                </div>

                                {/* Policies */}
                                <section aria-labelledby="policies-heading" className="mt-10">
                                    <h2 id="policies-heading" className="sr-only">
                                        Our Policies
                                    </h2>

                                    <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                                        {policies.map((policy) => (
                                            <div key={policy.name} className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                                                <dt>
                                                    <policy.icon className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                    <span className="mt-4 text-sm font-medium text-gray-900">{policy.name}</span>
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-500">{policy.description}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )

    const renderLodingView = () => {
        return (
            <div className='loder-container'>
                <div className="loading">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            
        )        
    }
    const renderFailureView = () => (
        <>
            <img
                src="./asset/failureView.jpg"
                alt="failure view"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We are having some trouble</p>
            <button type="button" onClick={this.handleGetProduct}>
                Retry
            </button>
        </>
    )
    const renderProductDataView = () =>{
        switch (apiStatus) {
            case apiStatusConstants.inProgress:
                return renderLodingView()
            case apiStatusConstants.success:
                return renderSuccessView()
            case apiStatusConstants.failure:
                return renderFailureView()
            default:
                return null
        }
    }

    return (
        <div>
            <Header/>
            {renderProductDataView()}
            <Footer />
        </div>
    )
}
