<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

echo $email_heading . "\n\n";

printf(
	// translators: 1) is a link to the payment re-authentication URL.
	__( 'Your pre-order is now available, but payment cannot be completed automatically. Please complete the payment now: %1$s', 'woocommerce-gateway-monilypay' ),
	$authorization_url
);

if ( $email->get_custom_message() ) :

	echo "----------\n\n";
	echo wptexturize( $email->get_custom_message() ) . "\n\n";
	echo "----------\n\n";

endif;


echo "\n\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n";

do_action( 'woocommerce_subscriptions_email_order_details', $order, $sent_to_admin, $plain_text, $email );

echo "\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n\n";

echo apply_filters( 'woocommerce_email_footer_text', get_option( 'woocommerce_email_footer_text' ) );
