import React from "react"
import { useParams } from "react-router-dom"
// import productsData from "../products/productsData"
import { Form, InputNumber, Button } from 'antd';
import './productDetail.scss';
import { useEffect, useState } from 'react';
import apiProduct from 'apis/product';


const ProductDetail = () => {
    const [thisProduct, setThisProducts] = useState(null);

    const params = useParams()
 
    useEffect(() => {
        const getData = async () => {
            const productData = await apiProduct.get.getProductById(params.productId);
   
            setThisProducts(productData);
        }
        getData()
    }, [params.productId])

    console.log(thisProduct);

    const onFinish = (values) => {
        console.log(values);
    };

    return (thisProduct && <div className="product">
        <div className="avt">
            <img width="350px"  src={thisProduct.product.image} alt="" />
        </div>
        <div className="infom">
            <h1>{thisProduct.product.name}</h1>
            <h2 className="price">{thisProduct.product.price.toLocaleString()} VNĐ/{thisProduct.product.unit}</h2>
            <h4>{thisProduct.store.name}</h4>
            <div className="des">
                <p>{thisProduct.product.description}</p>
            </div>
            <Form onFinish={onFinish} >
                <h1>
                    <Form.Item label="Số lượng">
                        <InputNumber min={0} defaultValue={0} />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>
                            Thêm vào giỏ
                        </Button>
                    </Form.Item>
                </h1>
            </Form>
        </div>
    </div >)
}

export default ProductDetail