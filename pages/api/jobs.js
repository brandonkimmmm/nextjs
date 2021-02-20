import jobs from '../../data/jobs';
import { intersection, cloneDeep } from 'lodash';

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

	switch (state) {
		case 'ca':
			searchIndex['california'] ? searchIndex['california'].push(index) : searchIndex['california'] = [index];
			break;
		case 'ga':
			searchIndex['georiga'] ? searchIndex['georgia'].push(index) : searchIndex['georgia'] = [index];
			break;
		case 'in':
			searchIndex['indiana'] ? searchIndex['indiana'].push(index) : searchIndex['indiana'] = [index];
			break;
		case 'la':
			searchIndex['louisiana'] ? searchIndex['louisiana'].push(index) : searchIndex['louisiana'] = [index];
			break;
		default:
			break;
	}
};

const experienceOrdering = {
	'Internship': 0,
	'Junior': 1,
	'Intermediate': 2,
	'Senior': 3
};

export default async (req, res) => {

	const jobData = cloneDeep(jobs);

	const { location, role, department, education, experience, search } = req.query;
	let result = [];

	if (search) {
		const searchTerms = search.split(',');
		let activeIndexes = [];
		for (let [index, term] of searchTerms.entries()) {
			if (searchIndex[term]) {
				if (index === 0) {
					activeIndexes = searchIndex[term];
				} else {
					activeIndexes = intersection(activeIndexes, searchIndex[term]);
				}
			}
		}

		for (let index of activeIndexes) {
			result.push(jobData[index]);
		}
	} else {
		result = jobData;
	}

	if (location && (location === 'asc' || location === 'desc')) {
		result.sort((a, b) => {
			if (a.items[0].city < b.items[0].city) { return location === 'asc' ? -1 : 1; }
			if (a.items[0].city > b.items[0].city) { return location === 'asc' ? 1 : -1; }
			return 0;
		});
	}

	if (role && (role === 'asc' || role === 'desc')) {
		for (let job of result) {
			job.items.sort((a, b) => {
				if (a.job_title < b.job_title) { return role === 'asc' ? -1 : 1; }
				if (a.job_title > b.job_title) { return role === 'asc' ? 1 : -1; }
				return 0;
			});
		}
	}

	if (department && (department === 'asc' || department === 'desc')) {
		for (let job of result) {
			job.items.sort((a, b) => {
				if (a.department[0] < b.department[0]) { return department === 'asc' ? -1 : 1; }
				if (a.department[0] > b.department[0]) { return department === 'asc' ? 1 : -1; }
				return 0;
			});
		}
	}

	if (education && (education === 'asc' || education === 'desc')) {
		for (let job of result) {
			job.items.sort((a, b) => {
				if (a.required_credentials[0] < b.required_credentials[0]) { return education === 'asc' ? -1 : 1; }
				if (a.required_credentials[0] > b.required_credentials[0]) { return education === 'asc' ? 1 : -1; }
				return 0;
			});
		}
	}

	if (experience && (experience === 'asc' || experience === 'desc')) {
		for (let job of result) {
			job.items.sort((a, b) => {
				if (experienceOrdering[a.experience] < experienceOrdering[b.experience]) { return experience === 'asc' ? -1 : 1; }
				if (experienceOrdering[a.experience] > experienceOrdering[b.experience]) { return experience === 'asc' ? 1 : -1; }
				return 0;
			});
		}
	}

	// @todo: implement filters and search
	// @todo: implement automated tests

	// this timeout emulates unstable network connection, do not remove this one
	// you need to figure out how to guarantee that client side will render
	// correct results even if server-side can't finish replies in the right order
	await new Promise((resolve) => setTimeout(resolve, 1000 * Math.random()))

	res.status(200).json({ jobs: result, searchOptions: Object.keys(searchIndex) })
}
