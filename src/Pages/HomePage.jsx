import { Search } from "lucide-react";
import RecipeCard from "../Components/RecipeCard";

function HomePage() {
  return (
    <div className="bg-[#faf9fb] p-10 flex-1">
      <div className="max-w-screen-lg mx-auto">
        <form>
          <label className="relative block">
            <Search size={"24"} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Que receta vas a cocinar hoy?"
              className="pl-11 pr-4 py-3 w-full bg-white border-none rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200 text-lg"
            />
          </label>
        </form>

        <h1 className="font-bold text-3xl md:text-5xl mt-4">
          Recetas Recomendadas
        </h1>

        <p className="text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">
          Recetas Populares
        </p>

        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
        </div>

      </div>
    </div>
  )
}

export default HomePage;