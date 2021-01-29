import React from "react";
import Banner from "../components/Banner/Banner";
import ListProducts from "../components/ListProducts/ListProducts";
import NavBar from "../components/NavBar/NavBar";
import "./Home.scss";

function Home() {
    return (
        <div>
            <NavBar />
            <div className="home__container">
                <Banner />
                <ListProducts />
            </div>
        </div>
    );
}

export default Home;
