/*
 * @lc app=leetcode id=743 lang=typescript
 *
 * [743] Network Delay Time
 *
 * https://leetcode.com/problems/network-delay-time/description/
 *
 * algorithms
 * Medium (53.28%)
 * Total Accepted:    454.3K
 * Total Submissions: 852.5K
 * Testcase Example:  '[[2,1,1],[2,3,1],[3,4,1]]\n4\n2'
 *
 * You are given a network of n nodes, labeled from 1 to n. You are also given
 * times, a list of travel times as directed edges times[i] = (ui, vi, wi),
 * where ui is the source node, vi is the target node, and wi is the time it
 * takes for a signal to travel from source to target.
 * 
 * We will send a signal from a given node k. Return the minimum time it takes
 * for all the n nodes to receive the signal. If it is impossible for all the n
 * nodes to receive the signal, return -1.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
 * Output: 2
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: times = [[1,2,1]], n = 2, k = 1
 * Output: 1
 * 
 * 
 * Example 3:
 * 
 * 
 * Input: times = [[1,2,1]], n = 2, k = 2
 * Output: -1
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * 1 <= k <= n <= 100
 * 1 <= times.length <= 6000
 * times[i].length == 3
 * 1 <= ui, vi <= n
 * ui != vi
 * 0 <= wi <= 100
 * All the pairs (ui, vi) are unique. (i.e., no multiple edges.)
 * 
 * 
 */

// (중단)
function networkDelayTime1(times: [number,number,number][], n: number, k: number): number {
    if (times.length === 1) {
        // 간선이 하나뿐인 경우,
        // 1) k가 유일한 시작노드와 같지 않아 시작도 할 수 없음: -1 반환
        if (k !== times[0][0])
            return -1;
        // 2) k가 시작노드와 같든 같지 않든 노드가 2개를 초과하면 모든 노드에 닿기 불가능
        if (n > 2)
            return -1;
        // 3) 노드가 2개뿐이고 k가 시작노드와 같으면 그 간선에 배당된 지연 시간 반환
        return times[0][2];
    }
    // "총 간선 수"가 "총 노드 수 - 1"보다 작으면 전체 노드 연결은 불가능함
    if (times.length < n - 1)
        return -1;
    
    // 일단 출발지 k에서 갈 수 있는 노드들을 찾는다. 
    let level1Reaches = []
    for (let i = 0; i < times.length; i++) {
        if (times[i][0] === k) {
            level1Reaches.push(times[i]);
        }
    }
    // 그 노드들을 대상으로 또 갈 수 있는 노드들을 찾는다. 
    let level2Reaches = []
    for (let node of level1Reaches) {
        for (let i = 0; i < times.length; i++) {
            if (times[i][0] === node[0]) {
                level2Reaches.push(times[i]);
            }
        }
    }
    // => 아예 전체를 한 번만 순회하면서 각 노드들이 갈 수 있는 전체 지도를 만들어두자.
    // type Edge = {
    //     startNode: number;
    //     endNode: number;
    //     lapse: number;
    // }
    type Edge = [number, number, number];
    const graph = new Map<number, Edge[]>(); 
    // graph: {노드: [해당 노드를 시작노드로 삼는 모든 간선[시작노드, 끝노드, 시간] 목록]}
    // ex) graph = {1: [[1,2,1], [1,4,1], ...],
    //              3: [[3,1,1]],
    //          }
    for (let edge of times) {
        const startNode = edge[0];
        if (!graph.has(startNode))
            graph.set(startNode, []);
        graph.get(startNode).push(edge);
    }
    // 문제: 같은 노드에 도달하는 서로 다른 길이 서로 다른 소요시간을 가질 수 있다.
    const dp = Array(n).fill(Infinity);
    // dp[i] = i 노드에서 i 노드의 모든 자식노드 끝까지 도달하는 데 걸리는 시간
    // 스택을 초기화하고 깊이우선탐색을 실시한다
    function dfs(curNode: number, timeSum: number) {
        
        const children = graph.get(curNode) || []; 
        const tempArray = [];
        for (let child of children) {
            const [start, end, time] = child;
            if (!visited.has(end)) {
                // 방문 탐색
                tempArray.push(dfs(end));
            }
        }
        // 모든 자식을 돌고 난 후, 최대 소요 시간을 선택해 반환
        // curNode가 graph에 등록되지 않았거나 자식이 있지만 이미 방문했어서
        // 한 자식도 방문하지 않게 된 경우, tempArray는 비게 되어 자기 자신(시간)을 반환해야 함
        
        return tempArray.length === 0 ? timeSum : Math.max(...tempArray);
    }
}


// DFS
function networkDelayTime(times: number[][], n: number, k: number): number {
    // 각 노드에 닿는데 걸리는 최소시간을 저장할 배열
    const distances = new Array(n + 1).fill(Infinity);
    distances[0] = 0;
    distances[k] = 0;

    // 시작 노드를 인덱스로 갖고 [도착 노드, 걸린 시간]을 값으로 가지는 배열
    const travels: number[][] = new Array(n + 1).fill(0).map(() => []);
    times.forEach(t => {
        travels[t[0]].push([t[1], t[2]]);
    });

    // 탐색 시작지점을 노드 k로 초기화
    const queue = [k];
    while (queue.length > 0) {
        const curNode = queue.shift();
        
        // curNode가 가 닿을 수 있는 모든 자식 노드에 대하여:
        travels[curNode].forEach(c => {
            // '가 닿는데 걸리는 시간'을 더한 값이 도착 노드가 원래 가지고 있던 최소 소요 시간보다 적으면, 이 더한 시간 값을 새 최소 시간으로 삼음
            if (distances[curNode] + c[1] < distances[c[0]]) {
                distances[c[0]] = distances[curNode] + c[1];
                queue.push(c[0]);
            }
        });
    }

    // 각 노드에 도착하기까지 걸린 시간들 중 최대 소요시간을 검색
    const max = Math.max(...distances);
    // '새 최소시간'으로 덮어씌워지지 않은 노드가 하나라도 있으면 -1 반환 
    if (max === Infinity)
        return -1;
    return max;
}

export default {
    solution: networkDelayTime,
}