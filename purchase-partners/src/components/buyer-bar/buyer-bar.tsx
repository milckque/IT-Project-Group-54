import SearchNavBar from '../search-nav-bar/search-nav-bar';
import FilterBar from '../filter-bar/filter-bar';

function CreateGroupBuyer() {
  return (
    <>
      <SearchNavBar buttonText="Create Group" buttonLink="/create-group" data={[]} />
      <FilterBar />
    </>
  );
}

export default CreateGroupBuyer;