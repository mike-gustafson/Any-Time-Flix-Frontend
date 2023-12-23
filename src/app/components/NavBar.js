import SearchBar from './SearchBar';
import Tabs from './Tabs';

export default function NavBar({ handleSearch }) {

  return (
    <div className="mt-3 mb-5">
    <SearchBar handleSearch={handleSearch} />
    {/* <Tabs/> */}
    </div>
  );
}