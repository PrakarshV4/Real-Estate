import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Search() {
    const navigate = useNavigate();
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        type:'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order:'desc'
    });
    const [loading,setLoading] = useState(false);
    const [listings , setListings] = useState([]);
    console.log(listings)
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishrdFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if(
            searchTermFromUrl || typeFromUrl || parkingFromUrl || furnishrdFromUrl || offerFromUrl || sortFromUrl || orderFromUrl
        ){
            setSidebarData({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl=== 'true' ? true : false,
                furnished: furnishrdFromUrl=== 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            })
        }

        //get data to show at right side
        const fetchListings = async()=>{
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            setListings(data);
            setLoading(false);

        }
        fetchListings();
    },[location.search]);
    
    const handleChange = (e)=>{
        //sale , rent, all
        if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale'){
            setSidebarData({...sidebarData, type: e.target.id})
        }
        if(e.target.id === 'searchTerm'){
            setSidebarData({...sidebarData, searchTerm: e.target.value})
        }
        //parking, furnished, offer
        if(e.target.id === 'parking' || e.target.id === 'furnished'|| e.target.id === 'offer'){
            setSidebarData({
                ...sidebarData, 
                [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false,
            })
        }

        if(e.target.id === 'sort_order'){
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSidebarData({...sidebarData,sort,order})
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebarData.searchTerm)
        urlParams.set('type', sidebarData.type)
        urlParams.set('parking', sidebarData.parking)
        urlParams.set('furnished', sidebarData.furnished)
        urlParams.set('offer', sidebarData.offer)
        urlParams.set('sort', sidebarData.sort)
        urlParams.set('order', sidebarData.order)
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)
    }
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                <div className='flex items-center gap-2'>
                    <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                    <input 
                     type="text"
                     id='searchTerm'
                     placeholder='Search...'
                     className='border rounded-lg p-3 w-full'
                     value={sidebarData.searchTerm}
                     onChange={handleChange}
                    />
                </div>

                <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-semibold'>Type:</label>
                    <div className='flex gap-2 '>
                        <input 
                         type="checkbox"
                         id='all'
                         className='w-5'
                         onChange={handleChange}
                         checked={sidebarData.type === 'all'}
                        />
                        <span>Rent & Sale</span>
                    </div>
                    <div className='flex gap-2 '>
                        <input 
                         type="checkbox"
                         id='rent'
                         className='w-5' 
                         onChange={handleChange}
                         checked={sidebarData.type === 'rent'}
                        />

                         <span>Rent</span>
                    </div>
                    <div className='flex gap-2 '>
                        <input 
                         type="checkbox"
                         id='sale'
                         className='w-5' 
                         onChange={handleChange}
                         checked={sidebarData.type === 'sale'}
                         />
                         <span>Sale</span>
                    </div>
                    <div className='flex gap-2 '>
                        <input 
                         type="checkbox"
                         id='offer'
                         className='w-5' 
                         onChange={handleChange}
                         checked={sidebarData.offer}
                         />
                         <span>Offer</span>
                    </div>
                </div>

                <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-semibold'>Amenities:</label>
                    <div className='flex gap-2 '>
                        <input 
                         type="checkbox"
                         id='parking'
                         className='w-5' 
                         onChange={handleChange}
                         checked={sidebarData.parking}
                         />
                         <span>Parking</span>
                    </div>
                    <div className='flex gap-2 '>
                        <input 
                         type="checkbox"
                         id='furnished'
                         className='w-5' 
                         onChange={handleChange}
                         checked={sidebarData.furnished}
                         />
                         <span>Furnished</span>
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    <label className='font-semibold'>Sort</label>
                    <select  
                     id="sort_order" 
                     className='border rounded-lg p-3'
                     onChange={handleChange}
                     defaultValue={'created_at_desc'}
                     >
                        <option value='regularPrice_desc'>Price high to low</option>
                        <option value='regularPrice_asc'>Price low to high</option>
                        <option value='createdAt_desc'>Latest</option>
                        <option value='createdAt_asc'>Oldest</option>
                    </select>
                </div>
                <button className='rounded-lg p-3 hover:placeholder-opacity-95 uppercase bg-slate-700 text-white '>Search</button>
            </form>
        </div>
        <div className='flex-1'>
            <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing results:</h1>

            <div className='p-7 flex flex-wrap gap-4'>
                {loading && (
                    <p className='text-xl text-slate-700 text-center w-full'>Loading ... </p>
                )}
                {!loading && listings.length === 0 && (
                    <p className='text-xl text-slate-700'>No listing found!!</p>
                )}
                {
                    !loading && listings && listings.map((listing) => {
                        return(
                            <ListingItem key={listing._id} listing={listing}/>
                        )
                    })
                }
            </div>
        </div>

    </div>
  )
}
