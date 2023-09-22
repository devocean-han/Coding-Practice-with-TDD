/*
 * @lc app=leetcode id=212 lang=javascript
 *
 * [212] Word Search II
 *
 * https://leetcode.com/problems/word-search-ii/description/
 * 
 * algorithms
 * Hard (36.13%)
 *
 * Given an m x n board of characters and a list of strings words, return all
 * words on the board.
 * 
 * Each word must be constructed from letters of sequentially adjacent cells,
 * where adjacent cells are horizontally or vertically neighboring. The same
 * letter cell may not be used more than once in a word.
 * 
 * 
 * Example 1:
 * 
 * 
 * Input: board =
 * [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]],
 * words = ["oath","pea","eat","rain"]
 * Output: ["eat","oath"]
 * 
 * 
 * Example 2:
 * 
 * 
 * Input: board = [["a","b"],["c","d"]], words = ["abcb"]
 * Output: []
 * 
 * 
 * 
 * Constraints:
 * 
 * 
 * m == board.length
 * n == board[i].length
 * 1 <= m, n <= 12
 * board[i][j] is a lowercase English letter.
 * 1 <= words.length <= 3 * 10^4
 * 1 <= words[i].length <= 10
 * words[i] consists of lowercase English letters.
 * All the strings of words are unique.
 * 
 * 
 */

//^ => m은 가로 길이, n은 세로 길이, m과 n은 1~12의 정수고
//^    모든 문자는 영문 소문자로 이루어져 있다. 존재하는지를
//^    테스트해야 하는 목록 words는 1~30,000개의 단어를 포함
//^    하며 각 단어는 1~10자로 구성되어 있다.
//^    목록 words에는 중복되지 않는 단어만 주어진다고 할 때,
//^    그 중 board에서 연이은 칸(cell)으로 만들 수 있는 단어를
//^    따로 담아 반환하기. 세로로, 가로로, 거꾸로, 꺾어서 연이은
//^    칸 모두 인정된다. 서로 다른 단어에서 같은 칸을 지나가는
//^    것은 괜찮지만 한 단어 내에서 칸을 중복으로 사용할 순 없다.

//^ ==> 즉, 각 단어의 존재 검사는 독립적으로 이루어진다.
/* 
    그러면 어떻게 한 단어를 검사하는가? 
    예를 들어 'oath'를 찾는다면, 첫 문자 'o'가 있는 칸을 찾아간다. 
        없으면 전체 false를 반환한다. 
        있다면 상하좌우 칸 중 두 번째 문자 'a'가 있는지 찾는다. 재귀함수로 호출해야 한다. 'a'가 여러 곳에 있을 수 있으므로. 
        => 자기 자신을 재귀함수로 만들어야 한다. 상하좌우에 두 번째 문자가 없을 때 false로 탈출하고, 있다면 그 칸과 다음 문자를 받고 자기 자신을 호출하도록 해야 한다. 또 인수로 받은 '다음 문자'가 '', 즉 공백일 때도(=마지막 하나 다음) 탈출해야 할 것 같다... 마지막 문자까지 재귀를 타고 잘 들어왔다는 뜻이므로 true를 반환하며 탈출하면 되겠다.

    있다면 거기서 또 상하좌우 칸 중 세 번째 문자 't'가 있는지 찾는다.
    끝 문자까지 반복한다. 
*/

// 시도 1(실패): 
// 1) 한 단어에서 같은 칸을 중복 사용하는지 체크하지 않고,  
// 2) 항상 Board의 첫 칸이 첫 문자에 매칭된다고 가정하게 됨. 
function findWords1(board: string[][], words: string[]): string[] {

    // 보조 재귀함수 (i=row, j=col, nextChar=다음 문자의 인덱스 번호)
    function aug(i: number, j: number, word: string, nextCharIndex: number, visitedCell: any): boolean {
        // 0. 탈출 조건(base condition): 주어진 '다음 문자'가 공백(=마지막 이후 문자)이면 true를 반환한다. 
        if (nextCharIndex >= word.length) return true;

        // 0. 탈출 조건 II: 상하좌우 중 어느 칸에도 '다음 문자'가 존재하지 않으면 false를 반환한다.  => 굳이 이럴 필요 없이, 마지막에 false를 단순 반환시켜주면 된다. 
        const nextChar = word[nextCharIndex];
        // if (board[i - 1]?.[j] !== nextChar &&
        //     board[i + 1]?.[j] !== nextChar &&
        //     board[i]?.[j - 1] !== nextChar &&
        //     board[i]?.[j + 1] !== nextChar) {
        //     return false;
        // }

        
        // 0. i나 j를 검사하여 0보다 작거나 하면 바로 탈출시켜 밑에서 board[i - 1]?.[j]같이 복잡한 형식으로 참조하지 않도록 하려함. => 그러나 i가 0일 때 '상'은 안되지만 '하'는 검사해야 하므로 곧바로 탈출시킬(i=0일 떄의 검사 자체를 막을) 수 없다. 따라서 아래와 같이 옵셔널 체이닝으로 그 때 그 때 undefined를 영문자와 비교시키는 게 최선이다. 

        // 1. 상하좌우에 '다음 문자'가 존재하면 재귀 호출한다.
        let up, down, left, right;
        //  상: 윗칸이 존재하고 그 칸이 '다음 문자'라면
        //      그리고 이전에 방문한 칸이 아니라면
        if (board[i - 1]?.[j] === nextChar &&
            !(visitedCell.has(i - 1) && visitedCell.get(i - 1).has(j))) {
            // 윗칸과 그 다음 문자를 두고 재귀호출하고
            up = aug(i - 1, j, word, nextCharIndex + 1, visitedCell);
            // 그 결과가 true면 곧바로 true를 반환한다. 
            if (up) {
                if (!visitedCell.has(i - 1)) visitedCell.set(i - 1, new Map());
                visitedCell.get(i - 1).set(j, true);
                // visitedCell.set(visitedCell.get(i) ?? )
                return true;
            }
        }
        //  하: 아래칸이 존재하고 그 칸이 '다음 문자'라면
        if (board[i + 1]?.[j] === nextChar &&
            !(visitedCell.has(i + 1) && visitedCell.get(i+ 1).has(j))) {
            down = aug(i + 1, j, word, nextCharIndex + 1, visitedCell);
            if (down) {
                if (!visitedCell.has(i + 1)) visitedCell.set(i + 1, new Map());
                visitedCell.get(i + 1).set(j, true);
                return true;
            }
        }
        // => 엇, 상하좌우 중 방금 지나온 칸을 어떻게 표시해놓지? 그 칸은 다시 지나가면 안 된다. 검사 후보에서 빼버려야 한다.
        // => 각 재귀호출마다 return 을 붙여줘야 하려나? => 상하좌우 각이 word 끝까지 true를 반환했다면 그대로 리턴으로 끝내면 되지만, 상이 만약 false엿다면 다음 하좌우 검사로 넘어가야 한다. 즉, 재귀 호출이 true를 반환했을 때만 true를 반환한다. 

        //  좌: 
        if (board[i]?.[j - 1] === nextChar &&
            !(visitedCell.has(i) && visitedCell.get(i).has(j - 1))) {
            left = aug(i, j - 1, word, nextCharIndex + 1, visitedCell);
            if (left) {
                if (!visitedCell.has(i)) visitedCell.set(i, new Map());
                visitedCell.get(i).set(j - 1, true);
                return true;
            }
        }
        //  우: 
        if (board[i]?.[j + 1] === nextChar &&
            !(visitedCell.has(i) && visitedCell.get(i).has(j + 1))) {
            right = aug(i, j + 1, word, nextCharIndex + 1, visitedCell);
            if (right) {
                if (!visitedCell.has(i)) visitedCell.set(i, new Map());
                visitedCell.get(i).set(j + 1, true);
                return true;
            }
        }
        return false;
        // return up || down || left || right; 
    }
    
    
    const result: string[] = [];
    // 단어별 방문한 cell을 기록할 노트: 
    // => Map{ i: Map{ j, j,..} }식으로 저장하고,
    //    if (visitedCell.has(i) && visitedCell.get(i).has(j)) 같이 검사할 것임. 
    // const visitedCell = new Map();
    for (let word of words) {
        if (aug(0, 0, word, 1, new Map())) result.push(word);
    }

    return result;
};


// 시도 2(성공 -> 시간 초과 실패):
// 이전 실패 요인 1과 2뿐만 아니라, 전진이 막혔을 때 한 칸을 물러나(back-tracking) 다른 루트를 탐색하게 하는 것까지 완성함.
// 그러나 실제 테스트 시 시간초과로 실패함.
// 가능성을 남겨둔 코드 조각, 구구절절한 설명 주석, console.log가 포함됨. 구체적으로 이해하기에는 findWords3보다 이 버전이 더 좋을 것. 
function findWords2(board: string[][], words: string[]): string[] {

    const result: string[] = [];
    // 단어별 방문한 cell을 기록할 노트: 
    // => Map{ i: { 
    //              j, 
    //              j, 
    //              ...
    //             },
    //         }
    //    식으로 저장하고,
    //    if (visitedCell.has(i) && visitedCell.get(i).has(j)) 같이 검사할 것임. 
    wordSearch: for (let word of words) {
        // 1. 첫 문자 위치 찾기
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                if (board[i][j] === word[0]) {
                    // 2. 첫 문자 칸에서 시작해서 이어지는 문자들을 각각의 상하좌우칸을 검사하며 찾기. 
                    // const visitedCell = new Map();
                    if (aug(i, j, word, 1, new Map().set(i, new Map().set(j, true)))) {
                        result.push(word);
                        continue wordSearch;
                    }
                }
            }
        }
    }

    // 보조 재귀함수 (i=row, j=col, nextChar=다음 문자의 인덱스 번호)
    function aug(i: number, j: number, word: string, nextCharIndex: number, visitedCell: any): boolean {
        console.log("현재 위치:", i, j, "현재 문자:", word[nextCharIndex - 1], "visited 초반: ", visitedCell);
        // // 현재 칸을 '방문한 칸'에 추가
        // if (!visitedCell.has(i)) visitedCell.set(i, new Map());
        // visitedCell.get(i).set(j, true);
        // 0. 탈출 조건(base condition): 주어진 '다음 문자'가 공백(=마지막 이후 문자)이면 true를 반환한다. 
        if (nextCharIndex >= word.length) return true;

        const nextChar = word[nextCharIndex];

        // 1. 상하좌우에 '다음 문자'가 존재하면 재귀 호출한다.
        let up, down, left, right;
        //  상: 윗칸이 존재하고 그 칸이 '다음 문자'라면
        //      그리고 이전에 방문한 칸이 아니라면
        if (board[i - 1]?.[j] === nextChar &&
            !(visitedCell.has(i - 1) && visitedCell.get(i - 1).has(j))) {
            console.log(`현재: ${board[i][j]}, 다음 찾는 문자: 위쪽에서 ${nextChar}찾음`);
            // 현재 칸의 윗칸을 방문 기록에 추가.
            if (!visitedCell.has(i - 1)) visitedCell.set(i - 1, new Map());
            visitedCell.get(i - 1).set(j, true);

            // 윗칸과 그 다음 문자를 두고 재귀호출하고
            up = aug(i - 1, j, word, nextCharIndex + 1, visitedCell);
            // 그 결과가 true면 곧바로 true를 반환한다. 
            if (up) {
                return true;
            }
        }
        //  하: 아래칸이 존재하고 그 칸이 '다음 문자'라면
        if (board[i + 1]?.[j] === nextChar &&
            !(visitedCell.has(i + 1) && visitedCell.get(i+ 1).has(j))) {
            console.log(`현재: ${board[i][j]}, 다음 찾는 문자: 아래에서 ${nextChar}찾음`);
            // 현재 칸의 아래 칸을 방문 기록에 추가
            if (!visitedCell.has(i + 1)) visitedCell.set(i + 1, new Map());

            visitedCell.get(i + 1).set(j, true);
            down = aug(i + 1, j, word, nextCharIndex + 1, visitedCell);
            if (down) {
                return true;
            }
        }

        //  좌: 
        if (board[i]?.[j - 1] === nextChar &&
            !(visitedCell.has(i) && visitedCell.get(i).has(j - 1))) {
            console.log(`현재: ${board[i][j]}, 다음 찾는 문자: 왼쪽에서 ${nextChar}찾음`);
            // 일단 현재 칸의 '좌'에 대해서는 확실하니까 '방문 기록'에 넣어준다.
            if (!visitedCell.has(i)) visitedCell.set(i, new Map());
            visitedCell.get(i).set(j - 1, true);

            // 다음 탐색 속행
            left = aug(i, j - 1, word, nextCharIndex + 1, visitedCell);
            if (left) {
                return true;
            }
        }
        //  우: 
        if (board[i]?.[j + 1] === nextChar &&
            !(visitedCell.has(i) && visitedCell.get(i).has(j + 1))) {
            console.log(`현재: ${board[i][j]}, 다음 찾는 문자: 오른쪽에서 ${nextChar}찾음`);
            // 현재 칸의 오른칸을 방문 기록에 추가.
            if (!visitedCell.has(i)) visitedCell.set(i, new Map());
            visitedCell.get(i).set(j + 1, true);

            right = aug(i, j + 1, word, nextCharIndex + 1, visitedCell);
            if (right) {
                return true;
            }
        }

        console.log("현재 위치:", i, j, "현재 문자:", word[nextCharIndex - 1], "visited: 마지막 ", visitedCell);

        // 내 방위의 결과가 모두 false면, 이전 단계로 후퇴(backtracking)하여 이전 문자를 탐색한다. 즉, 추가했던 '현재 칸 방문 기록'을 지우고, '직전 방문 기록'을 표적삼아 직전 칸으로 돌아간다.
        console.log('후퇴!');
        visitedCell.get(i).delete(j);
        // 3. 
        return false;
    }

    // (필요 없어짐)보조 재귀함수2: 현재 board 위치와 현재 문자 위치 charIndex를 받아 현재 board의 문자가 현재 문자와 일치하는지 반환 (i=row, j=col, charIndex=현재 문자의 인덱스 번호)
    function aug2(i: number, j: number, word: string, charIndex: number, visitedCell: any): boolean {
        console.log("visited: ", visitedCell);

        // 0. 탈출 조건(base condition): 주어진 '현재 문자'가 공백(=마지막 이후 문자)이면 true를 반환한다. 
        if (charIndex >= word.length) return true;

        const char = word[charIndex];

        // 1. 상하좌우에 '다음 문자'가 존재하면 재귀 호출한다.
        let up, down, left, right;
        //  상: 윗칸이 존재하고 그 칸이 '다음 문자'라면
        //      그리고 이전에 방문한 칸이 아니라면
        if (board[i - 1]?.[j] === char &&
            !(visitedCell.has(i - 1) && visitedCell.get(i - 1).has(j))) {
                console.log(`현재: ${board[i][j]}, 다음 찾는 문자: 위쪽에서 ${char}찾음`)
            // 윗칸과 그 다음 문자를 두고 재귀호출하고
            up = aug2(i - 1, j, word, charIndex + 1, visitedCell);
            // 그 결과가 true면 곧바로 true를 반환한다. 
            if (up) {
                if (!visitedCell.has(i - 1)) visitedCell.set(i - 1, new Map());
                visitedCell.get(i - 1).set(j, true);
                // visitedCell.set(visitedCell.get(i) ?? )
                return true;
            }
        }
        //  하: 아래칸이 존재하고 그 칸이 '다음 문자'라면
        if (board[i + 1]?.[j] === char &&
            !(visitedCell.has(i + 1) && visitedCell.get(i+ 1).has(j))) {
                console.log(`현재: ${board[i][j]}, 다음 찾는 문자: 아래에서 ${char}찾음`)
            down = aug2(i + 1, j, word, charIndex + 1, visitedCell);
            if (down) {
                if (!visitedCell.has(i + 1)) visitedCell.set(i + 1, new Map());
                visitedCell.get(i + 1).set(j, true);
                return true;
            }
        }

        //  좌: 
        if (board[i]?.[j - 1] === char &&
            !(visitedCell.has(i) && visitedCell.get(i).has(j - 1))) {
                console.log(`현재: ${board[i][j]}, 다음 찾는 문자: 왼쪽에서 ${char}찾음`)
            left = aug2(i, j - 1, word, charIndex + 1, visitedCell);
            if (left) {
                if (!visitedCell.has(i)) visitedCell.set(i, new Map());
                visitedCell.get(i).set(j - 1, true);
                return true;
            }
        }
        //  우: 
        if (board[i]?.[j + 1] === char &&
            !(visitedCell.has(i) && visitedCell.get(i).has(j + 1))) {
                console.log(`현재: ${board[i][j]}, 다음 찾는 문자: 오른쪽에서 ${char}찾음`)
            right = aug2(i, j + 1, word, charIndex + 1, visitedCell);
            if (right) {
                if (!visitedCell.has(i)) visitedCell.set(i, new Map());
                console.log('i에 해당하는 항목 만들고 나서: ', visitedCell);
                visitedCell.get(i).set(j + 1, true);
                return true;
            }
        }

        // 3. 
        return false;
    }
    
    return result;
};

// findWords2를 리팩토링한 버전: 주석을 더 깔끔하게 달고,
// Time complexity: O(mnN * 3^M) (N:단어 수, M:전체 단어의 평균 글자 수, m*n:Board의 전체 칸 수)
function findWords3(board: string[][], words: string[]): string[] {
    const result: string[] = [];

    // 각 단어를 순회하며 첫 문자에 해당하는 칸을 찾는다.
    wordSeach: for (let word of words) { // N
        for (let i = 0; i < board.length; i++) { // 최대 m*n
            for (let j = 0; j < board[0].length; j++) {
                if (board[i][j] === word[0]) {
                    // 첫 문자에 해당하는 칸을 찾았으면 그 칸에서 시작해서 이어지는 문자들을 탐색한다. 
                    if (aug(i, j, word, 1, new Map().set(`${i}-${j}`, true), board)) {
                        // 완성된 단어를 찾았으면 result 배열에 단어를 넣고, 곧바로 다음 단어로 넘어간다. 
                        result.push(word);
                        continue wordSeach;
                    }
                }
            }
        }
    }

    

    return result;
}
//* 보조 재귀함수: board에서 현재 위치(i=행, j=열)와 현재 검사중인 단어(word), 단어 중 현재 칸의 상하좌우를 매칭시켜볼 다음 문자를 가리키는 인덱스 번호(nextCharIndex)를 받아
//*      현재 칸의 상하좌우 칸에 대하여 다음 문자가 매칭되는지 검사하여 true/false를 반환한다. 
//*      방문한 적이 있는 칸을 또다시 방문하지 않도록 저장해둔다(visitedCell)
function aug(i: number, j: number, word: string, nextCharIndex: number, visitedCell: Map<string, boolean>, board: string[][]): boolean { // M(=한 단어의 길이)-1
    // 0. 탈출 조건(base condition): 주어진 '다음 문자'가 공백(=마지막 이후 문자)이면 true를 반환한다. 
    if (nextCharIndex >= word.length) return true; 

    const nextChar = word[nextCharIndex]; 

    // 1. 상하좌우에 '다음 문자'가 존재하면 재귀 호출한다.
    let up, down, left, right;
    //  상: 윗칸이 존재하고 그 칸이 '다음 문자'라면
    //      그리고 이전에 방문한 칸이 아니라면
    if (board[i - 1]?.[j] === nextChar &&
        !(visitedCell.has(`${i - 1}-${j}`))) {

        // 현재 칸의 윗칸을 방문 기록에 추가.
        visitedCell.set(`${i - 1}-${j}`, true);

        // 윗칸과 그 다음 문자를 두고 재귀호출하고
        up = aug(i - 1, j, word, nextCharIndex + 1, visitedCell, board);
        // 그 결과가 true면 곧바로 true를 반환한다. 
        if (up) return true;
    }
    //  하: 아래칸이 존재하고 그 칸이 '다음 문자'라면
    if (board[i + 1]?.[j] === nextChar &&
        !(visitedCell.has(`${i + 1}-${j}`))) {

        // 현재 칸의 아래 칸을 방문 기록에 추가
        visitedCell.set(`${i + 1}-${j}`, true);

        down = aug(i + 1, j, word, nextCharIndex + 1, visitedCell, board);
        if (down) return true;
    }

    //  좌: 
    if (board[i]?.[j - 1] === nextChar &&
        !(visitedCell.has(`${i}-${j - 1}`))) {

        // 일단 현재 칸의 '좌'에 대해서는 확실하니까 '방문 기록'에 넣어준다.
        visitedCell.set(`${i}-${j - 1}`, true);

        // 다음 탐색 속행
        left = aug(i, j - 1, word, nextCharIndex + 1, visitedCell, board);
        if (left) return true;
    }
    //  우: 
    if (board[i]?.[j + 1] === nextChar &&
        !(visitedCell.has(`${i}-${j + 1}`))) {

        // 현재 칸의 오른칸을 방문 기록에 추가.
        visitedCell.set(`${i}-${j + 1}`, true);

        right = aug(i, j + 1, word, nextCharIndex + 1, visitedCell, board);
        if (right) return true;
    }

    // 내 방위의 결과가 모두 false면, 이전 단계로 후퇴(backtracking)하여 이전 문자를 탐색한다. 즉, 추가했던 '현재 칸 방문 기록'을 지운다. 
    visitedCell.delete(`${i}-${j}`);

    // 3. 
    return false;
}

// 시도4: Trie 자료구조를 이용하여 속도를 더 빠르게
function findWords4(board: string[][], words: string[]): string[] {
    const result: string[] = [];
    const trie: Trie = new Trie(board);
    trie.initialize();

    for (let word of words) {
        if (trie.search(word)) result.push(word);
    }

    return result;
}

// 변형 Trie(로직은 성공 -> 시간 초과 실패)
// 기존: 완성된 한 단어를 저장하고 와일드카드(.)가 포함된 단어를 검색한다.
// 변경: 생성자가 이차원 배열 Board를 받고 초기화 시 곧바로 해당 Board의 각 칸에 대하여 addWord를 호출하여 '가능한 모든 루트'를 스스로 기록한다.  => addWord 메소드에서 new Trie(board)를 또 호출해야 하기 떄문에, 생성과 동시에 addWord를 실행하도록 하면 재귀 제곱이 되고 만다. 각 칸에 대한 addWord를 따로 실행시키는 메소드를 만들어 Trie 인스턴스를 만든 외부에서 호출하도록 하고, 생성자 안에서는 addWord를 호출하게 두면 안되겠다.  
class Trie {
    #child: { [key: string]: Trie }
    #board: string[][]
    #boardHeight: number
    #boardWidth: number
    constructor(board: string[][]) {
        this.#child = {};
        this.#board = board;
        this.#boardHeight = board.length;
        this.#boardWidth = board[0].length;
    }

    // Trie를 프린트
    print() {
        return this.#print(this);
    }

    #print(currentChild: Trie): string {
        const keys: string[] = Object.keys(currentChild.#child);
        if (keys.length === 0) return '{}';

        const childStrings: string[] = keys.map((charKey) => {
            const childString = this.#print(currentChild.#child[charKey]);
            return `${charKey}: ${childString}`
        });

        return `{ ${childStrings.join(', ')} }`;
    }

    // Trie 인스턴스를 만드는 외부에서 호출하도록 하기 위해 생성자에서 분리한 메소드
    initialize() {
        for (let i = 0; i < this.#boardHeight; i++) {
            for (let j = 0; j < this.#boardWidth; j++) {
                this.#addWord(i, j, new Map());
            }
        }
    }

    // 기존: 주어진 단어를 저장
    // 변경: Board에서 한 칸을 받아 거기서 파생되는 모든 루트를 저장.isWord가 있을 필요 없다. 재귀호출이 필요하다. 현재 칸에서 상하좌우에 접근해야 하므로 원본 board가 필요하다. 
    #addWord(i:number, j: number, visitedCell: Map<string, boolean>): void {
        let curr: Trie = this;
        // 0. 탈출조건(Base condition): 지금 칸이 board 경계 바깥일 때 + 지금 칸이 이미 지나온 칸일 때 => 지금 루트를 그냥 종료한다(=아무것도 하지 않는다).
        if (i < 0 || i >= this.#boardHeight ||
            j < 0 || j >= this.#boardWidth ||
            visitedCell.has(`${i}-${j}`)
        ) {
            // console.log(`현재 (${i},${j}), 탈출 조건에 들어오다`);
            return;
            // return false;
        }
        // 1. 지금 칸의 문자를 Trie에 등록
        const char = this.#board[i][j];
        // 1-1. 현재 노드에 등록하고 
        curr.#child[char] ??= new Trie(this.#board);
        // 1-2. 노드 포인터 옮김
        curr = curr.#child[char];

        // 2. 지금 칸을 지나온 칸에 등록
        visitedCell.set(`${i}-${j}`, true);
        
        // 3. 상하좌우 칸에 대하여 재귀호출. 다음 문자에 대하여 호출하는 것이므로 칸과 마찬가지로 문자 자리를 뜻하는 노드도 다음 노드가 되어야 하는 게 맞다. 즉, 아까 옮긴 노드 포인터 curr에 대해 호출하는 게 맞다. 
        // const up = curr.#addWord(i - 1, j, visitedCell); // 상
        // const down = curr.#addWord(i + 1, j, visitedCell); // 하
        // const left = curr.#addWord(i, j - 1, visitedCell); // 좌
        // const right = curr.#addWord(i, j + 1, visitedCell); // 우
        curr.#addWord(i - 1, j, visitedCell); // 상
        curr.#addWord(i + 1, j, visitedCell); // 하
        curr.#addWord(i, j - 1, visitedCell); // 좌
        curr.#addWord(i, j + 1, visitedCell); // 우

        // 4. 상하좌우 모두 막히면 이전 칸으로 후퇴해서 다른 가능성을 알아본다(Back-tracking). 
        visitedCell.delete(`${i}-${j}`);
        // if (!(up || down || left || right)) {
        //     visitedCell.delete(`${i}-${j}`);
        // }
    }

    // 기존: 와일드카드(.)가 포함된 단어를 검색하여 유무를 반환
    // 변경: 한 단어를 받아 단어의 끝까지 Trie내의 루트를 따라갈 수 있으면 true 반환. isWord를 체크할 필요 없다. 
    search(word: string): boolean {
        let curr: Trie = this;
        for (let char of word) {
            if (!curr.#child[char]) return false;
            curr = curr.#child[char];
        }

        return true;
    }
}

// // 시도5: Trie 자료구조를 다르게 활용:
// function findWords5(board: string[][], words: string[]): string[] {
//     return [];
// }

// class Trie2 {

// }

export default {
    solution: findWords3,
}


// =======================================================
// 성공
class Trie2 {
    nodes = {} as {[index: string]: Trie2};
    word = '';
    wordCount = 0;

    addWord(word: string) {
		let trie = this as Trie2;
        for(const c of word) {
           if(!trie.nodes[c]) {
               trie.nodes[c] = new Trie2();
           } 
           trie = trie.nodes[c];
        }
        trie.word = word;
        trie.wordCount++;
    }
}

function findWord(board: Array<Array<string>>, i: number, j: number,
                   width: number, height: number, node: Trie2, words: Array<string>) {
	const c = board[j][i];
	if(c === '$' || !node.nodes[c]) {
		return
	}

	if(node.nodes[c].wordCount > 0) {
        if(words.indexOf(node.nodes[c].word) === -1) {
	        words.push(node.nodes[c].word);
        }
	}

	board[j][i] = '$';
	if(i+1 < width) {
		findWord(board, i+1, j, width, height, node.nodes[c], words);
	}
	if(j+1 < height) {
		findWord(board, i, j+1, width, height, node.nodes[c], words);
	}
	if(i > 0) {
		findWord(board, i-1, j, width, height, node.nodes[c], words);
	}
	if(j > 0) {
		findWord(board, i, j-1, width, height, node.nodes[c], words);
	}
	board[j][i] = c;
}

function findWords(board: string[][], words: string[]): string[] {
    const root = new Trie2();
    for(const word of words) {
        root.addWord(word);
    }
    let found = new Array<string>();
    const height = board.length;
    const width = board[0].length;
    for(let j = 0; j < height; j++) {
    	for(let i = 0; i < width; i++) {
		    findWord(board, i, j, width, height, root, found);
	    }
    }
    
    return found;
};

// =======================================================
// 가장 빠른 방법: 
class TrieNode {
    links: Map<string, TrieNode>;
    word: string;
    end: boolean;

    constructor () {
        this.links = new Map();
        this.word = null;
        this.end = false;
    }
}



function findWords(board: string[][], words: string[]): string[] {

    let answer: string[] = [];
    let row = board.length;
    let col = board[0].length;
    let root = new TrieNode();
    
    
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        let cur = root;
        for (let j = 0; j < word.length; j++) {
            let ch = word[j];
            if (!cur.links.has(ch)) {
                let newNode = new TrieNode();
                cur.links.set(ch, newNode);
                cur = newNode;
            } else {
                cur = cur.links.get(ch);
            }
        }
        cur.word = word;
        cur.end = true;
    }
    
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (root.links.has(board[i][j])) {
                backTrack(root, i, j );
            }
        }
    }
    
    return answer;    
    
    function backTrack (node: TrieNode, i: number, j: number): void {                
        let letter = board[i][j];
        let curNode = node.links.get(letter);
        
        if (curNode.end) {
            answer.push(curNode.word);
            curNode.end = false;
        }
        
        let ch = board[i][j];
        board[i][j] = "#";
        
        if (i+1 < row && curNode.links.has(board[i+1][j])) {
            backTrack(curNode, i+1, j);
        }
        
        if (i-1 >= 0 && curNode.links.has(board[i-1][j])) {
            backTrack(curNode, i-1, j);
        }
    
        if (j+1 < col && curNode.links.has(board[i][j+1])) {
            backTrack(curNode, i, j+1);
        }
    
        if (j-1 >= 0 && curNode.links.has(board[i][j-1])) {
            backTrack(curNode, i, j-1);
        }
    
        board[i][j] = ch;
    
        if (curNode.links.size === 0) {
            node.links.delete(letter);
        }
    }

};