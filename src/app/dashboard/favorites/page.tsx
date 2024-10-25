"use client"
import { useState, useEffect } from "react";
import RecipeCard from "../../components/RecipeCard";
import Link from "next/link";
import Image from "next/image";

const getFavoritesFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
};

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = getFavoritesFromLocalStorage();
    setFavorites(favs);
  }, []);

  return (
    <div className="bg-gradient-to-b from-green-50 to-white flex-1 p-10 min-h-screen">
      <div className="max-w-screen-lg mx-auto">
        <h1 className="font-bold text-4xl md:text-6xl text-green-800 my-8 text-center">Mis Favoritos</h1>

        {favorites.length === 0 ? (
          <div className="h-[80vh] flex flex-col items-center gap-6">
            <Image 
              src="/404.png"
              width={600}
              height={500} 
              className="h-3/4" alt="No favorites" />
            <p className="text-lg text-gray-700">No tienes recetas favoritas aún.</p>
            <Link
              href="/dashboard"
              className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition duration-300"
            >
              Explora Recetas
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;