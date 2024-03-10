// import { useState } from 'react'
import '/src/frontend/App.css'


function HomePage() {
    return (
        <div>
            {/*<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"*/}
            {/*        integrity="sha512-z4OUqw38qNLpn1libAN9BsoDx6nbNFio5lA6CuTp9NlK83b89hgyCVq+N5FdBJptINztxn1Z3SaKSKUS5UP60Q=="*/}
            {/*        crossOrigin="anonymous" ></script>*/}
            {/*<script defer src="/src/frontend/script.js"></script>*/}
            {/*<div id="loading_page"> /!* loading page fom loading.jsx *!/*/}
            {/*    <div id="loading_progress_counter">0%.</div>*/}
            {/*    <div id="loading_samoth" className="title" style={{display: 'none'}}>samoth.</div>*/}
            {/*</div>*/}
            <div id="home_page" className="pages">
                <img id="a_s-img" src="/src/frontend/assets/home_a&s.png" alt="Allure & Subdue Image"></img>
                <img id="a_s-img-mobile" src="/src/frontend/assets/a&s_main.png" alt="Allure & Subdue Mobile Image"></img>
                        <div id="home_text">
                            <div id="home_allure" className="title home_title">allure.</div>
                            <div id="home_center_text">
                                <div id="home_title" className="title home_title">out now.</div>
                                <div id="home_subtitle">view in gallery.</div>
                            </div>
                            <div id="home_subdue" className="title home_title">subdue.</div>
                        </div>
            </div>
        </div>
    )
}

export default HomePage