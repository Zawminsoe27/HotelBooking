import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { assets } from "../assets/assets"; // Adjust the import path as necessary

const BookIcon = () => (
	<svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
		<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
	</svg>
)
const Navbar = () => {
	const navLinks = [
		{ name: 'Home', path: '/' },
		{ name: 'Hotels', path: '/rooms' },
		{ name: 'Experince', path: '/' },
		{ name: 'About', path: '/' },
	];


	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { openSignIn } = useClerk()
	const { user } = useUser();
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		if (location.pathname !== '/') {
			setIsScrolled(true);
			return
		} else {
			setIsScrolled(false);
		}

		setIsScrolled(prev => location.pathname !== "/" ? ture : false)
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [location.pathname]);

	return (
		<nav className={` fixed top-0 left-0  w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white shadow-md text-black  py-3 md:py-4" : "py-4 md:py-6"}`}>

			{/* Logo */}
			<Link to="/"  className="text-black">
				<img src={assets.logo} alt="logo" className={`h-9 ${isScrolled && "invert opacity-80"}`} />
			</Link>

			{/* Desktop Nav */}
			<div className="hidden md:flex items-center gap-4 lg:gap-8">
				{navLinks.map((link, i) => (
					<a key={i} href={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-dark" : "text-white hover:shadow-2xl hover:bg-white/50 rounded-full px-3 backdrop-blur-md"} `}>
						{link.name}
						<div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300 `} />
					</a>
				))}
				<button className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? 'text-black' : 'text-white'} transition-all`}>
					Dashboard
				</button>
			</div>

			{/* Desktop Right */}
			<div className="hidden md:flex items-center gap-4">
				<img src={assets.searchIcon} alt="search" className={` h-7 transition-all duration-500 ${isScrolled && "invert"}`} />
				{user ?
				   (<UserButton>
					   <UserButton.MenuItems>
						   <UserButton.Action label="My Bookings" labelIcon={<BookIcon />} onClick={() => navigate("/my-bookings")} />
					   </UserButton.MenuItems>
				   </UserButton>) : (
					   <button onClick={openSignIn} className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${isScrolled ? "bg-white shadow-md text-black" : "text-white"}`}>
						   Login
					   </button>
				   )
				}

			</div>

			{/* Mobile Menu Button */}
			{user && <UserButton>
				<UserButton.MenuItems>
					<UserButton.Action label="My Bookings" labelIcon={<BookIcon />} onClick={() => navigate("/my-bookings")} />
				</UserButton.MenuItems>
			</UserButton>
			}
			<div className="flex items-center gap-3 md:hidden">
				<img onClick={() => setIsMenuOpen(!isMenuOpen)} src={assets.menuIcon} alt="" className={` h-4 ${isScrolled && "invert"}`} />
			</div>

			{/* Mobile Menu */}
			<div className={`fixed top-0 left-0 w-full h-screen bg-white/75 shadow-md text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-black transition-all duration-500  ${isMenuOpen ? "translate-x-0" : "-translate-x-full backdrop-blur-md"}`}>
				<button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
					<img src={assets.closeIcon} alt="close-menu" className="h-6.5" />
				</button>

				{navLinks.map((link, i) => (
					<a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
						{link.name}
					</a>
				))}

				{user && <button className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all" onClick={() => { navigate('/owner') }}>
					Dashboard
				</button>}

				{!user && <button className="bg-white/15 shadow backdrop-blur-lg text-dark px-8 py-2.5 rounded-full transition-all duration-500" onClick={openSignIn}>
					Login
				</button>}
			</div>
		</nav>
	);
}
export default Navbar;