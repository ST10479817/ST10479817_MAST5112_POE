import { createContext, useContext, useState } from "react"


// This will structure all the menu objects.
export type MenuItemInformation = {
    id: number;
    name: string;
    description: string;
    price: number;
    course: string;  // Starters, Mains, Desserts
};

// This is the structure of the object that the Context will provide.
// This includes funcations to update it and the menu array.
type MenuContextType = {
    menu: MenuItemInformation[]; 
    addItem: (item: MenuItemInformation) => void;  
    removeItem: (id: number) => void; 
};

// Creates the actual Context object.
const MenuContext = createContext<MenuContextType | undefined>(undefined);

// This component holds the menu list and the logic to update them.
export const MenuProvider = ({ children }: { children: React.ReactNode }) => {

    const [menu, setMenu] = useState<MenuItemInformation[]>([]);
    const addItem = (item: MenuItemInformation) => setMenu([...menu, item]);
    const removeItem = (id: number) => setMenu(menu.filter(i => i.id !== id));
    return (
        <MenuContext.Provider value={{ menu, addItem, removeItem}}>
            {children}
        </MenuContext.Provider>
    );
};

// This is for error handling.
export const useMenu = () => {

    const context = useContext(MenuContext);
    if (!context) throw new Error('useMenu must be used inside MenuProvider');
    return context;

};