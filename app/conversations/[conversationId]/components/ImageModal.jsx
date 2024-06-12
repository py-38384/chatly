'use client'

import Image from "next/image"

const { default: Modal } = require("@/app/components/Modal")

const ImageModal = ({src, isOpen, onClose}) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="">
                <Image
                    alt="Image"
                    height={400}
                    width={600}
                    className="object-cover"
                    src={src}
                />
        </Modal>
    )
}

export default ImageModal