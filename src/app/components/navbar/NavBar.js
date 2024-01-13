// components
import NavIcons from './NavIcons';
import NavSearch from './NavSearch';

// styles
import styles from './NavBar.module.css';

// component
export default function NavBar({ handleTargetPage, handleSearch }) {

  return (
    <div className={styles.container}>

      {/* appears when screen width is greater than 570px */}
      <div className={styles.largeNavBar}>
        <h1 className={styles.title} onClick={() => handleTargetPage('Homepage')}>Any Time Flix</h1>
        <NavIcons handleTargetPage={handleTargetPage} />
        <NavSearch handleSearch={handleSearch} />
      </div>

      {/* appears when screen width is less than 570px */}
      <div className={styles.mobileHeader}>
        <h1 className={styles.title} onClick={() => handleTargetPage('Homepage')}>Any Time Flix</h1>
        <NavSearch handleSearch={handleSearch} />
      </div>
      <div className={styles.mobileNavBar}>
        <NavIcons handleTargetPage={handleTargetPage} />
      </div>
      
    </div>
  );
}