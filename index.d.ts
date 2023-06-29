export interface Crop {
	/**
	 * Crop x coordinate.
	 */
	x: number;

	/**
	 * Crop y coordinate.
	 */
	y: number;

	/**
	 * Crop width.
	 */
	width: number;

	/**
	 * Crop height.
	 */
	height: number;
}

export interface Resize {
	/**
	 * Resize width.
	 */
	width: number;

	/**
	 * Resize height.
	 */
	height: number;
}

type Metadata = 'all' | 'none' | 'exif' | 'icc' | 'xmp';

export interface Options {
	/**
	 * Preset setting, one of `default`, `photo`, `picture`, `drawing`, `icon` and `text`.
	 *
	 * @default 'default'
	 */
	preset?: 'default' | 'photo' | 'picture' | 'drawing' | 'icon' | 'text';

	/**
	 * Set quality factor between `0` and `100`.
	 *
	 * @default 75
	 */
	quality?: number;

	/**
	 * Set transparency-compression quality between `0` and `100`.
	 *
	 * @default 100
	 */
	alphaQuality?: number;

	/**
	 * Specify the compression method to use, between `0` (fastest) and `6` (slowest). This parameter controls the trade off between encoding speed and the compressed file size and quality.
	 *
	 * @default 4
	 */
	method?: number;

	/**
	 * Set target size in bytes.
	 */
	size?: number;

	/**
	 * Set the amplitude of spatial noise shaping between `0` and `100`.
	 *
	 * @default 50
	 */
	sns?: number;

	/**
	 * Set deblocking filter strength between `0` (off) and `100`.
	 */
	filter?: number;

	/**
	 * Adjust filter strength automatically.
	 *
	 * @default false
	 */
	autoFilter?: boolean;

	/**
	 * Set filter sharpness between `0` (sharpest) and `7` (least sharp).
	 *
	 * @default 0
	 */
	sharpness?: number;

	/**
	 * Encode images losslessly. If set to a number, activates lossless preset with given level between `0` (fastest, larger files) and `9` (slowest, smaller files).
	 *
	 * @default false
	 */
	lossless?: boolean | number;

	/**
	 * Encode losslessly with an additional lossy pre-processing step, with a quality factor between `0` (maximum pre-processing) and `100` (same as lossless).
	 *
	 * @default 100
	 */
	nearLossless?: number;

	/**
	 * Crop the image.
	 */
	crop?: Crop;

	/**
	 * Resize the image. Happens after the `crop`.
	 */
	resize?: Resize;

	/**
	 * A list of metadata to copy from the input to the output if present.
	 *
	 * @default 'none'
	 */
	metadata?: Metadata | Metadata[];
}

/**
Buffer or stream to optimize.
*/
export type Plugin = (input: Buffer | NodeJS.ReadableStream) => Promise<Buffer>;

/**
 * Imagemin plugin to create WebP images.
 *
 * @param options
 * @returns An imagemin plugin
 */
export default function imageminWebp(options?: Options): Plugin;
