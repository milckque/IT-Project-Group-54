import SearchNavBar from '../search-nav-bar/search-nav-bar';
import FilterBar from '../filter-bar/filter-bar';

function SellerOffersBar() {
  return (
    <>
    {/* still need to do offers page */}
      <SearchNavBar buttonText="Offers" buttonLink="/create-group" />
      <FilterBar />
    </>
  );
}

export default SellerOffersBar;