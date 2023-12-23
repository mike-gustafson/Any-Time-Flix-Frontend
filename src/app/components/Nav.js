import Search from './Search';
import Tabs from './Tabs';
import style from '../styles/Nav.module.css';

export default function Nav({ handleTabChange, handleSearch }) {

  return (
    <div className={style.container}>
      <div  className={style.title}>
        <h1>Any Time Flix</h1>
      </div>
      <div  className={style.tabs}>
      <Tabs handleTabChange={handleTabChange} />
      </div>
      <div  className={style.search}>
        <Search handleSearch={handleSearch} />
      </div>
    </div>
  );
}