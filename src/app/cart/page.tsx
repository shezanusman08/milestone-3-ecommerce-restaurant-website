'use client'

import { useShoppingCart } from "use-shopping-cart"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trash2, Plus, Minus } from 'lucide-react'
import Link from "next/link"

export default function CartPage() {
  const {
    cartCount,
    cartDetails,
    removeItem,
    addItem,
    totalPrice,
    redirectToCheckout
  } = useShoppingCart()

  const handleCheckout = async () => {
    try {
      const result = await redirectToCheckout()
      if (result?.error) {
        console.error(result)
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (cartCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 min-h-[60vh]">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <p className="text-muted-foreground">Add some items to your cart to see them here.</p>
        <Link href="/">
          <Button className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Continue Shopping
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Header Section */}
      <div className="relative w-full h-56 bg-black">
        <div className="absolute inset-0">
          <Image
            src="/hero2.png"
            height={200}
            width={200}
            alt="Shopping Header Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-3xl md:text-5xl font-bold">Your Cart</h1>
          <p className="mt-6 text-sm md:text-base text-gray-300">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              Home
            </Link>{" "}
            <span className="mx-2">&gt;</span>{" "}
            <span className="text-yellow-400">cart</span> 
          </p>
        </div>
      </div>

      {/* Cart Section */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {Object.entries(cartDetails ?? {}).map(([id, entry]) => (
                <div key={id} className="flex gap-4 bg-card p-4 rounded-lg shadow">
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={entry.image || ''}
                      alt={entry.name || ''}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{entry.name}</h3>
                        <div className="flex items-center mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => removeItem(entry.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="mx-2 text-sm">{entry.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => addItem(entry)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="font-medium">${(entry.price * entry.quantity).toFixed(2)}</p>
                    </div>
                    <Button
                      variant="ghost"
                      className="self-start text-red-500 hover:text-red-600 p-0 h-auto"
                      onClick={() => removeItem(entry.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-card p-6 rounded-lg shadow sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${totalPrice?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${totalPrice?.toFixed(2)}</span>
                  </div>
                </div>
                <Button 
                  className="w-full"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
                <Link href="/shop">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}