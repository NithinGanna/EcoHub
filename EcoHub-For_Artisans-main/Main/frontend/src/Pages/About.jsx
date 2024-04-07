import { NavBarPreLogin } from "../Components/NavBarPreLogin";
import { NavBarPostLogin } from "../Components/NavBarPostLogin";
import { useState, useEffect } from "react";
import axios from "axios";
import { Footer } from "../Components/Footer";

function About() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    
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

    // Sample team member data
    const teamMembers = [
        { name: "John Doe", role: "Frontend Developer", imageUrl: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzZ8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60" },
        { name: "Mark Cook", role: "Backend Developer", imageUrl: "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60" },
        { name: "Ketty", role: "Designer", imageUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60" }
    ];

    return (
        <div className="flex flex-col min-h-screen">
            {user ? <NavBarPostLogin/> : <NavBarPreLogin/>}
            <div className="flex-grow">
                <div className="mx-auto max-w-7xl px-2 md:px-0">
                    <div className="my-4">
                        <h1 className="text-3xl font-bold">Our Team</h1>
                        <p className="mt-2 text-gray-500">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-[30px] md:grid-cols-3">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="flex flex-col items-center text-start">
                                <div className="relative flex h-[342px] w-full flex-col justify-end rounded-[10px] bg-red-300" style={{
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                }}>
                                    <img src={member.imageUrl} alt={member.name} className="z-0 h-full w-full rounded-[10px] object-cover" />
                                    <div className="absolute bottom-4 left-4">
                                        <h1 className="text-xl font-semibold text-white">{member.name}</h1>
                                        <h6 className="text-base text-white">{member.role}</h6>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default About;
