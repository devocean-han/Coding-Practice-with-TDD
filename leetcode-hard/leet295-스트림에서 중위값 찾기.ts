/*
 * @lc app=leetcode id=295 lang=typescript
 *
 * [295] Find Median from Data Stream
 *
 * https://leetcode.com/problems/find-median-from-data-stream/description/
 *
 * algorithms
 * Hard (51.49%)
 * Total Accepted:    692K
 * Total Submissions: 1.3M
 * Testcase Example:  '["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"]\n' +
  '[[],[1],[2],[],[3],[]]'
 *
 * The median is the middle value in an ordered integer list. If the size of
 * the list is even, there is no middle value, and the median is the mean of
 * the two middle values.
 * 
 * 
 * For example, for arr = [2,3,4], the median is 3.
 * For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
 * 
 * 
 * Implement the MedianFinder class:
 * 
 * 
 * MedianFinder() initializes the MedianFinder object.
 * void addNum(int num) adds the integer num from the data stream to the data
 * structure.
 * double findMedian() returns the median of all elements so far. Answers
 * within 10^-5 of the actual answer will be accepted.
 * 
 * 
 * 
 * Example 1:
 * 
 * 
 * Input
 * ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
 * [[], [1], [2], [], [3], []]
 * Output
 * [null, null, null, 1.5, null, 2.0]
 * 
 * Explanation
 * MedianFinder medianFinder = new MedianFinder();
 * medianFinder.addNum(1);    // arr = [1]
 * medianFinder.addNum(2);    // arr = [1, 2]
 * medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
 * medianFinder.addNum(3);    // arr[1, 2, 3]
 * medianFinder.findMedian(); // return 2.0
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * -10^5 <= num <= 10^5
 * There will be at least one element in the data structure before calling
 * findMedian.
 * At most 5 * 10^4 calls will be made to addNum and findMedian.
 * 
 * 
 * 
 * Follow up:
 * 
 * 
 * If all integer numbers from the stream are in the range [0, 100], how would
 * you optimize your solution?
 * If 99% of all integer numbers from the stream are in the range [0, 100], how
 * would you optimize your solution?
 * 
 * 
 */

import { MinHeap, MaxHeap } from "../Class 모음";

// heap의 크기를 전체 / 2로 고정시키고, 더 큰 값이 들어오면 넣고 더 작은 값이 들어오려고 하면 통과시킨다. min heap이어야 겠다. 그러면 '현재까지의 중위값'을 구하게 될 때 제일 앞의 값 하나를 뽑든지, 앞의 값 두 개의 평균을 반환하든지 하면 되겠다.
// findMedian: heap의 길이가 홀수일 때(?) min을 반환. 짝수일 때(?)는 min 두 개 값의 평균을 반환
// addNum: heap에 가상의 '전체 요소 개수'를 저장하고 있는 변수 trueTotal이 있다면...
/* =>  숫자가 하나 스트림에서 나올 때마다 trueTotal은 + 1이 된다.
처음 나왔다면 trueTotal = 1이고, heap에 들어간다.
두 번째 나온 후에 trueTotal = 2이고 heap에 들어가야 한다.
trueTotal = 3일 땐 heap 길이를 2로 고정시켜야 한다. 세 번째 숫자가 현재 min보다 크면(min을 뺴고서)넣는 작업을 진행하고, min보다 작으면 넣지 않는다.
trueTotal = 4일 땐 가운데 2개 숫자를 알아야 하므로, 오름차순 정렬시켰을 때 앞에서 2번, 3번 숫자를 heap에 가지고 있어야 한다. heap 길이를 3으로 맞춘다. 문제 발생. 세 번째 숫자를 이미 제외시켰는데 네 번째 숫자가 그보다 작다면, 세 번째 순자를 다시 heap에 포함시켜야 한다. 

=> 문제: 이미 '버린' 숫자 이후로 계속 더 작은 수만 나와서 이 '버린' 수가 밀리고 밀려 중위값, 혹은 중위값보다 더 큰 수 그룹에 들어가야하게 생긴 경우, 어떡할 것인가?
1. 전체 min heap과 반절min heap을 동시에 가지고 있는다면?
2.
*/

// 에잇 그냥 이진 탐색 트리 이용하기:
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(value: number) {
        this.val = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    root: TreeNode | null;
    length: number; 
    constructor() {
        this.root = null;
        this.length = 0;
    }

    // 이진 탐색 트리에 새로운 노드를 삽입
    insert(value: number): void {
        const node = new TreeNode(value);
        if (!this.root) 
            this.root = node;
        else this.insertNode(this.root, node);
        this.length++;
    }

    // 재귀적으로 노드를 삽입하는 도우미 함수
    private insertNode(node: TreeNode, newNode: TreeNode): void {
        // 새로운 노드가 지금 살피는 노드보다 작으면 지금 노드의 왼 자식을 채우고, 왼 자식이 이미 차 있다면 그 왼 자식에 대해 다시 재귀호출해서 알맞은 자리를 탐색한다.
        if (newNode.val < node.val) {
            if (!node.left)
                node.left = newNode;
            else
                this.insertNode(node.left, newNode);
        } else {
            if (!node.right)
                node.right = newNode;
            else
                this.insertNode(node.right, newNode);
        }
    }
}

class MedianFinder1 {
    private tree: BinarySearchTree;
    constructor() {
        this.tree = new BinarySearchTree();
    }

    addNum(num: number): void {
        this.tree.insert(num);
    }

    findMedian(): number {
        // 이진 탐색 트리를 중위순회하다가 result에 담긴 개수가 반절이 되는 순간 마지막 result 요소를 반환하기.
        // 전체 개수가 홀수일 때: i=(전체 개수 / 2)내림. => result 배열 길이가 i+1개가 되었을 때 result[i]를 반환한다.  
        // 전체 개수가 짝수일 때: i= (전체 개수 / 2 - 1), i+1 = 전체 개수 / 2. => result 배열 길이가 i+2개가 되었을 때 result[i]+result[i+1]를 2로 나눈 값을 반환한다. 
        // if (!this.tree) return 0;
        const resultMap: Map<TreeNode, number> = new Map();
        const stack: TreeNode[] = [this.tree.root];

        while (stack.length) {
            const node = stack[stack.length - 1];
            
            if (node.left && !resultMap.has(node.left)) {
                stack.push(node.left);
            } else {
                resultMap.set(node, node.val);
                // 전체 5개 => 3개가 찼을 때 멈춤
                // 전체 6개 => 4개가 찼을 때 멈춤
                // = 전체 / 2를 내림하고 +1한 값
                const stopMoment = Math.floor(this.tree.length / 2) + 1 
                if (resultMap.size === stopMoment) {
                    const result = [...resultMap.values()];    
                    if (this.tree.length % 2 === 1) return result[stopMoment - 1];
                    else return (result[stopMoment - 2] + result[stopMoment - 1]) / 2;
                }

                stack.pop();
                node.right && stack.push(node.right);
            }
        }
    }
}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */

// 방법2: Min과 Max priority queue 이용하기:
// 작은 값들은 max q에, 큰 값들을 min q에 담고서 두 개 길이를 균형잡히게 유지하기.
// 예: maxQ[2,1], minQ[3,4]
/*      다음으로 5를 넣는다고 하면, minQ[3,4,5]
        다음으로 6을 넣는다면, minQ[3,4,5,6]=>[4,5,6] 그리고 maxQ[3,2,1]
        ....
        된다!
*/
/* 
 ^ 필요 자료 구조: Min heap과 Max heap
 ^ addNum의 로직: 
    1. 추가하려는 수가 현재 min heap의 .getMin()과 같거나 더 크면 min heap에 넣고, 더 작으면 max heap에 넣는다. 
    2. 이 때 추가하려는 힙의 길이가 반대편 힙보다 크면(= +1이면) 현재 힙.pop()하여 반대쪽에 넣어준 다음에 새 수를 본인 힙에 넣어준다. 그렇지 않으면(= 같거나 -1이면) 그냥 넣어준다. 
    3. 처음엔(두 힙 모두 길이가 0이면) min heap에 넣어준다. 
    => O(2 log N)
    
    수정: 
    1. 이전과 동일
    2. 새 수를 추가하고서 두 힙의 길이가 2 이상 차이나면, 더 긴 쪽에서 .pop()하여 반대쪽에 넣어준다.
    3. 이전과 동일

 ^ findMedian의 로직: 
    1. finMdeian()이 불린 시점에서 두 힙의 길이가 같으면 각각의 min과 max를 get()하여 평균을, 둘의 길이가 다르면 더 긴 쪽에서 get()한 값을 반환한다. 
    => O(1)
*/
class MedianFinder {
    minHeap: MinHeap
    maxHeap: MaxHeap
    constructor() {
        this.minHeap = new MinHeap();
        this.maxHeap = new MaxHeap();
    }

    addNum(num: number) {
        // let minLength = this.minHeap.getLength();
        // let maxLength = this.maxHeap.getLength();
        // if (minLength === 0 && maxLength === 0) {
        //     this.minHeap.insert(num);
        //     return;
        // }

        // if (num >= this.minHeap.getMin()) { // 새 수를 min heap에 넣어준다.
        //     if (minLength > maxLength) {
        //         const poppedNum = this.minHeap.popMin();
        //         this.maxHeap.insert(poppedNum);
        //     }
        //     this.minHeap.insert(num);
        // } else { // 새 수를 max heap에 넣어준다.
        //     if (maxLength > minLength) {
        //         const poppedNum = this.maxHeap.popMax();
        //         this.minHeap.insert(poppedNum);
        //     }
        //     this.maxHeap.insert(num);
        // }
        
        // 수정 후: 
        if (num < this.minHeap.getMin())
            this.maxHeap.insert(num);
        else
            this.minHeap.insert(num);
        // initially(when both lengths are 0), the number goes to the min heap naturally. 

        const minLength = this.minHeap.getLength();
        const maxLength = this.maxHeap.getLength();
        if (minLength - maxLength >= 2) { // min heap에서 뽑아서 max heap으로
            const popped = this.minHeap.popMin();
            this.maxHeap.insert(popped);
        }
        if (maxLength - minLength >= 2) { // max heap에서 뽑아서 min heap으로
            const popped = this.maxHeap.popMax();
            this.minHeap.insert(popped);
        }
    }

    findMedian(): number {
        const minLength = this.minHeap.getLength();
        const maxLength = this.maxHeap.getLength();
        const min = this.minHeap.getMin();
        const max = this.maxHeap.getMax();
        if (minLength === maxLength)
            return (min + max) / 2;
        return (minLength > maxLength) ? min : max;
    }
}

export default {
    MedianFinder,
}