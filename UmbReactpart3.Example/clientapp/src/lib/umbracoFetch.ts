import {
    Page,
    UmbracoNode,
    NavigationItem,
    UmbracoPagedResult
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
    query?: { [key: string]: string };
}): Promise<{ status: number; body: T } | never> {
    const options: RequestInit = {
        method: opts.method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    let url = '/umbraco/delivery/api/v2' + opts.path;
    
    // Add query parameters if provided
    if (opts.query) {
        const searchParams = new URLSearchParams();
        Object.entries(opts.query).forEach(([key, value]) => {
            searchParams.append(key, value);
        });
        url += '?' + searchParams.toString();
    }

    const result = await fetch(url, options);
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

export async function getNavigation(): Promise<NavigationItem[]> {
    try {
        // Get the home page
        const homeRes = await umbracoFetch<UmbracoNode>({
            method: 'GET',
            path: '/content/item/'
        });

        // Get children of home page
        const childrenRes = await umbracoFetch<UmbracoPagedResult<UmbracoNode>>({
            method: 'GET',
            path: '/content',
            query: {
                'fetch': `children:${homeRes.body.route.path}`
            }
        });

        // Include home page + its children
        const allItems = [homeRes.body, ...(childrenRes.body?.items || [])];

        return allItems.map(node => ({
            id: node.id,
            name: node.name,
            route: node.route,
            properties: node.properties
        }));
    } catch (error) {
        console.error('Error fetching navigation:', error);
        return [];
    }
}

