import { Page } from "./lib/umbracoTypes";

function ContentBlocks({ content }: { content: Page | null }) {
    return content && <div>{ content.title }</div>
}

export default ContentBlocks;