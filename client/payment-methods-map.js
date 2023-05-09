import { __ } from '@wordpress/i18n';
import CreditCardIcon from './payment-method-icons/cards';
import GiropayIcon from './payment-method-icons/giropay';
import SofortIcon from './payment-method-icons/sofort';
import SepaIcon from './payment-method-icons/sepa';
import EpsIcon from './payment-method-icons/eps';
import BancontactIcon from './payment-method-icons/bancontact';
import IdealIcon from './payment-method-icons/ideal';
import P24Icon from './payment-method-icons/p24';
import BoletoIcon from './payment-method-icons/boleto';
import OxxoIcon from './payment-method-icons/oxxo';

export default {
	card: {
		id: 'card',
		label: __( 'Credit card / debit card', 'woocommerce-gateway-monilypay' ),
		description: __(
			'Let your customers pay with major credit and debit cards without leaving your store.',
			'woocommerce-gateway-monilypay'
		),
		Icon: CreditCardIcon,
		currencies: [],
		capability: 'card_payments',
		allows_manual_capture: true,
	},
	giropay: {
		id: 'giropay',
		label: __( 'giropay', 'woocommerce-gateway-monilypay' ),
		description: __(
			'Expand your business with giropay — Germany’s second most popular payment system.',
			'woocommerce-gateway-monilypay'
		),
		Icon: GiropayIcon,
		currencies: [ 'EUR' ],
		capability: 'giropay_payments',
	},
	sepa_debit: {
		id: 'sepa_debit',
		label: __( 'Direct debit payment', 'woocommerce-gateway-monilypay' ),
		description: __(
			'Reach 500 million customers and over 20 million businesses across the European Union.',
			'woocommerce-gateway-monilypay'
		),
		Icon: SepaIcon,
		currencies: [ 'EUR' ],
		capability: 'sepa_debit_payments',
	},
	sofort: {
		id: 'sofort',
		label: __( 'Sofort', 'woocommerce-gateway-monilypay' ),
		description: __(
			'Accept secure bank transfers from Austria, Belgium, Germany, Italy, Netherlands, and Spain.',
			'woocommerce-gateway-monilypay'
		),
		Icon: SofortIcon,
		currencies: [ 'EUR' ],
		capability: 'sofort_payments',
	},
	eps: {
		id: 'eps',
		label: __( 'EPS', 'woocommerce-gateway-monilypay' ),
		description: __(
			'EPS is an Austria-based payment method that allows customers to complete transactions online using their bank credentials.',
			'woocommerce-gateway-monilypay'
		),
		Icon: EpsIcon,
		currencies: [ 'EUR' ],
		capability: 'eps_payments',
	},
	bancontact: {
		id: 'bancontact',
		label: __( 'Bancontact', 'woocommerce-gateway-monilypay' ),
		description: __(
			'Bancontact is the most popular online payment method in Belgium, with over 15 million cards in circulation.',
			'woocommerce-gateway-monilypay'
		),
		Icon: BancontactIcon,
		currencies: [ 'EUR' ],
		capability: 'bancontact_payments',
	},
	ideal: {
		id: 'ideal',
		label: __( 'iDEAL', 'woocommerce-gateway-monilypay' ),
		description: __(
			'iDEAL is a Netherlands-based payment method that allows customers to complete transactions online using their bank credentials.',
			'woocommerce-gateway-monilypay'
		),
		Icon: IdealIcon,
		currencies: [ 'EUR' ],
		capability: 'ideal_payments',
	},
	p24: {
		id: 'p24',
		label: __( 'Przelewy24', 'woocommerce-gateway-monilypay' ),
		description: __(
			'Przelewy24 is a Poland-based payment method aggregator that allows customers to complete transactions online using bank transfers and other methods.',
			'woocommerce-gateway-monilypay'
		),
		Icon: P24Icon,
		currencies: [ 'EUR', 'PLN' ],
		capability: 'p24_payments',
	},
	boleto: {
		id: 'boleto',
		label: __( 'Boleto', 'woocommerce-gateway-monilypay' ),
		description: __(
			'Boleto is an official payment method in Brazil. Customers receive a voucher that can be paid at authorized agencies or banks, ATMs, or online bank portals.',
			'woocommerce-gateway-monilypay'
		),
		Icon: BoletoIcon,
		currencies: [ 'BRL' ],
		capability: 'boleto_payments',
	},
	oxxo: {
		id: 'oxxo',
		label: __( 'OXXO', 'woocommerce-gateway-monilypay' ),
		description: __(
			'OXXO is a Mexican chain of convenience stores that allows customers to pay bills and online purchases in-store with cash.',
			'woocommerce-gateway-monilypay'
		),
		Icon: OxxoIcon,
		currencies: [ 'MXN' ],
		capability: 'oxxo_payments',
	},
	alipay: {
		id: 'alipay',
		label: __( 'Alipay', 'woocommerce-gateway-monilypay' ),
		description: __(
			'Alipay is a popular wallet in China, operated by Ant Financial Services Group, a financial services provider affiliated with Alibaba.',
			'woocommerce-gateway-monilypay'
		),
		Icon: () => null,
		currencies: [
			'AUD',
			'CAD',
			'CNY',
			'EUR',
			'GBP',
			'HKD',
			'JPY',
			'MYR',
			'NZD',
			'USD',
		],
		capability: undefined,
	},
	multibanco: {
		id: 'multibanco',
		label: __( 'Multibanco', 'woocommerce-gateway-monilypay' ),
		description: __(
			'Multibanco is an interbank network that links the ATMs of all major banks in Portugal, allowing customers to pay through either their ATM or online banking environment.',
			'woocommerce-gateway-monilypay'
		),
		Icon: () => null,
		currencies: [ 'EUR' ],
		capability: undefined,
	},
};
