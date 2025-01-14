<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * The giropay Payment Method class extending UPE base class
 */
class WC_Monilypay_UPE_Payment_Method_Giropay extends WC_Monilypay_UPE_Payment_Method {

	const STRIPE_ID = 'giropay';

	const LPM_GATEWAY_CLASS = WC_Gateway_Monilypay_Giropay::class;

	/**
	 * Constructor for giropay payment method
	 */
	public function __construct() {
		parent::__construct();
		$this->stripe_id            = self::STRIPE_ID;
		$this->title                = __( 'Pay with giropay', 'woocommerce-gateway-monilypay' );
		$this->is_reusable          = false;
		$this->supported_currencies = [ 'EUR' ];
		$this->label                = __( 'giropay', 'woocommerce-gateway-monilypay' );
		$this->description          = __(
			'Expand your business with giropay — Germany’s second most popular payment system.',
			'woocommerce-gateway-monilypay'
		);
	}
}
