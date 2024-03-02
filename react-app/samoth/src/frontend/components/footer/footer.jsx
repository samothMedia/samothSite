// import { useState } from 'react'
import '/src/frontend/App.css'

function Footer() {
    return (
        <footer style={{zIndex: '10'}}>
            {/*site actively in development. check back later for new features*/}
            <a href="https://instagram.com/sam0th_" target="_blank" rel="noreferrer">
                <img id="ig-logo-black" className="footer_buttons black_footer ig-logo"
                     src="/src/frontend/assets/ig_logo.png" alt="Instagram logo">
                </img>
                    <img id="ig-logo-white" className="footer_buttons white_footer ig-logo"
                         src="/src/frontend/assets/ig_logo_white.png" alt="Instagram logo white" style={{display: 'none'}}>
                    </img>
            </a>
            {/*<a href="" target="_blank">*/}
            {/*    <img id="MT-logo-black" className="footer_buttons black_footer mt-logo" */}
            {/*         src="./resources/MT_temp_logo.png" alt="MT logo"></img>*/}
            {/*        <img id="MT-logo-white" className="footer_buttons white_footer mt-logo" */}
            {/*             src="./resources/MT_temp_logo_white.png" alt="MT logo white" style="display: none"></img>*/}
            {/*</a>*/}
            <a href="https://github.com/ths22115/samoth" target="_blank" rel="noreferrer">
                <img id="github-logo-black" className="footer_buttons black_footer github-logo"
                     src="/src/frontend/assets/github_logo.png" alt="Github logo">
                </img>
                    <img id="github-logo-white" className="footer_buttons white_footer github-logo"
                         src="/src/frontend/assets/github_logo_white.png" alt="Github logo white" style={{display: 'none'}}>
                    </img>
            </a>
        </footer>
    )
}

export default Footer