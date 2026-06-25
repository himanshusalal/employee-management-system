function SearchFilter({ setSearch }) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="🔍 Search Employee...."
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchFilter;