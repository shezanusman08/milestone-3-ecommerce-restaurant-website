"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "@/sanity/lib/image";
import { useToast } from "@/hooks/use-toast";
import { Toast } from "@/components/ui/toast";

export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  price_id: string;
}

export default function AddToCart({
  currency,
  description,
  image,
  name,
  price,
  price_id,
}: ProductCart) {
  const { addItem, handleCartClick } = useShoppingCart();
  const { toast } = useToast();

  // Ensure all required properties are present before creating the product object
  if (!name || !price || !currency || !price_id) {
    return (
      <Button disabled>
        Product Unavailable
      </Button>
    );
  }

  const product = {
    name,
    description: description || "",
    price,
    currency,
    image: image ? urlFor(image).url() : "",
    price_id,
    id: price_id, // Adding id property which is required by use-shopping-cart
  };

  const handleAddToCart = () => {
    try {
      addItem(product);
      handleCartClick();
      toast({
        title: "Added to Cart",
        description: `${name} has been added to your cart.`,
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast({
        title: "Error",
        description: "There was an error adding the item to the cart.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button onClick={handleAddToCart}>
      Add To Cart
    </Button>
  );
}