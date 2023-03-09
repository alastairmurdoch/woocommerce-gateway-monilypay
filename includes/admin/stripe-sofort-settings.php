<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return apply_filters(
	'wc_monilypay_sofort_settings',
	[
		'geo_target'  => [
			'description' => __( 'Customer Geography: Germany, Austria', 'woocommerce-gateway-monilypay' ),
			'type'        => 'title',
		],
		'guide'       => [
			'description' => __( '<a href="https://stripe.com/payments/payment-methods-guide#sofort" target="_blank">Payment Method Guide</a>', 'woocommerce-gateway-monilypay' ),
			'type'        => 'title',
		],
		'activation'  => [
			'description' => __( 'Must be activated from your Stripe Dashboard Settings <a href="https://dashboard.stripe.com/account/payments/settings" target="_blank">here</a>', 'woocommerce-gateway-monilypay' ),
			'type'        => 'title',
		],
		'enabled'     => [
			'title'       => __( 'Enable/Disable', 'woocommerce-gateway-monilypay' ),
			'label'       => __( 'Enable Stripe Sofort', 'woocommerce-gateway-monilypay' ),
			'type'        => 'checkbox',
			'description' => '',
			'default'     => 'no',
		],
		'title'       => [
			'title'       => __( 'Title', 'woocommerce-gateway-monilypay' ),
			'type'        => 'text',
			'description' => __( 'This controls the title which the user sees during checkout.', 'woocommerce-gateway-monilypay' ),
			'default'     => __( 'Sofort', 'woocommerce-gateway-monilypay' ),
			'desc_tip'    => true,
		],
		'description' => [
			'title'       => __( 'Description', 'woocommerce-gateway-monilypay' ),
			'type'        => 'text',
			'description' => __( 'This controls the description which the user sees during checkout.', 'woocommerce-gateway-monilypay' ),
			'default'     => __( 'You will be redirected to Sofort.', 'woocommerce-gateway-monilypay' ),
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
