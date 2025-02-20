import React, { useEffect } from 'react'
import { redirect, useLoaderData } from 'react-router-dom'
import customAPI from '../api'
import { toast } from 'react-toastify'
import { priceFormat } from '../utils'


export const loader = (storage) => async() => {
    const user = storage.getState().userState.user
    // console.log("🚀 ~ loader ~ user:", user.role)
    if (!user) {
        toast.warn('Please login first')
        return redirect('/login')
    }

    let orders;
    if(user.role !== 'admin') {
        const { data } = await customAPI.get('/order/current/user')

        orders = data.data
        // console.log("🚀 ~ loader ~ orders:", orders)
    } else {
        const { data } = await customAPI.get('/order')
        orders = data.data
    }

    return {orders}
}

const Orders = () => {
    const { orders } = useLoaderData()

    

    useEffect(() => {
        document.title = "Craftique | Orders"
    }, [])

  return (
    <>
      <div className='w-full min-h-screen bg-white pt-[170px] pb-12'>
        <div className='max-w-[1380px] mx-auto  gap-6 px-[75px]'>
            {orders.length < 1 ? (
                <div className='col-span-12 text-center'>
                    <h1 className='text-3xl font-bold mt-20'>There are no orders</h1>
                    <p className="text-gray-500 mt-2">Start to checkout the products on your cart</p>
                </div>
            ) : (
                <table className="table ">
                    <thead>
                    <tr>
                        <td>No. </td>
                        <td>Order By</td>
                        <td>Product</td>
                        <td>Total</td>
                        <td>Status</td>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order, index) => (
                        <tr key={order._id} className='hover'>
                            <td>{index + 1}</td>
                            <td>{order.firstName} {order.lastName}</td>
                            <td>
                                <ul className='list-disc'>
                                {order.itemsDetail.map((item) => (
                                <li key={item.product}>
                                    {item.name} <br />
                                    <span className='font-bold'>Total {item.quantity}</span>
                                    <br />
                                    {priceFormat(item.price)}
                                </li>
                                ))}
                                </ul>
                            </td>
                            <td>{priceFormat(order.total)}</td>
                            <td>{order.status === 'Pending' ? (
                                <span className='btn btn-info'>Pending</span>
                            ): order.status === 'success' ? (
                                <span className='btn btn-success'>Success</span>
                            ) : (
                                <span className='btn btn-error'>Failed</span>
                            )}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
      </div>
    </>
  )
}

export default Orders
