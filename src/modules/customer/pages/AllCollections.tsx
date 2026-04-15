import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import Card from "../components/Card";

export default function AllCollections() {
  const { products, loading, error } = useProducts();
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search")?.toLowerCase() || "";

  //  empty search
  const searchValue = search.trim();

  const filteredProducts =
    searchValue === ""
      ? products
      : products.filter((item) => {
          const titleMatch = item.title
            .toLowerCase()
            .includes(searchValue);

          const categoryMatch =
            item.category?.toLowerCase().trim() === searchValue;

          return titleMatch || categoryMatch;
        });

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10">{error}</p>;

  return (
    <section className="px-6 py-20 bg-[#faf7fb] min-h-screen">
      <h2 className="text-center text-3xl mb-10 uppercase">
        All Collections
      </h2>

      {/* Show search text */}
      {searchValue && (
        <p className="text-center mb-6 text-[#4b2a53]/60">
          Results for: <span className="font-semibold">{searchValue}</span>
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <Card key={item.id} product={item} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">
            No products found
          </p>
        )}
      </div>
    </section>
  );
}