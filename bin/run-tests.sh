#!/usr/bin/env bash

set -e

echo "Installing the test environment..."

docker-compose exec -u www-data wordpress \
	/var/www/html/wp-content/plugins/woocommerce-gateway-monilypay/bin/install-wp-tests.sh

echo "Running the tests..."

docker-compose exec -u www-data wordpress \
	/var/www/html/wp-content/plugins/woocommerce-gateway-monilypay/vendor/bin/phpunit \
	--configuration /var/www/html/wp-content/plugins/woocommerce-gateway-monilypay/phpunit.xml.dist \
	$*
