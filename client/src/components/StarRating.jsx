import React from 'react'
import { assets, testimonials } from '../assets/assets'

const StarRating = ({ rating = 4 }) => {
	return (
		<>
			{Array(5).fill("").map((__unstable__loadDesignSystem, index) => (
				<img src={rating > index ? assets.starIconFilled : assets.starIconOutlined} alt="" className='w-4.5 h-4.5'/>
			)
			)}
		</>
	)
}

export default StarRating
