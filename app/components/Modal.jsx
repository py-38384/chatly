'use client'

import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react"
import { IoClose } from "react-icons/io5"

const Modal = ({ isOpen, onClose, children, className='sm:p-6 px-4 pb-4' }) => {
  return (
    <Transition show={isOpen}>
      <Dialog as="div" className='relative z-30' onClose={onClose}>
        <TransitionChild 
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full h-full sm:my-8 sm:w-full sm:max-w-lg ${className}`}>
              <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block z-50" onClick={onClose}>
                  <button type="button" className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                    <span className="sr-only">Close</span>
                    <IoClose className="h-6 w-6"/>
                  </button>
              </div>
              {children}
            </DialogPanel>
          </TransitionChild>
        </div>
          </div>
        </TransitionChild>
      </Dialog>
    </Transition>
  )
}
export default Modal