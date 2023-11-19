import { useContext, createContext, useState, useEffect } from "react";
import {useUserValue} from "./userContext";
import { toast} from "react-toastify";


const productContext = createContext();

export const useProductValue = () => {
    const value = useContext(productContext);
    return value;
}


const CustomProductContext = ({children}) => {
    const [cart, setCart] = useState([]);
    const  [orders, setOrders] = useState([]);
    const [total, setTotal] = useState(0);
    const {user, updateCart, updateOrder} = useUserValue();
    
    useEffect(() => {
        if(user){
            setCart(user.cart);
            let tp = 0;
            user.cart.forEach((product) => {
                
                tp = tp + product.price*product.qty;
            })
            
            setTotal(tp);
            setOrders([...user.orders]);

        }
    },[user]);

    async function addtoCart(product){
        const index = cart.findIndex((prod) => prod.id === product.id);
        if(index === -1){
            toast.success("Added to cart");
            await updateCart([...cart, {...product, qty:1}]);
            setCart([...cart, {...product, qty:1}]);
            
        }
        else{
            cart[index].qty++;
            console.log(index, cart[index].qty);
            await updateCart([...cart]);
            setCart([...cart]);
            
            toast.success("Quantity Increased");
        }
        setTotal((total+product.price));

    }
    async function removefromCart(product){
        const index = cart.findIndex((prod) => prod.id === product.id);
            cart.splice(index, 1);
            await updateCart([...cart]);
            setCart([...cart]);
    }

    async function decreaseqty(product){
        const index = cart.findIndex((prod) => prod.id === product.id);
        
        if(cart[index].qty === 1){
            cart.splice(index, 1);
            await updateCart([...cart]);
            setCart([...cart]);
            
        }
        else{
            cart[index].qty--;
            await updateCart([...cart]);
            setCart([...cart]);
            
        }
        setTotal((total-product.price));
    }

    async function addtoOrder(){
        const currdate = new Date();

        await updateCart([]);
        await updateOrder([...orders, { products: [...cart], time: `${currdate.getFullYear()}-${currdate.getMonth() + 1}-${currdate.getDate()<10? `0${currdate.getDate()}`:`${currdate.getDate()}`}`, totalPrice: total}]);
        setOrders([...orders, { products: [...cart], time: `${currdate.getFullYear()}-${currdate.getMonth() + 1}-${currdate.getDate()<10? `0${currdate.getDate()}`:`${currdate.getDate()}`}`, totalPrice: total}]);
        setCart([]);
        
        setTotal(0);
        toast.success("Ordered Successfully");
    }




    return (<productContext.Provider value={{cart,total,orders,addtoCart,removefromCart,addtoOrder,decreaseqty }}>
        {children}

    </productContext.Provider>)
}

export default CustomProductContext;