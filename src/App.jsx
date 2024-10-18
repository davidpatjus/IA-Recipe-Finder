import Homepage from "./Pages/HomePage"
import SideBar from "./Components/SideBar"
import FavoritesPage from "./Pages/FavoritesPage"
import { Route, Routes } from "react-router-dom"

function App() {

  return (
    <body className="flex">
      
      <SideBar />
      
      <Routes >
        <Route path="/" element={<Homepage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
          
    </body>
  )
}

export default App
