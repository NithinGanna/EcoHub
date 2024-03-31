import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export function ProductCards() {
  
  const [InnovativeProdData, setInnovativeProdData] = useState([]);

  useEffect(() => {
    // Fetch waste request data when the component mounts
    const fetchInnovativeProdData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/getInnovativeProd", { withCredentials: true });
        setInnovativeProdData(response.data);
      } catch (error) {
        console.error("Error fetching waste request data:", error);
      }
    };

    fetchInnovativeProdData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {InnovativeProdData.map((innovative_prd, index) => (
        <Link to={`/product/${innovative_prd._id}`} key={index}>
        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <img src={innovative_prd.image} alt="Waste Request" className="w-96 h-72 object-cover" />
          <div className="p-4">
            <h5 className="text-lg font-semibold mb-2">{innovative_prd.title}</h5>
            <p className="text-gray-700 text-sm">{innovative_prd.description}</p>
            {/* Add more details here */}
          </div>
        </div>
        </Link>
      ))}
    </div>
  );
}