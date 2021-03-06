import { Link } from 'react-router-dom';
import formatCurrency from 'helpers/formatCurrency';

const ProductList = ({ products, onChangeProductQuantity, onRemoveProduct }) => {
	return (
		<section className='container-huy'>
			<ul className='products'>
				{products.map((product, index) => {
					return (
						<li className='row' key={index}>
							<div className='col-huy left'>
								<div className='thumbnail'>
									<Link to='#'>
										<img src={product.image} alt={product.name} />
									</Link>
								</div>
								<div className='detail'>
									<div className='name'>
										<Link to='#'>{product.name}</Link>
									</div>
									<div className='description'>{product.description}</div>
									<div className='price'>{formatCurrency(product.price)}</div>
								</div>
							</div>

							<div className='col-huy right'>
								<div className='quantity'>
									<input
										type='text'
										className='quantity'
										step='1'
										value={product.quantity}
										onChange={event => onChangeProductQuantity(index, event)}
									/>
								</div>

								<div className='remove'>
									<svg
										onClick={() => onRemoveProduct(index, product._id)}
										version='1.1'
										className='close'
										x='0px'
										y='0px'
										viewBox='0 0 60 60'
										enableBackground='new 0 0 60 60'
									>
										<polygon points='38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812' />
									</svg>
								</div>
							</div>
						</li>
					);
				})}
			</ul>
		</section>
	);
};

export default ProductList;
