import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/data/products";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group relative tech-card overflow-hidden noise-texture">
      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-primary/5 to-secondary/5 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary opacity-30 blur-3xl animate-glow"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-7xl font-extrabold text-primary/10 font-montserrat">AI</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
            {product.category}
          </Badge>
          {product.isNextCore && (
            <Badge className="bg-gradient-to-r from-secondary to-accent text-white">
              Featured
            </Badge>
          )}
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-all font-montserrat">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 font-light">
            {product.shortDescription}
          </p>
        </div>

        <ul className="space-y-1">
          {product.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="text-sm text-muted-foreground flex items-start">
              <span className="text-primary mr-2">•</span>
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between pt-4 border-t border-primary/20">
          <span className="text-lg font-bold text-primary font-montserrat">{product.price}</span>
          <Link to={`/products/${product.id}`}>
            <Button variant="outline" size="sm" className="group/btn">
              View Details
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
