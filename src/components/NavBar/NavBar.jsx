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
    const [searchValue, setSearchValue] = useState("");
    const handleAuthentication = (even) => { };
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
        console.log("sign out")
        dispatch(signout())
    }

    const handleDropDown = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <header className="header">
            <Link to="/" className="header__logo">
                <OpenWithIcon />
                <h1>aMaZ</h1>
            </Link>

            <div className="header__search">
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
                <div className="header__option" onClick={handleAuthentication}>
                    <Button className="header__optionLineOne" color="inherit">
                        Hello, {userInfo ? userInfo.name : "Guest"}
                    </Button>
                    <div>
                        <Button className="header__optionLineTwo" color="inherit"
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
                                <>
                                    <MenuItem>
                                        <Button color="inherit">
                                            <Link className="header__optionLineTwo"
                                                to="/profile" >Profile</Link>
                                        </Button>
                                    </MenuItem>

                                    <MenuItem>
                                        <Button color="inherit">
                                            <Link className="header__optionLineTwo"
                                                to="/orderhistory">Orders</Link>
                                        </Button>
                                    </MenuItem>
                                </>
                            }

                            <MenuItem>
                                {userInfo
                                    ?
                                    <Button color="inherit"
                                        onClick={handleSignOut}>
                                        <Link className="header__optionLineTwo"> Sign Out</Link>
                                    </Button>
                                    :
                                    <Button color="inherit">
                                        <Link className="header__optionLineTwo"
                                            to="/signin" >Sign In</Link>
                                    </Button>


                                }
                            </MenuItem>

                        </Menu>
                    </div>

                </div>

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
