import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  assets,
  facilityIcons,
  roomCommonData,
  roomsDummyData,
} from "../assets/assets";
import StarRating from "../components/StarRating";
const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  useEffect(() => {
    const room = roomsDummyData.find((room) => room._id == id);

    room && setRoom(room);
    room && setMainImage(room.images[0]);
  }, []);
  
  return (
    room && (
      <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
        {/* Room Details */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 ">
          <h1 className="text-3xl md:text-4xl font-playfair">
            {room.hotel.name}{" "}
            <span className="font-inter text-sm">{room.roomType}</span>
          </h1>
          <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
            20% off
          </p>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <StarRating />
          <p>200+ reviews</p>
        </div>
        {/* Address */}
        <div className="flex items-center gap-1 text-gray-500 mt-2">
          <img src={assets.locationIcon} alt="locaton-icon" />
          <span>{room.hotel.address}</span>
        </div>
        {/* room images  */}
        <div className="flex flex-col lg:flex-row mt-6 gap-6">
          <div className="mt-3 w-full lg:w-1/2">
            <img
              src={mainImage}
              alt=""
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
            {room.images.length > 1 &&
              room.images.map((image, index) => (
                <img
                  className={`w-full rounded-xl shadow-md object-coder cursor-pointer ${
                    mainImage === image && "outline-3 outline-orange-500"
                  }`}
                  key={index}
                  src={image}
                  alt="room-image"
                  onClick={() => setMainImage(image)}
                />
              ))}
          </div>
        </div>
        {/* Room Highlight  */}
        <div className="flex flex-col md:flex-row md:justify-between mt-10">
          <div className="flex flex-col ">
            <h1 className="text-3xl md:text-4xl">
              {" "}
              Experince Luxury Like never before
            </h1>
            <div className="flex flex-wrap items-center mt-3 mb-6 gap-3 ">
              {room.amenities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-2 py-3rounded-lg bg-gray-100"
                >
                  <img src={facilityIcons[item]} alt="" />
                  <p className="text-xs">{item}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Room Price  */}
          <p>${room.pricePerNight}/ Night</p>
        </div>

        {/* Checkin Checkout Form  */}
        <form className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl">
          <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500">
            <div className="flex flex-col">
              <label htmlFor="checkInDate" className="font-medium">
                Check-In
              </label>
              <input
                type="date"
                id="checkInDate"
                placeholder="Check-In"
                className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>
            <div className="w-px h-15 bg-gray-300/70 max:md:hidden"></div>

            <div className="flex flex-col">
              <label htmlFor="checkOutDate" className="font-medium">
                Check-Out
              </label>
              <input
                type="date"
                id="checkOutDate"
                placeholder="Check-Out"
                className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>
            <div className="w-px h-15 bg-gray-300/70 max:md:hidden"></div>
            <div className="flex flex-col">
              <label htmlFor="guests" className="font-medium">
                Guests
              </label>
              <input
                type="number"
                id="guests"
                placeholder="0"
                className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer"
          >
            Check Availability
          </button>
        </form>
        {/* Common Specification */}
        <div className="mt-5 grid grid-cols-1 gap-4 space-y-5 md:grid-cols-1 lg:grid-cols-2">
          {roomCommonData.map((spec, index) => (
            <div key={index} className="flex items-start gap-2">
              <img src={spec.icon} alt={`${spec.title}`} className="w-6.5" />
              <div>
                <p>{spec.title}</p>
                <p>{spec.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <p className="max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500">
            Experience luxury and comfort at our hotel! Enjoy world-class
            amenities, elegant rooms, and exceptional service in the heart of
            your favorite destination. Book now for exclusive offers and make
            your stay unforgettable!
          </p>
        </div>
        {/* Hosted By  */}
        <div className="flex flex-col items-start gap-4">
          <img
            src={room.hotel.owner.image}
            alt="Host"
            className="h-14 w-14 md:h-18 md:w-18 rounded-full"
          />
          <div>
            <p>Hosted by: {room.hotel.owner.username}</p>
          </div>
        </div>
      </div>
    )
  );
};

export default RoomDetails;
