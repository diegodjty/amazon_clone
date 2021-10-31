import Image from 'next/image'
import Header from './../components/Header';
import { useSelector } from 'react-redux';
import { selectItems, selectTotal } from '../slices/cartSlice';
import CheckoutProduct from '../components/CheckoutProduct';
import Currency from 'react-currency-formatter';
import { useSession } from 'next-auth/client';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
function checkout() {

    const stripePromise = loadStripe(process.env.stripe_public_key)
    const items = useSelector(selectItems)
    const total = useSelector(selectTotal)
    const [session] = useSession()


    const createCheckoutSession = async () =>{
        const stripe = await stripePromise;

        // Call the backend to create a checkout session
        const checkoutSession = await axios.post('/api/create-checkout-session',
          {  
            items: items,
            email: session.user.email
          }
        )

        // Redirect user to stripe checkout
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id
        })

        if (result.error){
            alert(result.error.message)
        } 

    }
    
    return (
        <div className='bg-gray-100'>
            <Header />
            <main className='lg:flex max-w-screen-2xl mx-auto'>
                 <div className='flex-grow m-5 shadow-sm'>
                     <Image
                        src='https://links.papareact.com/ikj'
                        width={1020}
                        height={250}
                        objectFit='contain'
                     />
                     <div className='flex flex-col p-5 space-y-10 bg-white'>
                     <h1 className='text-3xl border-b pb-4'>
                         {items.length ===0 
                         ?
                         "Your Amazon Cart is empty"
                         :
                         "Shopping Cart"
                         }
                    </h1>
                    {items.map(({id,title,price,rating,description,category,image,hasPrime})=>(
                        <CheckoutProduct 
                            key={id}
                            id={id}
                            title={title}
                            price={price}
                            rating={rating}
                            description={description}
                            category={category}
                            image={image}
                            hasPrime={hasPrime}
                        />
                    ))}
                 </div>
                 </div>
                 
                 <div className='flex flex-col bg-white p-10 shadow-md'>
                     {items.length > 0 && (
                         <>
                            <h2 className='whitespace-nowrap'>Subtotal ({items.length}) :
                                <span className='font-bold'>
                                    <Currency quantity={total} currency={'USD'} />
                                </span>
                            </h2>
                            <button
                            role='link'
                            onClick={createCheckoutSession}
                            disabled={!session}
                            className={
                                `button mt-2 ${!session && ('bg-color-gray-500 from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed')}`}>
                                {!session ? 'Sign in to checkout': 'proceed to checkout'}
                            </button>
                         </>
                     )}
                 </div>
            </main>
        </div>
    )
}

export default checkout
