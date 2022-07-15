import React from 'react';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Footer = () => {
    return (
        <div className='footer-container bg-dark text-white'>

            <div className='contact-info-social-media'>
                <div>
                    <h3>Akwaaba</h3>
                    <p>Princess May Primary School</p>
                    <p>Barrett's Grove Entrance (off Stoke Newington Road)</p>
                    <p>N16 8AJ</p> 
                </div>
                <div >
                    <a
                        href="https://www.facebook.com/Akwaabahackney"
                        target={"blank"}
                    > <i className="footer-fontawe text-primary">
                            <FontAwesomeIcon icon={faFacebook} />
                        </i>
                    </a>
                    <a
                        href="https://twitter.com/AkwaabaHackney"
                        target={"blank"}>
                        <i className="footer-fontawe text-info">
                            <FontAwesomeIcon icon={faTwitter} />
                        </i>
                    </a>
                    {/* I need thier email address for following href */}
                    <a href="mailto:hello@akwaaba.org.uk"
                        target={"blank"}>
                        <i className="footer-fontawe text-white">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </i>
                    </a>

                </div>
            </div>
            <p className='text-warning text-center p-4'>&copy;2022 Made With Love by Team <br></br>Web Wonders</p>
        </div>

    );
};

export default Footer;