import { useState, useEffect } from "react"
import Header from "../header/Header"
import Category from "../category/Category"
import Footer from "../footer/Footer"
import ProductListView from "../productListView/ProductListView"

  const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
  }


  export default function Product() {
    const [productList, setProductList] = useState([])
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

    useEffect(() => {
        try {
            setApiStatus(apiStatusConstants.inProgress)
            const getProducts = async() => {
                

                const apiUrl = "https://fakestoreapi.com/products"
                const response = await fetch(apiUrl)
                const data = await response.json()
                console.log(data)
                if (response.ok){
                    const fetchedData = data.map(item => ({
                        description: item.description,
                        category: item.category,
                        id: item.id,
                        image: item.image,
                        price: item.price,
                        rating: item.rating.rate,
                        title: item.title,
                    }))
                    console.log(fetchedData)
                    setProductList(fetchedData);
                    setApiStatus(apiStatusConstants.success);
                }                
            }
            getProducts()
        } catch (error){
            console.log(error)
            setApiStatus(apiStatusConstants.failure)
        }        
        
    }, [])

    const renderSuccessView = () => {
        return (
            <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">ProductList</h2>
        <ProductListView productList = {productList}/>
        
      </div>
            </div>
        )
    }

    const renderLodingView = () => {
        return (
            <div className="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
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

    const renderProductView = () =>{
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
        <div>
            <Category />
            {renderProductView()}
            <Footer/>
        </div>
      </div>
    )
  }
  