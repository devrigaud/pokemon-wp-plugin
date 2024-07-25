<?php
/**
 * Pokemon Block.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 *
 * @package pokemon-block
 */

?>

<div <?php echo esc_attr( get_block_wrapper_attributes() ); ?>>
<img src="<?php echo esc_url( $attributes['image'] ); ?>" alt="<?php echo esc_attr( $attributes['name'] ); ?>" />
<h2><?php echo esc_html( $attributes['name'] ); ?></h2>
<p>Height: <?php echo esc_html( $attributes['height'] ); ?></p>
<p>Weight: <?php echo esc_html( $attributes['weight'] ); ?></p>
</div>