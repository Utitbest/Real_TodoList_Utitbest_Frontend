export const TodoList = ({item, handleComplete, theme}) =>{
  return(
    <>
     <span onClick={() => handleComplete(item.id)} className="flex items-center justify-center">
        {item.completed ? (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="11.5" fill="white" stroke="#E3E4F1"/>
          <circle cx="12" cy="12" r="12" fill="url(#paint0_linear_0_595)"/>
          <path d="M8 12.3041L10.6959 15L16.6959 9" stroke="white" strokeWidth="2"/>
          <defs>
          <linearGradient id="paint0_linear_0_595" x1="-12" y1="12" x2="12" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#55DDFF"/>
          <stop offset="1" stopColor="#C058F3"/>
          </linearGradient>
          </defs>
        </svg>)
        :
        (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="11.5" fill="white" stroke="#E3E4F1"/>
          <g opacity="0.01">
          <circle cx="12" cy="12" r="12" fill="url(#paint0_linear_0_606)"/>
          <path d="M8 12.3041L10.6959 15L16.6959 9" stroke="white"/>
          </g>
          <defs>
          <linearGradient id="paint0_linear_0_606" x1="-12" y1="12" x2="12" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#55DDFF"/>
          <stop offset="1" stopColor="#C058F3"/>
          </linearGradient>
          </defs>
        </svg>
        )
      }
      </span>
      
      

      <p className={`truncate cursor-default select-none font-normal text-[18px] 
            ${item.completed
              ? "line-through text-[#d1d2daa4]"
              : theme === "light"
                ? "text-[#494C6B]"
                : "text-[#C8CBE7]"
            }`}
        >
          {item.text}
        </p>

    </>
  )
}


