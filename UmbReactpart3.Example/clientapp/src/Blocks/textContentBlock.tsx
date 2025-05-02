import { useNavigate } from 'react-router';
import { UmbracoRichText } from '../lib/umbracoTypes';

function TextContentBlock({ content }: { content: RichText }) {
    if (!content.textContent?.markup ) {
        return;
    }

    const navigate = useNavigate();

    const contentClickHandler = (e: any) => {
        const targetLink = e.target.closest("a");
        if (!targetLink) return;
        e.preventDefault();
        navigate(e.target.pathname);
    };

    return <div onClick={contentClickHandler} dangerouslySetInnerHTML={{ __html: content.textContent.markup }} />;
}

type RichText = {
    textContent: UmbracoRichText
}

export default TextContentBlock;