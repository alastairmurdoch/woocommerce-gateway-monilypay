<?php
/**
 * Class WC_REST_Monilypay_Connection_Tokens_Controller
 */

defined( 'ABSPATH' ) || exit;

/**
 * REST controller for connection tokens.
 */
class WC_REST_Monilypay_Connection_Tokens_Controller extends WC_Monilypay_REST_Base_Controller {

	/**
	 * Endpoint path.
	 *
	 * @var string
	 */
	protected $rest_base = 'wc_monilypay/connection_tokens';

	/**
	 * Stripe payment gateway.
	 *
	 * @var WC_Gateway_Monilypay
	 */
	private $gateway;

	/**
	 * Constructor.
	 *
	 * @param WC_Gateway_Monilypay $gateway Stripe payment gateway.
	 */
	public function __construct( WC_Gateway_Monilypay $gateway ) {
		$this->gateway = $gateway;
	}

	/**
	 * Configure REST API routes.
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			[
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => [ $this, 'create_token' ],
				'permission_callback' => [ $this, 'check_permission' ],
			]
		);
	}

	/**
	 * Create a connection token via API.
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 */
	public function create_token( $request ) {
		$response = WC_Monilypay_API::request( [], 'terminal/connection_tokens' );

		if ( ! isset( $response->secret ) ) {
			return rest_ensure_response( new WP_Error( 'wc_monilypay_no_token', __( 'Stripe API did not return a connection token.', 'woocommerce-gateway-monilypay' ) ) );
		}

		$response->test_mode = $this->gateway->is_in_test_mode();
		return rest_ensure_response( $response );
	}
}
