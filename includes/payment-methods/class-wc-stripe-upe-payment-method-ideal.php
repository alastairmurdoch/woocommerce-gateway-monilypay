<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * The iDEAL Payment Method class extending UPE base class
 */
class WC_Monilypay_UPE_Payment_Method_Ideal extends WC_Monilypay_UPE_Payment_Method {

	const STRIPE_ID = 'ideal';

	const LPM_GATEWAY_CLASS = WC_Gateway_Monilypay_Ideal::class;

	/**
	 * Constructor for iDEAL payment method
	 */
	public function __construct() {
		parent::__construct();
		$this->stripe_id            = self::STRIPE_ID;
		$this->title                = __( 'Pay with iDEAL', 'woocommerce-gateway-monilypay' );
		$this->is_reusable          = true;
		$this->supported_currencies = [ 'EUR' ];
		$this->label                = __( 'iDEAL', 'woocommerce-gateway-monilypay' );
		$this->description          = __(
			'iDEAL is a Netherlands-based payment method that allows customers to complete transactions online using their bank credentials.',
			'woocommerce-gateway-monilypay'
		);
	}
}
