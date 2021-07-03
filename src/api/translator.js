import axios from 'axios';

import { v4 as uuidv4 } from 'uuid';

var subscriptionKey = '083f98b1ea1e49bcbadc13de4616d9a8';
var endpoint = 'https://api.cognitive.microsofttranslator.com';

// Add your location, also known as region. The default is global.
// This is required if using a Cognitive Services resource.
var location = 'centralus';

export async function translate({ data, fromLang, toLang }) {
	return axios({
		baseURL: endpoint,
		url: '/translate',
		method: 'post',
		headers: {
			'Ocp-Apim-Subscription-Key': subscriptionKey,
			'Ocp-Apim-Subscription-Region': location,
			'Content-type': 'application/json',
			'X-ClientTraceId': uuidv4().toString(),
		},
		params: {
			'api-version': '3.0',
			from: fromLang,
			to: toLang,
		},
		data,
		responseType: 'json',
	}).then(function (response) {
		return response.data.map(item => item.translations[0].text);
	});
}
