import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../App.module.css';
const CartPage = () => {




    let fr = localStorage.getItem("freecart");
    const [data, setdata] = useState();

    const [cartList, setcartList] = useState();
    const [freeItemsList, setfreeItemsList] = useState(fr ? JSON.parse(fr) : undefined);

    const [totalCost, setTotalCost] = useState();
    const [totalDiscount, setTotalDiscount] = useState();


    useEffect(() => {
        let cartData = fetchCartItems();
    }, []);





    useEffect(() => {
        // let cartData = fetchCartItems();
        if (cartList != undefined && cartList != null && cartList.length > 0) {
            let total = 0;
            cartList.map((item) => {
                total += ((parseFloat(item.price.slice(1))) * item.quantity);
            })

            setTotalCost(total);
        }
    }, [cartList]);



    useEffect(() => {
        // let cartData = fetchCartItems();
        if (freeItemsList != undefined && freeItemsList != null && freeItemsList.length > 0) {
            let total = 0;
            freeItemsList.map((item) => {
                total += (parseFloat(item.price.slice(1)));
            })

            setTotalDiscount(total);
        }
    }, [freeItemsList]);





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
        // localStorage.setItem("cart", JSON.stringify(cartList))
    }, [cartList])


    const minus = (id, available) => {


        let newList = cartList.map((item) => {
            if (item.id == id) {
                if (item.quantity <= 1) {
                    console.log("quantity 1");
                    // deleteThisItem(item.id);
                } else {
                    if ((id == 642 && item.quantity == 6) || (id == 532 && item.quantity == 3)) {
                        deleteThisItemFree(id);
                    }
                    item.quantity--;
                }
            }
            return item;
        })

        setcartList(newList);
        localStorage.setItem("cart", JSON.stringify(newList))

    }


    const deleteThisItemFree = (id) => {
        console.log("delete called");

        if (freeItemsList) {
            let newList = freeItemsList.filter((item) => {
                return item.id != id;
            });

            console.log(newList);
            localStorage.setItem("freecart", JSON.stringify(newList))
            setfreeItemsList(newList);
        }
    }


    const add = (id, available) => {


        let newList = cartList.map((item) => {
            if (item.id == id) {

                // if (id == 642)


                if (available == item.quantity) {

                } else {
                    if ((id == 642 && item.quantity == 5) || (id == 532 && item.quantity == 2)) {
                        addFree(item);
                    }
                    item.quantity++;
                    // }
                    // }

                }
            }
            return item;
        })

        setcartList(newList);

        localStorage.setItem("cart", JSON.stringify(newList))

    }



    const addFree = (item) => {

        console.log("add free called");


        let freecart = localStorage.getItem("freecart");
        if (freecart == null || freecart == undefined) {
            localStorage.setItem("freecart", JSON.stringify([item]));
            setfreeItemsList([item]);
        }
        else {
            let narr = JSON.parse(freecart);
            if (checkExist(item.id, narr)) {

            } else {
                narr.push(item);
                localStorage.setItem("freecart", JSON.stringify(narr));
                setfreeItemsList(narr);
            }

        }

    }


    const checkExist = (id, arr) => {
        let flag = false;
        arr.map((item) => {
            if (item.id == id) {
                flag = true;
            }
        });
        return flag;
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


                        <span onClick={() => deleteThisItem(item.id)}>Cross Icon</span>

                    </div>





                ))


            }

            FREE ITEMS:


            {
                freeItemsList && freeItemsList.map((item) => (



                    <div className={styles.brdrs} key={item.id}>

                        <img className={styles.minusIcon} alt="" src={item.img} />
                        <p>  {item.name}</p>


                        {/* <p>{item.description}</p> */}

                        <p>1</p>
                        {/* <p><span onClick={() => minus(item.id, item.available)} >-</span>  {item.quantity}   <span onClick={() => add(item.id, item.available)}>+</span></p> */}


                        {/* <p>{item.available < 10 ? `Only ${item.available} left` : "Available"}</p> */}



                        {/* <p>{item.price}</p> */}


                        {/* <span onClick={() => deleteThisItem(item.id)}>Cross Icon</span> */}

                    </div>


                ))


            }


            <p>{totalCost}</p>

            <p>{totalDiscount}</p>

        </>
    )
}

export default CartPage