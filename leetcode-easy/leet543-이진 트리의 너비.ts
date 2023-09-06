/* 
https://leetcode.com/problems/diameter-of-binary-tree/

EASY

Given the root of a binary tree, return the length of the diameter of the tree.

The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

The length of a path between two nodes is represented by the number of edges between them.

 

Example 1:


Input: root = [1,2,3,4,5]
Output: 3
Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].
Example 2:

Input: root = [1,2]
Output: 1
 

Constraints:

The number of nodes in the tree is in the range [1, 104].
-100 <= Node.val <= 100

*/

class TreeNode {
	val: number
	left: TreeNode | null
	right: TreeNode | null
	constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
		this.val = val;
		this.left = left;
		this.right = right;
	}

}

// import { TreeNode } from './../Class 모음';

// => 주어진 트리의 어느 두 노드 사이의 거리가 가장 긴 값을 찾아 반환하기.

// 예를 들어 root[0,1,2]이면 1->0->2 로 1과 2 사이가 가장 길고, 따라서 이 트리의 '지름'은 2가 된다.
// 단순히 깊이가 가장 깊은 두 깊이를 찾아 더하는 것은 안 된다. 두 잎 노드 사이의 ...공통 조상을 구하는 것을 셈에 포함할 수 있을까? 예를 들어 두 잎 노드가 모두 4레벨이라면 공통조상은 3레벨일 수도, 2레벨일수도, 1레벨일 수도 있다.
// 두 잎 노드를 찍어서, 둘의 공통 조상이 최대한 먼 쌍을 찾아내기?

// 만약 무식하게 한다면, 루트부터 잎 노드까지 닿는 경로를 구한다 -> 두 경로에 공통되는 노드가 루트 노드에 가까울 수록 먼 친척인 셈이다. 공통되는 노드보다 뒤쪽에 오는 노드 수를 두 경로에서 각각 세서 더한다. -> 이 값이 가장 큰 잎 노드쌍을 찾는다. 
// 그게 아니라면, 스택을 이용해서... 스태겡서 하나 뽑는다는 것은 공통 조상을 하나 만났다는 것이다. 예를 들어 [1,2,3,4,5]에서 

// (진행중)스택을 이용한 DFS:
function solution(root: TreeNode): number {
	let maxDia = 0;

	function getDepth(node: TreeNode | null): number {
		if (!root) return 0;

		const stack: Array<TreeNode> = [node];
		while (stack.length) {
			let node:TreeNode | null = stack.pop();
			// node로 할 것 처리

			if (node) {
				stack.push(node.left);
				stack.push(node.right);
			}
		}

		return Math.max()
	}
	

	return 0;
}

// 
function solution2(root: TreeNode): number {
	let max = 0;

	maxDepth(root);

	// 인자로 주어진 노드의 최대 깊이를 반환하고, 
	// 부가 효과(side effect)로 주어진 노드의 양쪽 자식 트리의 가장 깊은 잎 노드 끼리의 거리를 구해서 max를 업데이트한다. 
	function maxDepth(root: TreeNode) {
		// 지금 노드가 null이면 0을 반환
		if (!root) return 0;

		// 왼 자식과 오른 자식을 넣어 재귀 호출
		const left: number = maxDepth(root.left);
		const right: number = maxDepth(root.right);

		// 현재 '최대 노드 징검다리 수'와 현재 노드의 왼 자식 깊이 + 오른 자식 깊이를 비교한다. 더 큰 수를 최대값으로 갱신한다. 
		max = Math.max(max, left + right);

		// 현재 노드의 왼쪽 자식과 오른쪽 자식 트리 중 더 깊은 쪽을 선택해 자기 자신 레벨까지 1을 더한 값을 반환한다. 
		return Math.max(left, right) + 1;
	}

	return max;
}

export default {
	solution: solution2,
	TreeNode,
}

// ==============================================================
// --------------------------------------------------------------
// 백트래킹 문제1: 주사위 던지기
// IWantToThrowDice3Times3();

// 주사위를 N번 던진 결과의 모든 조합을 배열 형태로 출력하기.
// 예를 들어 3번 던진 결과는 [1,1,1],[1,1,2]... 이렇게 나올 수 있다.
function IWantToThrowDice3Times0() {
	// 1. 변수 선언 및 초기화
	const N = 3;
	const result: number[] = [];
	// 2. 재귀함수 호출
	roll(0);
	
	function roll(diceNum: number) {
		// 3. 탈출조건(Base condition)
		if (diceNum === N) { // N번 주사위를 던지면 탈출.
			console.log(result);
			return;
		}
		// 4. 경로 탐색
		for (let i = 1; i <= 6; i++) {
			result[diceNum] = i;
			diceNum++;
			roll(diceNum); // diceNum이 0부터 N까지 되도록 
			diceNum--;
			// result[diceNum] = 0; // 이 줄은 없어도 동일하게 동작한다.
		}
	}
}

// 백트래킹 문제2: 주사위 던지기 II
// 주사위를 N번 던져 서로 다른 눈이 나오는 조합을 모두 출력하기.
// 예를 들어 [1,1,1]은 안되고, [1,3,2]는 [1,2,3]과 같은 것으로 취급하여 역시 출력하지 않는다. 
function IWantToThrowDice3Times1() {
	// const N = parseInt(prompt("How many rolls: ")); // node.js에서는 활용 불가
	const N = 3;
	const resultCombination: Array<number> = [];
	const usedCombinations = new Set<String>();

	throwDice(0);

	function throwDice(currentRoll: number) {
		if (resultCombination.length === N) {
			const sortedResult = [...resultCombination].sort((a, b) => a - b);
			const combinationString = JSON.stringify(sortedResult);

			// '이미 등장한 조합'에 포함되지 않는 조합만 새로 등록하고 출력 
			if (!usedCombinations.has(combinationString)) {
				usedCombinations.add(combinationString);
				console.log(resultCombination);
			}
			return;
		}

		for (let i = 1; i <= 6; i++) {
			resultCombination.push(i);
			throwDice(currentRoll + 1);
			resultCombination.pop();
		}
	}
}

// Set을 제거한 버전:
function IWantToThrowDice3Times2() {
	const N = 3;
	const resultCombination: Array<number> = [];

	throwDice(0);

	function throwDice(currentRoll: number) {
		if (resultCombination.length === N) {
			console.log(resultCombination);
			return;
		}

		for (let i = (resultCombination.length > 0 ? resultCombination[resultCombination.length - 1] : 0) + 1; i <= 6; i++) {
			// 중복되지 않는 숫자인 경우
			resultCombination.push(i);
			throwDice(currentRoll + 1);
			resultCombination.pop();
		}
	}
}

// 전역 result 배열도 제거한 버전:
function IWantToThrowDice3Times3() {
	const N = 3;

	throwDice(0, []);

	function throwDice(currentRoll: number, resultCombination: number[]) {
		if (resultCombination.length === N) {
			console.log(resultCombination);
			return;
		}

		for (let i = (resultCombination.length > 0 ? resultCombination[resultCombination.length - 1] : 0) + 1; i <= 6; i++) {
			// 중복되지 않는 숫자인 경우
			resultCombination.push(i);
			throwDice(currentRoll + 1, resultCombination);
			resultCombination.pop();
		}
	}
}


// N-Rooks: NxN 크기의 체스보드에 룩을 배치하는 모든 가능한 방법을 출력하기
// 핵심: 행(row)가 다 닳으면 반복을 탈출하고 열(col)이 이미 방문한 곳이면 다시 가지 않는다. 
// findRooks();
function findRooks() {
	// 1. 변수 선언 및 초기화
	let N: number; 				// 체스 보드 크기 N
	let map: number[][];		// 체스코드 배열, 룩의 위치를 나타냄
	let visited: number[];		// 열 방문 여부를 나타내는 배열

	N = 4;
	map = new Array(N).fill(0).map(() => new Array(N).fill(0));
	visited = new Array(N).fill(0);
	let row = 0;

	// 2. 재귀 함수 호출
	locate(row); // 행별로 룩을 재귀적으로 배치(0번째 행부터 N-1번째 행까지)

	function locate(row: number) {
		// 3. 탈출 조건(Base condition)
		if (row === N) { // 모든 행에 룩을 배치한 경우
			printResult();
			return;
		}
		// 4. 경로 탐색
		for (let col = 0; col < N; col++) {
			if (visited[col] !== 1) { // 현재 열이 방문되지 않은 경우
				map[row][col] = 1; // 해당 위치에 룩을 배치
				visited[col] = 1;  // 해당 열을 방문 표시

				locate(row + 1); // 다음 행으로 이동하여 룩 배치를 계속함

				visited[col] = 0; // 배치를 원래대로 되돌림(Backtracking)
				map[row][col] = 0;
			}
		}
	}

	function printResult() {
		for (let i = 0; i < N; i++) {
			console.log(map[i]); // 현재 상태의 체스보드를 0부터 N줄까지 행별로 출력
		}
		console.log("----------------"); // ----로 체스보드를 구분함.
	}
}
/* 실행 결과: 
[ 1, 0, 0, 0 ]
[ 0, 1, 0, 0 ]
[ 0, 0, 1, 0 ]
[ 0, 0, 0, 1 ]
----------------
[ 1, 0, 0, 0 ]
[ 0, 1, 0, 0 ]
[ 0, 0, 0, 1 ]
[ 0, 0, 1, 0 ]
----------------
...

----------------
[ 0, 0, 0, 1 ]
[ 0, 0, 1, 0 ]
[ 1, 0, 0, 0 ]
[ 0, 1, 0, 0 ]
----------------
[ 0, 0, 0, 1 ]
[ 0, 0, 1, 0 ]
[ 0, 1, 0, 0 ]
[ 1, 0, 0, 0 ]
----------------
*/

// 위의 체스보드에 숫자가 채워져 있다고 할 때, 가능한 룩 배치 조합 중 숫자 합이 최소가 되는 위치 조합을 찾기. 즉, 0~100으로 채워진 NxN의 2차원 행렬 중 열과 행이 겹치지 않는 N개의 숫자를 선택하여 만들 수 있는 최소합 찾기
// findMinSum();
function findMinSum() {
	// 1. 변수 선언 및 초기화
	let N: number;
	let map: number[][];
	let visited: number[];
	let minSum: number;
	let selectedNums: number[];
	let selectedNumsResult: number[];

	N = 4;
	map = new Array(N).fill([]).map(() => []);
	visited = new Array(N).fill(0);
	minSum = Infinity;
	selectedNums = new Array(N).fill(-1);

	// 임의로 0에서 100까지의 수로 map 배열 초기화
	for (let i = 0; i < N; i++) {
		for (let j = 0; j < N; j++) {
			map[i][j] = Math.floor(Math.random() * 101);
		}
	}
	
	let row = 0; 
	let sum = 0;
	
	// 2. (현재 행렬과 함께)재귀 함수 호출
	selectNum(row, sum);
	printBoard();
	console.log('열별로 선택된 수: ', selectedNumsResult);
	console.log('최소합: ', minSum);

	function selectNum(row: number, sum: number) {
		// 3. 탈출 조건: 행(row)가 끝에 다다르면
		if (row === N) {
			if (sum < minSum) { // 이번에 만든 sum이 더 작다면
				minSum = sum;
				selectedNumsResult = [...selectedNums];
			}
			return;
		}
		// 3-5. 가지치기: 끝 행에 다다르지 않았는데 '역대 최소합'을 넘어버리면 이 루트는 더 이상 나아가지 않고 버린다
		if (sum > minSum) return;

		// 4. 경로 탐색
		for (let col = 0; col < N; col++) {
			if (visited[col] !== 1) {
				sum += map[row][col];
				visited[col] = 1;
				selectedNums[col] = map[row][col];
				
				selectNum(row + 1, sum);

				selectedNums[col] = -1;
				visited[col] = 0; 
				sum -= map[row][col];
			} 
		}
	}

	function printBoard() {
		for (let i = 0; i < N; i++) {
			console.log(map[i]);
		}
		console.log("--------------");
	}
}
/* 출력 결과: 
[ 82, 40, 55, 55 ]
[ 61, 15, 5, 79 ]
[ 29, 38, 89, 89 ]
[ 96, 90, 11, 92 ]
--------------
행별로 선택된 수:  [ 29, 15, 11, 55 ]
최소합:  	110
*/


// 배달 음식 주문하기(최대합 찾기): 한정된 예산을 '최대한 모두 사용하여' 음식 주문하기. 한 번 선택한 메뉴는 다시 선택하지 않는다. 즉, 메뉴에 있는 음식 중 예산은 넘어가지 않으면서 가격 총합이 가장 큰, 중복되지 않는 음식 조합 찾기. 
// 핵심 로직: 합계(sum)가 한계에 닿으면 반복을 탈출하고(탈출조건) 이미 방문한 메뉴면 다시 가지 않는다(경로탐색).
// findOrderMenu();
function findOrderMenu() {
	// 1. 
	const MENU: string[] = ["치킨", "피자", "족발", "중식", "곱창", "분식", "회"];
	const PRICE: number[] = [20000, 30000, 40000, 64000, 33000, 24000, 72000];
	const LIMIT: number = 250000;

	let visited: number[] = new Array(7).fill(0);
	let orderList: string[] = [];  // 마지막에 출력할 총 메뉴
	let totalPrice: number = 0;    // 마지막에 출력할 총 가격

	let tempPrice = 0;				// 가격 합계를 임시저장 
	let tempOrder: string[] = [];  // 메뉴를 임시저장

	// 2. 재귀합수 호출
	order(tempPrice, tempOrder);

	console.log('총 주문 가격: ', totalPrice);
	console.log('총 주문 메뉴: ', orderList);

	function order(tempPrice: number, tempOrder: string[]) {
		// 3. 탈출 조건(Base condition): 현재까지의 주문 가격이 예산 한도를 넘으면 재귀 호출을 멈추고 메뉴를 더 탐색하지 않는다. 
		if (tempPrice > LIMIT) {
			return;
		}
		// 3-5. 현재 가격 합계가 합계 최고 기록보다 크면 결과 값 갱신
		if (tempPrice > totalPrice) {
			totalPrice = tempPrice;
			orderList = [...tempOrder];
		}

		// 4. 경로 탐색
		for (let i = 0; i < MENU.length; i++) {
			if (visited[i] === 0) {
				tempOrder.push(MENU[i]);
				tempPrice += PRICE[i];
				visited[i] = 1;

				order(tempPrice, tempOrder);

				visited[i] = 0;
				tempPrice -= PRICE[i];
				tempOrder.pop();
			}
		}
	}
}
/* 출력 결과: 
// LIMIT = 150000
총 주문 가격:  149000
총 주문 메뉴:  [ '치킨', '곱창', '분식', '회' ]

// LIMIT = 180000
총 주문 가격:  180000
총 주문 메뉴:  [ '치킨', '중식', '분식', '회' ]

// LIMIT = 200000
총 주문 가격:  200000
총 주문 메뉴:  [ '족발', '중식', '분식', '회' ]
*/


// 배달 음식 주문하기(최대합 찾기) II: 만족도가 최대가 되도록 조합한 메뉴와 그 때의 가격, 만족도를 출력하기 
function findMaxSatisfyingMenu() {
	// 1. 
	type TMenuElement = {
		[key: string]: {
			price: number,
			satisfaction: number,
		},
	}
	
	const MENU: TMenuElement = {
		치킨: { price: 20000, satisfaction: 100 },
		피자: { price: 30000, satisfaction: 150 },
		족발: { price: 40000, satisfaction: 190 },
		중식: { price: 64000, satisfaction: 250 },
		곱창: { price: 33000, satisfaction: 200 },
		분식: { price: 24000, satisfaction: 120 },
		회: { price: 73000, satisfaction: 300 },
	}
	const LIMIT: number = 73000;

	let maxSatisfaction: number = 0;  // 출력할 최종 만족도
	let totalPrice: number = 0; 	  // 출력할 최종 가격 합
	let finalOrder: string[] = [];	  // 출력할 최종 메뉴

	let visited: Set<String> = new Set();   // 방문한 메뉴
	let tempSatisfaction: number = 0;		// 만족도를 임시 저장
	let tempPrice: number = 0; 				// 가격 총합을 임시 저장
	let tempOrder: string[] = []; 			// 메뉴를 임시 저장

	// 2. 재귀함수 호출
	order(tempPrice, tempSatisfaction, tempOrder);

	console.log('총 만족도: ', maxSatisfaction);
	console.log('총 주문 가격: ', totalPrice);
	console.log('총 주문 메뉴: ', finalOrder);

	function order(tempPrice: number, tempSatisfaction: number, tempOrder: string[]) {
		// 3. 탈출 조건(Base condition) 
		if (tempPrice > LIMIT) {
			return;
		}

		if (tempSatisfaction > maxSatisfaction) {
			maxSatisfaction = tempSatisfaction;
			totalPrice = tempPrice;
			finalOrder = [...tempOrder];
		}

		// 4. 경로 탐색
		for (let [menu, { price, satisfaction }] of Object.entries(MENU)) {
			if (!visited.has(menu)) {
				tempOrder.push(menu);
				tempPrice += price;
				tempSatisfaction += satisfaction;
				visited.add(menu);

				order(tempPrice, tempSatisfaction, tempOrder);

				visited.delete(menu);
				tempSatisfaction -= satisfaction;
				tempPrice -= price;
				tempOrder.pop();
			}
		}
	}
}
// findMaxSatisfyingMenu();
/* 출력 결과: 
// LIMIT = 50000
총 만족도:  250
총 주문 가격:  50000
총 주문 메뉴:  [ '치킨', '피자' ]

// LIMIT = 73000
총 만족도:  390
총 주문 가격:  73000
총 주문 메뉴:  [ '족발', '곱창' ]

// LIMIT = 200000
	// 가격 기준으로 맞췄을 때:
		총 주문 가격:  200000
		총 주문 메뉴:  [ '족발', '중식', '분식', '회' ]
	// 만족도 기준으로 맞췄을 때:
		총 만족도:  960
		총 주문 가격:  200000
		총 주문 메뉴:  [ '피자', '족발', '곱창', '분식', '회' ]
*/


