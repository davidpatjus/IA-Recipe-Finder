import { Heart, HeartPulse, Soup, ChefHat } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export interface Recipe {
  label: string;
  image: string;
  source: string;
  url: string;
  yield: number;
  cuisineType: string[];
  mealType: string[];
  healthLabels: string[];
}

const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(
    localStorage.getItem("favorites")?.includes(recipe.label)
  );

  const addRecipeToFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const isRecipeAlreadyInFavorites = favorites.some(
      (fav: { label: string; }) => fav.label === recipe.label
    );

    if (isRecipeAlreadyInFavorites) {
      favorites = favorites.filter((fav: { label: string; }) => fav.label !== recipe.label);
      setIsFavorite(false);
    } else {
      favorites.push(recipe);
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
      <div className="relative h-48">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <Image
          src={recipe.image}
          alt={recipe.label}
          width={400}
          height={300}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsImageLoaded(true)}
        />
        <div className="absolute bottom-2 left-2 bg-white bg-opacity-75 backdrop-blur-sm rounded-full py-1 px-2 flex items-center gap-1 text-sm font-medium text-gray-800">
          <Soup size={16} className="text-yellow-500" />
          <span>{recipe.yield} Porciones</span>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            addRecipeToFavorites();
          }}
          className="absolute top-2 right-2 bg-white bg-opacity-75 backdrop-blur-sm rounded-full p-2 transition-colors duration-300"
        >
          <Heart
            size={20}
            className={`transition-colors duration-300 ${
              isFavorite
                ? "fill-red-500 text-red-500"
                : "text-gray-600 hover:text-red-500"
            }`}
          />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-bold text-xl text-gray-800 line-clamp-2">
          {recipe.label}
        </h3>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <ChefHat size={16} />
          <span>
            {recipe.cuisineType[0].charAt(0).toUpperCase() +
              recipe.cuisineType[0].slice(1)}
          </span>
          <span className="text-gray-400">|</span>
          <span>{recipe.mealType[0]}</span>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {recipe.healthLabels.slice(0, 2).map((label, index) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium"
            >
              <HeartPulse size={14} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
