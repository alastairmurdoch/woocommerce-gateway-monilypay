import React from 'react';
import paymentMethodsMap from '../../payment-methods-map';
import './style.scss';

const PaymentMethodIcon = ( { name, showName } ) => {
	const paymentMethod = paymentMethodsMap[ name ];

	if ( ! paymentMethod ) {
		return <></>;
	}

	const { label, Icon } = paymentMethod;

	return (
		<span className="woocommerce-gateway-monilypay__payment-method-icon">
			<Icon className="woocommerce-gateway-monilypay__payment-method-icon__icon" />
			{ showName && (
				<span className="woocommerce-gateway-monilypay__payment-method-icon__label">
					{ label }
				</span>
			) }
		</span>
	);
};

export default PaymentMethodIcon;
