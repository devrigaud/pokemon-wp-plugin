/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import {
	Panel,
	PanelBody,
	PanelRow,
	TextControl,
	Button,
} from "@wordpress/components";
import { useState } from "@wordpress/element";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

const textChangeHandle = (value) => {
	document.querySelector(".components-text-control__input").value = value;
};

export default function Edit({ attributes, setAttributes }) {
	const [isError, seIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const renderPokemon = (attributes) => {
		return (
			<div>
				<img src={attributes.image} alt="<?php echo $attributes['name']; ?>" />
				<h2>{attributes.name}</h2>
				<p>Height: {attributes.height}</p>
				<p>Weight: {attributes.weight}</p>
			</div>
		);
	};

	const fetchPokemon = async (name) => {
		setIsLoading(true);
		seIsError(false);
		try {
			const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
			const data = await response.json();
			setIsLoading(false);
			return data;
		} catch (error) {
			setIsLoading(false);
			return null;
		}
	};

	const loadButtonClickHandle = () => {
		const pokemonName = document
			.querySelector(".components-text-control__input")
			.value.toLowerCase();
		fetchPokemon(pokemonName).then((data) => {
			if (!data) {
				seIsError(true);
				return;
			}
			setAttributes({
				name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
				height: data.height,
				weight: data.weight,
				image: data.sprites.other["official-artwork"].front_default,
			});
		});
	};

	if (isLoading) {
		return (
			<div {...useBlockProps("loading")}>
				<div className="loading">
					<h2>Loading...</h2>
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<>
				<InspectorControls>
					<Panel>
						<PanelBody title="Pokemon Settings">
							<PanelRow>
								<TextControl label="Pokemon Name" onChange={textChangeHandle} />
							</PanelRow>
							<PanelRow>
								<Button variant="secondary" onClick={loadButtonClickHandle}>
									Load
								</Button>
							</PanelRow>
						</PanelBody>
					</Panel>
				</InspectorControls>
				<div {...useBlockProps("error")}>
					<div className="error">
						<h2>Pokemon not found</h2>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<InspectorControls>
				<Panel>
					<PanelBody title="Pokemon Settings">
						<PanelRow>
							<TextControl label="Pokemon Name" onChange={textChangeHandle} />
						</PanelRow>
						<PanelRow>
							<Button variant="secondary" onClick={loadButtonClickHandle}>
								Load
							</Button>
						</PanelRow>
					</PanelBody>
				</Panel>
			</InspectorControls>
			<div {...useBlockProps()}>{renderPokemon(attributes)}</div>;
		</>
	);
}
