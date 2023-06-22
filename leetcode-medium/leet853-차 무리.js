/* 853. Car Fleet
https://leetcode.com/problems/car-fleet/
Medium

There are n cars going to the same destination along a one-lane road. The destination is target miles away.

You are given two integer array position and speed, both of length n, where position[i] is the position of the ith car and speed[i] is the speed of the ith car (in miles per hour).

A car can never pass another car ahead of it, but it can catch up to it and drive bumper to bumper at the same speed. The faster car will slow down to match the slower car's speed. The distance between these two cars is ignored (i.e., they are assumed to have the same position).

A car fleet is some non-empty set of cars driving at the same position and same speed. Note that a single car is also a car fleet.

If a car catches up to a car fleet right at the destination point, it will still be considered as one car fleet.

Return the number of car fleets that will arrive at the destination.


Example 1:
Input: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]
Output: 3

Explanation:
The cars starting at 10 (speed 2) and 8 (speed 4) become a fleet, meeting each other at 12.
The car starting at 0 does not catch up to any other car, so it is a fleet by itself.
The cars starting at 5 (speed 1) and 3 (speed 3) become a fleet, meeting each other at 6. The fleet moves at speed 1 until it reaches target.
Note that no other cars meet these fleets before the destination, so the answer is 3.


Example 2:
Input: target = 10, position = [3], speed = [3]
Output: 1

Explanation: There is only one car, hence there is only one fleet.


Example 3:
Input: target = 100, position = [0,2,4], speed = [4,2,1]
Output: 1

Explanation:
The cars starting at 0 (speed 4) and 2 (speed 2) become a fleet, meeting each other at 4. The fleet moves at speed 2.
Then, the fleet (speed 2) and the car starting at 4 (speed 1) become one fleet, meeting each other at 6. The fleet moves at speed 1 until it reaches target.


Constraints:
n == position.length == speed.length
1 <= n <= 105
0 < target <= 106
0 <= position[i] < target
All the values of position are unique.
0 < speed[i] <= 106

*/

function solution(target, position, speed) {
	// 차가 한 대뿐이라면 만들 수 있는 차 무리는 무조건 1:
	if (position.length === 1) return 1;

	// 차가 전부 같은 속도를 갖는다면 결과 무리는 무조건 차량 개수만큼이다: 
	if ((new Set(speed)).size === 1) return position.length;

	/* 일단 position을 기준으로 오름차순 정렬한다. 뭐가 제일 목적지와 가까이 놓였는지.
		그리고 한 차가 목적지에 다다르는 시간은 : 원래 위치 + 속도 * 시간 = 목적지
		=> 시간 = (목적지-원래위치) / 속도 
		이렇게 계산해보면 
		{ target: 100, position: [0, 5, 99], speed: [2, 1, 1], result: 2, },
		이 세트의 차들의 도착에 걸리는 시간은 각각 [100/2, 95/1, 1/1] = [50, 95, 1]이다. 하지만 첫 두 차는 뭉치게 되고 결국 제일 먼 차가 2번째 차 속도에 맞추게 되어 50이 아닌 95에 가까운 시간이 걸리게 된다. => 목적지에 다다르는 시간을 재는 것은 의미가 없는 듯. 

		일단 position 기준으로 오름차순 정렬하고 나면 '어느 순간 차들의 위치가 겹칠 가능성이 있는가'를 계산해야 한다. 엇, '걸리는 시간'이 다시 유의미하게 될 것 같다. '더 앞에 있는 차가 도착에 더 오래 걸리게 시간이 계산된다면, 그 후미에 있는 차들은 이 차와 나란히 달리게 된다는 것. 목적지 도착 전에 무조건 따라잡히게 된다는 것'을 의미하므로!
		그러면 어느 위치에서 따라 잡히느냐가 중요하다. 중요한가? 그냥 [50, 95, 1] 중에 '다음 나오는 더 큰 수'를 따라잡을 거라고 하면 되는 거 아닌가..?! 결국 monotonic decreasing stack에 최종적으로 남는 숫자만큼 아닐까?! 

		예제 1번으로 계산해봤다: 
		posion=[0,3,5,8,10], speed=[1,3,1,4,2], target=12
		expectedTime=[12/1, 9/3, 7/1, 4/4, 2/2] => [12,3,7,1,1]
		=> 12 하나, 3과 7이 하나, 1과 1이 하나, 이렇게 세 무리! 이론이 맞는 것 같다!

	*/
	
	// 1. position을 오름차순 정렬한다. 
	position.map((car, index) => {
		return { value: car, originalIndex: index }
	}).sort();

	// 2. 그에 똑같이 맞춰서 speed도 자리를 바꾼다. 
	// 	-> 1. position을 {value: 값, originalIndex: 원래 인덱스}의 객체로 만들어 value 기준으로 오름차순 정렬한다. 
	//  -> 2. speed도 {value: 값, originalIndex: 원래 인덱스}의 객체로 만들어서... 똑같이 오름차순 정렬한다. 
	//  -> 1+2. 아니 그냥! {position, speed}를 한번에 합친 객체를 만들면 되지!
	
	// 3. 각 차량별로 '목적지까지 걸리는 시간'을 계산한 결과 배열 expectedTime을 만든다.
	// 		=> 시간 = (목적지-원래위치) / 속도
	// 4. 이를 기준으로 inscreaing stack을 만든다. 
	// 5. 최종적으로 stack에 남아있는 개수를 반환한다. 

	return 1;
}

module.exports.solution = solution;
