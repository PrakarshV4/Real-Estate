import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'

export default function ListingItem({listing}) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
        <Link to={`/listing/${listing._id}`}>
            <img className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300' src={listing.imageUrls[0] || 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fproperty%2F&psig=AOvVaw2wXo8GXVPp9oTWhTDBRveJ&ust=1711979552206000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOjg2frSnoUDFQAAAAAdAAAAABAE'} alt="listing cover" />
            
            <div className='p-3 flex flex-col gap-2 w-full'>
                <p className='text-lg font-semibold text-slate-700 truncate '>{listing.name}</p>
                <div className='flex items-center gap-1'>
                    <MdLocationOn className='h-4 w-4 text-green-700'/>
                    <p className='text-sm text-gray-600 truncate w-full'>{listing.address}</p>
                </div>
                <p className='text-sm text-gray-600 line-clamp-2'>{listing.description}</p>

                <p className='text-slate-500 mt-2 font-semibold'>
                    $
                    {listing.offer ? listing.discountPrice.toLocaleString("en-US")  :listing.regularPrice.toLocaleString("en-US") }
                    {listing.type === 'rent' && ' / month'}
                </p>
                <div className='text-slate-700 flex gap-4'>
                    <div className='font-bold text-xs'>
                        {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
                    </div>
                    <div className='font-bold text-xs'>
                        {listing.bathrooms>1 ? `${listing.bathrooms} Baths`:`${listing.bathrooms} Bath`}
                    </div>
                </div>
            </div>
        </Link>
    </div>
  )
}
