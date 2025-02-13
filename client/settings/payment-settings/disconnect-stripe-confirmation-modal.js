import { __ } from '@wordpress/i18n';
import React, { useState } from 'react';
import { Button } from '@wordpress/components';
import ConfirmationModal from 'wcstripe/components/confirmation-modal';
import AlertTitle from 'wcstripe/components/confirmation-modal/alert-title';
import { useAccountKeys } from 'wcstripe/data/account-keys/hooks';

const DisconnectStripeConfirmationModal = ( {
	onClose,
	setKeepModalContent,
} ) => {
	const { saveAccountKeys } = useAccountKeys();
	const [ status, setStatus ] = useState( false );

	const handleDisconnect = async () => {
		setStatus( 'pending' );
		setKeepModalContent( true );

		const accountKeys = {
			publishable_key: '',
			secret_key: '',
			webhook_secret: '',
			test_publishable_key: '',
			test_secret_key: '',
			test_webhook_secret: '',
		};
		await saveAccountKeys( accountKeys );

		window.location.reload();
	};

	return (
		<>
			<ConfirmationModal
				title={
					<AlertTitle
						title={ __(
							'Disconnect Stripe account',
							'woocommerce-gateway-monilypay'
						) }
					/>
				}
				onRequestClose={ () => {
					// Do not allow to close the modal after clicking the "Disconnect" button
					if ( status === 'pending' ) {
						return;
					}

					onClose();
				} }
				actions={
					<>
						<Button
							isSecondary
							disabled={ status === 'pending' }
							onClick={ onClose }
						>
							{ __( 'Cancel', 'woocommerce-gateway-monilypay' ) }
						</Button>
						<Button
							isPrimary
							isDestructive
							isBusy={ status === 'pending' }
							disabled={ status === 'pending' }
							onClick={ handleDisconnect }
						>
							{ __( 'Disconnect', 'woocommerce-gateway-monilypay' ) }
						</Button>
					</>
				}
			>
				<strong>
					{ __(
						'Are you sure you want to disconnect your Stripe account from your WooCommerce store?',
						'woocommerce-gateway-monilypay'
					) }
				</strong>
				<p>
					{ __(
						'All settings will be cleared and your customers will no longer be able to pay using cards and other payment methods offered by Stripe.',
						'woocommerce-gateway-monilypay'
					) }
				</p>
			</ConfirmationModal>
		</>
	);
};

export default DisconnectStripeConfirmationModal;
