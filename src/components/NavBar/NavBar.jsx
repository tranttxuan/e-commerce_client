import React, { useState } from "react";
import { Link } from "react-router-dom";
import OpenWithIcon from "@material-ui/icons/OpenWith";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import "./NavBar.scss";
import { Button, IconButton } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../../actions/userAction";

function NavBar() {
    const [searchValue, setSearchValue] = useState("");
    const handleAuthentication = (even) => { };
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin;

    const dispatch = useDispatch();

    const handleSignOut = () => {
        console.log("sign out")
        dispatch(signout())
    }

    console.log("check userInfo", userInfo)

    return (
        <header className="header">
            <Link to="/" className="header__logo">
                <OpenWithIcon />
                <h1>aMaZ</h1>
            </Link>

            <div className="header__search">
                <input className="header__search--input" type="text" />
                <Button>
                    {" "}
                    <SearchIcon className="header__search--icon" />
                </Button>
            </div>

            <div className="header__nav">
                <div className="header__option" onClick={handleAuthentication}>
                    <Button className="header__optionLineOne" color="inherit">
                        Hello, {userInfo ? userInfo.name : "Guest"}
                    </Button>
                    {userInfo 
                    ?
                        <Button className="header__optionLineTwo" color="inherit"
                            onClick={handleSignOut}>
                            Sign Out
                        </Button>
                        :
                         <Link to="/signin">
                            <Button className="header__optionLineTwo" color="inherit">
                                Sign In
                            </Button>
                        </Link>

                    }
                </div>

                <div className="header__option">
                    <Button className="header__optionLineOne" color="inherit">
                        Return
                    </Button>
                    <Button className="header__optionLineTwo" color="inherit">
                        & Orders
                    </Button>
                </div>

                <Link to="/checkout">
                    <div className="header__optionBasket">
                        <IconButton color="inherit">
                            <Badge badgeContent={cartItems.length > 0 ? cartItems.length : 0} color="primary">
                                <ShoppingBasketIcon />
                            </Badge>
                        </IconButton>
                    </div>
                </Link>
            </div>
        </header>
    );
}

export default NavBar;
