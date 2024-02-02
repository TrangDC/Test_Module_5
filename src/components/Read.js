import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import { motion } from 'framer-motion';

function Read() {
    const [product, setProduct] = useState([]);

    const {id} = useParams();
    useEffect(() => {
        axios.get('http://localhost:3000/products/' + id)
            .then(res => {
                console.log(res);
                setProduct(res.data);
            })
            .catch(err => console.error(err))
    }, [id])


    return (
        <motion.div
            className='d-flex w-100 vh-100 justify-content-center align-items-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className='w-50 border bg-light text-black p-5'>
                <h3>Chi tiết sản phẩm</h3>
                <div className=' text-black'>
                    <p>Tên sản phẩm: {product.title}</p>
                    <p>Mô tả: {product.description}</p>
                    <p>Giá tiền: {product.price}</p>
                    <Link to={`/update/${id}`} className='btn btn-info'>Sửa</Link>
                    <Link to="/" className='btn btn-primary'>Trở lại</Link>
                </div>
            </div>
        </motion.div>
    );
}

export default Read;