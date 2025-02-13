<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * EPS Payment Method class extending UPE base class
 */
class WC_Monilypay_UPE_Payment_Method_Eps extends WC_Monilypay_UPE_Payment_Method {

	const STRIPE_ID = 'eps';

	const LPM_GATEWAY_CLASS = WC_Gateway_Monilypay_Eps::class;

	/**
	 * Constructor for EPS payment method
	 */
	public function __construct() {
		parent::__construct();
		$this->stripe_id            = self::STRIPE_ID;
		$this->title                = __( 'Pay with EPS', 'woocommerce-gateway-monilypay' );
		$this->is_reusable          = false;
		$this->supported_currencies = [ 'EUR' ];
		$this->label                = __( 'EPS', 'woocommerce-gateway-monilypay' );
		$this->description          = __(
			'EPS is an Austria-based payment method that allows customers to complete transactions online using their bank credentials.',
			'woocommerce-gateway-monilypay'
		);
	}
}
