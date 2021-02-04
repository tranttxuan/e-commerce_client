import React from "react";
import Banner from "../components/Banner/Banner";
import ProductsGrid from "../components/ProductsGrid/ProductsGrid";


function Home() {
    return (
        <div className="container">
            <Banner />
            <ProductsGrid />
        </div>

    );
}

export default Home;
