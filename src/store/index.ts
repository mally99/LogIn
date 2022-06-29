import { useContext, createContext } from "react";
import MobxData from "./MobxData"

interface IStores {
    myStore: MobxData;
}
const stores: IStores = {
    myStore: new MobxData()
}
const StoresContext = createContext(stores);

export const useStore = () => {
    return useContext(StoresContext);
};