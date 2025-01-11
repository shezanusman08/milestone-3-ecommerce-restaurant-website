import Image from "next/image";
import Link from "next/link"; // Import Link
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { SimplifiedProduct } from "../interface";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/sanity/lib/image";

async function getData() {
  const query = `*[_type == "product"][0...30] {
    _id,
    price,
    name,
    "slug": slug.current,
    "imageUrl": image[0].asset->url
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function ShopPage() {
  const data: SimplifiedProduct[] = await getData();

  return (
    <div className="px-6 lg:px-12 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((product) => (
          <div
            key={product._id}
            className="group relative bg-white rounded-lg overflow-hidden shadow-lg"
          >
            {/* Wrap the product card with Link to route to the slug page */}
            <Link href={`/shop/${product.slug}`}>
              <div className="relative w-full aspect-square overflow-hidden cursor-pointer">
                <Image
                  src={urlFor(product.imageUrl).url()}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <div className="flex items-center gap-2">
                  <span className="text-orange-500 font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
