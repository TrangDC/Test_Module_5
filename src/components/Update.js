import React, { useEffect, useState } from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

import { motion } from 'framer-motion';

function Update() {
    const [product, setProduct] = useState({
        title: '',
        price: '',
        description: '',
    });

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/products/' + id)
            .then(res => {
                console.log(res);
                setProduct(res.data);
            })
            .catch(err => console.error(err))
    }, [])

    const handleChange = (event) => {
        setProduct({...product, [event.target.name]: event.target.value})
    }

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put('http://localhost:3000/products/' + id, product)
            .then(res => {
                console.log(res);
                navigate("/")
            })
            .catch(err => console.log(err))
    }


    return (
        <motion.div
            className='d-flex w-100 vh-100 justify-content-center align-items-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className='w-50 border bg-blend-lighten text-black p-5'>
                <form onSubmit={handleUpdate}>
                    <h2>Sửa sản phẩm</h2>
                    <div>
                        <label htmlFor="title">Tên:</label>
                        <input type="text" name='title' className='form-control'
                               value={product.title}
                               onChange={handleChange}
                               required
                        />
                    </div>
                    <div>
                        <label htmlFor="price">Giá:</label>
                        <input type="number" name='price' className='form-control'
                               value={product.price}
                               onChange={handleChange}
                               required
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Mô tả:</label>
                        <textarea name='description' className='form-control'
                                  value={product.description}
                                  onChange={handleChange}
                                  required
                        />
                    </div>
                    <br/>
                    <button className='btn btn-info' type="submit">Cập nhật</button>
                    <div className='d-flex justify-content-between'>
                        <Link to='/' className='btn btn-success'>Trở lại</Link>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}

export default Update;
