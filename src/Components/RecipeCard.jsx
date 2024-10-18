import { Heart, HeartPulse, Soup } from "lucide-react";

function RecipeCard( recipe ) {
  return (
    <div className="flex flex-col rounded-md bg-[#bde084] overflow-hidden p-3 relative text-black">
        <a href="" className="relative h-32">
            <div className="skeleton absolute inset-0" />
            <img 
                src={recipe.recipe.image} 
                alt="IMG_RECETA" 
                className="rounded-md w-full h-full object-cover cursor-pointer opacity-0 transition-opacity duration-500"
                onLoad={(e) => {
                    e.currentTarget.style.opacity = 1;
                    e.currentTarget.previousElementSibling.style.display = "none";
                }}
            />
            <div className="absolute bottom-2 left-2 bg-white rounded-full p-1 cursor-pointer flex items-center gap-1 text-sm">
                <Soup size={16} /> {recipe.recipe.yield} Porciones
            </div>
            <div 
            onClick={(e) => {
                e.preventDefault()
                // addRecipeToFavorites(recipe.recipe)
            }}
            className="absolute top-1 right-2 bg-white rounded-full p-1 cursor-pointer"
            >
                <Heart size={20} className="hover:fill-red-500 hover:text-red-500 m-[1px]" />
            </div>
        </a>

        <div className="flex mt-1">
            <p className="font-bold tracking-wide">{recipe.recipe.label}</p>
        </div>

        <p className="my-1.5">
            {recipe.recipe.cuisineType[0].charAt(0).toUpperCase() + recipe.recipe.cuisineType[0].slice(1) + " "}
            - 
            {" " + recipe.recipe.mealType[0]} 
        </p>

        <div className="flex gap-2 my-auto">
            <div className="flex gap-1 bg-[#d6f497] items-center p-1 rounded-md">
                <HeartPulse size={16} className="" />
                <span className="text-sm tracking-tighter font-semibold">{recipe.recipe.healthLabels[0]}</span>
            </div>
            <div className="flex gap-1 bg-[#d6f497] items-center p-1 rounded-md">
                <HeartPulse size={16} className="" />
                <span className="text-sm tracking-tighter font-semibold">{recipe.recipe.healthLabels[1]}</span>
            </div>
        </div>

    </div>
  )
}

export default RecipeCard;