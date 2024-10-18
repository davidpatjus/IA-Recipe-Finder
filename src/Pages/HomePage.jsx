import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import RecipeCard from "../Components/RecipeCard";

function HomePage() {

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async (searchQuery) => {
    setLoading(true);
    setRecipes([]);

    try {
      const res = await fetch(`https://api.edamam.com/api/recipes/v2?app_id=${import.meta.env.VITE_EDAMAM_ID}&app_key=${import.meta.env.VITE_EDAMAM_KEY}&q=${searchQuery}&type=public`);
      const data = await res.json();
      console.log(data.hits);
      setRecipes(data.hits);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRecipes("chicken");
  }, [])

  const handleSearchRecipe = (e) => {
    e.preventDefault();
    fetchRecipes(e.target[0].value);
  }

  return (
    <div className="bg-[#faf9fb] p-10 flex-1">
      <div className="max-w-screen-lg mx-auto">
        <form onSubmit={handleSearchRecipe}>
          <label className="relative block">
            <Search size={"24"} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Que receta vas a cocinar hoy?"
              className="pl-11 pr-4 py-3 w-full bg-white border-none rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200 text-lg"
            />
          </label>
        </form>

        <h1 className="font-bold text-3xl md:text-5xl mt-4 text-black">
          Recetas Recomendadas
        </h1>

        <p className="text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">
          Recetas Populares
        </p>

        <div className="grid gap-3 xl:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {loading && 
            [...Array(12)].map((_, index) => (
              <div key={index} className="flex flex-col gap-4 w-full">
                <div className="skeleton h-32 w-full"></div>
                <div className="flex justify-between">
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-28"></div>
                </div>
                <div className="skeleton h-4 w-1/2"></div>
              </div>
            ))
          }

          {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe.recipe} />
          ))}
        </div>

      </div>
    </div>
  )
}

export default HomePage;