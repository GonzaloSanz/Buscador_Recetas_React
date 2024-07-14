import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

const Header = () => {
  const { pathname } = useLocation();
  const { fetchCategories, categories, searchRecipies, showNotification } = useAppStore();
  const [searchFilters, setSearchFilters] = useState({
    ingredient: '',
    category: ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const isHome = useMemo(() => pathname === '/', [pathname]);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar campos
    if(Object.values(searchFilters).includes('')) {
      showNotification({text: 'Todos los campos son obligatorios', error: true});
      return;
    }

    // Consultar las recetas
    searchRecipies(searchFilters);
  }

  return (
    <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'}>
      <div className="container mx-auto px-5 py-10">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img className="w-32" src="/logo.svg" alt="Logotipo app" />
          </Link>

          <nav className="flex gap-4">
            <NavLink to="/" className={({ isActive }) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}>Inicio</NavLink>
            <NavLink to="/favoritos" className={({ isActive }) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}>Favoritos</NavLink>
          </nav>
        </div>

        {isHome && (
          <form
            className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-16 p-10 rounded-lg shadow"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* Ingrediente */}
            <div className="mb-4">
              <label htmlFor="ingredient" className="block text-white font-extrabold text-lg mb-1 ml-1">Ingrediente</label>
              <input
                id="ingredient"
                name="ingredient"
                type="text"
                placeholder="Ingrediente. Ej. Café"
                className="px-3 py-2 w-full rounded-lg focus:outline-none"
                value={searchFilters.ingredient}
                onChange={handleChange}
              />
            </div>

            {/* Categoría */}
            <div className="mb-8">
              <label htmlFor="category" className="block text-white font-extrabold text-lg mb-1 ml-1">Categoría</label>
              <select
                id="category"
                name="category"
                className="px-3 py-2 w-full rounded-lg focus:outline-none"
                value={searchFilters.category}
                onChange={handleChange}
              >
                <option value="">-- Seleccionar --</option>
                {categories.drinks.map((category) => (
                  <option key={category.strCategory} value={category.strCategory}>{category.strCategory}</option>
                ))}
              </select>
            </div>

            <input
              type="submit"
              value="Buscar Recetas"
              className="cursor-pointer bg-orange-800 hover:bg-orange-900 transition-all text-white font-extrabold w-full px-3 py-2 rounded-lg uppercase"
            />
          </form>
        )}
      </div>
    </header>
  )
}

export default Header;