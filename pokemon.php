<?php
/**
 * Plugin Name:       Pokemon
 * Description:       Display a card of your favorite Pokemon.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Ben Rigaud
 * Author URI:        https://github.com/benrigaud/pokemon-wp-plugin
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       pokemon
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_pokemon_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_pokemon_block_init' );
