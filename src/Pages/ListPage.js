import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../App.module.css'

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




const ListPage = () => {


    const [data, setdata] = useState();




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


            <div>

                <span className={styles.brdrs} onClick={() => setFilter()}>All Items </span>
                <span className={styles.brdrs} onClick={() => setFilter("drinks")}>Drinks</span>
                <span className={styles.brdrs} onClick={() => setFilter("fruit")}> Fruits </span>
                <span className={styles.brdrs} onClick={() => setFilter("bakery")}>Bakery </span>







            </div>

            <div>

                <span className={styles.brdrs}>Cart</span>
                <span className={styles.brdrs}>Saved</span>
                <span className={styles.brdrs}> Avatar </span>







            </div>




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

                    <div className={styles.brdrs} key={item.id} onClick={() => addToCart(item)}>

                        <img className={styles.minusIcon} alt="" src={item.img} />
                        <p>  {item.name}</p>


                        <p>{item.description}</p>


                        <p>{item.available < 10 ? `Only ${item.available} left` : "Available"}</p>



                        <p>{item.price}</p>


                        <p>  carrt icon</p>

                        <p>  heart icon</p>

                    </div>







            )


            }









        </>
    )
}

export default ListPage