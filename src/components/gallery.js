import React, { useState } from 'react'
import Img from 'gatsby-image'
import FsLightbox from 'fslightbox-react'
import PropTypes from 'prop-types'

const Gallery = ({ galeria, parent, style }) => {
    const lightboxImages = galeria.map(image => image.localFile.childImageSharp.fluid.src)

    const [toggler, setToggler] = useState(false)
    const [imageIndex, setImageIndex] = useState(0)

    const openLightbox = imageIndex => {
        setImageIndex(imageIndex + 1)
        setToggler(!toggler)
    }

    return (
        <div className={style.Gallery}>
            {galeria.map((image, i) => (
                <figure key={'image-' + i} className={style.Gallery_imageWrapper} onClick={() => openLightbox(i)}>
                    <Img
                        fixed={image.localFile.childImageSharp.fixed}
                        alt={image.alt_text || parent}
                        title={image.title || parent}
                        style={{ maxHeight: '50vw' }}
                    />
                </figure>
            ))}
            <FsLightbox
                toggler={toggler}
                sources={lightboxImages}
                slide={imageIndex}
            />
        </div>
    )
}

Gallery.propTypes = {
    galeria: PropTypes.array.isRequired,
    parent: PropTypes.string,
    style: PropTypes.object.isRequired
}

export default Gallery