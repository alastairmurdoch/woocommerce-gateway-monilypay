<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/**
 * Class that handles various admin tasks.
 *
 * @since 5.6.0
 */
class WC_Monilypay_Payment_Gateways_Controller {
	/**
	 * Constructor
	 *
	 * @since 5.6.0
	 */
	public function __construct() {
		// If UPE is enabled and there are enabled payment methods, we need to load the disable Stripe confirmation modal.
		$stripe_settings              = get_option( 'woocommerce_monilypay_settings', [] );
		$enabled_upe_payment_methods  = isset( $stripe_settings['upe_checkout_experience_accepted_payments'] ) ? $stripe_settings['upe_checkout_experience_accepted_payments'] : [];
		$upe_payment_requests_enabled = 'yes' === $stripe_settings['payment_request'];

		if ( count( $enabled_upe_payment_methods ) > 0 || $upe_payment_requests_enabled ) {
			add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_payments_scripts' ] );
			add_action( 'woocommerce_admin_field_payment_gateways', [ $this, 'wc_monilypay_gateway_container' ] );
		}
	}

	public function register_payments_scripts() {
		$payment_gateways_script_asset_path = WC_MONILYPAY_PLUGIN_PATH . '/build/payment_gateways.asset.php';
		$payment_gateways_script_asset      = file_exists( $payment_gateways_script_asset_path )
			? require_once $payment_gateways_script_asset_path
			: [
				'dependencies' => [],
				'version'      => wc_monilypay_stripe_version,
			];

		wp_register_script(
			'woocommerce_monilypay_payment_gateways_page',
			plugins_url( 'build/payment_gateways.js', WC_MONILYPAY_MAIN_FILE ),
			$payment_gateways_script_asset['dependencies'],
			$payment_gateways_script_asset['version'],
			true
		);
		wp_set_script_translations(
			'woocommerce_monilypay_payment_gateways_page',
			'woocommerce-gateway-monilypay'
		);
		wp_register_style(
			'woocommerce_monilypay_payment_gateways_page',
			plugins_url( 'build/payment_gateways.css', WC_MONILYPAY_MAIN_FILE ),
			[ 'wc-components' ],
			$payment_gateways_script_asset['version']
		);
	}

	public function enqueue_payments_scripts() {
		global $current_tab, $current_section;

		$this->register_payments_scripts();

		$is_payment_methods_page = (
			is_admin() &&
			$current_tab && ! $current_section
			&& 'checkout' === $current_tab
		);

		if ( $is_payment_methods_page ) {
			wp_enqueue_script( 'woocommerce_monilypay_payment_gateways_page' );
			wp_enqueue_style( 'woocommerce_monilypay_payment_gateways_page' );
		}
	}

	/**
	 * Adds a container to the "payment gateways" page.
	 * This is where the "Are you sure you want to disable Stripe?" confirmation dialog is rendered.
	 */
	public function wc_monilypay_gateway_container() {
		?><div id="wc-monilypay-payment-gateways-container" />
		<?php
	}

}
