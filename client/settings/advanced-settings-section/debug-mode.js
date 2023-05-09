import { __ } from '@wordpress/i18n';
import React from 'react';
import { CheckboxControl } from '@wordpress/components';
import { useDebugLog } from 'wcstripe/data';

const DebugMode = () => {
	const [ isLoggingChecked, setIsLoggingChecked ] = useDebugLog();

	return (
		<>
			<h4>{ __( 'Debug mode', 'woocommerce-gateway-monilypay' ) }</h4>
			<CheckboxControl
				data-testid="logging-checkbox"
				label={ __(
					'Log error messages',
					'woocommerce-gateway-monilypay'
				) }
				help={ __(
					'When enabled, payment error logs will be saved to WooCommerce > Status > Logs.',
					'woocommerce-gateway-monilypay'
				) }
				checked={ isLoggingChecked }
				onChange={ setIsLoggingChecked }
			/>
		</>
	);
};

export default DebugMode;
