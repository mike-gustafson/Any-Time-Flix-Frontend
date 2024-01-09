import React, { useState, useEffect } from 'react';
import style from '../../styles/Explore.module.css';

import LiveTvIcon from '@mui/icons-material/LiveTv';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import StarIcon from '@mui/icons-material/Star';

export default function Sidebar({ handleMain, handleQueryByYear, handleQueryByGenre, handleQueryByRating }) {
    const [activeLink, setActiveLink] = useState("Popular");
    const [activeCategory, setActiveCategory] = useState(null);
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLinkClick = (newValue) => {
        setActiveLink(newValue);
        if (activeCategory !== 'Year' || activeCategory !== 'Genre' || activeCategory !== 'Rating') {
        handleMain(newValue);
        }
        setActiveCategory(newValue === activeCategory ? null : newValue);
        
        if (activeCategory === 'Genre') {
            handleQueryByGenre(newValue);
        } else if (activeCategory === 'Rating') {
            handleQueryByRating(newValue);
        }
    };

    const handleYear = (year) => {
        setSelectedYear(year);
        setActiveLink('Year');
        handleQueryByYear(year);
    };

    useEffect(() => {
        const fetchGenresForButtons = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/movies/genre/movie/list`);
                const data = await response.json();
                setGenres(data.genres);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (activeCategory === 'Genre' && genres.length === 0) {
            fetchGenresForButtons();
        }
    }, [activeCategory, genres]);

    useEffect(() => {
        const fetchYearsForDropdown = async () => {
            setLoading(true);
            try {
                const currentYear = new Date().getFullYear();
                const yearsList = Array.from({ length: currentYear - 1900 + 1 }, (_, index) => ({
                    id: 5 + index,
                    label: `${currentYear - index}`,
                    value: `${currentYear - index}`,
                }));
                yearsList.unshift({ id: 9999, label: "Future", value: currentYear + 1 });
                setYears(yearsList);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
    
        if (activeCategory === 'Year' && years.length === 0) {
            fetchYearsForDropdown();
        }
    }, [activeCategory, years]);
    

    // Define a map of additional buttons for each category along with the corresponding button style
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

    // Initialize additionalButtons and dropdownOptions based on the active category
    let additionalButtons = [];
    let dropdownOptions = [];
    if (activeCategory === 'Year') {
        dropdownOptions = years;
    } else {
        additionalButtons = additionalButtonsMap[activeCategory]?.buttons || [];
    }

    return (
        <div className={style.sidebarBody}>
            <div className={style.header}>
                <h3 className={style.linkCategoryTitle}>Top lists</h3>
                <div
                    className={`${style.link} ${activeLink === 'Popular' ? style.activeLink : ''}`}
                    onClick={() => handleLinkClick("Popular")}>
                    <AutoAwesomeIcon className={style.icon} />Popular
                </div>
                <div
                    className={`${style.link} ${activeLink === 'Top Rated' ? style.activeLink : ''}`}
                    onClick={() => handleLinkClick("Top Rated")}>
                    <TrendingUpIcon className={style.icon} />Top Rated
                </div>
                <div
                    className={`${style.link} ${activeLink === 'Now Playing' ? style.activeLink : ''}`}
                    onClick={() => handleLinkClick("Now Playing")}>
                    <LiveTvIcon className={style.icon} />Now Playing
                </div>
                <div
                    className={`${style.link} ${activeLink === 'Upcoming' ? style.activeLink : ''}`}
                    onClick={() => handleLinkClick("Upcoming")}>
                    <CalendarMonthIcon className={style.icon} />Upcoming
                </div>
                <hr />
                <h3 className={style.linkCategoryTitle}>Find movies by</h3>
                <div className={style.findByLinkContainer}>
                    <div
                        className={`${style.findByLink} ${activeLink === 'Genre' ? style.activeLink : ''}`}
                        onClick={() => handleLinkClick("Genre")}>
                        <MovieCreationIcon className={style.icon} />Genre
                    </div>
                    <div
                        className={`${style.findByLink} ${activeLink === 'Year' ? style.activeLink : ''}`}
                        onClick={() => handleLinkClick("Year")}>
                        <CalendarMonthIcon className={style.icon} />Year
                    </div>
                    <div
                        className={`${style.findByLink} ${activeLink === 'Rating' ? style.activeLink : ''}`}
                        onClick={() => handleLinkClick("Rating")}>
                        <StarIcon className={style.icon} />Rating
                    </div>
                </div>
                <div className={style.additionalButtonsContainer}>
                    {/* Render the additional buttons or the year dropdown menu for the active category */}
                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div>Error: {error.message}</div>
                    ) : (
                        <div className={style.dropdownContainer}>
                            {activeCategory === 'Year' ? (
                                <div className={style.dropdownContainer}>
                                    <select
                                        className={style.yearDropdown}
                                        onChange={(e) => handleYear(e.target.value)}
                                        value={selectedYear}
                                    >
                                        <option value={null}>Select a Year</option>
                                        {dropdownOptions.map((option) => (
                                            <option key={option.id} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    {selectedYear && (
                                        <div className={style.selectedYearText}>
                                            Showing movies from {selectedYear}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                additionalButtons.map(item => (
                                    <div
                                        key={item.id}
                                        className={`${style.link} ${additionalButtonsMap[activeCategory]?.buttonStyle}`}
                                        onClick={() => handleLinkClick(item.value)}
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