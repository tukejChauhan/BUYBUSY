import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {db} from "../../firebaseInit";
import {doc, onSnapshot, setDoc, getDoc, collection, updateDoc} from "firebase/firestore";
import { toast} from "react-toastify";

//Defining initial state

const initialState = {
    user: null,
    cart : [],
    orders: [],
    total: 0,
};

//creating Thunk for Authenticate User

export const AsyncUserAuth = createAsyncThunk("todo/checkAuth", async (args, thunkAPI) => {
    
    const docRef = doc(db, "users", args.email);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                if(docSnap.data().password === args.pass){
                toast.success("Logged In successfully");
                var user = docSnap.data();
                // console.log(user);
                thunkAPI.dispatch(actions.setUser({...user}));
                
                }
                else {
                    toast.warn("Enter correct data");
                }
            }
} )

//creating Thunk for Adding User

export const AsyncCreateUser = createAsyncThunk("todo/createUser",async (args, thunkAPI) => {
    const docRef = doc(db, "users", args.email);
            let docSnap = await getDoc(docRef);
                if(docSnap.exists()){
                    toast.warn("User already exists");
                    console.log("User already exists")
                    return false; 
                }

            await setDoc(doc(db, "users", args.email), {
                name: args.name,
                email: args.email,
                password: args.password,
                cart: [],
                orders: [],
            });
            docSnap = await getDoc(docRef);
                thunkAPI.dispatch(actions.setUser(docSnap.data()));
                toast.success("User created successfully");
                return true;
})

//creating Thunk for Adding product to cart

export const AsyncAddtoCart = createAsyncThunk("todo/AddToCart", async(args, thunkAPI) => {
    
    let state = thunkAPI.getState().productReducer;
    
    const index = state.cart.findIndex((prod) => prod.id === args.id);
            if(index === -1){
                const docRef = doc(db, "users", state.user.email);
                await updateDoc(docRef, {
                    cart: [...state.cart, {...args, qty:1}]
                })
                thunkAPI.dispatch(actions.updateCart([...state.cart, {...args, qty:1}]));
                toast.success("Added to cart");
                
            }
            else{
                // console.log(index);
                let cart = [...state.cart];
                cart = cart.map((product) => {
                    console.log(product.id, args.id);
                    
                    if(product.id == args.id){
                        let qty = product.qty;
                        ++qty;
                        return {
                            ...product,
                            qty
                        }
                    } else{  
                        return product;
                    }
                    
                })
                console.log(cart);
                const docRef = doc(db, "users", state.user.email);
                await updateDoc(docRef, {
                     cart: [...cart]
                })
                console.log(cart);
                thunkAPI.dispatch(actions.updateCart([...cart]));
                toast.success("Quantity Increased");
            }
            // state.total = ((state.total+args.price));
            thunkAPI.dispatch(actions.setTotal(state.total+args.price));
})


//creating Thunk for Decreasing quantity of product in cart

export const AsyncDecreaseQty = createAsyncThunk("todo/DecreaseQty", async(args, thunkAPI) => {
    
    let state = thunkAPI.getState().productReducer;
    
    const index = state.cart.findIndex((prod) => prod.id === args.id);
            // if(index === -1){
            //     const docRef = doc(db, "users", state.user.email);
            //     await updateDoc(docRef, {
            //         cart: [...state.cart, {...args, qty:1}]
            //     })
            //     thunkAPI.dispatch(actions.updateCart([...state.cart, {...args, qty:1}]));
            //     toast.success("Added to cart");
                
            // }
            
                // console.log(index);
    if(state.cart[index].qty <= 1){
        console.log(state.cart[index]);
        thunkAPI.dispatch(AsyncRemoveFromCart(args));
        return;
    }

                let cart = [...state.cart];
                cart = cart.map((product) => {
                    console.log(product.id, args.id);
                    
                    if(product.id == args.id){
                            let qty = product.qty;
                            --qty;
                            return {
                                ...product,
                                qty
                            }
                       
                    } else{  
                        return product;
                    }
                    
                })
                const docRef = doc(db, "users", state.user.email);
                await updateDoc(docRef, {
                     cart: [...cart]
                })
                console.log(cart);
                thunkAPI.dispatch(actions.updateCart([...cart]));
                toast.success("Quantity Decreased");

            // state.total = ((state.total-args.price));
            thunkAPI.dispatch(actions.setTotal(state.total-args.price));
})


//creating Thunk for Removing product fromm cart

export const AsyncRemoveFromCart = createAsyncThunk("todo/removeFromCart", async (args, thunkAPI) => {
    const state = thunkAPI.getState().productReducer;
    const index = state.cart.findIndex((prod) => prod.id === args.id);
    console.log(index);
    console.log(state.cart);
    const cart = state.cart.filter((prod, i) => {
        return i != index;
    })

    const docRef = doc(db, "users", state.user.email);
        await updateDoc(docRef, {
            cart: cart
        })
        toast.success("Product Removed");    
    thunkAPI.dispatch(actions.updateCart([...cart]));    
    thunkAPI.dispatch(actions.setTotal((state.total - args.price)));
})


//creating Thunk for Adding cart to orders

export const AsyncAddToOrder = createAsyncThunk("todo/addToOrder", async(args, thunkAPI) => {
    const state = thunkAPI.getState().productReducer;

    const docRef = doc(db, "users", state.user.email);
    const currdate = new Date();
    await updateDoc(docRef, {
        cart: [],
        orders: [...state.orders, 
                {products: [...state.cart],
                time: `${currdate.getFullYear()}-${currdate.getMonth() + 1}-${currdate.getDate()<10? `0${currdate.getDate()}`:`${currdate.getDate()}`}`,
                totalPrice: state.total}]
    })
        thunkAPI.dispatch(actions.updateOrder([...state.orders,
                                            { products: [...state.cart],
                                            time: `${currdate.getFullYear()}-${currdate.getMonth() + 1}-${currdate.getDate()<10? `0${currdate.getDate()}`:`${currdate.getDate()}`}`,
                                            totalPrice: state.total}]));
        
        toast.success("Ordered Successfully");
})




//creating slice to handle state

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setUser:(state, action) => {
            state.user = action.payload;
            state.cart = state.user.cart;
            state.orders = state.user.orders;
            let tp = 0;
            state.cart.forEach((product) => {
                
                tp = tp + product.price*product.qty;
            });
            
            state.total = tp;
        },
        updateCart:(state, action) => {
            state.cart = action.payload;
        },
        updateOrder: (state, action) => {
            state.cart = [];
            state.orders = action.payload;
            state.total = 0;
        },
        setTotal: (state,action) => {
            state.total = action.payload;
        },
        removeUser: (state,action) => {
            state.user = null;
            state.cart = [];
            state.orders = [];
            state.total = 0;
        }
    }
})

//exporting reducer
export const productReducer = productsSlice.reducer;


//exporting actions
export const actions = productsSlice.actions;

//exporting selector function
export const productsSelector = (state) => state.productReducer;