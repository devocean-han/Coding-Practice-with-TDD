/*
 * @lc app=leetcode id=2101 lang=typescript
 *
 * [2101] Detonate the Maximum Bombs
 *
 * https://leetcode.com/problems/detonate-the-maximum-bombs/description/
 *
 * algorithms
 * Medium (49.05%)
 * Total Accepted:    103.8K
 * Total Submissions: 211.7K
 * Testcase Example:  '[[2,1,3],[6,1,4]]'
 *
 * You are given a list of bombs. The range of a bomb is defined as the area
 * where its effect can be felt. This area is in the shape of a circle with the
 * center as the location of the bomb.
 * 
 * The bombs are represented by a 0-indexed 2D integer array bombs where
 * bombs[i] = [xi, yi, ri]. xi and yi denote the X-coordinate and Y-coordinate
 * of the location of the i^th bomb, whereas ri denotes the radius of its
 * range.
 * 
 * You may choose to detonate a single bomb. When a bomb is detonated, it will
 * detonate all bombs that lie in its range. These bombs will further detonate
 * the bombs that lie in their ranges.
 * 
 * Given the list of bombs, return the maximum number of bombs that can be
 * detonated if you are allowed to detonate only one bomb.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: bombs = [[2,1,3],[6,1,4]]
 * Output: 2
 * Explanation:
 * The above figure shows the positions and ranges of the 2 bombs.
 * If we detonate the left bomb, the right bomb will not be affected.
 * But if we detonate the right bomb, both bombs will be detonated.
 * So the maximum bombs that can be detonated is max(1, 2) = 2.
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: bombs = [[1,1,5],[10,10,5]]
 * Output: 1
 * Explanation:
 * Detonating either bomb will not detonate the other bomb, so the maximum
 * number of bombs that can be detonated is 1.
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: bombs = [[1,2,3],[2,3,1],[3,4,2],[4,5,3],[5,6,4]]
 * Output: 5
 * Explanation:
 * The best bomb to detonate is bomb 0 because:
 * - Bomb 0 detonates bombs 1 and 2. The red circle denotes the range of bomb
 * 0.
 * - Bomb 2 detonates bomb 3. The blue circle denotes the range of bomb 2.
 * - Bomb 3 detonates bomb 4. The green circle denotes the range of bomb 3.
 * Thus all 5 bombs are detonated.
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= bombs.length <= 100
 * bombs[i].length == 3
 * 1 <= xi, yi, ri <= 10^5
 * 
 * 
 */

// => 주어진 폭탄 리스트 bombs[x좌표, y좌표, 폭발 반지름 r]에서 하나를 골라 터뜨릴 때, 연쇄적으로 폭발시킬 수 있는 최대 폭탄 개수를 반환하기
// => 폭탄 위치와 폭발 반지름은 전부 정수로만 주어지므로, 폭발이 미치는 '정수'범위는 폭탄 위치를 기준으로 원이 아니라 마름모를 그려도 정확히 파악할 수 있다. 즉, 상하좌우로 r만큼의 범위에 영향을 미친다.
//  	=> ...아니다. r이 커질수록 마름모 바깥에 포함되는 '정수'범위가 많아진다. 결국 꼼짝없이 x와 y좌표마다 폭탄위치와의 거리를 구해야 함.
function maximumDetonation(bombs: number[][]): number {
	if (bombs.length === 1) return 1;
};

export default {
	solution: maximumDetonation,
}