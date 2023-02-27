import { __ } from '@wordpress/i18n';
import styled from '@emotion/styled';
import React, { useContext, useState } from 'react';
import { CheckboxControl, Button } from '@wordpress/components';
import { Icon, info } from '@wordpress/icons';
import { useManualCapture } from 'wcstripe/data';
import ConfirmationModal from 'wcstripe/components/confirmation-modal';
import UpeToggleContext from 'wcstripe/settings/upe-toggle/context';

const AlertIcon = styled( Icon )`
	fill: #afafaf;
	position: absolute;
	left: -2.2em;
	width: 1.8em;
	height: auto;
`;

const WarningList = styled.ul`
	padding-left: 2.5em;

	> li {
		position: relative;

		&:first-of-type svg {
			fill: #ffc83f;
		}
	}
`;

const WarningListElement = ( { children } ) => (
	<li>
		<AlertIcon icon={ info } />
		{ children }
	</li>
);

const ManualCaptureControl = () => {
	const [
		isManualCaptureEnabled,
		setIsManualCaptureEnabled,
	] = useManualCapture();
	const { isUpeEnabled } = useContext( UpeToggleContext );

	const [ isConfirmationModalOpen, setIsConfirmationModalOpen ] = useState(
		false
	);

	const handleCheckboxToggle = ( isChecked ) => {
		// toggling from "manual" capture to "automatic" capture - no need to show the modal.
		if ( ! isChecked || ! isUpeEnabled ) {
			setIsManualCaptureEnabled( isChecked );
			return;
		}
		setIsConfirmationModalOpen( true );
	};

	const handleModalCancel = () => {
		setIsConfirmationModalOpen( false );
	};

	const handleModalConfirmation = () => {
		setIsManualCaptureEnabled( true );
		setIsConfirmationModalOpen( false );
	};

	return (
		<>
			<CheckboxControl
				onChange={ handleCheckboxToggle }
				checked={ isManualCaptureEnabled }
				label={ __(
					'Issue an authorization on checkout, and capture later',
					'woocommerce-gateway-monilypay'
				) }
				help={ __(
					'Charge must be captured on the order details screen within 7 days of authorization, otherwise the authorization and order will be canceled.',
					'woocommerce-gateway-monilypay'
				) }
			/>
			{ isConfirmationModalOpen && (
				<ConfirmationModal
					onRequestClose={ handleModalCancel }
					title={ __(
						'Enable manual capture',
						'woocommerce-gateway-monilypay'
					) }
					actions={
						<>
							<Button onClick={ handleModalCancel } isSecondary>
								{ __( 'Cancel', 'woocommerce-gateway-monilypay' ) }
							</Button>
							<Button
								onClick={ handleModalConfirmation }
								isPrimary
							>
								{ __( 'Enable', 'woocommerce-gateway-monilypay' ) }
							</Button>
						</>
					}
				>
					<strong>
						{ __(
							'Are you sure you want to enable manual capture of payments?',
							'woocommerce-gateway-monilypay'
						) }
					</strong>
					<WarningList>
						<WarningListElement>
							{ __(
								'Only cards support manual capture. When enabled, all other payment methods will be hidden from checkout.',
								'woocommerce-gateway-monilypay'
							) }
						</WarningListElement>
						<WarningListElement>
							{ __(
								'You must capture the payment on the order details screen within 7 days of authorization, otherwise the money will return to the shopper.',
								'woocommerce-gateway-monilypay'
							) }
						</WarningListElement>
					</WarningList>
				</ConfirmationModal>
			) }
		</>
	);
};

export default ManualCaptureControl;
