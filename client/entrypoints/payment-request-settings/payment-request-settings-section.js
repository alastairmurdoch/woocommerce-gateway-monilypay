import { __ } from '@wordpress/i18n';
import React, { useMemo } from 'react';
import { Card, RadioControl, CheckboxControl } from '@wordpress/components';
import interpolateComponents from 'interpolate-components';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentRequestButtonPreview from './payment-request-button-preview';
import {
	usePaymentRequestEnabledSettings,
	usePaymentRequestLocations,
	usePaymentRequestButtonType,
	usePaymentRequestButtonSize,
	usePaymentRequestButtonTheme,
} from 'wcstripe/data';
import CardBody from 'wcstripe/settings/card-body';
import LoadableAccountSection from 'wcstripe/settings/loadable-account-section';
import { useAccount } from 'wcstripe/data/account/hooks';
import {
	useAccountKeysPublishableKey,
	useAccountKeysTestPublishableKey,
} from 'wcstripe/data/account-keys/hooks';

const makeButtonSizeText = ( string ) =>
	interpolateComponents( {
		mixedString: string,
		components: {
			helpText: (
				<span className="payment-method-settings__option-muted-text" />
			),
		},
	} );
const buttonSizeOptions = [
	{
		label: makeButtonSizeText(
			__(
				'Default {{helpText}}(40 px){{/helpText}}',
				'woocommerce-gateway-monilypay'
			)
		),
		value: 'default',
	},
	{
		label: makeButtonSizeText(
			__(
				'Medium {{helpText}}(48 px){{/helpText}}',
				'woocommerce-gateway-monilypay'
			)
		),
		value: 'medium',
	},
	{
		label: makeButtonSizeText(
			__(
				'Large {{helpText}}(56 px){{/helpText}}',
				'woocommerce-gateway-monilypay'
			)
		),
		value: 'large',
	},
];
const buttonActionOptions = [
	{
		label: __( 'Only icon', 'woocommerce-gateway-monilypay' ),
		value: 'default',
	},
	{
		label: __( 'Buy', 'woocommerce-gateway-monilypay' ),
		value: 'buy',
	},
	{
		label: __( 'Donate', 'woocommerce-gateway-monilypay' ),
		value: 'donate',
	},
	{
		label: __( 'Book', 'woocommerce-gateway-monilypay' ),
		value: 'book',
	},
];

const makeButtonThemeText = ( string ) =>
	interpolateComponents( {
		mixedString: string,
		components: {
			br: <br />,
			helpText: (
				<span className="payment-method-settings__option-help-text" />
			),
		},
	} );
const buttonThemeOptions = [
	{
		label: makeButtonThemeText(
			__(
				'Dark {{br/}}{{helpText}}Recommended for white or light-colored backgrounds with high contrast.{{/helpText}}',
				'woocommerce-gateway-monilypay'
			)
		),
		value: 'dark',
	},
	{
		label: makeButtonThemeText(
			__(
				'Light {{br/}}{{helpText}}Recommended for dark or colored backgrounds with high contrast.{{/helpText}}',
				'woocommerce-gateway-monilypay'
			)
		),
		value: 'light',
	},
	{
		label: makeButtonThemeText(
			__(
				'Outline {{br/}}{{helpText}}Recommended for white or light-colored backgrounds with insufficient contrast.{{/helpText}}',
				'woocommerce-gateway-monilypay'
			)
		),
		value: 'light-outline',
	},
];

const PaymentRequestsSettingsSection = () => {
	const [ buttonType, setButtonType ] = usePaymentRequestButtonType();
	const [ size, setSize ] = usePaymentRequestButtonSize();
	const [ theme, setTheme ] = usePaymentRequestButtonTheme();
	const accountId = useAccount().data?.account?.id;
	const [ publishableKey ] = useAccountKeysPublishableKey();
	const [ testPublishableKey ] = useAccountKeysTestPublishableKey();

	const stripePromise = useMemo( () => {
		return loadStripe(
			publishableKey || testPublishableKey || 'pk_test_123',
			{
				stripeAccount: accountId || '0001',
				locale: 'en',
			}
		);
	}, [ testPublishableKey, publishableKey, accountId ] );

	const [ isPaymentRequestEnabled ] = usePaymentRequestEnabledSettings();

	const [
		paymentRequestLocations,
		updatePaymentRequestLocations,
	] = usePaymentRequestLocations();

	const makeLocationChangeHandler = ( location ) => ( isChecked ) => {
		if ( isChecked ) {
			updatePaymentRequestLocations( [
				...paymentRequestLocations,
				location,
			] );
		} else {
			updatePaymentRequestLocations(
				paymentRequestLocations.filter( ( name ) => name !== location )
			);
		}
	};

	return (
		<Card className="express-checkout-settings">
			<CardBody>
				<h4>
					{ __(
						'Show express checkouts on',
						'woocommerce-gateway-monilypay'
					) }
				</h4>
				<ul className="payment-request-settings__location">
					<li>
						<CheckboxControl
							disabled={ ! isPaymentRequestEnabled }
							checked={
								isPaymentRequestEnabled &&
								paymentRequestLocations.includes( 'checkout' )
							}
							onChange={ makeLocationChangeHandler( 'checkout' ) }
							label={ __(
								'Checkout',
								'woocommerce-gateway-monilypay'
							) }
						/>
					</li>
					<li>
						<CheckboxControl
							disabled={ ! isPaymentRequestEnabled }
							checked={
								isPaymentRequestEnabled &&
								paymentRequestLocations.includes( 'product' )
							}
							onChange={ makeLocationChangeHandler( 'product' ) }
							label={ __(
								'Product page',
								'woocommerce-gateway-monilypay'
							) }
						/>
					</li>
					<li>
						<CheckboxControl
							disabled={ ! isPaymentRequestEnabled }
							checked={
								isPaymentRequestEnabled &&
								paymentRequestLocations.includes( 'cart' )
							}
							onChange={ makeLocationChangeHandler( 'cart' ) }
							label={ __( 'Cart', 'woocommerce-gateway-monilypay' ) }
						/>
					</li>
				</ul>
				<h4>
					{ __( 'Call to action', 'woocommerce-gateway-monilypay' ) }
				</h4>
				<RadioControl
					className="payment-method-settings__cta-selection"
					label={ __(
						'Call to action',
						'woocommerce-gateway-monilypay'
					) }
					// ideLabelFromVision
					help={ __(
						'Select a button label that fits best with the flow of purchase or payment experience on your store.',
						'woocommerce-gateway-monilypay'
					) }
					selected={ buttonType }
					options={ buttonActionOptions }
					onChange={ setButtonType }
				/>
				<h4>{ __( 'Appearance', 'woocommerce-gateway-monilypay' ) }</h4>
				<RadioControl
					help={ __(
						'Note that larger buttons are more suitable for mobile use.',
						'woocommerce-gateway-monilypay'
					) }
					label={ __( 'Size', 'woocommerce-gateway-monilypay' ) }
					selected={ size }
					options={ buttonSizeOptions }
					onChange={ setSize }
				/>
				<RadioControl
					label={ __( 'Theme', 'woocommerce-gateway-monilypay' ) }
					selected={ theme }
					options={ buttonThemeOptions }
					onChange={ setTheme }
				/>
				<p>{ __( 'Preview', 'woocommerce-gateway-monilypay' ) }</p>
				<LoadableAccountSection numLines={ 7 }>
					<Elements stripe={ stripePromise }>
						<PaymentRequestButtonPreview />
					</Elements>
				</LoadableAccountSection>
			</CardBody>
		</Card>
	);
};

export default PaymentRequestsSettingsSection;
