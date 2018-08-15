import axios from 'axios';

export default class api {
	static get base() {
		return 'http://localhost:8081';
	}

	static get apiVer() {
		return `${this.base}/api/v1`;
	}

	static async getMzTemplate({ template }) {
		return await axios.get(`${this.apiVer}/json-example`, {
			params: { template }
		});
	}

	static async uploadTemplate(data) {
		return await axios.post(`${this.apiVer}/upload`, data).catch(error => {
			throw this.handleError(error.response.data);
		});
	}

	static handleError(err) {
		console.log(new Error(`Api - ${err}`));
		return err;
	}
}
