import React from 'react'
import Title from "./Title"
import { assets, exclusiveOffers } from '../assets/assets'
const ExclusiveOffer = () => {
	return (
		<div className='flex items-center flex-col px-6 md:px-16 lg:px-24 xl:px-22 '>
			<div className='flex flex-col md:flex-row items-center justify-between w-full'>

				<Title align="left" title="Exclusive Offers" subTitle="Discover our limited-time deals and special promotions on select hotels and packages." />
				<button className='flex group items-center gap-4  cursor-pointer max-md:mt-12 bg-blue-600 text-white px-5 py-2 rounded-sm hover:opacity-75 transition-all duration-200'>
					View All Offers
					<img src={assets.arrowIcon} alt="" className='group-hover:translate-x1 transition-all invert' />
				</button>
			</div>
			<div className='grid  grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-3  mt-10'>
				{exclusiveOffers.map((item) => (
					<div key={item._id} className='group relative flex flex-col items-start justify-between gap-1 pt-12 md:pt-18 px-4 rounded-xl text-white bg-no-repeat bg-cover bg-center' style={{ backgroundImage: `url(${item.image})` }}>
						<p className="absolute top-4 left-4 text-xs px-3 py-1 bg-white rounded-full text-gray-800 font-medium ">{item.priceOff}% OFF</p>
						<div>
							<p className='text-2xl font-medium font-playfair'>{item.title}</p>
							<p>{item.description}</p>
							<p className='text-xs text-white/70 mt-3'> Expires{item.expiryDate}</p>
						</div>
						<button type="" className='flex gap-5 items-center mb-4'>
							View Offer<img src={assets.arrowIcon} className='invert group-hover:translate-x-1 transition-all' alt="arrow-icon" />
						</button>
					</div>
				))}
			</div>
		</div>
	)
}

export default ExclusiveOffer
