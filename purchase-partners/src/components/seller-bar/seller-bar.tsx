import SearchNavBarSeller from "../search-nav-bar/search-nav-bar-seller";
import FilterBar from "../filter-bar/filter-bar";
import SearchNavBar from "../search-nav-bar/search-nav-bar";

function SellerOffersBar() {
  return (
    <>
      {/* still need to do offers page */}
      <SearchNavBarSeller buttonText="Offers" buttonLink="/seller-offers" />
      <FilterBar />
    </>
  );
}

export default SellerOffersBar;
