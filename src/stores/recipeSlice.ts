import { StateCreator } from "zustand";
import { getCategories, getRecipeById, getRecipies } from "../services/RecipeService";
import { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types";

export type RecipiesSliceType = {
    categories: Categories,
    drinks: Drinks,
    selectedRecipe: Recipe,
    modal: boolean,
    fetchCategories: () => Promise<void>,
    searchRecipies: (searchFilters: SearchFilter) => Promise<void>,
    selectRecipe: (id: Drink['idDrink']) => Promise<void>,
    closeModal: () => void
}

export const createRecipiesSlice: StateCreator<RecipiesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedRecipe: {} as Recipe, // Forma alternativa de declaración, en vez de strings vacíos
    modal: false,
    fetchCategories: async () => {
        const categories = await getCategories();
        set({ categories })
    },
    searchRecipies: async (filters) => {
        const drinks = await getRecipies(filters);
        set({ drinks })
    },
    selectRecipe: async(id) => {
        const selectedRecipe = await getRecipeById(id);
        
        set({
            selectedRecipe,
            modal: true
        })
    },
    closeModal: () => {
        set({
            modal: false,
            selectedRecipe: {} as Recipe
        })
    }
});