import Image from 'next/image'
import {
    MenuIcon,
    SearchIcon,
    ShoppingCartIcon
} from '@heroicons/react/outline'
import {useSelector} from 'react-redux'
import {signIn, signOut, useSession} from 'next-auth/client'
import {useRouter} from 'next/router'
import { selectItems } from '../slices/cartSlice';


function Header() {
    const router = useRouter();
    const [session] = useSession();
    const items = useSelector(selectItems)

    return (
        <header className>
            <div className='flex items-center bg-amazon_blue p-1 flex-grow py-2'>
                <div className='mt-2 flex items-center flex-grow sm:flex-grow-0'>
                    <Image
                        src='https://links.papareact.com/f90'
                        width={150}
                        height={40}
                        objectFit='contain'
                        className='cursor-pointer'
                        onClick={()=>(router.push('/'))}
                    />
                </div>
                
                <div className='hidden sm:flex items-center h-10 rounded-md 
                flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500'>
                    <input type="text" className='p-2 h-full w-6 flex-grow 
                    flex-shrink rounded-l-md focus:outline-none px-4 '/>
                    <SearchIcon className='h-12 p-4 ' />
                </div>

            <div className='text-white flex items-center text-xs space-x-6 mx-6
            whitespace-nowrap'>
                <div onClick={session ? signOut: signIn} className='link'>
                    {session ? `Hello, ${session.user.name}`: 'Sign In'}
                    <p className='font-extrabold md:text-small'>Account & List</p>

                </div>
                <div className='link' onClick={()=> router.push('/orders')}>
                    <p>Returns</p>
                    <p className='font-extrabold md:text-small'>& Orders</p>
                </div>
                <div onClick={()=>(router.push('/checkout'))} className='relative link flex items-center'>
                    <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400
                     text-center rounded-full text-black font-bold' >{items.length}</span>
                    <ShoppingCartIcon className='h-10' />
                    <p className='hidden md:inline font-extrabold md:text-small'>Cart</p>
                </div>
            </div>

            </div>

            <div className=' text-white flex items-center bg-amazon_blue-light space-x-3 p-2 pl-6'>
                <p className='link flex items-center'> 
                    <MenuIcon className='h-6 mr-1' />
                    All
                </p>
                <p className='link '>Prime Video</p>
                <p className='link'>Amazon Business</p>
                <p className='link'>Today's Deals</p>
                <p className='hidden link lg:inline-flex'>Electronics</p>
                <p className='hidden link lg:inline-flex'>Food & Groceries</p>
                <p className='hidden link lg:inline-flex'>Prime</p>
                <p className='hidden link lg:inline-flex'>Buy Again</p>
                <p className='hidden link lg:inline-flex'>Shopper Toolkit</p>
                <p className='hidden link lg:inline-flex'>Health & Personal Care</p>

            </div>
        </header>
    )
}

export default Header
