import { useState } from 'react';

import style from '../styles/Explore.module.css';
import Sidebar from './explore/Sidebar';
import Results from './Results';

export default function Explore() {
    const [resultsKey, setResultsKey] = useState(1); // Start counting at 1
    const [activeView, setActiveView] = useState('Top Rated');
    const resultsLength = 20;

    const handleMain = (selectedView) => {
        setActiveView(selectedView);
        setResultsKey(resultsKey + 1);
    };

    const renderContent = () => {
        if (activeView === 'Now Playing') {
            return <Results key={resultsKey} resultsLength={resultsLength} resultsRoute="/movies/now-playing" />
        } else if (activeView === 'Popular') {
            return <Results key={resultsKey} resultsLength={resultsLength} resultsRoute="/movies/popular" />
        } else if (activeView === 'Top Rated') {
            return <Results key={resultsKey} resultsLength={resultsLength} resultsRoute="/movies/top-rated" />
        } else if (activeView === 'Upcoming') {
            return <Results key={resultsKey} resultsLength={resultsLength} resultsRoute="/movies/upcoming" />
        }
    }

    return (
        <div className={style.container}>
            <div className={style.sidebar}>
                <Sidebar handleMain={handleMain} />
            </div>
            <div className={style.main}>
                {renderContent()}
            </div>
        </div>
    );  
}
