import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const ProductCard = ({ product, onAdd }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="border rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow bg-white">
      <div className="aspect-square overflow-hidden rounded-lg mb-3">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
        />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold line-clamp-2 h-14">{product.name}</h3>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-600">({product.ratingCount})</span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-3 h-16">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-bold text-green-600">₹{product.price}</p>
            <p className="text-sm text-gray-500 capitalize">{product.category}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
          </div>
        </div>
        
        <Button 
          onClick={() => onAdd(product)} 
          className="w-full mt-3"
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
