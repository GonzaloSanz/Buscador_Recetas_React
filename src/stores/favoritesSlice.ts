import { StateCreator } from "zustand"
import { Recipe } from "../types"
import { createRecipiesSlice, RecipiesSliceType } from "./recipeSlice"
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice"

export type FavoritesSliceType = {
    favorites: Recipe[],
    handleClickFavorite: (recipe: Recipe) => void,
    favoriteExists: (id: Recipe['idDrink']) => boolean,
    loadFromStorage: () => void
}

export const createFavoritesSlice: StateCreator<FavoritesSliceType & RecipiesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {
        // Si ya existe la receta en favoritos
        if (get().favoriteExists(recipe.idDrink)) {
            set({
                favorites: get().favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            });
            createNotificationSlice(set, get, api).showNotification({ text : 'Se eliminó de favoritos', error: false});
        } else {
            set({
                favorites: [...get().favorites, recipe]
            });
            createNotificationSlice(set, get, api).showNotification({ text : 'Se agregó a favoritos', error: false});
        }

        createRecipiesSlice(set, get, api).closeModal();

        // Almacenar favoritos en LocalStorage
        localStorage.setItem('favorites', JSON.stringify(get().favorites));

    },
    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id);
    },
    loadFromStorage: () => {
        const storeFavorites = localStorage.getItem('favorites');
        if(storeFavorites) {
            set({
                favorites: JSON.parse(storeFavorites)
            });
        }
    }
})

