import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../App.module.css'
import { useHistory } from "react-router-dom";
// import Minus from './img/Minus.png';
// import Plus from './img/Plus.png';

// import Banana from './img/Banana.png';
// import Avatar from './img/avatar.png';
// import Cart from './img/carticon.png';
// import Cross from './img/crossicon.png';
// import filtericon from './img/filtericon.png';

// import hearticon from './img/hearticon.png';

// // import hearticon from './img/hearticon.png';
// import peach from './img/peach.png';
// // import hearticon from './img/hearticon.png';
// // import hearticon from './img/hearticon.png';

import Avatar from '../img/avatar.png';
import Cart from '../img/carticon.png';
import hearticon from '../img/hearticon.png';
import filtericon from '../img/filtericon.png';






const ListPage = () => {

    let history = useHistory();

    const [data, setdata] = useState();



    // function handleClick() {
    //   history.push("/home");
    // }


    useEffect(() => {

        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=all',
            headers: {}
        };

        axios(config)
            .then(function (response) {

                setdata(response.data);
                console.log((response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [])


    const [filter, setFilter] = useState();




    console.log(filter);


    function addToCart(comingData) {



        let local = localStorage.getItem("cart");
        let parse = JSON.parse(local);
        if (parse != null && parse != undefined && parse.length > 0) {
            if (findInArray(comingData.id, parse) == false) {
                let data = comingData;
                data.quantity = 1;
                parse.push(data);
                localStorage.setItem("cart", JSON.stringify(parse));
            } else {
                console.log("exist");
            }
        } else {
            let data = comingData;
            data.quantity = 1;


            let arr = [data];
            let JSO = JSON.stringify(arr);
            localStorage.setItem("cart", JSO);
            console.log("no element");
        }


    }



    function findInArray(check, arr) {
        let flag = false;

        arr.map((item) => {
            if (item.id == check) {
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
                        <input type="text" className='w-full border border-2 rounded-full h-10' placeholder='  SEARCH' />
                    </div>
                    <div className='w-[20%] flex items-center justify-end'>
                        <span className='mr-2 w-[51px] h-[49px]'>
                            <img src={hearticon} alt='' />
                        </span>
                        <span className='mr-2 w-[58px] h-[58px]'>
                            <img src={Avatar} alt='' />
                        </span>
                        <span onClick={() => history.push('/cart')} className='cursor-pointer mr-2 w-[51px] h-[49px]'>
                            <img src={Cart} alt='' />
                        </span>
                    </div>
                </div>

                <div className='flex justify-start'>
                    <span className='rounded-full cursor-pointer mr-2 border border-2 py-1 px-4 m-2' onClick={() => setFilter()}>All Items </span>
                    <span className='rounded-full cursor-pointer mr-2 border border-2 py-1 px-4 m-2' onClick={() => setFilter("drinks")}>Drinks</span>
                    <span className='rounded-full cursor-pointer mr-2 border border-2 py-1 px-4 m-2' onClick={() => setFilter("fruit")}> Fruits </span>
                    <span className='rounded-full cursor-pointer mr-2 border border-2 py-1 px-4 m-2' onClick={() => setFilter("bakery")}>Bakery </span>
                </div>

                <div className='flex justify-start'>
                    <div className='ml-3'>Trending items</div>
                </div>

                <div className='flex justify-center items-center flex-wrap w-full mb-[5%]'>


                    {data && data.filter((item) => {
                        if (filter == "drinks") {
                            return item.type == "drinks"
                        } else if (filter == "bakery") {
                            return item.type == "bakery"
                        } else if (filter == "fruit") {
                            return item.type == "fruit"
                        } else {
                            return true;
                        }
                    }
                    ).map(

                        (item) =>
                            <div className='flex shadow-lg rounded-lg justify-center p-4 m-3 h-full w-[518px]'>
                                <div className='h-full w-[286px] flex justify-center items-center'
                                >
                                    <img className='w-[200px] h-[200px]' alt="" src={item.img} />
                                </div>

                                <div className='flex justify-around flex-col w-[286px]'>
                                    <div>
                                        <div>{item.name}</div>
                                        <div>{item.description.slice(0, 73)}</div>
                                    </div>
                                    <div className='flex justify-start'>
                                        <button className='ml-2 rounded-full bg-orange-500 w-[40%]'>{item.available < 10 ? `Only ${item.available} left` : "Available"}</button>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div>{item.price}</div>
                                        <div className='flex justify-center'>
                                            <div className='mr-2 cursor-pointer'>
                                                <img src={Cart} alt='' className='h-[27px] w-[27px]' onClick={() => addToCart(item)} />
                                            </div>
                                            <div className='mr-2'>
                                                <img src={hearticon} alt='' className='h-[27px] w-[27px]' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        // <div className='' key={item.id} onClick={() => addToCart(item)}>

                        //     <img className={styles.minusIcon} alt="" src={item.img} />
                        //     <p>  {item.name}</p>


                        //     <p>{item.description}</p>


                        //     <p>{item.available < 10 ? `Only ${item.available} left` : "Available"}</p>



                        //     <p>{item.price}</p>


                        //     <p>cart icon</p>

                        //     <p>heart icon</p>

                        // </div>

                    )


                    }

                </div>


            </div>



        </>
    )
}

export default ListPage