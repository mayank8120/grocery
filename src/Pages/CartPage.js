import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../App.module.css';
import Minus from '../img/Minus.png';
import Plus from '../img/Plus.png';
import Cross from '../img/crossicon.png';


import Avatar from '../img/avatar.png';
import Cart from '../img/carticon.png';
import hearticon from '../img/hearticon.png';




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
        localStorage.setItem("cart", JSON.stringify(newList));
        if (id == 642) {
            deleteThisItemFree(642);
        } else if (id == 532) {
            deleteThisItemFree(641);
        } else {

        }
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
                        if ((id == 532 && item.quantity == 3)) {
                            deleteThisItemFree(641);
                        } else {
                            deleteThisItemFree(id);
                        }



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
                if (available == item.quantity) {

                } else {
                    if ((id == 642 && item.quantity == 5) || (id == 532 && item.quantity == 2)) {



                        let it = {
                            "id": 641,
                            "type": "drinks",
                            "name": "Coffee",
                            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
                            "rating": 3.5,
                            "img": "https://py-shopping-cart.s3.eu-west-2.amazonaws.com/coffee.jpeg",
                            "price": "£0.65",
                            "available": 10
                        };
                        if ((id == 532 && item.quantity == 2)) {
                            addFree(it);
                        }
                        else {
                            addFree(item);
                        }



                        // addFree(item);
                    }
                    item.quantity++;
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

            <div className='w-[80%] mx-auto'>

                <div className='flex justify-between items-center w-full h-full mt-[5%] mb-[3%]'>
                    <div className='w-[20%] flex justify-start'>
                        GROCERIES
                    </div>
                    <div className='w-[40%]'>
                        <input type="text" className='w-full border border-2 rounded-full h-10' />
                    </div>
                    <div className='w-[20%] flex justify-end'>
                        <span className='mr-2 w-[51px] h-[49px]'>
                            <img src={hearticon} alt='' />
                        </span>
                        <span className='mr-2 w-[58px] h-[58px]'>
                            <img src={Avatar} alt='' />
                        </span>
                        <span className='mr-2 w-[51px] h-[49px]'>
                            <img src={Cart} alt='' />
                        </span>
                    </div>
                </div>

                <div className='flex justify-start mb-[3%]'>
                    <div className='ml-3'>Trending items</div>
                </div>
            </div>

            <div>
                {
                    cartList && cartList.map((item) => (

                        <div className='w-[80%] h-[113px] mx-auto mb-5'>
                            <div className="flex items-center shadow-lg rounded-xl h-full px-3 py-4">
                                <div className="flex w-2/5">
                                    <div className="w-20">
                                        <img className="h-24" src={item.img} alt="" />
                                    </div>
                                    <div className="flex flex-col justify-between ml-4 flex-grow">
                                        <span className="font-bold text-sm">{item.name}</span>
                                        <span className="text-red-500 text-xs">product ID : {item.id}</span>
                                        {/* <a href="#" className="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</a> */}
                                    </div>
                                </div>
                                <div className='flex justify-center items-center flex-col w-1/5'>
                                    <div className="flex justify-center ">
                                        <img src={Minus} alt='minus' onClick={() => minus(item.id, item.available)} />

                                        <input className="mx-2 border text-center w-8" type="text" value={item.quantity} />

                                        <img src={Plus} alt='plus' onClick={() => add(item.id, item.available)} />

                                    </div>
                                    <p>{item.available < 10 ? `Only ${item.available} left` : "Available"}</p>
                                </div>
                                <div className='flex justify-center items-center flex-col w-1/5'>
                                    <span className="text-center font-semibold text-sm ">{item.price}</span>
                                </div>
                                <div className='flex justify-start items-end flex-col h-full w-1/5'>
                                    <span onClick={() => deleteThisItem(item.id)} className="text-center font-semibold text-sm ">
                                        <img src={Cross} alt='cross' />
                                    </span>
                                </div>
                            </div>
                        </div>


                        // <div className={styles.brdrs} key={item.id}>

                        //     <img className={styles.minusIcon} alt="" src={item.img} />
                        //     <p>  {item.name}</p>

                        //     <p><span onClick={() => minus(item.id, item.available)} >-</span>  {item.quantity}   <span onClick={() => add(item.id, item.available)}>+</span></p>


                        //     <p>{item.available < 10 ? `Only ${item.available} left` : "Available"}</p>



                        //     <p>{item.price}</p>


                        //     <span onClick={() => deleteThisItem(item.id)}>Cross Icon</span>

                        // </div>





                    ))
                }
            </div>

            {freeItemsList && <div className='flex justify-start w-[80%] mx-auto mt-[5%]'>
                <div className='ml-3'>FREE ITEMS:</div>
            </div>
            }



            {
                freeItemsList && freeItemsList.map((item) => (

                    <div className='w-[30%] h-[113px] mx-auto mb-5'>
                        <div className="flex justify-between items-center shadow-lg rounded-xl h-full px-3 py-4">
                            <div className="flex w-2/5">
                                <div className="w-20">
                                    <img className="h-24" src={item.img} alt="" />
                                </div>
                                <div className="flex flex-col justify-between ml-4 flex-grow">
                                    <span className="font-bold text-sm">{item.name}</span>
                                    <span className="text-red-500 text-xs">product ID : {item.id}</span>
                                    {/* <a href="#" className="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</a> */}
                                </div>
                            </div>
                            <div className='flex justify-center items-center flex-col w-1/5'>
                                <span className="text-center font-semibold text-sm ">{item.price}</span>
                            </div>
                        </div>
                    </div>

                    // <div className='w-[80%] mx-auto'>
                    //     <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                    //         <div className="flex w-2/5">
                    //             <div className="w-20">
                    //                 <img className="h-24" src={item.img} alt="" />
                    //             </div>
                    //             <div className="flex flex-col justify-between ml-4 flex-grow">
                    //                 <span className="font-bold text-sm">{item.name}</span>
                    //                 <span className="text-red-500 text-xs">product ID : {item.id}</span>
                    //             </div>
                    //         </div>
                    //         <div className='flex justify-center items-center flex-col'>
                    //             <div className="flex justify-center w-1/5">
                    //                 <img src={Minus} alt='minus' />

                    //                 <input className="mx-2 border text-center w-8" type="text" value="1" />

                    //                 <img src={Plus} alt='plus' />

                    //             </div>
                    //             <p>{item.available < 10 ? `Only ${item.available} left` : "Available"}</p>
                    //         </div>
                    //         <span className="text-center w-1/5 font-semibold text-sm">{item.price}</span>
                    //         <span onClick={() => deleteThisItem(item.id)} className="text-center w-1/5 font-semibold text-sm">
                    //             <img src={Cross} alt='cross' />
                    //         </span>
                    //     </div>
                    // </div>

                    // <div className={styles.brdrs} key={item.id}>

                    //     <img className={styles.minusIcon} alt="" src={item.img} />
                    //     <p>  {item.name}</p>


                    //     {/* <p>{item.description}</p> */}

                    //     <p>1</p>
                    //     {/* <p><span onClick={() => minus(item.id, item.available)} >-</span>  {item.quantity}   <span onClick={() => add(item.id, item.available)}>+</span></p> */}


                    //     {/* <p>{item.available < 10 ? `Only ${item.available} left` : "Available"}</p> */}



                    //     {/* <p>{item.price}</p> */}


                    //     {/* <span onClick={() => deleteThisItem(item.id)}>Cross Icon</span> */}

                    // </div>


                ))
            }


            {/* <p>{totalCost}</p>

            <p>{totalDiscount}</p> */}

            <div className='w-[80%] mx-auto mt-[5%] mb-[5%]'>
                <div className='border-black border-t-2 h-[5rem] flex justify-center items-center'>
                    <div className='w-[30%] flex justify-between'><span>SubTotal</span> <span>{(totalCost ? totalCost : 0) + (totalDiscount ? totalDiscount : 0)}</span></div>
                </div>
                <div className='border-black border-t-2 h-[5rem] flex justify-center items-center'>
                    <div className='w-[30%] flex justify-between'><span>Discount</span> <span>{totalDiscount ? totalDiscount : 0}</span></div>
                </div>
                <div className='border-black border-t-2 border-b-2 h-[5rem] flex justify-center items-center'>
                    <div className='w-[35%]'></div>
                    <div className='w-[30%] flex justify-between'>
                        <span>Total :</span> <span>{totalCost ? totalCost : 0}</span>
                    </div>
                    <div className='w-[35%] flex'>
                        <button className='bg-green-500 rounded-lg ml-auto px-7 py-3'>Checkout</button>
                    </div>
                </div>
            </div>


        </>
    )
}

export default CartPage