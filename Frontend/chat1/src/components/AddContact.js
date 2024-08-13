import { children, createContext, useState } from "react";

export  const AddContact = createContext(null);

export   const Messages02 = ({children}) => {
     const [Addcontext,setAddcontext] = useState([]);
     console.log('Add',Addcontext);

     return(
        <AddContact.Provider value={[Addcontext,setAddcontext]}>
            {children}
        </AddContact.Provider>
     )

}