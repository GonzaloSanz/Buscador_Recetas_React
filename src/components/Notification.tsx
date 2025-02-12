import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/20/solid'
import { useAppStore } from '../stores/useAppStore'

export const Notification = () => {
    const { notification, hideNotification } = useAppStore();

    return (
        <>
            {
                notification.show && (
                    <div
                        aria-live="assertive"
                        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
                    >
                        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="p-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            {notification.error ? (
                                                <XCircleIcon className='w-6 h-6 text-red-400' aria-hidden="true" />
                                            ) : (
                                                <CheckCircleIcon className='w-6 h-6 text-green-400' aria-hidden="true" />
                                            )}
                                        </div>
                                        <div className="ml-3 w-0 flex-1 pt-0.5">
                                            <p className="text-sm font-medium text-gray-900">Notificación</p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {notification.text}
                                            </p>
                                        </div>
                                        <div className="ml-4 flex flex-shrink-0">
                                            <button
                                                type="button"
                                                className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                onClick={hideNotification}
                                            >
                                                <span className="sr-only">Cerrar</span>
                                                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}