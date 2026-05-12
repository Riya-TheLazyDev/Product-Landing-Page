"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Heart,
  ShoppingCart,
  Plus,
  Minus,
  Check,
  Sparkles,
  Droplets,
  Wind,
  Sun,
} from "lucide-react";

export default function PerfumePDP() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("100ml");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const productImages = [
    "/api/placeholder/600/800",
    "/api/placeholder/600/800",
    "/api/placeholder/600/800",
    "/api/placeholder/600/800",
  ];

  const sizes = ["50ml", "100ml", "150ml"];

  const relatedProducts = [
    { name: "Midnight Rose", price: "$285", image: "/api/placeholder/300/400" },
    { name: "Golden Hour", price: "$320", image: "/api/placeholder/300/400" },
    { name: "Ocean Mist", price: "$265", image: "/api/placeholder/300/400" },
  ];

  const reviews = [
    {
      name: "Alexander K.",
      rating: 5,
      comment: "Absolutely divine. The scent lasts all day.",
      verified: true,
    },
    {
      name: "Sophie M.",
      rating: 5,
      comment: "Luxurious and sophisticated. My new signature scent.",
      verified: true,
    },
    {
      name: "Marcus L.",
      rating: 4,
      comment: "Elegant fragrance, perfect for special occasions.",
      verified: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section - 3 Column Layout */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT: Image Gallery */}
          <div className="lg:col-span-3 space-y-4">
            <div className="relative">
              {productImages.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-full aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index
                      ? "border-primary shadow-lg shadow-primary/20"
                      : "border-border hover:border-border"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img
                    src="/assets/product.jpeg"
                    alt={`Perfume view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* CENTER: Main Product Showcase */}
          <div className="lg:col-span-6">
            <div className="relative">
              {/* Cinematic Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-black rounded-3xl overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
                </div>
              </div>

              {/* Product Image */}
              <motion.div
                className="relative h-[600px] flex items-center justify-center rounded-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotateY: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative z-10"
                >
                  <div className="w-64 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl absolute -inset-20" />
                  <div className="relative w-80 h-96">
                    <img
                      src="/assets/product.jpeg"
                      alt="Noir Éternel Perfume"
                      className="w-full h-full object-contain drop-shadow-2xl"
                    />
                  </div>
                </motion.div>

                {/* Ambient Glow */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT: Product Information */}
          <div className="lg:col-span-3 space-y-6">
            {/* Reviews Card */}
            <motion.div
              className="glass-card rounded-2xl p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-primary">4.9</span>
                </div>
                <span className="text-muted-foreground text-sm">
                  (247 reviews)
                </span>
              </div>

              <div className="space-y-3">
                {reviews.slice(0, 2).map((review, index) => (
                  <div
                    key={index}
                    className="border-b border-border pb-3 last:border-0"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-foreground">
                          {review.name}
                        </span>
                        {review.verified && (
                          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star className="w-3 h-3 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 text-primary hover:text-primary/80 transition-colors text-sm font-medium">
                View All Reviews →
              </button>
            </motion.div>

            {/* Product Details */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h1 className="text-4xl font-serif text-foreground mb-2">
                Noir Éternel
              </h1>
              <p className="text-primary font-medium mb-4">
                Timeless Elegance, Modern Sophistication
              </p>

              <p className="text-muted-foreground leading-relaxed">
                A masterful blend of rare ingredients that captures the essence
                of eternal sophistication. This fragrance opens with vibrant
                notes of bergamot and black pepper, revealing a heart of jasmine
                and patchouli before settling into a rich base of amber and
                vanilla.
              </p>

              {/* Price */}
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-bold text-foreground">$385</span>
                <span className="text-muted-foreground line-through">$450</span>
                <span className="text-primary text-sm">Limited Edition</span>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2 text-green-500">
                <Check className="w-5 h-5" />
                <span className="text-sm">In Stock - Ready to Ship</span>
              </div>

              {/* Size Selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Size
                </label>
                <div className="flex space-x-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        selectedSize === size
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-border"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:border-border transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:border-border transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-primary to-accent text-foreground font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="w-full py-4 bg-secondary/50 backdrop-blur-lg border border-border text-foreground font-semibold rounded-xl hover:bg-secondary transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Heart
                    className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
                  />
                  <span>
                    {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Inspiration Section */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          className="relative rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Cinematic Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-black">
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 px-12 py-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-4xl font-serif text-foreground mb-6">
                Not just a fragrance, it's a statement.
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Crafted for those who understand that true luxury lies in the
                details. Noir Éternel embodies the perfect balance between
                tradition and innovation, creating an unforgettable signature
                that speaks volumes without saying a word.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Luxury Details Card */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          className="glass-card rounded-3xl p-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-serif text-foreground mb-8 text-center">
            Fragrance Profile
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { icon: Droplets, label: "Longevity", value: "8-10 Hours" },
              { icon: Wind, label: "Intensity", value: "Strong" },
              { icon: Sun, label: "Season", value: "All Seasons" },
              { icon: Sparkles, label: "Mood", value: "Evening" },
              { icon: Heart, label: "Profile", value: "Woody Spicy" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <p className="text-muted-foreground text-sm mb-1">
                  {item.label}
                </p>
                <p className="text-foreground font-medium">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Related Products */}
      <section className="container mx-auto px-6 py-16">
        <motion.h2
          className="text-3xl font-serif text-foreground mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          You May Also Like
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedProducts.map((product, index) => (
            <motion.div
              key={index}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="aspect-[3/4] bg-gradient-to-br from-secondary to-background flex items-center justify-center">
                  <Droplets className="w-16 h-16 text-muted-foreground" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-foreground mb-2">
                    {product.name}
                  </h3>
                  <p className="text-primary font-semibold mb-4">
                    {product.price}
                  </p>
                  <button className="w-full py-2 bg-gradient-to-r from-primary to-accent text-foreground font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Discover
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
