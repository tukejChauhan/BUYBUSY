import styles from "./style.module.css";

//importing hooks
import { useSelector, useDispatch } from "react-redux";

//importing necessary methods from productReducer
import { AsyncAddtoCart, AsyncRemoveFromCart,AsyncDecreaseQty, AsyncAddToOrder,productsSelector } from "../../redux/reducers/productsReducer";



export default function Home(){
    const dispatch = useDispatch();
    //accessing cart and total from state using selector hook
    const {cart, total} = useSelector(productsSelector);
    return(<>
        <div className={styles.cartPage}>
    <aside className={styles.totalPrice}>
        <p>TotalPrice:- ${total}/-</p>
        <button className={styles.purchaseBtn} onClick={() => dispatch(AsyncAddToOrder())}>Purchase</button>
    </aside>
    <div className={styles.productGrid}>
        {cart.map((product) => (
            <div className={styles.productContainer}>
            <div className={styles.imageContainer}><img src={product.images[1]} alt="Product" width="100%" height="100%"/> </div>
            <div className={styles.productDetails}>
                <div className={styles.productName}>
                    <p>{product.title}</p>
                </div>
                <div className={styles.productOptions}>
                <p className={styles.productPrice}>$ {product.price*product.qty}</p>
                <div className={styles.quantityContainer}>
                    <img src="https://cdn-icons-png.flaticon.com/128/1828/1828899.png" onClick={() => dispatch(AsyncDecreaseQty(product))} />{product.qty}<img src="https://cdn-icons-png.flaticon.com/128/1828/1828919.png" onClick={() => dispatch(AsyncAddtoCart(product))}/>
                        </div>
                </div>
                    <button className={styles.removeBtn} title="Remove from Cart" onClick={() => dispatch(AsyncRemoveFromCart(product))}>Remove From Cart</button>
                </div>
            </div>
        ))}

        </div>
    </div>
        </>)
}




