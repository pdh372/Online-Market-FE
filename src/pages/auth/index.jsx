import React from 'react';
import './authPage.scss';
import { useParams, Navigate } from 'react-router-dom';
import Login from '../../components/features/auth/login/Login';
import ForgetPassword from '../../components/features/auth/forgetPassword/ForgetPassword';
import RegisterCustomer from '../../components/features/auth/registerCustomer/RegisterCustomer';
import RegisterProvider from '../../components/features/auth/registerProvider/RegisterProvider';
import RegisterShipper from '../../components/features/auth/registerShipper/RegisterShipper';
import ContainerPage from '../../components/shared/containerPage/ContainerPage';

const AuthPage = () => {
	const params = useParams();

	const handleRouter = () => {
		if (params.name === 'login') {
			return <Login />;
		}
		else if (params.name === 'forgetpassword') {
			return <ForgetPassword />;
		}
		else if (params.name === 'registercustomer') {
			return <RegisterCustomer />;
		}
		else if (params.name === 'registerprovider') {
			return <RegisterProvider />;
		}
		else if (params.name === 'registershipper') {
			return <RegisterShipper />;
		}
		else {
			return <Navigate to='404' />;
		}
	};

	return (
		<ContainerPage>
			<main className='auth-page'>{handleRouter()}</main>
		</ContainerPage>
	);
};

export default AuthPage;
