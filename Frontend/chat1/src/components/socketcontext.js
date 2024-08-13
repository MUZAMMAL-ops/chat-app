import { createContext, useState } from "react";

export const socketcontext = createContext(null);

export const SocketMessage = ({children})=> {
   const [socketstate,setsocketstate] = useState()
   console.log('h',socketstate);

   return(
    <socketcontext.Provider value={{socketstate,setsocketstate}}>
        {children}
    </socketcontext.Provider>
   )
}