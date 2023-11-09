/*
 * @lc app=leetcode id=846 lang=typescript
 *
 * [846] Hand of Straights
 *
 * https://leetcode.com/problems/hand-of-straights/description/
 *
 * algorithms
 * Medium (55.98%)
 * Total Accepted:    142.5K
 * Total Submissions: 254.7K
 * Testcase Example:  '[1,2,3,6,2,3,4,7,8]\n3'
 *
 * Alice has some number of cards and she wants to rearrange the cards into
 * groups so that each group is of size groupSize, and consists of groupSize
 * consecutive cards.
 * 
 * Given an integer array hand where hand[i] is the value written on the i^th
 * card and an integer groupSize, return true if she can rearrange the cards,
 * or false otherwise.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: hand = [1,2,3,6,2,3,4,7,8], groupSize = 3
 * Output: true
 * Explanation: Alice's hand can be rearranged as [1,2,3],[2,3,4],[6,7,8]
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: hand = [1,2,3,4,5], groupSize = 4
 * Output: false
 * Explanation: Alice's hand can not be rearranged into groups of 4.
 * 
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= hand.length <= 10^4
 * 0 <= hand[i] <= 10^9
 * 1 <= groupSize <= hand.length
 * 
 * 
 * 
 * Note: This question is the same as 1296:
 * https://leetcode.com/problems/divide-array-in-sets-of-k-consecutive-numbers/
 * 
 */


// [1,2,3,6,2,3,4,7,8], 3 => [1,2,3][2,3,4][6,7,8]
// [1,2,3,4,5], 4 => false
function isNStraightHand(hand: number[], groupSize: number): boolean {
	if (groupSize === 1) return true;
	if (hand.length % groupSize !== 0) return false;

	// 1,2,2,3,3,4,6,7,8
	// hand.sort((a, b) => a - b);
	
	//  0 1 2 3 4 5 6 7 8 
	// [0,1,2,2,1,0,1,1,1]
	const frequency: number[] = [];
	hand.forEach((card) => {
		frequency[card] = (frequency[card] ?? 0) + 1;
	});

	let totalGroups = hand.length / groupSize;
	let i = 0;
	let group: number[];
	while (i <= frequency.length - groupSize) {
		// 0,1,1 => okay
		// 1,0,0 => false
		// 1,1,0 => false
	
		group = frequency.slice(i + 1, i + groupSize);
		// 조기 리턴: ex) 세 자리 중 1,0,0이거나 1,1,0인 경우(첫 자리가 0이 아닌데 다음 자리들이 0인 경우): false
		if (frequency[i] !== undefined && group.some((val) => val === undefined)) {
			return false;
		}
		// 연이은 조합 발견:
		if (frequency[i] !== undefined && group.every((val) => val !== undefined)) {
			frequency[i] = frequency[i] === 1 ? undefined : frequency[i] - 1;
			for (let j = 1; j <= group.length; j++) {
				frequency[i + j] = frequency[i + j] === 1 ? undefined : frequency[i + j] - 1;
			}
			i--;
			totalGroups--;
		}
		i++;
	}

	return totalGroups === 0 ? true : false;
};

export default {
	solution: isNStraightHand,
}