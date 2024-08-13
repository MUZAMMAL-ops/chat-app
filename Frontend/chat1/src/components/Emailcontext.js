import { createContext,children, useState } from "react";

export const Emailcontext1 = createContext(null);

export const Emailcheck = ({children})=>{
   const [Emailstate,setEmailstate] = useState('');

   return(
      <Emailcontext1.Provider value={[Emailstate,setEmailstate]}>
        {children}
      </Emailcontext1.Provider>
   )
}