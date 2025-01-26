import React from 'react'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'

const Pagination = () => {
    const { pagination } = useLoaderData()
    const { page, totalPage } = pagination
    const { search, pathname } = useLocation()
    const navigation = useNavigate()

    const handlePage = (pageNumber) => {
        console.log("pagenumber: "+pageNumber)
        console.log("search: "+search)
        console.log("pathname: "+pathname)

        if (pageNumber < 1 || pageNumber > totalPage) return

        const searchParams = new URLSearchParams(search)
        searchParams.set('page', pageNumber)
        navigation(`${pathname}?${searchParams.toString()}`)
    }

    const pages = Array.from({length: totalPage}, (_, index) => {return index + 1})

  return (
    <>
      <div className='join'>
        {/* Previous Button */}
        <button className='btn btn-sm join-item border-none' onClick={() => handlePage(page - 1)} disabled={page === 1}>
            Prev
        </button>

        {pages.map((pageNumber) => {
            return (
                <button key={pageNumber} onClick={() => handlePage(pageNumber)} className={`btn btn-sm border-none join-item ${pageNumber === page ? 'btn-primary' : ''}`} >{pageNumber}</button>
            )
        })}

        {/* Next Button */}
        <button className='btn btn-sm join-item border-none' onClick={() => handlePage(page + 1)} disabled={page === totalPage}>
            Next
        </button>
      </div>
    </>
  )
}

export default Pagination
