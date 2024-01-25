"use client"

import { Modal, initFlowbite } from "flowbite";
import FoodModal from "./food_modal";
import { useEffect, useRef } from "react";
import { removeFood } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function FoodTableRow({ food }) {
  const queryClient = useQueryClient()
  const ref  = useRef(null);

  const modalOptions = {
    placement: 'bottom-right',
    backdrop: 'static',
    backdropClasses:
        'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
    closable: true,
  }

  function onEdit() {
    const modal = new Modal(ref.current, {}, modalOptions);
    modal.show();
  }

  const deleteMutation = useMutation({
    mutationFn: async (foodId) => {
        const data = await removeFood(foodId)
        return foodId
    },
    onSuccess: (foodId) => {
      queryClient.setQueryData(['foods'], (prev) => {
        return prev.filter((item) => item.id !== foodId)
      })
    }
  })

  async function onDelete() {
    deleteMutation.mutate(food.id)
  }

  useEffect(() => {
    initFlowbite()
  }, [])

  return (
    <tr className="border-b dark:border-gray-700">
      <td className="px-4 py-3">{ food.name }</td>
      <td className="px-4 py-3">{ food.price }</td>
      <td className="px-4 py-3 flex items-center justify-end">
          <button id="apple-imac-20-dropdown-button" data-dropdown-toggle={ `food-${food.id}` } className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
          </button>
          <div id={ `food-${food.id}` } className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
              <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="apple-imac-20-dropdown-button">
                  <li onClick={onEdit}>
                      <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                  </li>
              </ul>
              <div className="py-1" onClick={onDelete}>
                  <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
              </div>
          </div>
          <FoodModal ref={ref} food={food} />
      </td>
  </tr>
  )
}
