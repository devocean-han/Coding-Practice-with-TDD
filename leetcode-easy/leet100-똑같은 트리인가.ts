/*

*/

/**
 * Definition for a binary tree node.
*/
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

/**
 * @param {TreeNode} p 
 * @param {TreeNode} q 
 * @returns {boolean}
 */
function solution(p: TreeNode| null, q: TreeNode| null): boolean {
	// 두 노드가 모두 null임 = '둘이 같다'
	if (!p && !q) return true;
	// 둘 중 하나만 null임 = '다름'
	if (!p || !q) return false;
	// 둘 다 값이 존재하지만 서로 다름 = '다름'
	if (p.val !== q.val) return false;

	// 왼쪽과 오른쪽 자식들을 각각 서로 비교 
	// 이를 재귀적으로 반복한다.
	const left = solution(p.left, q.left);
	const right = solution(p.right, q.right);
	// => 왼쪽과 오른쪽 자식의 끝에 다다를 때까지 이 줄까지만 반복된다. 

	// 만약 비교한 "left" 결과가 false라면, 현재 노드의 왼쪽 자식 트리가 서로 달랐다는 의미이므로 false를 결과로 반환한다. "right"도 마찬가지.
	if (!left || !right) return false;
	
	// 그렇지 않다면 왼쪽과 오른쪽 자식 트리가 모두 동일하다는 의미이므로 true를 반환한다. 
	return true;
}

export default {
	solution: solution2,
	TreeNode,
}

// 다른 해답: 재귀 풀이
function solution2(p: TreeNode| null, q: TreeNode| null): boolean {
	if (!p && !q) return true;
	if (!p || !q) return false;
	if (p.val !== q.val) return false;
	return solution2(p.left, q.left) && solution2(p.right, q.right);
}