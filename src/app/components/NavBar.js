import SearchBar from './SearchBar';

export default function NavBar({ handleSearch }) {

  return (
    <div className="mt-3 mb-5">
    <SearchBar handleSearch={handleSearch} />
    </div>
  );
}