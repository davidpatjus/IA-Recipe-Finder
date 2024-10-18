import { Heart, HeartPulse, Soup } from "lucide-react";

function RecipeCard() {
  return (
    <div className="flex flex-col rounded-md bg-[#ecf7d4] overflow-hidden p-3 relative">
        <a href="" className="relative h-32">
            <img 
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1998&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="IMG_RECETA" 
                className="rounded-md w-full h-full object-cover cursor-pointer"
            />
            <div className="absolute bottom-2 left-2 bg-white rounded-full p-1 cursor-pointer flex items-center gap-1 text-sm">
                <Soup size={16} /> 4 Porciones
            </div>
            <div className="absolute top-1 right-2 bg-white rounded-full p-1 cursor-pointer">
                <Heart size={20} className="hover:fill-red-500 hover:text-red-500 m-[1px]" />
            </div>
        </a>

        <div className="flex mt-1">
            <p className="font-bold tracking-wide">Hamburguesa Angus</p>
        </div>

        <p className="my-2">Hamburguesa Colombiana</p>

        <div className="flex gap-2 my-auto">
            <div className="flex gap-1 bg-[#d6f497] items-center p-1 rounded-md">
                <HeartPulse size={16} className="" />
                <span className="text-sm tracking-tighter font-semibold">Vegetales</span>
            </div>
            <div className="flex gap-1 bg-[#d6f497] items-center p-1 rounded-md">
                <HeartPulse size={16} className="" />
                <span className="text-sm tracking-tighter font-semibold">Vegetales</span>
            </div>
        </div>

    </div>
  )
}

export default RecipeCard;