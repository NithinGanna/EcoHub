import { MarketNavBar } from "../MarketComponents/MarketNavBar"
import { ProductCards } from "../MarketComponents/ProductCards"
function MarketHomePage() {
    // const [filteredProducts, setFilteredProducts] = useState([]);
  
    // const handleFilterChange = (filters) => {
    //   // Implement logic to filter products based on selected filters
    //   // This may involve a backend request or just filtering the already available product data
    // };
  return (
    <div>
        <MarketNavBar/>
        <ProductCards />
        {/* <Filters onFilterChange={handleFilterChange} />
        <ProductList products={filteredProducts} /> */}
        
    </div>
  )
}

export default MarketHomePage
