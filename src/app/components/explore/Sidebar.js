import React, { useState, useEffect } from 'react';
import style from '../../styles/Explore.module.css';

import LiveTvIcon from '@mui/icons-material/LiveTv';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import StarIcon from '@mui/icons-material/Star';

export default function Sidebar({ handleMain, handleFindByQuery }) {
    const [activeLink, setActiveLink] = useState("Popular");
    const [activeFindByCategory, setActiveFindByCategory] = useState(null);
    const [years, setYears] = useState([]);
    const [error, setError] = useState(null);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/movies/genre/movie/list`);
                const data = await response.json();
                setGenres(data.genres);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        const buildYearList = () => {
            const currentYear = new Date().getFullYear();
            const yearsList = Array.from({ length: currentYear - 1900 + 1 }, (_, index) => ({
                id: 5 + index,
                label: `${currentYear - index}`,
                value: `${currentYear - index}`,
            }));
            setYears(yearsList);
        };

        if (genres.length === 0) {
            fetchGenres();
        }

        if (years.length === 0) {
            buildYearList();
        }
    }, [genres, years.length]);

    const handleLinkClick = (newValue) => {
        setActiveLink(newValue);
        const categoryMapping = { 'Popular': 'Popular', 'Top Rated': 'Top Rated', 'Now Playing': 'Now Playing', 'Upcoming': 'Upcoming' };
        if (categoryMapping[newValue]) {
            handleMain(categoryMapping[newValue]);
            setActiveFindByCategory(null);
        } else if (newValue === 'Genre' || newValue === 'Rating' || newValue === 'Year') {
            if (activeFindByCategory !== newValue) {
                setActiveFindByCategory(newValue);
            } else {
                setActiveFindByCategory(null);
                setActiveLink(null);
            }
        }
    };

    const additionalButtonsMap = {
        Genre: {
            buttons: genres.map((genre) => ({
                id: genre.id,
                label: genre.name,
                value: `${genre.id}`,
            })),
            buttonStyle: style.genreButtons,
        },
        Year: {
            buttons: [],
            buttonStyle: style.yearButtons,
        },
        Rating: {
            buttons: Array.from({ length: 10 }, (_, index) => ({
                id: index + 1,
                label: `${index + 1}`,
                value: `${index + 1}`,
            })),
            buttonStyle: style.ratingButtons,
        },
    };
    
    return (
        <div className={style.sidebarBody}>
            <div className={style.header}>
                <h3 className={style.linkCategoryTitle}>Top lists</h3>
                {[
                    'Popular', 'Top Rated', 'Now Playing', 'Upcoming'
                ].map((category) => (
                    <div
                        key={category}
                        className={`${style.link} ${activeLink === category ? style.activeLink : ''}`}
                        onClick={() => handleLinkClick(category)}
                    >
                        {category === 'Popular' && <AutoAwesomeIcon className={style.icon} />}
                        {category === 'Top Rated' && <TrendingUpIcon className={style.icon} />}
                        {category === 'Now Playing' && <LiveTvIcon className={style.icon} />}
                        {category === 'Upcoming' && <CalendarMonthIcon className={style.icon} />}
                        {category}
                    </div>
                ))}
                <hr />
                <h3 className={style.linkCategoryTitle}>Find movies by</h3>
                <div className={style.findByLinkContainer}>
                    {[
                        { category: 'Genre', icon: <MovieCreationIcon className={style.icon} /> },
                        { category: 'Year', icon: <CalendarMonthIcon className={style.icon} /> },
                        { category: 'Rating', icon: <StarIcon className={style.icon} /> },
                    ].map(({ category, icon }) => (
                        <div
                            key={category}
                            className={`${style.findByLink} ${activeLink === category ? style.activeLink : ''}`}
                            onClick={() => handleLinkClick(category)}
                        >
                            {icon}
                            {category}
                        </div>
                    ))}
                </div>
                <div className={style.additionalButtonsContainer}>
                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div>Error: {error.message}</div>
                    ) : (
                        <div className={style.dropdownContainer}>
                            {activeFindByCategory === 'Year' ? (
                                <div className={style.dropdownContainer}>
                                    <select
                                        className={style.yearDropdown}
                                        onChange={(e) => handleFindByQuery(e.target.value, activeFindByCategory)}
                                        value=""
                                    >
                                        <option value={null}>Select a Year</option>
                                        {years.map((option) => (
                                            <option key={option.id} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                (additionalButtonsMap[activeFindByCategory]?.buttons || []).map(item => (
                                    <div
                                        key={item.id}
                                        className={`${style.link} ${additionalButtonsMap[activeFindByCategory]?.buttonStyle}`}
                                        onClick={() => handleFindByQuery(item.value, activeFindByCategory)}
                                    >
                                        {item.label}
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
