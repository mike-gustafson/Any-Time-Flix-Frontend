// style import
import styles from './NavIcons.module.css';

// material-ui icons
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

// component
export default function NavIcons({ handleTargetPage }) {
    
    let isAuthenticated = false; // sets isAuthenticated to false by default, used to determine what icons to display
    
    if (typeof window !== 'undefined') { // checks if window is defined (vercel needs this to build)
        isAuthenticated = localStorage.getItem('jwtToken') !== null; // checks if there is a token in localStorage
    }

    // array of icon data
    const iconData = [
        { iconClickValue: 'Homepage', icon: <HomeIcon className={styles.icon} />,          text: 'Home'    },
        { iconClickValue: 'Explore',  icon: <TravelExploreIcon className={styles.icon} />, text: 'Explore' },
        isAuthenticated
            ? { iconClickValue: 'Account',  icon: <AccountBoxIcon className={styles.icon} />,    text: 'Account' }
            : { iconClickValue: 'Sign Up',  icon: <PersonAddIcon className={styles.icon} />,    text: 'Sign Up' },
        isAuthenticated
            ? { iconClickValue: 'Logout',   icon: <LogoutIcon className={styles.icon} />,    text: 'Logout'  }
            : { iconClickValue: 'Login',    icon: <LoginIcon className={styles.icon} />,    text: 'Login'   },
    ];

    // return component
    return (
        <div className={styles.container}>
            {iconData.map((target, index) => (
                <div
                    key={index}
                    className={`${styles.iconContainer} ${styles[target.iconClickValue.toLowerCase()]}`}
                    onClick={() => handleTargetPage(target.iconClickValue)}
                >
                    {target.icon}
                    {target.text}
                </div>
            ))}
        </div>
    );
}
