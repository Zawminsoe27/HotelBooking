import React from "react";
import { assets, roomsDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import StarRating, { } from "../components/StarRating"
const AllRooms = () => {
	const navigate = useNavigate();
	return (
		<div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-25 md:pt-30 px-4 lg:px-24 xl:px-32">
			<div>
				<div className="flex flex-col items-start text-left">
					<h1 className="font-playfair text-4xl md:text-[35px] ">
						Hotel Rooms
					</h1>
					<p className="text-sm md:text-base text-gray-500 mt-6">
						Take advantage of our limited-time offer and special packages to
						enchance you stay and create unforgettable momories with us.
					</p>
				</div>


				{roomsDummyData.map((room) => (
					<div key={room._id} className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-700/30 last:pb-30 last:border-0">
						<img
							onClick={() => { navigate(`/rooms/${room._id}`); scrollTo(0, 0) }}
							src={room.images[0]}
							alt="hotel-img"
							title="View Room Details"
							className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer mt-5"
						/>
						<div className="md:w-1/2 flex flex-col gap-2">
							<p className="text-gray-500">{room.hotel.city}</p>
							<p className="text-gray-800">{room.hotel.name}</p>
							<div className="flex items-center">
								<StarRating />
								<p className="ml-2">200+ reviews</p>
							</div>
							<div>

								<img src={assets.locationIcon} alt="" />
								<p>{room.hotel.address}</p>
							</div>
							{/* {Room Amenitied} */}
							{room.amenities.map((item,index)=> (
								<div>

								</div>
							))}
						</div>
					</div>
				))}

			</div>
			<div>{/* {FIlters} */}</div>
		</div>
	);
};

export default AllRooms;
