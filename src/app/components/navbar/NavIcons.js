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
    
    // set isAuthenticated to false by default
    let isAuthenticated = false;

    // if window is defined (page is loaded in a browser), set isAuthenticated to true if jwtToken exists
    if (typeof window !== 'undefined') {
        isAuthenticated = localStorage.getItem('jwtToken') !== null;
    }

    // array of icon data
    const iconData = [
        { iconClickValue: 'Homepage', icon: <HomeIcon className={styles.icon} />,          text: 'Home'    },
        { iconClickValue: 'Explore',  icon: <TravelExploreIcon className={styles.icon} />, text: 'Explore' },
        isAuthenticated
            ? { iconClickValue: 'Account',  icon: <AccountBoxIcon className={styles.icon} />,    text: 'Account' }
            : { iconClickValue: 'Login',    icon: <LoginIcon className={styles.icon} />,    text: 'Login'   },
        isAuthenticated
            ? { iconClickValue: 'Logout',   icon: <LogoutIcon className={styles.icon} />,    text: 'Logout'  }
            : { iconClickValue: 'Sign Up',  icon: <PersonAddIcon className={styles.icon} />,    text: 'Sign Up' },
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
