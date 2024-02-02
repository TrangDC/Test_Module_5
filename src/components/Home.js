import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import { motion } from 'framer-motion';

function Home() {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/products')
            .then(res => {
                console.log(res);
                setProducts(res.data);
            })
            .catch(err => console.error(err))
    }, [])

    const navigate = useNavigate();
    const handleDelete = (id) => {
        const confirm = window.confirm('Bạn muốn xóa sản phẩm này?');
        if (confirm) {
            axios.delete('http://localhost:3000/products/' + id)
                .then(res => {
                    alert("Sản phẩm đã xóa");
                    window.location.reload();
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <motion.div
            className='d-flex flex-column justify-content-center align-items-center bg-light vh-100'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1>List of Products</h1>
            <div className='w-75 rounded bg-white border shadow p-4'>
                <div className='d-flex justify-content-end'>
                    <Link to='/create' className='btn btn-success'>Thêm</Link>
                </div>
                <table className='table table-striped'>
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên sản phẩm</th>
                        <th>Mô tả</th>
                        <th>Giá</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product, index) =>(
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{product.title}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>
                                <Link to={`/read/${product.id}`} className='btn btn-sm btn-info me-2'>Chi tiết</Link>
                                <Link to={`/update/${product.id}`} className='btn btn-sm btn-primary me-2'>Sửa</Link>
                                <button className='btn btn-sm btn-danger' onClick={event => handleDelete(product.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}

export default Home;