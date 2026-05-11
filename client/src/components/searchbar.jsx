import './searchbar.css';

export default function SearchBar() {
  return (
    <div className="search-container">

      <input
        type="text"
        placeholder="Search anything..."
        className="search-input"
      />

      <button className="search-btn">
        🔍
      </button>

    </div>
  );
}