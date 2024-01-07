import Tabs from './Tabs';
import Search from './Search';

import style from '../styles/Nav.module.css';

export default function Nav({ handleTabChange, handleSearch }) {

  return (
    <div className={style.container}>
      <div className={style.largeNavBar}>
        <h1 className={style.title} onClick={() => handleTabChange('Homepage')}>Any Time Flix</h1>
        <Tabs handleTabChange={handleTabChange} />
        <Search handleSearch={handleSearch} />
      </div>
      <div className={style.mobileNavBar}>
        <Tabs handleTabChange={handleTabChange} />
      </div>
      <div className={style.mobileHeader}>
        <h1 className={style.title} onClick={() => handleTabChange('Homepage')}>Any Time Flix</h1>
        <Search handleSearch={handleSearch} />
      </div>
    </div>
  );
}