import { client } from "@/sanity/lib/client";
import { fullProduct } from "@/app/interface";
import Link from "next/link";

async function searchProducts(query: string) {
  const searchQuery = `
    *[_type == "product" && name match "${query}*"]{
      _id,
      name,
      currentPrice,
      image,
      description,
      "slug": slug.current
    }
  `;
  const results = await client.fetch(searchQuery);
  return results;
}

export default async function SearchPage({ searchParams }: { searchParams: { query: string } }) {
  const query = searchParams.query || "";
  const products: fullProduct[] = await searchProducts(query);

  if (!products.length) {
    return <div className="container mx-auto px-4 py-8">No products found for "{query}"</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg">
            <Link href={`/product/${product.slug}`}>
              <div>
                <img
                  src={product.image[0].asset.url}
                  alt={product.name}
                  className="rounded-lg mb-4"
                />
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="text-sm text-gray-500">{product.description}</p>
                <div className="text-orange-500 font-bold mt-2">${product.currentPrice.toFixed(2)}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
