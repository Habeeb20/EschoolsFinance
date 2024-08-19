import { ExpContext } from "../context/ExpContext";
import { useContext } from "react";

export const useExpContext = () => {
    const context = useContext(ExpContext)

    if(!context){
        throw Error('useExpense has an error')
    }

    return context
}