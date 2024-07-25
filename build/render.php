<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
  <img src="<?php echo $attributes['image']; ?>" alt="<?php echo $attributes['name']; ?>" />
  <h2><?php echo $attributes['name']; ?></h2>
  <p>Height: <?php echo $attributes['height']; ?></p>
  <p>Weight: <?php echo $attributes['weight']; ?></p>
</div>