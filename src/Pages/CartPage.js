import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../App.module.css';
const CartPage = () => {





    const [data, setdata] = useState();

    const [cartList, setcartList] = useState();


    useEffect(() => {





        // fetchAllData();

        let cartData = fetchCartItems();



    }, []);



    const fetchCartItems = () => {

        let data = JSON.parse(localStorage.getItem("cart"));

        if (data != null && data != undefined && data.length > 0) {
            setcartList(data);
        }


    }


    const deleteThisItem = (id) => {
        console.log("delete called");
        let newList = cartList.filter((item) => {
            return item.id != id;
        });

        console.log(newList);
        localStorage.setItem("cart", JSON.stringify(newList))
        setcartList(newList);
    }

    useEffect(() => {

    }, [cartList])


    const minus = (id, available) => {


        let newList = cartList.map((item) => {
            if (item.id == id) {
                if (item.quantity <= 1) {
                    console.log("quantity 1");
                    // deleteThisItem(item.id);
                } else {
                    item.quantity--;
                }
            }
            return item;
        })

        setcartList(newList);


    }


    const add = (id, available) => {


        let newList = cartList.map((item) => {
            if (item.id == id) {
                if (available == item.quantity) {

                } else {
                    item.quantity++;
                }
            }
            return item;
        })

        setcartList(newList);


    }



    return (
        <>

            {
                cartList && cartList.map((item) => (



                    <div className={styles.brdrs} key={item.id}>

                        <img className={styles.minusIcon} alt="" src={item.img} />
                        <p>  {item.name}</p>


                        {/* <p>{item.description}</p> */}


                        <p><span onClick={() => minus(item.id, item.available)} >-</span>  {item.quantity}   <span onClick={() => add(item.id, item.available)}>+</span></p>


                        <p>{item.available < 10 ? `Only ${item.available} left` : "Available"}</p>



                        <p>{item.price}</p>


                        <span>Cross Icon</span>

                    </div>





                ))


            }






        </>
    )
}

export default CartPage