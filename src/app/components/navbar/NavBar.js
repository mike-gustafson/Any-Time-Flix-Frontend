// components
import NavIcons from './NavIcons';
import NavSearch from './NavSearch';

// styles
import styles from './NavBar.module.css';

// component
export default function NavBar({ handleTargetPage, handleSearch, activeView, handleUserData, handleLogoutWhileInAccount }) {

  // props and hooks, used to keep code clean and readable
  const navIconsPropsAndHooks = { handleTargetPage, activeView, handleUserData, handleLogoutWhileInAccount }
  const navSearchPropsAndHooks = { handleSearch }

  return (
    <div className={styles.container}>

      {/* appears when screen width is greater than 570px */}
      <div className={styles.largeNavBar}>
        <h1 className={styles.title} onClick={() => handleTargetPage('Homepage')}>Any Time Flix</h1>
        <NavIcons {...navIconsPropsAndHooks} />
        <NavSearch {...navSearchPropsAndHooks} />
      </div>

      {/* appears when screen width is less than 570px */}
      <div className={styles.mobileHeader}>
        <h1 className={styles.title} onClick={() => handleTargetPage('Homepage')}>Any Time Flix</h1>
        <NavSearch {...navSearchPropsAndHooks} />
      </div>
      <div className={styles.mobileNavBar}>
        <NavIcons {...navIconsPropsAndHooks} />
      </div>
      
    </div>
  );
}