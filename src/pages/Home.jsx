import React from "react";
import Banner from "../components/Banner/Banner";
import NavBar from "../components/NavBar/NavBar";
import ProductsGrid from "../components/ProductsGrid/ProductsGrid";


function Home() {
    return (
        <div>
            <NavBar />
            <div className="container">
                <Banner />
                <ProductsGrid />
            </div>
        </div>
    );
}

export default Home;
