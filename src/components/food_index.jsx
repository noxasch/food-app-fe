'use client'

import { useState, useEffect, useRef } from 'react'
import { getFoods } from '@/lib/api'
import FoodTableRow from "./food_table_row"
import { set } from '@/redux/features/food'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Modal } from 'flowbite'
import FoodModal from './food_modal.jsx'

export default function FoodIndex() {
    const ref = useRef(null);

    const query = useQuery({
      queryKey: ['foods'],
      queryFn:  async () =>  {
        const data = await getFoods()
        return data.foods
      },
      initialData: () => []
    })
    
    const modalOptions = {
      placement: 'bottom-right',
      backdrop: 'static',
      backdropClasses:
          'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
      closable: true,
    }
    
    function onCreate() {
      const modal = new Modal(ref.current, {}, modalOptions);
      modal.show();
    }      

    return(
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible w-[1000px]">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div className="w-full md:w-1/2">
                       
                    </div>
                    <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <button type="button" onClick={onCreate} className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Add product
                    </button>
                </div>
            </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-4 py-3">Food Name</th>
                                <th scope="col" className="px-4 py-3">Price</th>
                                <th scope="col" className="px-4 py-3">
                                  <span className="sr-only">Actions</span>
                              </th>
                            </tr>
                        </thead>
                        <tbody>
                            { query.data?.map((food) => {
                                return (
                                    <FoodTableRow food={food} key={food.id} />
                                )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4 h-[10px]">
        
                </div>
            </div>
            <FoodModal ref={ref} />
        </div>
        </section>
  )
}
