import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, DatePicker, Cascader, Checkbox } from 'antd';
//import { UploadOutlined } from '@ant-design/icons';
import apiUser from 'apis/user';
import residences from '../address';


const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 8,
	},
};
/* eslint-disable no-template-curly-in-string */
// const normFile = (e) => {
// 	console.log('Upload event:', e);

// 	if (Array.isArray(e)) {
// 		return e;
// 	}

// 	return e && e.fileList;
// };

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
	const [check, setCheck] = useState(null);

    function onChange(e) {
        setCheck(e.target.checked);
    }
	const [CMNDTruoc, setCMNDTruoc] = useState("");
	const [CMNDSau, setCMNDSau] = useState("");
	const [GiayPhepTruoc, setGiayPhepTruoc] = useState("");
	const [GiayPhepSau, setGiayPhepSau] = useState("");

	const handleChangeFile1 = (e) => {
		let file = e.target.files[0];

		let reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onloadend = function () {
			if (reader.result) {
				setCMNDTruoc(reader.result)
			}
		};
	};

	const handleChangeFile2 = (e) => {
		let file = e.target.files[0];

		let reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onloadend = function () {
			if (reader.result) {
				setCMNDSau(reader.result)
			}
		};
	};

	const handleChangeFile3 = (e) => {
		let file = e.target.files[0];

		let reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onloadend = function () {
			if (reader.result) {
				setGiayPhepTruoc(reader.result)
			}
		};
	};

	const handleChangeFile4 = (e) => {
		let file = e.target.files[0];

		let reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onloadend = function () {
			if (reader.result) {
				setGiayPhepSau(reader.result)
			}
		};
	};

	const onFinish = values => {
		var today = new Date();
		var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		var dateTime = date + ' ' + time;
		const dataForm = {
			user: {
				name: values.user.name,
				ciNum: values.user.id,
				email: values.user.email,
				dob: values.user.dob.format('DD-MM-YYYY'),
				phoneNumber: values.user.phone,
				password: values.pass,
				registerDate: dateTime,
				address:
				{
					streetNo: values.user.number + ' ' + values.user.street,
				}
			},
			area: {
				city: values.user.residence[0],
				district: values.user.residence[1],
				ward: values.user.residence[2],
			},
			shipper: {
				status: "absent",

			},
			imgCI: {
				front: CMNDTruoc,
				backside: CMNDSau,
			},
			imgLicense: {
				front: GiayPhepTruoc,
				backside: GiayPhepSau,
			}
		}
		console.log(dataForm);


		if (check) {
			apiUser.post.registerShipper(dataForm).then(res => {
				console.log(res);
				alert(res);
			});
		}
		else {
			alert("Vui l??ng ?????ng ?? ??i???u kho???n c???a ch??ng t??i");
		}
	};

	return (
		<Form
			{...layout}
			name='nest-messages'
			onFinish={onFinish}
			validateMessages={validateMessages}
		>
			<h1><center>????NG K?? T??I KHO???N NG?????I GIAO H??NG</center></h1>
			<center>
				<Link to='/auth/login'>????ng nh???p |</Link>
				<Link to='/auth/registercustomer'> ????ng k?? kh??ch h??ng |</Link>
				<Link to='/auth/registerprovider'> ????ng k?? ?????i t??c cung c???p</Link>
			</center>
			<h3><center>??i???n c??c th??ng tin sau ????y ????? ????ng k?? t??i kho???n ng?????i giao h??ng</center></h3>
			<Form.Item
				name={['user', 'name']}
				label='H??? t??n'
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
				label='S??? ??i???n tho???i'
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
			<h3><center>???nh CMND/CCCD</center></h3>
			<Form.Item
				label="M???t tr?????c"
				extra="M???t tr?????c"
				rules={[
					{
						required: true,
					},
				]}>
				<Input required={true} type="file" onChange={(e) => handleChangeFile1(e)} />
			</Form.Item>
			<Form.Item
				label="M???t sau"
				extra="M???t sau"
				rules={[
					{
						required: true,
					},
				]}>
				<Input required={true} type="file" onChange={(e) => handleChangeFile2(e)} />
			</Form.Item>
			{/* <Form.Item
				name="upload"
				label="M???t tr?????c"
				valuePropName="fileList"
				getValueFromEvent={normFile}
				extra="M???t tr?????c"
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
				label="M???t sau"
				valuePropName="fileList"
				getValueFromEvent={normFile}
				extra="M???t sau"
				rules={[
					{
						required: true,
					},
				]}
			>
				<Upload name="backside" action="/upload.do" listType="picture">
					<Button icon={<UploadOutlined />}>Click to upload</Button>
				</Upload>
			</Form.Item> */}
			<h3><center>Th??ng tin ?????a ch???</center></h3>
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
			<h3><center>Gi???y ph??p l??i xe A1/A2</center></h3>
			<Form.Item
				label="???nh GPLX m???t tr?????c"
				extra="M???t tr?????c"
				rules={[
					{
						required: true,
					},
				]}>
				<Input required={true} type="file" onChange={(e) => handleChangeFile3(e)} />
			</Form.Item>
			<Form.Item
				label="???nh GPLX m???t sau"
				extra="M???t sau"
				rules={[
					{
						required: true,
					},
				]}>
				<Input required={true} type="file" onChange={(e) => handleChangeFile4(e)} />
			</Form.Item>
			{/* <Form.Item
				name="upload"
				label="???nh GPLX m???t tr?????c"
				valuePropName="fileList"
				getValueFromEvent={normFile}
				extra="M???t tr?????c"
				rules={[
					{
						required: true,
					},
				]}
			>
				<Upload name="license1" action="/upload.do" listType="pdf">
					<Button icon={<UploadOutlined />}>Click to upload</Button>
				</Upload>
			</Form.Item>
			<Form.Item
				name="upload"
				label="???nh GPLX m???t sau"
				valuePropName="fileList"
				getValueFromEvent={normFile}
				extra="M???t sau"
				rules={[
					{
						required: true,
					},
				]}
			>
				<Upload name="license2" action="/upload.do" listType="pdf">
					<Button icon={<UploadOutlined />}>Click to upload</Button>
				</Upload>
			</Form.Item> */}
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

export default RegisterProvider;
