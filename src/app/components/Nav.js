import Search from './Search';
import Tabs from './Tabs';
import style from '../styles/Nav.module.css';

export default function Nav({ handleTabChange, handleSearch }) {

  return (
    <div className={style.container}>
      <h1 className={style.title}>Any Time Flix</h1>
      <Tabs handleTabChange={handleTabChange} />
      <Search handleSearch={handleSearch} />
    </div>
  );
}