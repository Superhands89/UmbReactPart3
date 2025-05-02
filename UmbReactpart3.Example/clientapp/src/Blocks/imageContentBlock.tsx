import { UmbracoMedia } from "../lib/umbracoTypes";

function ImageContentBlock({ content }: { content: Image }) {
    const media = content.image[0];
    
    return <div id="image-content-block">
        <img src={`${media.url}`} width="100%" />
    </div>
}

type Image = {
    image: UmbracoMedia[]
}

export default ImageContentBlock;
