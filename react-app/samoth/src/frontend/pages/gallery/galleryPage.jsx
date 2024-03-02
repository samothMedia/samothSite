// import { useState } from 'react'
import '/src/frontend/App.css'

function GalleryPage() {
    return (
        <div id="gallery_page" className="pages">
            <div id="gallery_content">
                <div id="left_gallery_column" className="gallery column">
                    <img id="topleftgallery" className="gallery_img square grow" src="/src/frontend/assets/img5_gal.png"
                         alt="gallery image 1">
                    </img>
                    <img id="midleftgallery" className="gallery_img short_rect grow"
                         src="/src/frontend/assets/img8_gal.png" alt="gallery image 1">
                    </img>
                    <img id="botleftgallery" className="gallery_img square grow" src="/src/frontend/assets/img6_gal.png"
                         alt="gallery image 1">
                    </img>
                </div>
                <div id="mid_gallery_column" className="gallery column middle_col">
                    <img id="topmidgallery" className="gallery_img long_rect grow"
                         src="/src/frontend/assets/img2_gal.png" alt="gallery image 1">
                    </img>
                    <img id="botmidgallery" className="gallery_img long_rect grow"
                         src="/src/frontend/assets/img7_gal.png" alt="gallery image 1">
                    </img>
                </div>
                <div id="right_gallery_column" className="gallery column">
                    <img id="toprightgallery" className="gallery_img square grow"
                         src="/src/frontend/assets/img3_gal.png" alt="gallery image 1">
                    </img>
                    <img id="midrightgallery" className="gallery_img short_rect grow"
                         src="/src/frontend/assets/img1_gal.png" alt="gallery image 1">
                    </img>
                    <img id="botrightgallery" className="gallery_img square grow"
                         src="/src/frontend/assets/img4_gal.png" alt="gallery image 1">
                    </img>
                </div>
            </div>
            <div id="gallery_focus" style={{opacity: '0', zIndex: '-10'}}></div>
        </div>
    )
}

export default GalleryPage