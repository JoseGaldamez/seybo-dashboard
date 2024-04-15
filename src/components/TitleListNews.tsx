import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { getNewsFromWordPress } from '../services/news.service'
import { NewModel } from '../models/new.mode'
import { NewWordpressCard } from './NewWordpressCard'
import { useStore } from '../global/store'

export const TitleListNews = ({ firebaseNews }: { firebaseNews: NewModel[] }) => {
    const { needUpdate, setNeedUpdateON } = useStore();
    const [news, setNews] = useState<NewModel[]>([])

    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)

    useEffect(() => {
        if (needUpdate || news.length === 0) {
            handleGetNewsFromWordPress();
        }
    }, [needUpdate, news]);

    useEffect(() => {
        if (!open && news.length > 0) {
            setNeedUpdateON();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const handleGetNewsFromWordPress = async () => {
        const result = await getNewsFromWordPress();
        console.log(result);
        if (result) {
            setNews(result);
        }
    }

    return (
        <>

            <h2 className="font-bold text-2xl mb-4 text-gray-700">
                Lista de noticias en la aplicación
            </h2>
            <button onClick={() => {
                setOpen(true)
            }} className="bg-gray-200 rounded-full px-5">Ver notas de Wordpress</button>


            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 max-w-6xl mt-16 mx-auto">
                        <div className="flex justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full mx-8 sm:mx-12 mt-8">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="w-full pb-2 text-xl font-bold leading-6 text-gray-900">
                                                    Lista de notas en Wordpress
                                                </Dialog.Title>
                                                <hr />

                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-2 overflow-y-scroll h-[60vh] px-10">
                                        <div className="text-sm text-gray-500 flex flex-wrap gap-4 justify-start">
                                            {
                                                news.map((item: NewModel) => {
                                                    if (!firebaseNews) return;
                                                    const alreadyExist = firebaseNews.find((element) => element.id === item.id);
                                                    const exist = alreadyExist ? true : false;
                                                    return (
                                                        <NewWordpressCard key={item.id} exist={exist} item={item} />
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                            onClick={() => setOpen(false)}
                                        >
                                            Cerrar
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}
