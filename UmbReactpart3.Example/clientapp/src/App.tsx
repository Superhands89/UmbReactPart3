import { useEffect, useState } from 'react'
import './App.css';
import Menu from './menu';
import Content from './content';
import { getPage } from './lib/umbracoFetch';
import { Page } from './lib/umbracoTypes';
import { useLocation } from 'react-router';

function App() {
    const location = useLocation();
    const [pageData, setPageData] = useState<Page | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPage = async () => {
            setLoading(true);

            try {
                const data: Page = await getPage(location.pathname);

                setPageData(data);
            } catch (error) {
                console.error("Failed to fetch page:", error);
                setPageData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchPage();
    }, [location.pathname]);


    return <>
        <Menu></Menu>
        {loading
            ? <div>Loading...</div>
            : <>
                <title>{pageData?.seo?.title}</title>
                <meta name="description" content={pageData?.seo?.description}></meta>

                <Content content={pageData}></Content>
            </>
        }
    </>
}

export default App