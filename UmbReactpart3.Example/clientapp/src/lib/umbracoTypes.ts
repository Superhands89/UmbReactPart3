export type Maybe<T> = T | null;

export type Page = {
    id: string;
    title: string;
    handle: string;
    seo: SEO;
    properties: { [id: string]: any };
    contentType: string;
};

export type SEO = {
    title: string;
    description: string;
};

export type UmbracoElement = {
    content: any;
    id: string;
    contentType: string;
    properties: { [id: string]: any };
};

export type UmbracoNode = UmbracoElement & {
    name: string;
    route: UmbracoRoute;
    createDate: string;
    updateDate: string;
};

export type UmbracoMedia = {
    id: string;
    name: string;
    mediaType: string;
    url: string;
    extension: string;
    width: number;
    height: number;
    bytes: null;
    properties: { [id: string]: any };
};

export type UmbracoRoute = {
    path: string;
    startItem: UmbracoStartItem;
};

export type UmbracoStartItem = {
    id: string;
    path: string;
};

export type UmbracoPagedResult<T> = {
    total: number;
    items: T[];
};

export type UmbracoLink = {
    url: string;
    title: string;
    target?: string;
    destinationId?: string;
    destinationType?: string;
    route?: UmbracoRoute;
    linkType: string;
    queryString?: string;
};

export type UmbracoRichText = {
    markup: string
    blocks: UmbracoRichTextBlock[]
}

export type UmbracoRichTextBlock = {
    content: UmbracoRichTextBlockContent
}

export type UmbracoRichTextBlockContent = {
    contentType: string
    id: string
    content: any
    settings?: any
}

export type UmbracoGridLayout = {
    gridColumns: number
    items: UmbracoGridItem[]
}

export type UmbracoGridItem = {
    rowSpan: number
    columnSpan: number
    areaGridColumns: number
    areas: UmbracoGridArea[]
    content: UmbracoElement
    settings: {}
}

export type UmbracoGridArea = {
    alias: string
    rowSpan: number
    columnSpan: number
    items: any[]
}