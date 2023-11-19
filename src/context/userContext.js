import { createContext,useState,useContext, useEffect } from "react";
import {db} from "../firebaseInit";
import {doc, onSnapshot, setDoc, getDoc, collection, updateDoc} from "firebase/firestore";
import { toast} from "react-toastify";
import { Navigate } from "react-router-dom";


const userContext = createContext();

export const useUserValue = () => {
    const value = useContext(userContext);
    return value;
}


const CustomUserContext = ({children}) =>  {
    const[user, setUser] = useState(null);

    const usersRef = collection(db, "users");

    useEffect(() => {
        onSnapshot(collection(db, "users"), (snapShot) => {
            const users = snapShot.docs.map(doc =>{
                return { email: doc.id, ...doc.data()}
            })
        })
    },[]);

    async function addUser(user){
        const docRef = doc(db, "users", user.email);
        let docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            toast.warn("User already exists");
            console.log("User already exists")
            return false; 
        }

        await setDoc(doc(db, "users", user.email), {
            name: user.name,
            email: user.email,
            password: user.password,
            cart: [],
            orders: [],
        });
        docSnap = await getDoc(docRef);
            setUser(docSnap.data());
            toast.success("User created successfully");
            return true;
            
    }

    async function checkAuth(email,pass) {

        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            if(docSnap.data().password === pass){
            toast.success("Logged In successfully");
            setUser(docSnap.data());
                return true;
            }
            else {
                toast.warn("Enter correct data");
                return false;
            }
        }
        else {
            toast.warn("Enter correct data");
            return false;
        }
        
        
    }

    async function updateCart(cart) {
        const docRef = doc(db, "users", user.email);
        await updateDoc(docRef, {
            cart: cart
        })
    }
    async function updateOrder(orders){
        console.log(orders);
        const docRef = doc(db, "users", user.email);
        await updateDoc(docRef, {
            orders: orders
        })
    }
    
return (
    <userContext.Provider value={{user, checkAuth, addUser, setUser, updateCart, updateOrder}}>
        {children}
    </userContext.Provider>
)

}

export default CustomUserContext;