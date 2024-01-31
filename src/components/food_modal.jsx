'use client'

import { Modal } from 'flowbite'
import { forwardRef, useState } from 'react'
import { createFood, updateFood } from '@/lib/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const FoodModal = forwardRef(function FoodModal({ food }, ref) {
  const queryClient = useQueryClient()

  const buttonTitle = food ? 'Update food' : 'Add new food'

  const [name, setName] = useState(food?.name || '')
  const [price, setPrice] = useState(food?.price || '0.00')

  const modalOptions = {
    placement: 'bottom-right',
    backdrop: 'static',
    backdropClasses:
        'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
    closable: true,
  }

  function onClose() {
    const modal = new Modal(ref.current, modalOptions)
    modal.hide()
    const backdrop = document.querySelector('[modal-backdrop]');
    backdrop.remove();
  }

  function closeModal() {
    const modal = new Modal(ref.current, modalOptions)
    modal.hide()
    const backdrop = document.querySelector('[modal-backdrop]');
    backdrop.remove();
  }

  const updateMutation = useMutation({
    mutationFn: async (payload) => {
        const data = await updateFood(food.id, payload)
        return data
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['foods'], (prev) => {
        return prev.map((food) => ( food.id == data.id ? data : food))
      })
    }
  })

  const createMutation = useMutation({
    mutationFn: createFood,
    onSuccess: (data) => {
      queryClient.setQueryData(['foods'], (prev) =>{
        return [...prev, data]
      })
    }
  })

  async function onSubmit() {
    if (food == null) {
        createMutation.mutate({ name, price })
    } else {
      updateMutation.mutate({
        id: food.id,
        name,
        price
      })
    }

    closeModal()
  }

  return (
<div tabIndex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full" ref={ref}>
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Create New Food
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={onClose}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            {/* <!-- Modal body --> */}
            <form onSubmit={(e) => e.preventDefault() } className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input value={name} onChange={(event) => setName(event.target.value)} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" />
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                        <input value={price} onChange={(event) => setPrice(event.target.value)}   type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required="" />
                    </div>
                </div>
                <button onClick={onSubmit} type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                    { buttonTitle }
                </button>
            </form>
        </div>
    </div>
</div> 
  )
})

export default FoodModal
