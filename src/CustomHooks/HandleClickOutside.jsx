
//  Custom hook for closing the dropdowns By checking weather it is clicked inside or outside the refered element

import { useEffect, useRef } from "react";


export function HandleClickOutside(onClose) {
  const ref = useRef(null); 

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose(); 
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // we use [onclose] function insted of state [open] because then it will only runs when clisk onside

  return ref;
}
