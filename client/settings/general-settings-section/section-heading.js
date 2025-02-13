import { __ } from '@wordpress/i18n';
import React from 'react';
import styled from '@emotion/styled';
import { CardHeader, DropdownMenu } from '@wordpress/components';
import { moreVertical } from '@wordpress/icons';
import DisableUpeConfirmationModal from './disable-upe-confirmation-modal';
import Pill from 'wcstripe/components/pill';
import { useAccount } from 'wcstripe/data/account';
import useToggle from 'wcstripe/hooks/use-toggle';

const StyledHeader = styled( CardHeader )`
	justify-content: space-between;

	.components-dropdown-menu__toggle.has-icon {
		padding: 0;
		min-width: unset;
	}

	button.components-dropdown-menu__menu-item:last-of-type {
		color: rgb( 220, 30, 30 );
	}
`;

const Title = styled.h4`
	margin: 0;
	font-size: 16px;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	line-height: 2em;

	> * {
		&:not( :last-child ) {
			margin-right: 4px;
		}
	}
`;

const SectionHeading = () => {
	const [ isConfirmationModalOpen, toggleConfirmationModal ] = useToggle(
		false
	);

	const { refreshAccount } = useAccount();

	return (
		<StyledHeader>
			<Title>
				<span>
					{ __( 'Payment methods', 'woocommerce-gateway-monilypay' ) }
				</span>{ ' ' }
				<Pill>
					{ __( 'Early access', 'woocommerce-gateway-monilypay' ) }
				</Pill>
			</Title>
			{ isConfirmationModalOpen && (
				<DisableUpeConfirmationModal
					onClose={ toggleConfirmationModal }
				/>
			) }
			<DropdownMenu
				icon={ moreVertical }
				label={ __(
					'Payment methods menu',
					'woocommerce-gateway-monilypay'
				) }
				controls={ [
					{
						title: __(
							'Refresh payment methods',
							'woocommerce-gateway-monilypay'
						),
						onClick: refreshAccount,
					},
					{
						title: __( 'Disable', 'woocommerce-gateway-monilypay' ),
						onClick: toggleConfirmationModal,
					},
				] }
			/>
		</StyledHeader>
	);
};

export default SectionHeading;
