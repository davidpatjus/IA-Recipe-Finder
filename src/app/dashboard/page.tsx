"use client"
import { useEffect, useState } from "react";
import { Search, Coffee, Utensils, Moon, ChevronRight } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Recipe } from "../components/RecipeCard";
import RecipeCard from "../components/RecipeCard";

interface RecipeList {
  recipe: Recipe;
}

interface CategoryRecipes {
  breakfast: RecipeList[];
  lunch: RecipeList[];
  dinner: RecipeList[];
}

const categoryIcons: Record<keyof CategoryRecipes, typeof Coffee> = {
  breakfast: Coffee,
  lunch: Utensils,
  dinner: Moon,
};

const SkeletonLoader = () => (
  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {[...Array(12)].map((_, index) => (
      <div key={index} className="flex flex-col gap-4 w-full">
        <div className="skeleton h-32 w-full bg-gray-200 animate-pulse rounded-lg"></div>
        <div className="flex justify-between">
          <div className="skeleton h-4 w-48 bg-gray-200 animate-pulse rounded"></div>
          <div className="skeleton h-4 w-48 bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div className="skeleton h-4 w-1/2 bg-gray-200 animate-pulse rounded"></div>
      </div>
    ))}
  </div>
);

const Dashboard = () => {
  const [recipes, setRecipes] = useState<RecipeList[]>([]);
  const [categoryRecipes, setCategoryRecipes] = useState<CategoryRecipes>({
    breakfast: [],
    lunch: [],
    dinner: [],
  });
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<keyof CategoryRecipes>("breakfast");
  const { user } = useUser();

  const getLocation = async () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
  
  const fetchRecipes = async (searchQuery: string) => {
    setLoading(true);
    setRecipes([]);
    const position = await getLocation();
    console.log(position);
    try {
      const res = await fetch(
        `https://api.edamam.com/api/recipes/v2?app_id=${process.env.NEXT_PUBLIC_EDAMAM_ID}&app_key=${process.env.NEXT_PUBLIC_EDAMAM_KEY}&q=${searchQuery}&type=public`
      );
      const data = await res.json();
      console.log(data);
      setRecipes(data.hits);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("Error desconocido", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryRecipes = async (category: string) => {
    try {
      const res = await fetch(
        `https://api.edamam.com/api/recipes/v2?app_id=${process.env.NEXT_PUBLIC_EDAMAM_ID}&app_key=${process.env.NEXT_PUBLIC_EDAMAM_KEY}&q=${category}&type=public`
      );
      const data = await res.json();
      setCategoryRecipes((prev) => ({ ...prev, [category]: data.hits }));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("Error desconocido", error);
      }
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      if (user) {
        try {
         const response = await fetch('/api/FindOrCreateUser', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             userEmail: user.primaryEmailAddress?.emailAddress
           }),
         });
   
         if (!response.ok) {
           throw new Error('Error en la petición')
         }
   
         const data = await response.json();
         console.log(data)
   
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error("Error:", error.message);
          } else {
            console.error("Error desconocido", error);
          }
        }
      }
    }
    getUserData();
  }, [user]);

  useEffect(() => {
    fetchRecipes("chicken");
    fetchCategoryRecipes("breakfast");
    fetchCategoryRecipes("lunch");
    fetchCategoryRecipes("dinner");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchRecipe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    fetchRecipes(input.value);
  };

  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-green-800 mb-8 text-center">
          Descubre Deliciosas Recetas
        </h1>
        
        <form onSubmit={handleSearchRecipe} className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Search
              size={24}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500"
            />
            <input
              type="text"
              placeholder="¿Qué receta vas a cocinar hoy?"
              className="pl-12 pr-4 py-4 w-full bg-white border-2 border-green-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 text-sm md:text-lg"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors duration-200"
            >
              Buscar
            </button>
          </div>
        </form>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-green-800 mb-6">Recetas Recomendadas</h2>
          {loading ? (
            <SkeletonLoader />
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {recipes.slice(0, 8).map((recipe, index) => (
                <RecipeCard 
                  key={index} 
                  recipe={recipe.recipe} 
                />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-3xl font-bold text-green-800 mb-6">Recetas por Categoría</h2>
          <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
            {Object.keys(categoryRecipes).map((category) => {
              const cat = category as keyof CategoryRecipes;
              const Icon = categoryIcons[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-200 ${
                    activeCategory === cat
                      ? "bg-green-500 text-white"
                      : "bg-white text-green-800 hover:bg-green-100"
                  }`}
                >
                  <Icon size={20} />
                  <span className="capitalize">{cat}</span>
                </button>
              );
            })}
          </div>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categoryRecipes[activeCategory].slice(0, 8).map((recipe, index) => (
              <RecipeCard 
                key={index} 
                recipe={recipe.recipe} 
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <button className="inline-flex items-center space-x-2 bg-green-100 hover:bg-green-200 text-green-800 font-semibold py-2 px-4 rounded-full transition-colors duration-200">
              <span>Ver más recetas</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard