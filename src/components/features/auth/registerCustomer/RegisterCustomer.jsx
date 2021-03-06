import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, DatePicker, Cascader, Checkbox } from 'antd';
import apiUser from 'apis/user';
import residences from '../address';
import { useState } from 'react';

//const { Option } = Select;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 8,
    },
};

/* eslint-disable no-template-curly-in-string */

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
/* eslint-enable no-template-curly-in-string */

const RegisterCustomer = () => {
    const [check, setCheck] = useState(null);

    function onChange(e) {
        setCheck(e.target.checked);
    }

    const onFinish = (values) => {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        const dataForm = {
            User: {
                Name: values.user.name,
                CINum: values.user.id,
                Email: values.user.email,
                DoB: values.user.dob.format('DD-MM-YYYY'),
                PhoneNumber: values.user.phone,
                Password: values.pass,
                registerDate: dateTime,
                Address:
                {
                    StreetNo: values.user.number + ' ' + values.user.street,
                }
            },
            Area:
            {
                City: values.user.residence[0],
                District: values.user.residence[1],
                Ward: values.user.residence[2],
            }
        }
        console.log(dataForm);

        if(check){
            apiUser.post.registerCustomer(dataForm).then(res => {
                console.log(res);
                alert(res);
            });
        }
        else{
            alert("Vui l??ng ?????ng ?? ??i???u kho???n c???a ch??ng t??i");
        }      
    };

    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <h1><center>????NG K?? T??I KHO???N</center></h1>
            <center>
                <Link to='/auth/login'>????ng nh???p |</Link>
                <Link to='/auth/registerprovider'> ????ng k?? nh?? cung c???p |</Link>
                <Link to='/auth/registershipper'> ????ng k?? ?????i t??c giao h??ng</Link>
            </center>
            <h3><center>??i???n c??c th??ng tin sau ????y ????? ????ng k?? t??i kho???n kh??ch h??ng</center></h3>
            <Form.Item
                name={['user', 'name']}
                label="H??? v?? t??n"
                rules={[
                    {
                        type: 'string',
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['user', 'id']}
                label="CCCD/CMND"
                rules={[
                    {
                        type: 'string',
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['user', 'dob']}
                label="Ng??y sinh"
                rules={[
                    {
                        required: true,
                    },
                ]}>
                <DatePicker format={'DD/MM/YYYY'} />
            </Form.Item>
            <Form.Item
                name={['user', 'phone']}
                label="S??? ??i???n tho???i"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['user', 'email']}
                label="Email"
                rules={[
                    {
                        type: 'email',
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <h3><center>Th??ng tin ?????a ch??? giao h??ng</center></h3>
            <Form.Item
                name={['user', 'residence']}
                label="?????a ch???"
                rules={[
                    {
                        type: 'array',
                        required: true,
                        message: 'Please select your habitual residence!',
                    },
                ]}
            >
                <Cascader options={residences} />
            </Form.Item>
            <Form.Item
                name={['user', 'street']}
                label="???????ng"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['user', 'number']}
                label="S??? nh??"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <h3><center>Thi???t l???p m???t kh???u</center></h3>
            <Form.Item
                name={['pass']}
                label="M???t kh???u"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="confirm"
                label="X??c nh???n m???t kh???u"
                dependencies={['pass']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('pass') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 9 }}>
                <Checkbox onChange={onChange}>Vui l??ng ?????ng ?? v???i c??c ??i???u kho???n c???a ch??ng t??i</Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
                <Button type='primary' htmlType='submit'>
                    ????ng k??
                </Button>
            </Form.Item>
        </Form>
    );
};


export default RegisterCustomer;