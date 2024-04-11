import { useState, useEffect } from 'react';
import axios from 'axios';
import { NavBarPostLogin } from '../Components/NavBarPostLogin';

const SatisfiedRequirementsPage = () => {
    const [satisfiedRequirements, setSatisfiedRequirements] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSatisfiedRequirements = async () => {
            try {
                const response = await axios.get('http://localhost:5001/satisfiedRequirement', { withCredentials: true });
                setSatisfiedRequirements(response.data);
            } catch (err) {
                setError('Error fetching satisfied requirements');
                console.error(err);
            }
        };

        fetchSatisfiedRequirements();
    }, []);

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <>
            <NavBarPostLogin />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Satisfied Requirements</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {satisfiedRequirements.map((requirement, index) => (
                        <div key={index} className="border border-gray-200 shadow-lg rounded-xl p-4">
                            <img src={requirement.image} alt={requirement.title} className="object-cover w-full h-48 rounded-lg mb-4" />
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">{requirement.title}</h2>
                            <p className="text-md text-gray-700 mb-2">{requirement.description}</p>
                            <p className="text-md text-gray-700"><b>Materials Required:</b> {requirement.materialRequired}</p>
                            <p className="text-md text-gray-700"><b>Price: ₹</b>{requirement.price}</p>
                            <p className="text-md text-gray-700"><b>Quantity:</b> {requirement.quantity}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SatisfiedRequirementsPage;
