import { Children, createContext, useState } from "react";

export  const messageContext01 = createContext(null);

export   const Messages01 = ({children}) => {
     const [messageContext,setmessageContext] = useState([]);
     console.log(messageContext);

     return(
        <messageContext01.Provider value={[messageContext,setmessageContext]}>
            {children}
        </messageContext01.Provider>
     )

}