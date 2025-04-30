import {
    Page,
    UmbracoNode
} from './umbracoTypes';

export async function getPage(handle: string): Promise<Page> {
    const res = await umbracoFetch<UmbracoNode>({
        method: 'GET',
        path: `/content/item${handle}`
    });

    return convertToPage(res.body);
}

async function umbracoFetch<T>(opts: {
    method: string;
    path: string;
}): Promise<{ status: number; body: T } | never> {
    const options: RequestInit = {
        method: opts.method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const result = await fetch('/umbraco/delivery/api/v2' + opts.path, options);
    const body = await result.json();

    return {
        status: result.status,
        body
    };
}

const convertToPage = (node: UmbracoNode): Page => {
    return {
        id: node.id,
        handle: node.route.path,
        title: node.name,
        properties: node.properties,
        seo: {
            title: node.properties['seoPageTitle']?.toString() || node.name,
            description: node.properties['seoDescription']?.toString()
        },
        contentType: node.contentType
    };
};