import styles from "./style.module.css";


import { useDispatch, useSelector, } from "react-redux";
import { productsSelector } from "../../redux/reducers/productsReducer";


function Orders(){
    const {orders} = useSelector(productsSelector);
    return(
        <>
        <div class={styles.ordersContainer}>
            <h1>Your Orders</h1>
            {orders.map((order) => (
                <div style={{textAlign:"center", marginTop:"2rem"}}>
                <h2>Ordered On:- {order.time}</h2>
                <table class={styles.OrderTable}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                        <tbody>
                        {console.log(order)}
                            {order.products.map((product) => (
                                <tr>
                                <td>{product.title}</td>
                                <td>$ {product.price} </td>
                                <td>{product.qty} </td>
                                <td>$ {product.qty*product.price}</td>
                                </tr>
                            ))}
                            <tr>
                            </tr>
                        </tbody>
                            <tr class={styles.totalPrice}>
                             {<td>$ {order.totalPrice}</td>}
                            </tr>
                    </table>
                </div>
            ))}
            
            </div>
        </>
    )
}

export default Orders;