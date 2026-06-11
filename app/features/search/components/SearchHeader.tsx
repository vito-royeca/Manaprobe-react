
interface SearchHeaderProps {
    count: number;
}
const SearchHeader = ({ count }: SearchHeaderProps) => {

  return ( 
    <div>
      <h1 className="text-3xl font-bold mb-4 inline-flex items-center gap-4 mt-4">
        Results: {count}
      </h1>
      
    </div>
  );
}
 
export default SearchHeader;
