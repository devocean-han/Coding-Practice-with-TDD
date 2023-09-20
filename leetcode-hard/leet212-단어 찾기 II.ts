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
function findWords(board: string[][], words: string[]): string[] {

    const result: string[] = [];
    // 단어별 방문한 cell을 기록할 노트: 
    // => Map{ i: Map{ j, j,..} }식으로 저장하고,
    //    if (visitedCell.has(i) && visitedCell.get(i).has(j)) 같이 검사할 것임. 
    // const visitedCell = new Map();
    for (let word of words) {
        if (aug(0, 0, word, 1, new Map())) result.push(word);
    }

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
    
    return result;
};



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
    for (let word of words) {
        // const visitedCell = new Map();
        if (aug(0, 0, word, 1, new Map())) result.push(word);
    }

    // 보조 재귀함수 (i=row, j=col, nextChar=다음 문자의 인덱스 번호)
    function aug(i: number, j: number, word: string, nextCharIndex: number, visitedCell: any): boolean {
        // 0. 탈출 조건(base condition): 주어진 '다음 문자'가 공백(=마지막 이후 문자)이면 true를 반환한다. 
        if (nextCharIndex >= word.length) return true;

        const nextChar = word[nextCharIndex];

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

        // 3. 
        return false;
    }
    
    return result;
};

export default {
    solution: findWords2,
}
