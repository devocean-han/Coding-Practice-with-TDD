/* 74. Search a 2D Matrix
https://leetcode.com/problems/search-a-2d-matrix/

Medium

You are given an m x n integer matrix matrix with the following two properties:

Each row is sorted in non-decreasing order.
The first integer of each row is greater than the last integer of the previous row.
Given an integer target, return true if target is in matrix or false otherwise.

You must write a solution in O(log(m * n)) time complexity.

 

Example 1:


Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
Example 2:


Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false
 

Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 100
-104 <= matrix[i][j], target <= 104

*/

// simple O(n * m) solution
function nestedLoopSolution(matrix, target) {
	for (let row = 0; row < matrix.length; row++) {
		for (let col = 0; col < matrix[row].length; col++) {
			if (matrix[row][col] === target) return true;
		}
	}

	return false;
}


// Search from top right corner: O(M + N)
function searchMatrix(matrix, target) {
	if (!matrix.length || !matrix[0].length) return false;
	
	let row = 0;
	let col = matrix[0].length - 1;

	// 열이 오른쪽 끝에서 시작해서 왼쪽 끝에 닿도록 훑고, 
	// 행이 위쪽 끝에서 시작해서 아래쪽 끝에 닿도록 훑으며
	while (col >= 0 && row <= matrix.length - 1) {
		// matrix[행][렬]이 target과 같으면 바로 true 반환,
		if (matrix[row][col] === target) return true;

		// matrix[행][렬]이 target보다 크면 왼쪽으로 한 칸 전진,
		else if (matrix[row][col] > target) col--;
		// matrix[행][렬]이 target보다 작으면 아래로 한 칸 전진,
		else if (matrix[row][col] < target) row++;
	}

	return false;
}


// O(log(M*N)) solution
// "non-decreasing"이란, 중복된 수가 가능하다는 뜻인가?
// 일단 오름차순으로 정렬돼있으니, 가운데 행으로 자른다. 행과 열은 1~100까지 될 수 있다.
// 행을 대상으로 이진 탐색에 들어가고, 각 행마다 또 이진탐색을 한다.... 그러면 o(log(mn))이 나올까? 로그 제곱이 나오는 거 아닐까..?
function binarySolution(matrix, target) {
	let low = 0, high = matrix.length - 1;
	while (low < high) {
		let mid = low + Math.floor((high - low + 1) / 2);
		if (target < matrix[0][mid]) {
			high = mid - 1;
		} else {
			low = mid;
		}
	}

	return matrix[0][low] === target ? true : false;
}	



module.exports.solution = searchMatrix;

