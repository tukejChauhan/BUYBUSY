import styles from "./style.module.css";
import data from "../../data/data";

//importing hooks from redux
import { useDispatch, useSelector } from "react-redux";

//importing necessary methods from productReducer
import {actions, AsyncAddtoCart, productsSelector} from "../../redux/reducers/productsReducer";

export default function Home(){

    const {user} = useSelector( productsSelector);
    const dispatch = useDispatch();
    return(<>
        <div className={styles.HomePage}>
            <aside className={styles.FilterSidebar}>
                <h2>Filter</h2>
                <form>
                    <label htmlFor="price">Price: 75000</label>
                    <input type="range" id="price" name="price" min="1" max="10000" className={styles.priceRange} step="10" value="75000"></input>
                    <h2>Category</h2>
                    <div className={styles.categoryContainer}>
                        <div>
                            <input type="checkbox" id="groceries" name="groceries"></input>
                            <label htmlFor="groceries">Groceries</label> 
                        </div>
                        <div>
                            <input type="checkbox" id="home-decoration" name="home-decoration"></input>
                            <label htmlFor="home-decoration">Home-Decoration</label> 
                        </div>
                        <div>
                            <input type="checkbox" id="fragrances" name="fragrances"></input>
                            <label htmlFor="fragrances">Women's Clothing</label> 
                        </div>
                        <div>
                            <input type="checkbox" id="laptops" name="laptops"></input>
                            <label htmlFor="laptops">Laptops</label> 
                        </div>
                        <div>
                            <input type="checkbox" id="smartphones" name="smartphones"></input>
                            <label htmlFor="smartphones">Smartphones</label> 
                        </div>
                        <div>
                            <input type="checkbox" id="skincare" name="skincare"></input>
                            <label htmlFor="skincare">Skincare</label> 
                        </div>
                    </div>
                </form>
            </aside>
            <form className={styles.searchForm}>
                <input type="search" placeholder='Search By Name' className={styles.searchInput}></input>
            </form>
            <div className={styles.productGrid}>
                
                {data.products.map(product => (<>
                    <div className={styles.productContainer}>
                    <div className={styles.imageContainer}><img src={product.images[1]} ></img></div>
                    <div className={styles.productDetails}>
                        <div className={styles.productName}><p>{product.title}</p></div>
                        <div className={styles.productPrice}><p>${product.price}</p></div>
                        <button className={styles.addtocartBtn} title="Add to Cart" onClick={user? (() => dispatch(AsyncAddtoCart(product))):null}>Add To Cart</button>
                    </div>
                </div>
                </>))}
                
                
            </div>
        </div>
        </>)
}