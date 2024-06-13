'use client'

const MessageInput = ({ id, register, type, errors, placeholder, required }) => {
  return (
    <div className="relative w-full">
        <input id={id} type={type} autoComplete={id} {...register(id, {required})} placeholder={placeholder} className="text-black font-light py-2 px-4 bg-[#f9f4f2] w-full rounded-full focus:outline-none" />
    </div>
  )
}

export default MessageInput