import { Button } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import OpenWithIcon from "@material-ui/icons/OpenWith";
import "./Footer.scss";

function Footer() {
    return (
        <div className='footer-container'>
            <section className='footer-subscription'>
                <h2 className='footer-subscription-heading'>
                    Join our exclusive membership to receive the latest news and trends
                </h2>
                <p className='footer-subscription-text'>
                    You can unsubscribe at any time.
                 </p>
                <div className='footer-input-areas'>
                    <form>
                        <input
                            className='footer-input'
                            name='email'
                            type='email'
                            placeholder='Your Email'
                        />
                        <Button type="submit" className="btn">Subscribe</Button>
                    </form>
                </div>
            </section>
            <div className='footer-links'>
                <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>About Us</h2>
                        <Link to='/sign-up'>How it works</Link>
                        <Link to='/'>Testimonials</Link>
                        <Link to='/'>Careers</Link>
                        <Link to='/'>Investors</Link>
                        <Link to='/'>Terms of Service</Link>
                    </div>
                    <div className='footer-link-items'>
                        <h2>Contact Us</h2>
                        <Link to='/'>Contact</Link>
                        <Link to='/'>Support</Link>
                        <Link to='/'>Destinations</Link>
                        <Link to='/'>Sponsorships</Link>
                    </div>
                </div>
                <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>Videos</h2>
                        <Link to='/'>Submit Video</Link>
                        <Link to='/'>Ambassadors</Link>
                        <Link to='/'>Agency</Link>
                        <Link to='/'>Influencer</Link>
                    </div>
                    <div className='footer-link-items'>
                        <h2>Social Media</h2>
                        <Link to='/'>Instagram</Link>
                        <Link to='/'>Facebook</Link>
                        <Link to='/'>Youtube</Link>
                        <Link to='/'>Twitter</Link>
                    </div>
                </div>
            </div>
            <section className='social-media'>
                <div className='social-media-wrap'>
                    <div className='footer-logo'>
                        <Link to='/' className='social-logo'>
                            <OpenWithIcon className='navbar-icon' /> {'\u00A0'}
                            aMaZ
                         </Link>
                    </div>
                    <small className='website-rights'>TRAN T.T Xuan © 2021</small>
                    <div className='social-icons'>
                        <Link
                            className='social-icon-link'
                            to='/'
                            target='_blank'
                            aria-label='Facebook'
                        >
                            <FacebookIcon />
                        </Link>
                        <Link
                            className='social-icon-link'
                            to='/'
                            target='_blank'
                            aria-label='Instagram'
                        >
                            <InstagramIcon />
                        </Link>
                        <Link
                            className='social-icon-link'
                            to="/"
                            target='_blank'
                            aria-label='Youtube'
                        >
                            <YouTubeIcon />
                        </Link>
                        <Link
                            className='social-icon-link'
                            to='/'
                            target='_blank'
                            aria-label='Twitter'
                        >
                            <TwitterIcon />
                        </Link>
                        <Link
                            className='social-icon-link'
                            to='/'
                            target='_blank'
                            aria-label='LinkedIn'
                        >
                            <LinkedInIcon />
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Footer
