import style from '../../styles/MovieDetails.module.css';
import { useState } from 'react';

export default function MovieDetailsDataBox({ detailName, detailData }) {
    const [scrollLeft, setScrollLeft] = useState(0);

    const scrollRight = () => {
        setScrollLeft(scrollLeft + 100); // Adjust the scroll amount as needed
    };

    const scrollLeftClick = () => {
        setScrollLeft(scrollLeft - 100); // Adjust the scroll amount as needed
    };

    return (
        <div className={style.detailBoxContainer}>
            <strong className={style.label}>{detailName}:</strong>
            <div className={style.detailBoxWrapper}>
                <button
                    className={`${style.scrollLeftButton} ${scrollLeft === 0 ? style.hidden : ''}`}
                    onClick={scrollLeftClick}
                >
                    &lt;
                </button>
                <ul className={style.detailBox} style={{ transform: `translateX(-${scrollLeft}px)` }}>
                    {detailData.map((detail) => (
                        <li key={detail.id}>
                            {detail.name}
                            {detail.character && (
                                <span className={style.character}> as {detail.character}</span>
                            )}
                            {detail.known_for_department && !detail.character &&
                                detail.known_for_department !== 'Acting' && (
                                    <span className={style.department}> ({detail.known_for_department})</span>
                                )}
                        </li>
                    ))}
                </ul>
                <button
                    className={`${style.scrollRightButton} ${scrollLeft >= (detailData.length - 5) * 100 ? style.hidden : ''}`}
                    onClick={scrollRight}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
}
