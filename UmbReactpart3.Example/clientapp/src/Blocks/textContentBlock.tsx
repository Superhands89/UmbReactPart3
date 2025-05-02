import { useNavigate } from 'react-router';
import { UmbracoRichText } from '../lib/umbracoTypes';

function TextContentBlock({ content }: { content: RichText }) {
    if (!content.textContent?.markup ) {
        return;
    }

    const navigate = useNavigate();

    const contentClickHandler = (e: any) => {
        const targetLink = e.target.closest("a");

        console.log("click")

        if (!targetLink) return;

        e.preventDefault();

        navigate(e.target.pathname);
    };

    return <div onClick={contentClickHandler} dangerouslySetInnerHTML={{ __html: content.textContent.markup }} />;
}

// Function to parse and transform the markup into JSX elements
const parseMarkupToJSX = (markup: string) => {
    return <div id="text-content-block" dangerouslySetInnerHTML={{ __html: markup }} />;

    const navigate = useNavigate();

    const contentClickHandler = (e: any) => {
        const targetLink = e.target.closest("a");

        console.log("click")

        if (!targetLink) return;

        e.preventDefault();

        navigate(e.target.pathname);
    };

    return <div id="text-content-block" onClick={contentClickHandler} dangerouslySetInnerHTML={{ __html: markup }} />;
};

type RichText = {
    textContent: UmbracoRichText
}

export default TextContentBlock;