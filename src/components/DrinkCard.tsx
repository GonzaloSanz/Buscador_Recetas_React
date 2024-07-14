import { useAppStore } from "../stores/useAppStore";
import { Drink } from "../types";

type DrinkCardProps = {
    drink: Drink
}

const DrinkCard = ({ drink }: DrinkCardProps) => {
    const { selectRecipe } = useAppStore();

    return (
        <div className="border shadow-lg">
            <div className="overflow-hidden">
                <img
                    src={drink.strDrinkThumb}
                    alt={`Imagen de ${drink.strDrink}`}
                    className="hover:scale-125 transition-transform hover:rotate-2"
                />
            </div>
            <div className="p-5">
                <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>
                <button
                    onClick={() => selectRecipe(drink.idDrink)}
                    className="w-full px-3 py-2 bg-orange-400 hover:bg-orange-500 transition-colors mt-5 font-bold text-white text-lg"
                >
                    Ver Receta
                </button>
            </div>
        </div>
    )
}

export default DrinkCard;