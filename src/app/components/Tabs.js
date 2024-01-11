import style from '../styles/Tabs.module.css';

import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

export default function Tabs({ handleTabChange }) {

    const handleTabClick = (tabSelected) => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('jwtToken') === null && tabSelected === 'Account') {
                alert('Please login or sign up to view the account page');
            } else {
                handleTabChange(tabSelected);
            }
        }
    }

    return (
        <div className={style.container}>
            <div className={style.icon} onClick={() => handleTabClick('Homepage')}><HomeIcon />Home</div>
            <div className={style.icon} onClick={() => handleTabClick('Explore')}><TravelExploreIcon />Explore</div>
            <div className={style.icon} onClick={() => handleTabClick('Account')}><AccountBoxIcon />Account</div>
        </div>
    );
}
