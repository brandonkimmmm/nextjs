import { create } from 'lodash';
import { createMocks } from 'node-mocks-http';
import getJobs from '../pages/api/jobs';

describe('/api/jobs', () => {
	test('successful api call without query params', async () => {
		const { req, res } = createMocks({
			method: 'GET'
		});

		await getJobs(req, res);

		expect(res._getStatusCode()).toBe(200);

		const response = JSON.parse(res._getData());

		expect(Object.keys(response)).toContain('jobs', 'searchOptions');
		expect(Array.isArray(response.jobs)).toBe(true);
	});

	test('successful api call with one valid search param', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {
				search: 'mammoth hospital'
			}
		});

		await getJobs(req, res);

		expect(res._getStatusCode()).toBe(200);

		const response = JSON.parse(res._getData());

		expect(response.jobs[0].name).toBe('Mammoth Hospital');
	});

	test('successful api call with two valid search param', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {
				search: 'nurse,louisville'
			}
		});

		await getJobs(req, res);

		expect(res._getStatusCode()).toBe(200);

		const response = JSON.parse(res._getData());

		expect(response.jobs[0].items[0].city).toContain('Louisville');
	});

	test('successful api call with invalid param', async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {
				search: 'asdfasdfasdf'
			}
		});

		await getJobs(req, res);

		expect(res._getStatusCode()).toBe(200);

		const response = JSON.parse(res._getData());

		expect(response.jobs.length).toBe(0);
	});
});