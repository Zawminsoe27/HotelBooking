import React from 'react'
import { roomsDummyData } from '../assets/assets'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'

const FeaturedDestination = () => {
	const navigate = useNavigate()
	return (
		<div className='flex flex-col items-center sm:justify-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>

			<Title title="Featured Destination" subTitle="Explore our handpicked selection of top-rated hotels in popular destinations." />
			<div className='flex flex-wrap items-center justify-between    gap-5 mt-10 px-5'>
				{roomsDummyData.slice(0, 4).map((room, index) => (
					<HotelCard key={room._id} room={room} index={index} />
				))}
			</div>
			<button onClick={() => { navigate("/rooms"); scrollTo(0, 0) }}
				className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-whte hover:bg-gray-400 hover:text-white transition-all cursor-pointer'
			>View All Destinations</button>
		</div>
	)
}

export default FeaturedDestination
