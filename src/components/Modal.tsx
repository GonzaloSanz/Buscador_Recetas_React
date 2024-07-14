import { Dialog } from '@headlessui/react';
import { useAppStore } from '../stores/useAppStore';
import { Recipe } from '../types';

const Modal = () => {
    const { modal, closeModal, selectedRecipe, handleClickFavorite, favoriteExists } = useAppStore();

    const renderIngredients = () => {
        const ingredients = [];

        for (let i = 1; i <= 15; i++) {
            const ingredient = selectedRecipe[`strIngredient${i}` as keyof Recipe];
            const measure = selectedRecipe[`strMeasure${i}` as keyof Recipe];

            if (ingredient && measure) {
                ingredients.push(
                    <li key={i} className='text-lg font-normal'>
                        {ingredient} - {measure}
                    </li>
                )
            }
        }

        return ingredients;
    }

    return (
        <>
            <Dialog open={modal} className="relative z-10" onClose={closeModal}>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                            <Dialog.Title as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                                {selectedRecipe.strDrink}
                            </Dialog.Title>
                            <img
                                src={selectedRecipe.strDrinkThumb}
                                alt={`Imagen ${selectedRecipe.strDrink}`}
                                className='mx-auto w-96'
                            />
                            <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                Ingredientes y Cantidades
                            </Dialog.Title>
                            {renderIngredients()}
                            <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                Instrucciones
                            </Dialog.Title>
                            <p className='text-lg'>{selectedRecipe.strInstructions}</p>

                            <div className='mt-5 flex justify-between gap-4'>
                                <button
                                    onClick={() => closeModal()}
                                    type='button'
                                    className='w-full rounded bg-gray-600 hover:bg-gray-500 transition-colors pz-3 py-2 font-bold uppercase text-white shadow'
                                >Cerrar</button>
                                <button
                                    onClick={() => handleClickFavorite(selectedRecipe)}
                                    type='button'
                                    className='w-full rounded bg-orange-500 hover:bg-orange-600 transition-colors px-3 py-2 font-bold uppercase text-white shadow'
                                >
                                    {favoriteExists(selectedRecipe.idDrink) ? 'Eliminar de Favoritos' : 'Agregar a Favoritos'}
                                </button>
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default Modal;