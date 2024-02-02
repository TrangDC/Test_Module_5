import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useFormik} from "formik";
import * as Yup from "yup";
import { motion } from 'framer-motion';

function Create() {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            title: '',
            price: '',
            description: ''
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().max(20, 'Must be 20 characters or less')
                .required('Title Required'),
            description: Yup.string().required('Description Required'),
            price: Yup.number()
                .typeError('Must be a number')
                .required('Price Required'),
        }),
        onSubmit: values => {
            axios.post('http://localhost:3000/products', values)
                .then(res => {
                    console.log(res);
                    navigate("/")
                })
                .catch(err => console.log(err))
        }
    })


    return (
        <motion.div
            className='d-flex w-100 vh-100 justify-content-center align-items-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className='w-50 border bg-blend-lighten p-5'>
                <form onSubmit={formik.handleSubmit}>
                    <h2>Thêm sản phẩm</h2>
                    <div>
                        <label htmlFor="title">Tên:</label>
                        <input type="text"
                               name='title'
                               className='form-control'
                               value={formik.values.title}
                               onChange={formik.handleChange}
                        />
                        {formik.touched.title && formik.errors.title ? (
                            <div className="text-danger">{formik.errors.title}</div>
                        ) : null}
                    </div>
                    <div>
                        <label htmlFor="price">Giá tiền:</label>
                        <input type="number"
                               name='price'
                               className='form-control'
                               value={formik.values.price}
                               onChange={formik.handleChange}
                        />
                        {formik.touched.price && formik.errors.price ? (
                            <div className="text-danger">{formik.errors.price}</div>
                        ) : null}
                    </div>
                    <div>
                        <label htmlFor="description">Mô tả:</label>
                        <textarea
                            name='description'
                            className='form-control'
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.description && formik.errors.description ? (
                            <div className="text-danger">{formik.errors.description}</div>
                        ) : null}
                    </div>
                    <br/>
                    <button type={"submit"} className='btn btn-info'>Thêm</button>
                    <div className='d-flex justify-content-between'>
                        <Link to='/' className='btn btn-success'>Trở lại</Link>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}

export default Create;