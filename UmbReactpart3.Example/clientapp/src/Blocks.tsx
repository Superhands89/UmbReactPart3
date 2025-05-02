import CtaContentBlock from "./Blocks/ctaContentBlock";
import ImageContentBlock from "./Blocks/imageContentBlock";
import TextContentBlock from "./Blocks/textContentBlock";

const Blocks = ({ blocks }: { blocks: any }) => {

    return blocks.map((block: any, blockIndex: number) => {
        const key = blockIndex + "-" + block.content.id;

        switch (block.content.contentType) {
            case "imageContentBlock":
                return <ImageContentBlock key={key} content={block.content.properties} />

            case "textContentBlock":
                return <TextContentBlock key={key} content={block.content.properties} />

            case "ctaContentBlock":
                return <CtaContentBlock key={key} content={block.content.properties} />
        }
    })
}

export default Blocks;