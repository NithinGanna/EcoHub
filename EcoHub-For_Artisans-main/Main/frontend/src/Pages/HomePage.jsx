import { Footer } from "../Components/Footer"
import { NavBarPostLogin } from "../Components/NavBarPostLogin"
import { ProductCard } from "../Components/ProductCards"
// import { useLoading } from "../Components/LoadingContext";
// import { useEffect } from "react";

function HomePage() {
  

  // const { setIsLoading } = useLoading();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setIsLoading(true); // Start loading
  //       const response = await fetch('http://localhost:5001/signin');
  //       const data = await response.json();
  //       // Handle your data
  //     } catch (error) {
  //       // Handle error
  //     } finally {
  //       setIsLoading(false); // Stop loading regardless of success or error
  //     }
  //   };

  //   fetchData();
  // }, [setIsLoading]);

  
  return (
    <div>
        <NavBarPostLogin/>
        <ProductCard />
        <Footer/>
    </div>
  )
}

export default HomePage
