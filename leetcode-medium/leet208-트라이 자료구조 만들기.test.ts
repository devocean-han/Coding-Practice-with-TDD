import source from './leet208-트라이 자료구조 만들기';
const { Trie } = source;
// import { Trie, Trie2 } from './leet208-트라이 자료구조 만들기';
// => 이상한 점: export Class로 바로 가져오면 타입 형식으로 사용 가능한데, export default { Trie: Trie }로 따로 가져와서 풀어주면 타입 형식 사용에 지장이 생긴다. 왜 그렇지?  

describe('Implement Trie (Prefix Tree)', () => {
	describe('Class initialization check', () => {
		let trie: any;

		it(`should exist when initialized as "new Trie()"`, () => {
			trie = new Trie();
			expect(trie).toBeDefined();
		});

	});

	describe('Method check: INSERT', () => {
		let trie: any;
		beforeEach(() => {
			trie = new Trie();
			jest.spyOn(trie, "insert");
		})

		it(`should have been called with the word "coffee"`, () => {
			trie.insert('coffee');
			expect(trie.insert).toHaveBeenCalledWith('coffee');
			expect(trie.insert).toReturn(); // same as toHaveReturned()
			expect(trie.insert).toReturnWith(undefined);
		});

		it(`should have been called with the word ""`, () => {
			trie.insert('');
			expect(trie.insert).toHaveBeenCalledWith('');
			expect(trie.insert).toReturn(); // same as toHaveReturned()
			expect(trie.insert).toReturnWith(undefined);
		});
	});

	describe('Method check: SEARCH', () => {
		let trie: any;
		beforeEach(() => {
			trie = new Trie();
			jest.spyOn(trie, "search");
		})

		it(`should return true after inserting and calling with the word "coffee"`, () => {
			trie.insert('coffee');
			trie.search('coffee');
			expect(trie.search).toHaveBeenCalledWith('coffee');
			expect(trie.search).toReturn(); // same as toHaveReturned()
			expect(trie.search).toReturnWith(true);
		});

		it(`should return true after inserting and calling with the word ""`, () => {
			trie.insert('');
			trie.search('');
			expect(trie.search).toHaveBeenCalledWith('');
			expect(trie.search).toReturn(); // same as toHaveReturned()
			expect(trie.search).toReturnWith(true);
		});

		it(`should return false after inserting "coffee" but calling with the word "caffeine"`, () => {
			trie.insert('coffee');
			trie.search('caffeine');
			expect(trie.search).toHaveBeenCalledWith('caffeine');
			expect(trie.search).toReturn(); // same as toHaveReturned()
			expect(trie.search).toReturnWith(false);
		});
	});

	describe('Method check: STARTSWITH', () => {
		let trie: any;
		beforeEach(() => {
			trie = new Trie();
			jest.spyOn(trie, "startsWith");
		})

		it(`should return true after inserting "coffee" and calling with the prefix "cof"`, () => {
			trie.insert('coffee');
			trie.startsWith('cof');
			expect(trie.startsWith).toHaveBeenCalledWith('cof');
			expect(trie.startsWith).toReturn(); 
			expect(trie.startsWith).toReturnWith(true);
		});

		it(`should return true after inserting "coffee" and calling with the prefix ""`, () => {
			trie.insert('coffee');
			trie.startsWith('');
			expect(trie.startsWith).toHaveBeenCalledWith('');
			expect(trie.startsWith).toReturn(); // same as toHaveReturned()
			expect(trie.startsWith).toReturnWith(true);
		});

		it(`should return true after inserting "coffee" and calling with the prefix "coffee"(whole word)`, () => {
			trie.insert('coffee');
			trie.startsWith('coffee');
			expect(trie.startsWith).toHaveBeenCalledWith('coffee');
			expect(trie.startsWith).toReturn(); // same as toHaveReturned()
			expect(trie.startsWith).toReturnWith(true);
		});

		it(`should return false after inserting "coffee" but calling with the prefix "coffei"`, () => {
			trie.insert('coffee');
			trie.startsWith('coffei');
			expect(trie.startsWith).toHaveBeenCalledWith('coffei');
			expect(trie.startsWith).toReturn(); // same as toHaveReturned()
			expect(trie.startsWith).toReturnWith(false);
		});

		it(`should return false after inserting "coffee" but calling with the prefix "cofe"`, () => {
			trie.insert('coffee');
			trie.startsWith('cofe');
			expect(trie.startsWith).toHaveBeenCalledWith('cofe');
			expect(trie.startsWith).toReturn(); // same as toHaveReturned()
			expect(trie.startsWith).toReturnWith(false);
		});
	});

});

/* 
	& Jest 라이브러리 (expect 메소드와 함께 쓰이는) matcher 메소드의 별명 묶음: 
	toHaveReturned = toReturned
	toHaveReturnedTimes(number) = toReturnTimes(number)
	toHaveReturnedWith(value) = toReturnWith(value)
	toHaveNthReturnedWith(number, value) = NthReturnedWith(number, value)
	toHaveLastReturnedWith(value) = lastReturnedWith(value)
	=> 각각 에러를 던진 호출은 셈하지 않거나 테스트를 fail시킨다. 
*/

/*
	& 좋은 Cheat Sheet을 발견했다: 
	https://gist.github.com/yoavniran/1e3b0162e1545055429e?permalink_comment_id=3885853#jest
	인파의 포스팅 '[JEST] 유용한 matcher 함수 모음'도 좋다: 
	https://inpa.tistory.com/entry/JEST-%F0%9F%93%9A-jest-%EA%B8%B0%EB%B3%B8-%EB%AC%B8%EB%B2%95-%EC%A0%95%EB%A6%AC#toreturn_/_tohavereturned
	*/
	
/*
	& mocking 정리:
	const mock = jest.fn();

	mock.mockReturnValue(42); 
	console.log(mock()); // 42

	mock.mockImplementation((name) => `I am ${name}`); 
	console.log(mock("Kent")) // I am Kent
	~ const mock = jest.fn((name) => `I am ${name}`);

	const asyncMock = jest.fn().mockReslovedValue(42);
	console.log(await asyncMock()); // 42 
	const asyncMock = jest.fn().mockRejectedValue(new Error('Async error'));
	console.log(await asyncMock()); // throws "Async error";

	활용 예)
	const mock = jest.fn((name) => `I am ${name}`);

	mock('a');
	mock(['b', 'c']);

	expect(mock).toBeCalledTimes(2); // true
	expect(mock).toBeCalledWith('a'); // true
	expect(mock).toBeCalledWith(['b', 'c']); // true


	& 1. jest.fn() : 함수 하나를 모킹 처리해줄 때 사용
	& 2. jest.mock() : 그룹을 한꺼번에(=모듈 자체를) 모킹 처리해줄 때 사용
	& 3. jest.spyOn() : 어떤 객체에 속한 함수의 구현을 가짜로 대체하지 않고, 해당 함수의 호출 여부와 어떻게(무슨 인수를 받아서) 호출되었는지만을 알아내고 싶을 때 사용
	예제 1) 
	const user = {
		isAuthenticated: jest.fn(() => true),
		isOne: jest.fn(),
		isTwo: jest.fn(),
		...
		isOneHundred: jest.fn()
	}
	이렇게 101개 함수를 일일이 모킹할 것을,
	jest.mock('../models/user'); // ../models/user.js에서 export한 객체의 모든 내부요소들을 그룹 모킹화한다. 예를 들어 export User였다면 User 내의 모든 요소(속성)들을 전부 모킹한다. 
	const User = require('../models/user'); // 이제부터 ../models/user.js에서 꺼내 쓰는 요소들은 모두 모킹화 된 것들이다.
	User.findOrCreate().mockReturnValue('success'); // jest.fn() 처리 없이 자동으로 모킹되어있어 바로 사용하면 된다.
	이렇게 세 단계를 거쳐 한꺼번에 모킹하고 import하여 단일 메소드를 가져와 사용하면 되게 된다. 

	또 다음과 같이 spyOn()을 활용하면:
	const spyFn = jest.spyOn(Object, 'entries');
	! Object.entries() 메소드에 스파이를 붙이는 것이 된다. 
	이제 Object.entries()를 사용할 때마다 몇 번, 어떻게 불렸는지가 기록된다. 
	const entries = Object.entries();
	expect(spyFn).toBeCalledTimes(1); // true
	expect(spyFn).toBeCalledWith(); // ...
	expect(spyFn).toReturn(); // true (성공적으로 한 번은 불림)
*/

/*
	& 예제 2) REST API를 요청했을 때 동작이 잘 되었는지 검증하기:
	/user/1/follow POST 요청을 했을 때 로그인이 되어있으면 데이터베이스에 user 팔로우 관련 데이터를 트랜잭션하는 addFollowing 미들웨어를 단위테스트해보자.
*/
class Test {
	sourceCode() {
		// 컴파일 에러 방지를 위해 가짜 router, isLoggedIn을 선언해줌. 
		let router: any;
		let isLoggedIn: any;
		let addFollowing: any;
		let User: any;
		//* POST /user/1/follow -> 사용자(내)가 사용자1을 팔로우 요청
		router.post('/:id/follow', isLoggedIn, addFollowing);

		//* addFollowing 함수(컨트롤러)
		exports.addFollowing = async (req: any, res: any, next: any) => {
			try {
				const user = await User.findOne({ where: { id: req.user.id } });
				//! 분기별로 테스트
				if (user) {
					//! 테스트 분기1 
					await user.addFollowing(parseInt(req.params.id, 10));
					res.send('success');
				} else {
					//! 테스트 분기2 
					res.status(404).set('no user');
				}
			} catch (error) {
				//! 테스트 분기3
				console.error(error);
				next(error);
			}
		}
	}

	doUnitTest() {
		//* user.test.js
		const { addFollowing } = require('./user');
		// 그룹 모킹화
		jest.mock('../models/user');
		const User = require('../models/user');
	
		describe('addFollowing', () => {
			const req: any = {
				user: { id: 1 },
				params: { id: 2 },
			}
			const res: any = {
				status: jest.fn(() => res),
				send: jest.fn(),
			}
			const next = jest.fn();
	
			//! 테스트 분기1
			test('사용자를 찾아 팔로잉을 추가하고 success를 응답해야 함', async () => {
				//? User.findOne()의 리턴값을 강제로 지정.
				//? 본 메소드가 프로미스 객체를 반환했으니 똑같이 지정
				User.findOne.mockReturnValue(
					Promise.resolve({
						id: 1,
						name: 'zerocho',
						addFollowing(value: number) {
							Promise.resolve(true);
						},
					}),
				);
				await addFollowing(req, res, next);
	
				expect(res.send).toBeCalledWith('success');
			});
	
			//! 테스트 분기2
			test(`사용자를 찾을 수 없어 res.status(404).send('no user')를 호출함`, async () => {
				User.findOne.mockReturnValue(null);
				await addFollowing(req, res, next);
	
				expect(res.status).toBeCalledWith(404);
				expect(res.send).toBeCalledWith('no user');
			});
	
			//! 테스트 분기3
			test(`사용자를 찾는 도중(DB에서) 에러가 발생하면 next(error)를 호출해야 함`, async () => {
				const errorMessage = '테스트용 에러';
				User.findOne.mockReturnValue(Promise.reject(errorMessage));
				await addFollowing(req, res, next);
	
				expect(next).toBeCalledWith(errorMessage);
			});
		});
	}
}
//& 실행: 
// const test = new Test();
// test.doUnitTest(); //? sourceCode를 불러오는 곳을 엉뚱한 파일 ../models/user로 지정해두었으므로 이 코드는 작동하지 않을 것임.  

