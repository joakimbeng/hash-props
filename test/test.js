const test = require('ava');
const hasha = require('hasha');
const hashProps = require('../src');

test('hashProps given props', t => {
	const obj1 = {prop1: 'hello', prop2: 'world', otherProp: true};
	const obj2 = {prop1: 'hello', prop2: 'world', yetAnotherProp: false};
	const props = ['prop1', 'prop2'];
	const hash1 = hashProps(obj1, props);
	const hash2 = hashProps(obj2, props);
	t.truthy(hash1);
	t.truthy(hash2);
	t.is(hash1, hash2);
});

test('hashProps no props', t => {
	const obj1 = {prop1: 'hello', prop2: 'world', otherProp: true};
	const obj2 = {prop1: 'hello', prop2: 'world', yetAnotherProp: false};
	const hash1 = hashProps(obj1);
	const hash2 = hashProps(obj2);
	t.truthy(hash1);
	t.truthy(hash2);
	t.not(hash1, hash2);
});

test('hashId given props', t => {
	const obj1 = {prop1: 'hello', prop2: 'world', otherProp: true};
	const obj2 = {prop1: 'hello', prop2: 'world', yetAnotherProp: false};
	const props = ['prop1', 'prop2'];
	const obj1Clone = hashProps.hashId(obj1, props);
	const obj2Clone = hashProps.hashId(obj2, props);
	t.truthy(obj1Clone.id);
	t.truthy(obj2Clone.id);
	t.is(obj1Clone.id, obj2Clone.id);
	t.is(obj1Clone.id, hashProps(obj1, props));
});

test('hashId no props', t => {
	const obj1 = {prop1: 'hello', prop2: 'world', otherProp: true};
	const obj2 = {prop1: 'hello', prop2: 'world', yetAnotherProp: false};
	const obj1Clone = hashProps.hashId(obj1);
	const obj2Clone = hashProps.hashId(obj2);
	t.truthy(obj1Clone.id);
	t.truthy(obj2Clone.id);
	t.not(obj1Clone.id, obj2Clone.id);
	t.is(obj1Clone.id, hashProps(obj1));
	t.is(obj2Clone.id, hashProps(obj2));
});

test('hashStr', t => {
	const str = JSON.stringify({prop1: 'hello'});
	const hashStr = hashProps.hashStr(str);
	const md5hash = hasha(str, {algorithm: 'md5'});
	t.is(hashStr, md5hash);
});
