'use strict';
const hasha = require('hasha');
const dotProp = require('dot-prop');

const algorithm = 'md5';

/**
 * hash
 *
 * Calculates an md5 hash from the given `props` in `obj`.
 * If no `props` are given a hash of the whole object will be calculated.
 *
 * @param {Object} obj
 * @param {Array<String>} props
 * @return {String}
 */
module.exports = exports = (obj, props = Object.keys(obj)) => {
	const get = dotProp.get.bind(null, obj);
	const values = props.map(prop => {
		const value = get(prop);
		if (typeof value !== 'string') {
			return JSON.stringify(value);
		}
		return value;
	});
	return hasha(values, {algorithm});
};

/**
 * hashId
 *
 * Calculates an md5 hash from the given `props` in `obj`
 * and returns a clone of `obj` with `obj.id` set to the hash
 *
 * @param {Object} obj
 * @param {Array<String>} props
 * @return {Object}
 */
exports.hashId = (obj, props) => {
	const id = exports(obj, props);
	return Object.assign({}, obj, {id});
};

exports.hashStr = str => {
	return hasha(str, {algorithm});
};
