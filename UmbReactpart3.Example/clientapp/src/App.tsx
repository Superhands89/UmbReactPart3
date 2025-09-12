import { useEffect, useState } from 'react'
import './App.css';
import Menu from './menu';
import { getPage, getNavigation } from './lib/umbracoFetch';
import { Page, NavigationItem } from './lib/umbracoTypes';
import { useLocation } from 'react-router';
import Blocks from './Blocks';

function App() {
    const location = useLocation();
    const [pageData, setPageData] = useState<Page | null>(null);
    const [navigationData, setNavigationData] = useState<NavigationItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                // Fetch both page and navigation in parallel
                const [pageResponse, navResponse] = await Promise.all([
                    getPage(location.pathname),
                    getNavigation()
                ]);

                setPageData(pageResponse);
                setNavigationData(navResponse || []); // Ensure it's always an array
            } catch (error) {
                console.error("Failed to fetch data:", error);
                setPageData(null);
                setNavigationData([]); // Set empty array on error
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [location.pathname]);

    return <>
        <Menu menuItems={navigationData} />
        {loading
            ? <div>Loading...</div>
            : <>
                <title>{pageData?.seo?.title}</title>
                <meta name="description" content={pageData?.seo?.description}></meta>

                <Blocks blocks={pageData?.properties.contentBlocks?.items}></Blocks>
            </>
        }
    </>
}

export default App
