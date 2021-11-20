import Header from './../components/Header';
import Head from 'next/head'
import { getSession, useSession } from 'next-auth/client';
import {getDocs,collection} from 'firebase/firestore/lite'
import db from '../../firebase';
import moment from 'moment'
import OrderItem from './../components/OrderItem';

function Orders({orders}) {
    const [session] = useSession();
    return (
        <div>
            <Head>
                <title>Amazon - Orders</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className='max-w-screen-lg mx-auto p-10'>
                <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">Your orders</h1>

                {session ? (
                    <h2>{orders.length} Orders</h2>
                ):
                    <h2>Please sing in to see your orders</h2>
                }
                <div className='mt-5 space-y-4'>
                    {orders?.map(({id, amount, amountShipping, items, timestamp, images})=>(
                        <OrderItem
                            key={id}
                            id={id}
                            amount={amount}
                            amountShipping={amountShipping}
                            items={items}
                            timestamp={timestamp}
                            images={images}

                        />
                    ))}
                </div>
            </main>
        </div>
    )
}

export default Orders

export async function getServerSideProps(context) {
    const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

    // GEt the users logged in credentials...
    const session = await getSession(context);

    if(!session){
        return{
            props: {}
        }
    }

    // Firebase DB
    const ordersRef = collection(db,'users',session.user.email,'orders')
    const stripeOrders = await getDocs(ordersRef)

    // Stripe orders

    const orders = await Promise.all(
        stripeOrders.docs.map(async(order)=>({
            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().amount_shipping,
            images: order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
            items: (
                await stripe.checkout.sessions.listLineItems(order.id,{
                    limit: 100,
                })
            ).data,
        }))
    )

    return{
        props: {
            orders
        }
    }

}
