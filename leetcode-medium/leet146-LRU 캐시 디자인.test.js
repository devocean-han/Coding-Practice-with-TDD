const { LRUCache } = require('./leet146-LRU 캐시 디자인');

describe('LRU Cache', () => {
	// cache - well constructed ... how to test? 
	// get - not found
	it(`should return -1 when given key doesn't exist`, () => {
		const cache = new LRUCache(1);
		expect(cache.get(1)).toBe(-1);
	});

	// put - add
	// && get - found
	it(`should `, () => {
		const cache = new LRUCache(1);
		cache.put(1, 10);
		expect(cache.get(1)).toBe(10);
	});

	// put - update
	it(`should update the existing key-value pair [1, 10] to [1, 20]`, () => {
		const cache = new LRUCache(2);
		cache.put(1, 10);
		cache.put(1, 20);
		expect(cache.get(1)).toBe(20);
	});

	// put - update right before exceeded

	// put - exceeded
	it(`should evict the least recently used key when the capacity exceeds`, () => {
		// '가장 오래전' 사용된 항목을 어떻게 구분지을 것인가 하는 문제와
		// 실제로 가장 오래된 캐시를 잘 지웠는가를 어떻게 확인할 것인가하는 문제가 있다. => print() 메소드를 만들어 비교하자.
		
	})

	// 테스트를 위한 테스트 1.
	it(`테스트를 위한 테스트 1: 두 map을 비교할 수 있을까? => map끼리는 '들어간 순서가 같도록' key-value 쌍을 넣어주면 .entries() 결과로 비교했을 때 '같다'고 검증할 수 있다. `, () => {
		const cache = new LRUCache(2);
		cache.put(1, 10);
		cache.put(2, 20);
		const cache2 = new LRUCache(3);
		cache2.put(1, 10);
		cache2.put(2, 20);
		// console.log(cache.print());
		// console.log(cache2.print());

		// => 결론: map끼리는 '들어간 순서가 같도록' key-value 쌍을 넣어주면 .entries() 결과로 비교했을 때 '같다'고 검증할 수 있다. 
		// expect(cache.print()).toEqual(cache2.print()); // true

	})
	// 테스트를 위한 테스트 2.
	it(`테스트를 위한 테스트 2: key를 업데이트했을 때 map이 기억하는 순서(초기 진입 순서 or 업데이트됐을 때 새로 받은 순서): 처음 순서를 따른다.`, () => {
		const cache = new LRUCache(2);
		cache.put(1, 10);
		cache.put(2, 20);
		cache.put(1, 100);
		// console.log(cache.print());
	})
})