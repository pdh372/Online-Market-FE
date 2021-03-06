import React, { useState, useEffect } from 'react';

import ContainerPage from 'components/shared/containerPage/ContainerPage';
import ProductsByStore from 'components/features/products/productsByStore/productByStore';

import productApi from 'apis/product';

const ProductsByStorePage = () => {
	const [products, setProducts] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getProductsByStore = async (id) => {
			const productsData = await productApi.get.getProductByStore(id);
			setProducts(productsData);
		};

		getProductsByStore('61ed6141a53cc3c21d6a79df');
		setIsLoading(false);
	}, []);

	if (isLoading) {
		return (
			<React.Fragment>
				<ContainerPage>
					<p>loading...</p>
				</ContainerPage>
			</React.Fragment>
		);
	} else {
		return (
			<React.Fragment>
				<ContainerPage>
					<ProductsByStore products={products} />
				</ContainerPage>
			</React.Fragment>
		);
	}
};

export default ProductsByStorePage;
