import source from './leet295-스트림에서 중위값 찾기';
const { MedianFinder } = source;
// import { MaxHeap, MinHeap } from '../Class 모음'

describe('Find Median from Data Stream', () => {
	describe('Class definition test', () => {
		let medianFinder = new MedianFinder();
		it(`Class and it's methods should be initialized and defined with 'new MedianFinder()'`, () => {
			expect(medianFinder).toBeDefined();
			expect(medianFinder.addNum).toBeDefined();
			expect(medianFinder.findMedian).toBeDefined();
		});
	});

	describe('Method test: ADDNUM', () => {
		let medianFinder: any;
		
		beforeEach(() => {
			medianFinder = new MedianFinder();
			jest.spyOn(medianFinder, "addNum");
		});
		
		it(`should be called with (1),(2),(3), sequentially`, () => {
			medianFinder.addNum(1);
			medianFinder.addNum(2);
			medianFinder.addNum(3);
			expect(medianFinder.addNum).toHaveBeenCalledTimes(3);
			expect(medianFinder.addNum).lastCalledWith(3);
			expect(medianFinder.addNum).toReturnTimes(3);
		});
	});

	describe('Method test: FINDMEDIAN', () => {
		let medianFinder: any;
		medianFinder = new MedianFinder();
		jest.spyOn(medianFinder, "findMedian");
		
		// beforeEach(() => {
		// 	medianFinder = new MedianFinder();
		// 	jest.spyOn(medianFinder, "findMedian");
		// });

		it(`should return 1.5 when called after calling add(1), add(2)`, () => {
			medianFinder.addNum(1);
			medianFinder.addNum(2);
			medianFinder.findMedian();
			expect(medianFinder.findMedian).toHaveBeenCalledTimes(1);
			expect(medianFinder.findMedian).toReturnWith(1.5);
		});

		it(`should return 2 when called after another calling add(3)]`, () => {
			medianFinder.addNum(3);
			medianFinder.findMedian();
			expect(medianFinder.findMedian).lastReturnedWith(2);
		});
	});

	describe('Test Case Error: ', () => {
		let medianFinder: any;
		medianFinder = new MedianFinder();
		jest.spyOn(medianFinder, "findMedian");
		
		// beforeEach(() => {
		// 	medianFinder = new MedianFinder();
		// 	jest.spyOn(medianFinder, "findMedian");
		// });

		[[],[40],[],[12],[],[16],[],[14],[],[35],[],[19],[],[34],[],[35],[],[28],[],[35],[],[26],[],[6],[],[8],[],[2],[],[14],[],[25],[],[25],[],[4],[],[33],[],[18],[],[10],[],[14],[],[27],[],[3],[],[35],[],[13],[],[24],[],[27],[],[14],[],[5],[],[0],[],[38],[],[19],[],[25],[],[11],[],[14],[],[31],[],[30],[],[11],[],[31],[],[0],[]]
		it(`should return 22 when called after calling 16 items`, () => {
			medianFinder.addNum(40);
			medianFinder.addNum(12);
			medianFinder.addNum(16);
			medianFinder.addNum(14);
			medianFinder.addNum(35);

			medianFinder.addNum(19);
			medianFinder.addNum(34);
			medianFinder.addNum(35);
			medianFinder.addNum(28);
			medianFinder.addNum(35);
			
			medianFinder.addNum(26);
			medianFinder.addNum(6);
			medianFinder.addNum(8);
			medianFinder.addNum(2);
			medianFinder.addNum(14);
			
			medianFinder.addNum(25);
			
			medianFinder.findMedian();
			expect(medianFinder.findMedian).toHaveBeenCalledTimes(1);
			expect(medianFinder.findMedian).toReturnWith(22);
		});
		
		it(`should return 25 when called after another calling add(25)]`, () => {
			medianFinder.addNum(25);
			medianFinder.findMedian();
			expect(medianFinder.findMedian).lastReturnedWith(25);
		});
		
		// it(`Test case from error: `, () => {
			// medianFinder.addNum();
			// medianFinder.addNum();
			// medianFinder.addNum(3);
		// 	medianFinder.addNum(3);
		// 	medianFinder.findMedian();
		// 	expect(medianFinder.findMedian).lastReturnedWith(2);
		// });
	});
});