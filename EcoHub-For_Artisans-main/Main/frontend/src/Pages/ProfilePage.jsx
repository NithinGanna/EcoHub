import { useState, useEffect } from 'react';
import axios from 'axios';
import Lottie from 'lottie-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import avatardata from '../assets/user_avatar.json';
import { NavBarPostLogin } from '../Components/NavBarPostLogin';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [showWasteRequests, setShowWasteRequests] = useState(false);
    const [showInnovativeProducts, setShowInnovativeProducts] = useState(false);
    const [showUserContributions, setShowUserContributions] = useState(false);
    const [showSatisfiedRequirements, setShowSatisfiedRequirements] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5001/profile', { withCredentials: true });
                setUser(response.data);
            } catch (err) {
                setError('Error fetching user data');
                console.error(err);
            }
        };

        fetchUserData();
    }, []);

    axios.defaults.withCredentials = true;

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5001/logout');
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <NavBarPostLogin />
            <div className="container mx-auto p-4 flex flex-col md:flex-row">
                {/* Left side - User Details */}
                <div className='flex flex-col md:w-1/3 mr-4'>
                    <Lottie animationData={avatardata} className='w-full md:w-52 mb-4 md:mb-0 md:mr-4' />
                    <div className="user-details text-center md:text-left">
                        <p className="text-md text-gray-600 font-bold">{user.username}</p>
                        <p className="text-md text-gray-600 font-bold">{user.email}</p>
                    </div>
                    {/* Logout Button */}
                    <button
                        className="self-start mt-4 mx-auto md:mx-0 p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                        onClick={handleLogout}
                    >
                        <div className='p-2'>
                            Logout
                            <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
                        </div>
                    </button>
                </div>
                {/* Right side - Waste Requests, Innovative Products, User Contributions, Satisfied Requirements */}
                <div className="flex-grow">
                    {/* Display Waste Requests */}
                    <div className="bought-products mb-6">
                        <h2
                            className="text-xl font-bold text-gray-800 mb-2 cursor-pointer"
                            onClick={() => setShowWasteRequests(!showWasteRequests)}
                        >
                            Waste Requests ({user.wasteReq.length})
                        </h2>
                        {showWasteRequests && (
                            <ul>
                                {user.wasteReq.map((waste, index) => (
                                    <li key={index} className="mb-6">
                                        <div className="mt-2 p-3 border border-gray-200 flex flex-col md:flex-row shadow-lg rounded-lg">
                                            <img src={waste.image} alt="" className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-4 rounded-lg" />
                                            <div className="flex flex-col">
                                                <p className="text-lg text-gray-800"><b>Waste Requirement Title: </b>{waste.title}</p>
                                                <p className="text-md text-gray-700"><b>Description: </b>{waste.description}</p>
                                                <p className="text-md text-gray-700"><b>Material Required: </b>{waste.materialRequired}</p>
                                                <p className="text-md text-gray-700"><b>Price: ₹</b>{waste.price}</p>
                                                <p className="text-md text-gray-700"><b>Quantity: </b>{waste.quantity}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Display Innovative Products */}
                    <div className="innovative-products mb-6">
                        <h2
                            className="text-xl font-bold text-gray-800 mb-2 cursor-pointer"
                            onClick={() => setShowInnovativeProducts(!showInnovativeProducts)}
                        >
                            Innovative Products ({user.innovativeProds.length})
                        </h2>
                        {showInnovativeProducts && (
                            <ul>
                                {user.innovativeProds.map((product, index) => (
                                    <li key={index} className="mb-6">
                                        <div className="mt-2 p-3 border border-gray-200 flex flex-col md:flex-row shadow-lg rounded-lg">
                                            <img src={product.image} className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-4 rounded-lg" />
                                            <div className="flex flex-col">
                                                <p className="text-lg text-gray-800"><b>Product Title:</b> {product.title}</p>
                                                <p className="text-md text-gray-700"><b>Description:</b> {product.description}</p>
                                                <p className="text-md text-gray-700"><b>Materials Used:</b> {product.materialUsed}</p>
                                                <p className="text-md text-gray-700"><b>Price:</b> ₹{product.price}</p>
                                                <p className="text-md text-gray-700"><b>Quantity:</b> {product.quantity}</p>
                                                <p className="text-md text-gray-700"><b>Dimensions (L x B x H):</b> {product.dimensions}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Display User Contributions */}
                    <div className="user-contributions mb-6">
                        <h2
                            className="text-xl font-bold text-gray-800 mb-2 cursor-pointer"
                            onClick={() => setShowUserContributions(!showUserContributions)}
                        >
                            User Contributions ({user.userContributions.length})
                        </h2>
                        {showUserContributions && (
                            <ul>
                                {user.userContributions.map((contribution, index) => (
                                    <li key={index} className="mb-6">
                                        <div className="mt-2 p-3 border border-gray-200 shadow-lg rounded-lg">
                                            <p className="text-lg text-gray-800"><b>Product ID:</b> {contribution.id}</p>
                                            <p className="text-md text-gray-700"><b>Product Title: </b>{contribution.productTitle}</p>
                                            <p className="text-md text-gray-700"><b>Product Description:</b> {contribution.productDescription}</p>
                                            <p className="text-md text-gray-700"><b>User Contribution:</b> {contribution.userContribution}</p>
                                            <p className="text-md text-gray-700"><b>User Address:</b> {contribution.userAddress}</p>
                                            <p className="text-md text-gray-700"><b>User Mobile:</b> {contribution.userMobile}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Display User Satisfied requirements */}
                    <div className="user-satisfied-requirements mb-6">
                        <h2
                            className="text-xl font-bold text-gray-800 mb-2 cursor-pointer"
                            onClick={() => setShowSatisfiedRequirements(!showSatisfiedRequirements)}
                        >
                            Satisfied Requirements ({user.satisfiedReq.length})
                        </h2>
                        {showSatisfiedRequirements && (
                            <ul>
                                {user.satisfiedReq.map((satisfiedReq, index) => (
                                    <li key={index} className="mb-6">
                                        <div className="mt-2 p-3 border border-gray-200 shadow-lg rounded-lg flex flex-col md:flex-row">
                                            <img src={satisfiedReq.image} className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-4 rounded-lg" />
                                            <div className="flex flex-col">
                                                <p className="text-lg text-gray-800"><b>Waste Request Title: </b>{satisfiedReq.title}</p>
                                                <p className="text-md text-gray-700"><b>Description: </b>{satisfiedReq.description}</p>
                                                <p className="text-md text-gray-700"><b>Material Required: </b>{satisfiedReq.materialRequired}</p>
                                                <p className="text-md text-gray-700"><b>Price: ₹</b>{satisfiedReq.price}</p>
                                                <p className="text-md text-gray-700"><b>Quantity: </b>{satisfiedReq.quantity}</p>
                                            </div>
                                        </div>
                                        {/* Display contributions for this satisfied requirement */}
                                        <ul>
                                            {satisfiedReq.contributions.map((contribution, contributionIndex) => (
                                                <li key={contributionIndex} className="mb-2 ml-4 bg-white rounded-lg shadow-lg">
                                                    <div className="mt-2 p-3 border border-gray-200 shadow-lg rounded-lg">
                                                        <p className="text-md text-gray-700"><b>Full Name:</b> {contribution.fullName}</p>
                                                        <p className="text-md text-gray-700"><b>Email:</b> {contribution.email}</p>
                                                        <p className="text-md text-gray-700"><b>Phone:</b> {contribution.phone}</p>
                                                        <p className="text-md text-gray-700"><b>Quantity:</b> {contribution.quantity}</p>
                                                        <p className="text-md text-gray-700"><b>Address:</b> {contribution.address}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
