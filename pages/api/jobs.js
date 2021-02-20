import jobs from '../../data/jobs';
import { intersection } from 'lodash';

const searchIndex = {
	nurse: []
};

for (let [index, job] of jobs.entries()) {

	let { job_title, name } = job;
	name = name.toLowerCase();
	const [city] = job.items[0].city.toLowerCase().split(', ');
	const state = job.items[0].state.toLowerCase();

	if (job_title.includes('Nurse') || job_title.includes('LPN') || job_title.includes('Crna') || job_title.includes('RN')) {
		searchIndex.nurse.push(index);
	}

	searchIndex[name] ? searchIndex[name].push(index) : searchIndex[name] = [index];

	searchIndex[city] ? searchIndex[city].push(index) : searchIndex[city] = [index];

	searchIndex[state] ? searchIndex[state].push(index) : searchIndex[state] = [index];
};

export default async (req, res) => {
	const { location, role, department, education, experience, search } = req.query;
	let result = [];

	if (search) {
		const searchTerms = search.split(',');
		let activeIndexes = [];
		for (let [index, term] of searchTerms.entries()) {
			if (index === 0) {
				activeIndexes = searchIndex[term];
			} else {
				activeIndexes = intersection(activeIndexes, searchIndex[term]);
			}
		}

		for (let index of activeIndexes) {
			result.push(jobs[index]);
		}
	} else {
		result = jobs
	}

	if (location) {

	}

	if (role) {

	}

	if (department) {

	}

	if (education) {

	}

	if (experience) {

	}

	// @todo: implement filters and search
	// @todo: implement automated tests

	// this timeout emulates unstable network connection, do not remove this one
	// you need to figure out how to guarantee that client side will render
	// correct results even if server-side can't finish replies in the right order
	await new Promise((resolve) => setTimeout(resolve, 1000 * Math.random()))

	res.status(200).json({jobs: result})
}
