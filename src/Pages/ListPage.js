import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Avatar from '../img/avatar.png';
import Cart from '../img/carticon.png';
import hearticon from '../img/hearticon.png';
import filtericon from '../img/filtericon.png';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ListPage = () => {

    let history = useHistory();

    const [data, setdata] = useState();
    const [filter, setFilter] = useState();
    const [searchTerm, setSearchTerm] = useState("");


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
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [])






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
            }
        } else {
            let data = comingData;
            data.quantity = 1;
            let arr = [data];
            let JSO = JSON.stringify(arr);
            localStorage.setItem("cart", JSO);
        }

        toast(`${comingData.name} added to cart!`);

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
                    <div className='w-[20%] flex justify-start' onClick={() => history.push('/')}>
                        GROCERIES
                    </div>
                    <div className='w-[40%]'>
                        <input type="text" onChange={(e) => setSearchTerm(e.target.value)} className='w-full border border-2 rounded-full h-10' placeholder='  SEARCH' />
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
                    <span className={`${filter == null || filter == undefined || filter == "" ? "bg-gray-300" : ""} rounded-full cursor-pointer mr-2 border border-2 py-1 px-4 m-2`} onClick={() => setFilter()}>All Items </span>
                    <span className={`${filter == "drinks" ? "bg-gray-300" : ""} rounded-full cursor-pointer mr-2 border border-2 py-1 px-4 m-2`} onClick={() => setFilter("drinks")}>Drinks</span>
                    <span className={`${filter == "fruit" ? "bg-gray-300" : ""} rounded-full cursor-pointer mr-2 border border-2 py-1 px-4 m-2`} onClick={() => setFilter("fruit")}> Fruits </span>
                    <span className={`${filter == "bakery" ? "bg-gray-300" : ""} rounded-full cursor-pointer mr-2 border border-2 py-1 px-4 m-2`} onClick={() => setFilter("bakery")}>Bakery </span>
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
                    )

                        .filter((item) => {

                            //                             const searchQuery = search.toLowerCase();
                            //   const itemName = item.name.toLowerCase();
                            //   const itemDesc = item.description.toLowerCase();
                            //   return itemName.includes(searchQuery) || itemDesc.includes(searchQuery);


                            if (searchTerm == "") {
                                return true;
                            } else if (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || (item.description.toLowerCase().includes(searchTerm.toLowerCase()))) {
                                return true;
                            } else {
                                return false;
                            }
                        })



                        .map(

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
                        )
                    }

                </div>
            </div>

            <ToastContainer />
        </>
    )
}

export default ListPage