/**
 * Internal dependencies
 */
import Page from '../page';
import { waitAndClick, waitForSelector } from '../../page-helper';

export default class InPlaceAuthorizeFrame extends Page {
	constructor( page ) {
		super( page );
		this.expectedSelector = 'iframe.jp-jetpack-connect__iframe';
	}

	static async init( page ) {
		const loadingSelector = '.jp-connect-full__button-container-loading';
		await waitForSelector( page, loadingSelector, { hidden: true } );

		return await super.init( page );
	}

	async getFrame() {
		const iframeElement = await waitForSelector( this.page, this.expectedSelector, { timeout: 45000 } );
		return await iframeElement.contentFrame();
	}

	async approve() {
		const approveSelector = 'button#approve';
		const iframe = await this.getFrame();
		await waitAndClick( iframe, approveSelector );
		return this.waitToDisappear();
	}

	async waitToDisappear() {
		return await waitForSelector( this.page, this.expectedSelector, { hidden: true } );
	}
}
