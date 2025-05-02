import { Link } from "react-router";
import { UmbracoLink } from "../lib/umbracoTypes";

function CtaContentBlock({ content }: { content: CTA }) {
    const link = content.link[0];

    return <div id="cta-content-block">
        <p className="big-text">{content.bigText}</p>
        {link && link.route?.path && <p>
            <Link to={link.route.path} className="button">{link.title}</Link>
        </p>}
    </div>
}

type CTA = {
    bigText: string,
    link: UmbracoLink[]
}

export default CtaContentBlock;
