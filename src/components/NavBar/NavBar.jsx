import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import OpenWithIcon from "@material-ui/icons/OpenWith";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import "./NavBar.scss";
import { Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../../actions/userAction";



function NavBar(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const [anchorEl3, setAnchorEl3] = useState(null);
    const [searchValue, setSearchValue] = useState("");

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin;

    const dispatch = useDispatch();

    const handleSearch = () => {
        props.history.push(`/search/name/${searchValue}`)
        setTimeout(() => {
            setSearchValue("")
        }, 1000);
    }


    const handleSignOut = () => {
        setTimeout(() => {
            dispatch(signout())
        }, 1000);
    }
    //dropdown for user
    const handleDropDown = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    //dropdown for seller
    const handleDropDown2 = (event) => {
        setAnchorEl2(event.currentTarget);
    }
    const handleClose2 = () => {
        setAnchorEl2(null);
    };
 //dropdown for admin
 const handleDropDown3 = (event) => {
    setAnchorEl3(event.currentTarget);
}
const handleClose3 = () => {
    setAnchorEl3(null);
};



    return (
        <header className="header">
            <Link to="/" className="header__logo">
                <OpenWithIcon />
                <h1>aMaZ</h1>
            </Link>

            <div className="header__search" id="searchBar">
                <input
                    className="header__search--input"
                    type="text"
                    placeholder="Search ..."
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)} />
                <Button onClick={handleSearch}>
                    <SearchIcon className="header__search--icon" />
                </Button>

            </div>

            <div className="header__nav">
                <div className="header__option">
                    <Button className="header__optionLineOne" color="inherit">
                        Hello, {userInfo ? userInfo.name : "Guest"}
                    </Button>
                    <div>
                        <Button className="header__optionLineTwo" color="inherit"
                            id="yourAccountButton"
                            onClick={handleDropDown}>
                            Your account <ArrowDropDownIcon />
                        </Button>
                        <Menu
                            id="customized-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}

                        >
                            {userInfo &&
                                <div>
                                    <MenuItem>
                                        <Button color="inherit"
                                            onClick={e => props.history.push("/profile")}
                                        >
                                            Profile
                                        </Button>
                                    </MenuItem>

                                    <MenuItem>
                                        <Button color="inherit"
                                            onClick={e => props.history.push("/orderhistory")}>
                                            Orders
                                        </Button>
                                    </MenuItem>
                                </div>
                            }

                            <MenuItem>
                                {userInfo
                                    ?
                                    <Button color="inherit"
                                        onClick={handleSignOut}>
                                        Sign Out
                                    </Button>
                                    :
                                    <Button color="inherit"
                                        onClick={e => props.history.push("/signin")}>
                                        Sign In
                                    </Button>
                                }
                            </MenuItem>



                        </Menu>
                    </div>

                </div>
                {userInfo && userInfo.isSeller && <div className="header__option">
                    <Button className="header__optionLineOne" color="inherit">
                        Seller
                    </Button>
                    <div>
                        <Button className="header__optionLineTwo" color="inherit"
                            id="yourAccountButton"
                            onClick={handleDropDown2}>
                            Your Shop <ArrowDropDownIcon />
                        </Button>
                        <Menu
                            id="customized-menu"
                            anchorEl={anchorEl2}
                            keepMounted
                            open={Boolean(anchorEl2)}
                            onClose={handleClose2}

                        >
                            <div>
                                <MenuItem>
                                    <Button color="inherit"
                                        onClick={e => props.history.push("/orderlist/seller")}>
                                        Order List
                                    </Button>
                                </MenuItem>
                                <MenuItem>
                                    <Button color="inherit"
                                        onClick={e => props.history.push("/productlist/seller")}>
                                        Product List
                                    </Button>
                                </MenuItem>

                                <MenuItem>
                                    <Button color="inherit"
                                        onClick={e => props.history.push("/product/create")}>
                                        Add new product
                                    </Button>
                                </MenuItem>
                            </div>
                        </Menu>
                    </div>

                </div>}



                {/* ///admin  */}
                {userInfo && userInfo.isAdmin && <div className="header__option">
                    <Button className="header__optionLineOne" color="inherit">
                        Admin
                    </Button>
                    <div>
                        <Button className="header__optionLineTwo" color="inherit"
                            id="yourAccountButton"
                            onClick={handleDropDown3}>
                            Dashboard <ArrowDropDownIcon />
                        </Button>
                        <Menu
                            id="customized-menu"
                            anchorEl={anchorEl3}
                            keepMounted
                            open={Boolean(anchorEl3)}
                            onClose={handleClose3}

                        >
                            <div>
                                <MenuItem>
                                    <Button color="inherit"
                                        onClick={e => props.history.push("/dashboard")}>
                                        Dashboard
                                    </Button>
                                </MenuItem>
                                <MenuItem>
                                    <Button color="inherit"
                                        onClick={e => props.history.push("/userlist")}>
                                       Users
                                    </Button>
                                </MenuItem>

                                <MenuItem>
                                    <Button color="inherit"
                                        onClick={e => props.history.push("/support")}>
                                        Support
                                    </Button>
                                </MenuItem>
                            </div>
                        </Menu>
                    </div>

                </div>}







                <Link to="/cart">
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

export default withRouter(NavBar);
