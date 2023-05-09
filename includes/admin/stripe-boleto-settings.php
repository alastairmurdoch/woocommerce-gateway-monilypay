<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return apply_filters(
	'wc_monilypay_boleto_settings',
	[
		'geo_target'  => [
			'description' => __( 'Customer Geography: Brazil', 'woocommerce-gateway-monilypay' ),
			'type'        => 'title',
		],
		'activation'  => [
			'description' => sprintf(
				/* translators: 1) HTML anchor open tag 2) HTML anchor closing tag */
				esc_html__( 'Must be activated from your Stripe Dashboard Settings %1$shere%2$s', 'woocommerce-gateway-monilypay' ),
				'<a href="https://dashboard.stripe.com/account/payments/settings" target="_blank">',
				'</a>'
			),
			'type'        => 'title',
		],
		'enabled'     => [
			'title'       => __( 'Enable/Disable', 'woocommerce-gateway-monilypay' ),
			'label'       => __( 'Enable Stripe Boleto', 'woocommerce-gateway-monilypay' ),
			'type'        => 'checkbox',
			'description' => '',
			'default'     => 'no',
		],
		'title'       => [
			'title'       => __( 'Title', 'woocommerce-gateway-monilypay' ),
			'type'        => 'text',
			'description' => __( 'This controls the title which the user sees during checkout.', 'woocommerce-gateway-monilypay' ),
			'default'     => __( 'Boleto', 'woocommerce-gateway-monilypay' ),
			'desc_tip'    => true,
		],
		'description' => [
			'title'       => __( 'Description', 'woocommerce-gateway-monilypay' ),
			'type'        => 'text',
			'description' => __( 'This controls the description which the user sees during checkout.', 'woocommerce-gateway-monilypay' ),
			'default'     => __( "You'll be able to download or print the Boleto after checkout.", 'woocommerce-gateway-monilypay' ),
			'desc_tip'    => true,
		],
		'expiration' => [
			'title'       => __( 'Expiration', 'woocommerce-gateway-monilypay' ),
			'type'        => 'number',
			'description' => __( 'This controls the expiration in number of days for the voucher.', 'woocommerce-gateway-monilypay' ),
			'default'     => 3,
			'desc_tip'    => true,
		],
		'webhook'     => [
			'title'       => __( 'Webhook Endpoints', 'woocommerce-gateway-monilypay' ),
			'type'        => 'title',
			/* translators: webhook URL */
			'description' => $this->display_admin_settings_webhook_description(),
		],
	]
);
