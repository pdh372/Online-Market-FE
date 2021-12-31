import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Upload, Select, DatePicker, Cascader } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Post from '../../../../apis/user/post';

const residences = [
    {
        value: 'TP Hồ Chí Minh',
        label: 'TP Hồ Chí Minh',
        children: [
            {
                value: 'Quận 1',
                label: 'Quận 1',
                children: [
                    {
                        value: 'Phường Bến Nghé',
                        label: 'Phường Bến Nghé',
                    },
                    {
                        value: 'Phường Bến Thành',
                        label: 'Phường Bến Thành',
                    },
                ],
            },
            {
                value: 'Quận 2',
                label: 'Quận 2',
                children: [
                    {
                        value: 'Phường',
                        label: 'Phường',
                    },
                ],
            },
            {
                value: 'Quận 3',
                label: 'Quận 3',
                children: [
                    {
                        value: 'Phường',
                        label: 'Phường',
                    },
                ],
            },
            {
                value: 'Quận 4',
                label: 'Quận 4',
                children: [
                    {
                        value: 'Phường',
                        label: 'Phường',
                    },
                ],
            },
            {
                value: 'Quận 5',
                label: 'Quận 5',
                children: [
                    {
                        value: 'Phường',
                        label: 'Phường',
                    },
                ],
            },
        ],
    },
];

const { Option } = Select;
const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 8,
	},
};
/* eslint-disable no-template-curly-in-string */
const normFile = (e) => {
	console.log('Upload event:', e);

	if (Array.isArray(e)) {
		return e;
	}

	return e && e.fileList;
};

const validateMessages = {
	required: '${label} is required!',
	types: {
		email: '${label} is not a valid email!',
		number: '${label} is not a valid number!',
	},
	number: {
		range: '${label} must be between ${min} and ${max}',
	},
	rules: [
		{
			type: 'array',
			required: true,
			message: 'Please select time!',
		},
	],
};

/* eslint-enable no-template-curly-in-string */

const RegisterProvider = () => {
	const onFinish = values => {
		const dataForm = {
			User: {
				Name: values.user.name,
                CINum: values.user.id,
                Email: values.user.email,
                DoB: values.user.dob.format('DD-MM-YYYY'),
                PhoneNumber: values.user.phone,
                Password: values.pass,
     	  	},
			Area:
            {
                City: values.user.residence[0],
                District: values.user.residence[1],
                Ward: values.user.residence[2],
            },
			Store:{
				Name: values.provider.name,
				Type: values.provider.type,
				Address:
                {
                    StreetNo: values.user.number + ' ' + values.user.street,
                }
			}
		}
		console.log(dataForm);
		Post.registerProvider(dataForm).then(res => {           
			console.log(res);
            alert(res);
        });
	};

	return (
		<Form
			{...layout}
			name='nest-messages'
			onFinish={onFinish}
			validateMessages={validateMessages}
		>
			<h1><center>ĐĂNG KÝ TÀI KHOẢN NHÀ CUNG CẤP</center></h1>
			<p><center>
				<Link to='/auth/login'>Đăng nhập |</Link>
				<Link to='/auth/registercustomer'> Đăng ký khách hàng |</Link>
				<Link to='/auth/registershipper'> Đăng ký đối tác giao hàng</Link>
			</center></p>
			<h3><center>Điền các thông tin sau đây để đăng ký tài khoản nhà cung cấp</center></h3>
			<Form.Item
				name={['provider', 'name']}
				label='Tên đơn vị'
				rules={[
					{
						required: true,
					},
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name={['provider', 'type']}
				label="Hình thức"
				rules={[
					{
						required: true,
					},
				]}
			>
				<Select
					placeholder="Chọn hình thức tài khoản"
					allowClear
				>
					<Option value="Kinh doanh">Kinh doanh</Option>
					<Option value="Từ thiện">Từ thiện</Option>
				</Select>
			</Form.Item>
			<Form.Item
				name={['user', 'name']}
				label='Họ tên người đại diện'
				rules={[
					{
						required: true,
					},
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name={['user', 'id']}
				label='CCCD/CMND'
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
				label="Ngày sinh"
				rules={[
					{
						required: true,
					},
				]}>
				<DatePicker format={'DD/MM/YYYY'}/>
			</Form.Item>
			<Form.Item
				name={['user', 'phone']}
				label='Số điện thoại'
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
				name={['user', 'email']}
				label='Email'
				rules={[
					{
						type: 'email',
						required: true,
					},
				]}
			>
				<Input />
			</Form.Item>
			<h3><center>Ảnh CMND/CCCD người đại diện</center></h3>
			<Form.Item
				name="upload"
				label="Mặt trước"
				valuePropName="fileList"
				getValueFromEvent={normFile}
				extra="Mặt trước"
				rules={[
					{
						required: true,
					},
				]}
			>
				<Upload name="front" action="/upload.do" listType="picture">
					<Button icon={<UploadOutlined />}>Click to upload</Button>
				</Upload>
			</Form.Item>
			<Form.Item
				name="upload"
				label="Mặt sau"
				valuePropName="fileList"
				getValueFromEvent={normFile}
				extra="Mặt sau"
				rules={[
					{
						required: true,
					},
				]}
			>
				<Upload name="backside" action="/upload.do" listType="picture">
					<Button icon={<UploadOutlined />}>Click to upload</Button>
				</Upload>
			</Form.Item>
			<h3><center>Địa chỉ đơn vị cung cấp</center></h3>
			<Form.Item
                name={['user', 'residence']}
                label="Địa chỉ"
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
                label="Đường"
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
                label="Số nhà"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
			<h3><center>Giấy phép hoạt động kinh doanh/từ thiện</center></h3>
			<Form.Item
				name="upload"
				label="Ảnh/File giấy phép"
				valuePropName="fileList"
				getValueFromEvent={normFile}
				extra="Ảnh hoặc file PDF"
				rules={[
					{
						required: true,
					},
				]}
			>
				<Upload name="license" action="/upload.do" listType="pdf">
					<Button icon={<UploadOutlined />}>Click to upload</Button>
				</Upload>
			</Form.Item>
			<h3><center>Thiết lập mật khẩu</center></h3>
			<Form.Item
				name={['pass']}
				label="Mật khẩu"
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
				label="Xác nhận mật khẩu"
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
			<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
				<Button type='primary' htmlType='submit'>
					Đăng ký
				</Button>
			</Form.Item>
		</Form>
	);
};

export default RegisterProvider;
