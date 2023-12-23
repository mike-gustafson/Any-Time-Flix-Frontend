import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import Results from './Results';  
import style from '../styles/tabs.module.css';

export default function Tabs() {
    const [value, setValue] = React.useState(0);
    const [showPopularResults, setShowPopularResults] = React.useState(false);
    const [showNowPlayingResults, setShowNowPlayingResults] = React.useState(false);
    const [showRecommendedResults, setShowRecommendedResults] = React.useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);

        switch (newValue) {
            case 0:
                //  Now Playing tab click
                setShowPopularResults(false);
                setShowNowPlayingResults(true);
                setShowRecommendedResults(false);
                break;
            case 1:
                // Popular tab click
                setShowPopularResults(true);
                setShowNowPlayingResults(false);
                setShowRecommendedResults(false);
                break;
            case 2:
                // Recommended tab click
                setShowPopularResults(false);
                setShowNowPlayingResults(false);
                setShowRecommendedResults(true);
                break;
            default:
                break;
        }
    };

    return (
        <Box >
            <BottomNavigation showLabels value={value} onChange={handleChange}sx={{ width: 500 , margin: 'auto', textAlign: 'center', padding: '5px', }}>
                <BottomNavigationAction   label="Now-Playing" icon={<LiveTvIcon />} />
                <BottomNavigationAction label="Popular" icon={<AutoAwesomeIcon />} />
                <BottomNavigationAction label="Recommended" icon={<SavedSearchIcon />} />
            </BottomNavigation>

            {value === 0 && showNowPlayingResults && (
                <Results resultsLength={14} resultsRoute="/movies/now-playing" />
            )}
            {value === 1 && showPopularResults && (
                <Results resultsLength={14} resultsRoute="/movies/popular" />
            )}
            {value === 2 && showRecommendedResults && (
                <Results resultsLength={15} resultsRoute={`/movies/movie/${11}/recommendations`} />
            )}

        </Box>
    );
}
