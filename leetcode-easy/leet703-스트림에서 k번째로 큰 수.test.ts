import source from './leet703-스트림에서 k번째로 큰 수';
const { KthLargest, MinHeap } = source;

describe('Kth Largest Element in a Stream', () => {
	describe('When stream has 0 elements, the KthLargest...: ', () => {
		let nums: number[] = [];
		let k: number = 1;
		let kthLargest: any;

		beforeEach(() => {
			kthLargest = new KthLargest(k, nums);
			jest.spyOn(kthLargest, "add");
		});

		it(`should be defined`, () => {
			expect(kthLargest).toBeDefined();
		});

		it(`should return 10 after add(10) is called`, () => {
			const output = kthLargest.add(10);
			expect(kthLargest.add).toBeCalledWith(10);
			expect(kthLargest.add).toReturnWith(10);
		});

		it(`should return 20 after [add(10), add(20)] is called`, () => {
			kthLargest.add(10);
			kthLargest.add(20);
			expect(kthLargest.add).toHaveBeenLastCalledWith(20);
			expect(kthLargest.add).toHaveLastReturnedWith(20);
			expect(kthLargest.add).toBeCalledTimes(2);
		});

		it(`should return 20 after [add(10), add(20), add(10)] is called`, () => {
			kthLargest.add(10);
			kthLargest.add(20);
			kthLargest.add(10);
			expect(kthLargest.add).toHaveBeenLastCalledWith(10);
			expect(kthLargest.add).toHaveLastReturnedWith(20);
			expect(kthLargest.add).toBeCalledTimes(3);
		});
	});

	describe('Sample case: k=3, nums=[4,5,8,2]', () => {
		let nums: number[] = [4,5,8,2];
		let k: number = 3;
		let kthLargest: any;

		kthLargest = new KthLargest(k, nums);
		jest.spyOn(kthLargest, "add");

		it(`should be defined`, () => {
			expect(kthLargest).toBeDefined();
		});

		it(`should return 4 when add(3) is called`, () => {
			kthLargest.add(3);
			expect(kthLargest.add).toBeCalledWith(3)
			expect(kthLargest.add).toReturnWith(4);
		});

		it(`should return 5 when add(5) is called continuously`, () => {
			kthLargest.add(5);
			expect(kthLargest.add).toBeCalledWith(5)
			expect(kthLargest.add).toReturnWith(5);
		});

		it(`should return 5 when add(10) is called continuously`, () => {
			kthLargest.add(10);
			expect(kthLargest.add).toBeCalledWith(10)
			expect(kthLargest.add).toReturnWith(5);
		});

		it(`should return 8 when add(9) is called continuously`, () => {
			kthLargest.add(9);
			expect(kthLargest.add).toBeCalledWith(9)
			expect(kthLargest.add).toReturnWith(8);
		});

		it(`should return 8 when add(4) is called continuously`, () => {
			kthLargest.add(4);
			expect(kthLargest.add).toBeCalledWith(4)
			expect(kthLargest.add).toReturnWith(8);
		});
	});
});