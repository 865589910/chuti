// 生成随机数
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 数字转汉字函数（全局使用）
function numberToChinese(num) {
    const chineseNumbers = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    return chineseNumbers[num];
}

// 题型配置
const TOPICS = {
    basic: {
        name: "基础算式理解",
        icon: "📝"
    },
    multiplication: {
        name: "乘法口诀",
        icon: "🔢"
    },
    carry: {
        name: "进位退位分析",
        icon: "➕"
    },
    mistake: {
        name: "看错题分析",
        icon: "🔍"
    },
    drawing: {
        name: "画线题",
        icon: "📏"
    },
    shopping: {
        name: "购物问题",
        icon: "💰"
    },
    direction: {
        name: "方向识别",
        icon: "🧭"
    },
    mental: {
        name: "口算练习",
        icon: "🧠"
    }
};

// 当前选中的题型
let currentTopic = 'basic';

// 存储各题型的数量
const questionCounts = {
    basic: 0,
    multiplication: 0,
    carry: 0,
    mistake: 0,
    drawing: 0,
    shopping: 0,
    direction: 0,
    mental: 0,  // 口算练习
    vertical: 0  // 竖式练习
};

// 答案显示状态
let showAnswers = false;

// 切换题型数量
function toggleQuestionType(type) {
    questionCounts[type]++;
    document.getElementById(`${type}-count`).textContent = questionCounts[type];
}

// 切换详解显示
function toggleExplanation() {
    const btn = document.getElementById('toggleExplanationBtn');
    const questions = document.querySelectorAll('.question-item');
    
    // 检查是否已经生成了题目
    if (questions.length === 0) {
        alert('请先生成题目再显示详解！');
        return;
    }
    
    // 切换详解显示状态
    const explanationVisible = btn.innerHTML.includes('隐藏详解');
    
    if (explanationVisible) {
        // 隐藏详解
        btn.innerHTML = '📖 显示详解';
        hideAllExplanations();
    } else {
        // 显示详解
        btn.innerHTML = '📖 隐藏详解';
        showAllExplanations();
    }
}

// 显示所有详解
function showAllExplanations() {
    const questions = document.querySelectorAll('.question-item');
    questions.forEach((question, index) => {
        const explanationDiv = question.querySelector('.explanation');
        if (explanationDiv) {
            explanationDiv.style.display = 'block';
        } else {
            createExplanation(question, index + 1);
        }
    });
}

// 隐藏所有详解
function hideAllExplanations() {
    const explanations = document.querySelectorAll('.explanation');
    explanations.forEach(explanation => {
        explanation.style.display = 'none';
    });
}

// 创建详解内容
function createExplanation(questionElement, questionNumber) {
    // 获取题目类型和答案
    const questionText = questionElement.querySelector('.question-text').innerHTML;
    
    // 创建详解容器
    const explanationDiv = document.createElement('div');
    explanationDiv.className = 'explanation';
    explanationDiv.style.cssText = `
        margin-top: 15px;
        padding: 15px;
        background-color: #f8f9fa;
        border-left: 4px solid #667eea;
        border-radius: 4px;
        font-size: 16px;
        display: block;
    `;
    
    // 生成详解内容（根据题目类型）
    const explanationContent = generateExplanationContent(questionText, questionNumber);
    explanationDiv.innerHTML = `
        <div style="font-weight: bold; color: #333; margin-bottom: 10px;">💡 详解：</div>
        <div style="color: #555; line-height: 1.6;">${explanationContent}</div>
    `;
    
    // 添加到题目后面
    questionElement.appendChild(explanationDiv);
}

// 生成详解内容
function generateExplanationContent(questionText, questionNumber) {
    // 根据题目内容生成相应的详解
    if (questionText.includes('加数是') || questionText.includes('被减数是') || questionText.includes('乘数是')) {
        // 基础算式理解题
        return `这是一道基础算式理解题。需要识别算式中各部分的名称：<br>
        • 加法算式中，相加的两个数叫做加数，相加的结果叫做和<br>
        • 减法算式中，第一个数叫做被减数，第二个数叫做减数，相减的结果叫做差<br>
        • 乘法算式中，相乘的两个数叫做乘数，相乘的结果叫做积`;
    } else if (questionText.includes('乘法口诀')) {
        // 乘法口诀题
        return `这是一道乘法口诀题。需要熟练掌握乘法口诀表：<br>
        • 熟记1-9的乘法口诀<br>
        • 注意口诀的顺序，小数在前大数在后<br>
        • 理解口诀与算式之间的对应关系`;
    } else if (questionText.includes('进位') || questionText.includes('退位')) {
        // 进位退位分析题
        return `这是一道进位退位分析题。需要理解加法进位和减法退位的规律：<br>
        • 加法中，个位相加满十需要向十位进一<br>
        • 减法中，个位不够减需要向十位借一<br>
        • 仔细观察题目给出的条件进行分析`;
    } else if (questionText.includes('看错')) {
        // 看错题分析
        return `这是一道看错题分析题。需要仔细审题并找出错误：<br>
        • 对比题目描述和实际计算过程<br>
        • 找出看错的地方（符号、数字等）<br>
        • 根据正确信息重新计算得出答案`;
    } else if (questionText.includes('画一条') || questionText.includes('先画一条')) {
        // 画线题
        return `这是一道画线题。需要根据题目要求画出指定长度的线段：<br>
        • 使用直尺准确测量和画线<br>
        • 注意线段的起点和终点<br>
        • 按照题目要求的长度和相对关系作图`;
    } else if (questionText.includes('的价格是') || questionText.includes('一共')) {
        // 购物问题
        return `这是一道购物问题。需要结合实际生活场景进行计算：<br>
        • 仔细阅读题目中的价格信息<br>
        • 根据问题选择合适的计算方法<br>
        • 注意单位的使用和计算的准确性`;
    } else if (questionText.includes('九宫格') || questionText.includes('站在') || questionText.includes('面向')) {
        // 方向识别
        return `这是一道方向识别题。需要根据方位图判断相对位置：<br>
        • 熟悉基本方向（东、南、西、北）<br>
        • 理解相对位置关系<br>
        • 根据题目描述准确判断方向`;
    } else if (questionText.includes(' + ') || questionText.includes(' - ') || questionText.includes(' × ')) {
        // 口算练习
        return `这是一道口算练习题。需要快速准确地进行心算：<br>
        • 加法：注意进位<br>
        • 减法：注意退位<br>
        • 乘法：熟练掌握乘法口诀`;
    } else {
        // 默认详解
        return `请仔细阅读题目，理解题意后进行解答。注意计算过程和单位的使用。`;
    }
}

// 重置题型选择
function resetQuestionTypes() {
    for (let type in questionCounts) {
        questionCounts[type] = 0;
        document.getElementById(`${type}-count`).textContent = '0';
    }
}

// 切换答案显示
function toggleAnswers() {
    showAnswers = !showAnswers;
    const btn = document.getElementById('toggleAnswersBtn');
    
    if (showAnswers) {
        btn.innerHTML = '👁️ 隐藏答案';
        showAllAnswers();
    } else {
        btn.innerHTML = '👁️ 显示答案';
        hideAllAnswers();
    }
}

// 显示所有答案
function showAllAnswers() {
    const blanks = document.querySelectorAll('.blank');
    blanks.forEach(blank => {
        const answer = blank.getAttribute('data-answer');
        if (answer) {
            blank.textContent = answer;
        }
    });
}

// 隐藏所有答案
function hideAllAnswers() {
    const blanks = document.querySelectorAll('.blank');
    blanks.forEach(blank => {
        blank.textContent = '';
    });
}

// 生成加法题目
function generateAddition() {
    // 确保加数、和都不超过100
    let a = random(10, 90); // 第一个加数是两位数
    let b = random(10, 100 - a); // 第二个加数也是两位数，且和不超过100
    const answer = a + b;
    return {
        type: 'basic',
        text: `${a} + ${b} = <span class="blank" data-answer="${answer}" style="width: 80px;"></span>，这个算式读作<span class="blank" data-answer="${a}加${b}等于${answer}" style="width: 150px;"></span>，加数是<span class="blank" data-answer="${a}" style="width: 50px;"></span>和<span class="blank" data-answer="${b}" style="width: 50px;"></span>，和是<span class="blank" data-answer="${answer}" style="width: 50px;"></span>。`,
        answers: [answer, `${a}加${b}等于${answer}`, a, b, answer]
    };
}

// 生成减法题目
function generateSubtraction() {
    // 确保被减数、减数、差都不超过100
    let a = random(20, 100); // 被减数是两位数，不超过100
    let b = random(10, Math.min(a, 100)); // 减数也是两位数，且不超过被减数和100
    const answer = a - b;
    return {
        type: 'basic',
        text: `${a} - ${b} = <span class="blank" data-answer="${answer}" style="width: 80px;"></span>，这个算式读作<span class="blank" data-answer="${a}减${b}等于${answer}" style="width: 150px;"></span>，被减数是<span class="blank" data-answer="${a}" style="width: 50px;"></span>，减数是<span class="blank" data-answer="${b}" style="width: 50px;"></span>，差是<span class="blank" data-answer="${answer}" style="width: 50px;"></span>。`,
        answers: [answer, `${a}减${b}等于${answer}`, a, b, answer]
    };
}

// 生成乘法题目
function generateMultiplication() {
    // 只生成乘法口诀相关的题目
    return generateMultiplicationFormula();
}

// 生成基础算式理解的乘法题
function generateMultiplicationBasic() {
    // 确保乘数不超过9
    let a = random(1, 9);
    let b = random(1, 9);
    const answer = a * b;
    return {
        type: 'basic',
        text: `${a} × ${b} = <span class="blank" data-answer="${answer}" style="width: 80px;"></span>，这个算式读作<span class="blank" data-answer="${a}乘${b}等于${answer}" style="width: 150px;"></span>，乘数是<span class="blank" data-answer="${a}" style="width: 50px;"></span>和<span class="blank" data-answer="${b}" style="width: 50px;"></span>，积是<span class="blank" data-answer="${answer}" style="width: 50px;"></span>。`,
        answers: [answer, `${a}乘${b}等于${answer}`, a, b, answer]
    };
}

// 生成乘法口诀题目
function generateMultiplicationWithBalancedTypes() {
    return generateMultiplicationFormula();
}

// 生成乘法口诀填空题
function generateMultiplicationFormula() {
    // 随机选择题型
    const type = random(1, 3);
    
    // 数字转汉字函数
    function numberToChinese(num) {
        const chineseNumbers = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
        return chineseNumbers[num];
    }
    
    // 获取乘法口诀名称
    function getMultiplicationName(a, b) {
        // 使用预定义的映射表
        const multiplicationMap = {
            '1,1': '一一得一', '1,2': '一二得二', '1,3': '一三得三', '1,4': '一四得四', '1,5': '一五得五', '1,6': '一六得六', '1,7': '一七得七', '1,8': '一八得八', '1,9': '一九得九',
            '2,2': '二二得四', '2,3': '二三得六', '2,4': '二四得八', '2,5': '二五一十', '2,6': '二六十二', '2,7': '二七十四', '2,8': '二八十六', '2,9': '二九十八',
            '3,3': '三三得九', '3,4': '三四十二', '3,5': '三五十五', '3,6': '三六十八', '3,7': '三七二十一', '3,8': '三八二十四', '3,9': '三九二十七',
            '4,4': '四四十六', '4,5': '四五二十', '4,6': '四六二十四', '4,7': '四七二十八', '4,8': '四八三十二', '4,9': '四九三十六',
            '5,5': '五五二十五', '5,6': '五六三十', '5,7': '五七三十五', '5,8': '五八四十', '5,9': '五九四十五',
            '6,6': '六六三十六', '6,7': '六七四十二', '6,8': '六八四十八', '6,9': '六九五十四',
            '7,7': '七七四十九', '7,8': '七八五十六', '7,9': '七九六十三',
            '8,8': '八八六十四', '8,9': '八九七十二',
            '9,9': '九九八十一'
        };
        // 确保小数在前大数在后
        if (a > b) {
            [a, b] = [b, a];
        }
        return multiplicationMap[`${a},${b}`] || '';
    }
    
    if (type === 1) {
        // 计算几乘几的乘法口诀是什么
        let a = random(1, 9);
        let b = random(1, 9);
        // 确保小数在前大数在后
        if (a > b) {
            [a, b] = [b, a];
        }
        const mName = getMultiplicationName(a, b);
        return {
            type: 'multiplication',
            text: `计算${a}×${b}的乘法口诀是（<span class="blank" data-answer="${mName}"></span>）`,
            answers: [mName]
        };
    } else if (type === 2) {
        // 根据口诀写算式
        let a = random(1, 9);
        let b = random(1, 9);
        // 确保小数在前大数在后
        if (a > b) {
            [a, b] = [b, a];
        }
        const mName = getMultiplicationName(a, b);
        return {
            type: 'multiplication',
            text: `${mName}可以用来计算乘法算式<span class="blank" data-answer="${a}×${b}=${a*b}" style="width: 150px;"></span>和<span class="blank" data-answer="${b}×${a}=${a*b}" style="width: 150px;"></span>`,
            answers: [`${a}×${b}=${a*b}`, `${b}×${a}=${a*b}`]
        };
    } else {
        // 直接填乘法口诀
        const subType = random(1, 4);
        if (subType === 1) {
            // 一个乘数已知，如（）八三十二或三（）二十四
            const examples = [
                {a: 4, b: 8}, {a: 2, b: 9}, {a: 2, b: 8}, 
                {a: 3, b: 9}, {a: 4, b: 9}, {a: 3, b: 8}
            ];
            const example = examples[random(0, examples.length - 1)];
            const missingPosition = random(0, 1); // 0表示缺少第一个数，1表示缺少第二个数
            const result = example.a * example.b;
            // 将得数转为汉字
            let resultChinese = '';
            if (result === 32) resultChinese = '三十二';
            else if (result === 18) resultChinese = '十八';
            else if (result === 16) resultChinese = '十六';
            else if (result === 27) resultChinese = '二十七';
            else if (result === 36) resultChinese = '三十六';
            else if (result === 24) resultChinese = '二十四';
            
            if (missingPosition === 0) {
                // 不知第一个数、（）八三十二
                return {
                    type: 'multiplication',
                    text: `（<span class="blank" data-answer="${numberToChinese(example.a)}"></span>）${numberToChinese(example.b)}${resultChinese}`,
                    answers: [numberToChinese(example.a)]
                };
            } else {
                // 不知第二个数、三（）二十四
                return {
                    type: 'multiplication',
                    text: `${numberToChinese(example.a)}（<span class="blank" data-answer="${numberToChinese(example.b)}"></span>）${resultChinese}`,
                    answers: [numberToChinese(example.b)]
                };
            }
        } else if (subType === 2) {
            // 一个乘数已知，如（）六十八
            const examples = [
                {a: 2, b: 9}, {a: 2, b: 8}, {a: 3, b: 9}, 
                {a: 4, b: 9}, {a: 3, b: 8}, {a: 4, b: 8}
            ];
            const example = examples[random(0, examples.length - 1)];
            const missingNum = example.a;
            const knownNum = example.b;
            const result = example.a * example.b;
            // 将得数转为汉字
            let resultChinese = '';
            if (result === 18) resultChinese = '十八';
            else if (result === 16) resultChinese = '十六';
            else if (result === 27) resultChinese = '二十七';
            else if (result === 36) resultChinese = '三十六';
            else if (result === 24) resultChinese = '二十四';
            else if (result === 32) resultChinese = '三十二';
            return {
                type: 'multiplication',
                text: `（<span class="blank" data-answer="${numberToChinese(missingNum)}"></span>）${numberToChinese(knownNum)}${resultChinese}`,
                answers: [numberToChinese(missingNum)]
            };
        } else if (subType === 3) {
            // 两个乘数都没有，如（）（）二十八
            const examples = [
                {a: 4, b: 7, result: 28}, {a: 3, b: 9, result: 27}, {a: 4, b: 9, result: 36}, 
                {a: 3, b: 8, result: 24}, {a: 4, b: 8, result: 32}, {a: 6, b: 6, result: 36}
            ];
            const example = examples[random(0, examples.length - 1)];
            const result = example.result;
            // 将汉字数字转为中文
            let resultChinese = '';
            if (result === 28) resultChinese = '二十八';
            else if (result === 27) resultChinese = '二十七';
            else if (result === 36) resultChinese = '三十六';
            else if (result === 24) resultChinese = '二十四';
            else if (result === 32) resultChinese = '三十二';
            return {
                type: 'multiplication',
                text: `（<span class="blank" data-answer="${numberToChinese(example.a)}"></span>）（<span class="blank" data-answer="${numberToChinese(example.b)}"></span>）${resultChinese}`,
                answers: [numberToChinese(example.a), numberToChinese(example.b)]
            };
        } else {
            // 填得数，如四九（）
            let a = random(1, 9);
            let b = random(1, 9);
            // 确保小数在前大数在后
            if (a > b) {
                [a, b] = [b, a];
            }
            const result = a * b;
            // 将得数转为汉字
            let resultChinese = '';
            if (result === 1) resultChinese = '一';
            else if (result === 2) resultChinese = '二';
            else if (result === 3) resultChinese = '三';
            else if (result === 4) resultChinese = '四';
            else if (result === 5) resultChinese = '五';
            else if (result === 6) resultChinese = '六';
            else if (result === 7) resultChinese = '七';
            else if (result === 8) resultChinese = '八';
            else if (result === 9) resultChinese = '九';
            else if (result === 10) resultChinese = '十';
            else if (result === 12) resultChinese = '十二';
            else if (result === 14) resultChinese = '十四';
            else if (result === 15) resultChinese = '十五';
            else if (result === 16) resultChinese = '十六';
            else if (result === 18) resultChinese = '十八';
            else if (result === 20) resultChinese = '二十';
            else if (result === 21) resultChinese = '二十一';
            else if (result === 24) resultChinese = '二十四';
            else if (result === 25) resultChinese = '二十五';
            else if (result === 27) resultChinese = '二十七';
            else if (result === 28) resultChinese = '二十八';
            else if (result === 30) resultChinese = '三十';
            else if (result === 32) resultChinese = '三十二';
            else if (result === 35) resultChinese = '三十五';
            else if (result === 36) resultChinese = '三十六';
            else if (result === 40) resultChinese = '四十';
            else if (result === 42) resultChinese = '四十二';
            else if (result === 45) resultChinese = '四十五';
            else if (result === 48) resultChinese = '四十八';
            else if (result === 49) resultChinese = '四十九';
            else if (result === 50) resultChinese = '五十';
            else if (result === 54) resultChinese = '五十四';
            else if (result === 56) resultChinese = '五十六';
            else if (result === 63) resultChinese = '六十三';
            else if (result === 64) resultChinese = '六十四';
            else if (result === 72) resultChinese = '七十二';
            else if (result === 81) resultChinese = '八十一';
            return {
                type: 'multiplication',
                text: `${numberToChinese(a)}${numberToChinese(b)}（<span class="blank" data-answer="${resultChinese}"></span>）`,
                answers: [resultChinese]
            };
        }
    }
}

// 生成进退位分析题
function generateCarryBorrow() {
    let isAddition = random(0, 1) === 1;
    
    if (isAddition) {
        // 加法：68+2□，个位8+□，十位6+2=8
        // 如果个位8+□<10，十位结果是8；如果个位8+□≥10，十位结果是9
        let tensDigit1 = random(3, 8); // 第一个数的十位
        let tensDigit2 = random(1, 9); // 第二个数的十位（确保是两位数，不为0）
        let unitsDigit1 = random(1, 9); // 第一个数的个位
        
        let num1 = tensDigit1 * 10 + unitsDigit1;
        let num2_tens = tensDigit2 * 10;
        
        // 根据是否进位来决定十位结果
        let needCarry = random(0, 1) === 1; // 随机决定是否进位
        let tenSum = tensDigit1 + tensDigit2;
        let targetTensResult = needCarry ? (tenSum + 1) : tenSum;
        
        // 如果进位，8+□≥10，□≥2，可填2-9，共8个
        // 如果不进位，8+□<10，□≤1，可填0-1，共2个
        let validNumbers = needCarry ? [2,3,4,5,6,7,8,9] : [0,1];
        
        return {
            type: 'carry',
            text: `${num1} + ${tensDigit2}<span style="display:inline-block;width:30px;height:24px;border:1px solid #000;text-align:center;line-height:24px;"></span>，已知得数的十位是 ${targetTensResult}，故<span style="display:inline-block;width:30px;height:24px;border:1px solid #000;text-align:center;line-height:24px;"></span>可以填 <span class="blank" data-answer="${validNumbers.length}"></span> 个数。`,
            answers: [validNumbers.length.toString()]
        };
    } else {
        // 减法：71-4□，个位1-□，十位7-4=3
        // 如果个位1-□≥0，十位结果是3；如果个位1-□<0，十位结果是2（需要退位）
        let num1 = random(20, 100);
        let tensDigit2 = random(1, Math.floor(num1 / 10) - 1); // 确保十位不为0，且小于被减数的十位
        let unitsDigit1 = num1 % 10;
        
        let num2_tens = tensDigit2 * 10;
        
        // 根据是否退位来决定十位结果
        let needBorrow = random(0, 1) === 1; // 随机决定是否退位
        let tenDiff = Math.floor(num1 / 10) - tensDigit2;
        let targetTensResult = needBorrow ? (tenDiff - 1) : tenDiff;
        
        // 如果需要退位，unitsDigit1-□<0，□>unitsDigit1，可填数字个数为9-unitsDigit1
        // 如果不需要退位，unitsDigit1-□≥0，□≤unitsDigit1，可填数字个数为unitsDigit1+1
        let validCount = needBorrow ? (9 - unitsDigit1) : (unitsDigit1 + 1);
        
        return {
            type: 'carry',
            text: `${num1} - ${tensDigit2}<span style="display:inline-block;width:30px;height:24px;border:1px solid #000;text-align:center;line-height:24px;"></span>，已知得数的十位是 ${targetTensResult}，故<span style="display:inline-block;width:30px;height:24px;border:1px solid #000;text-align:center;line-height:24px;"></span>可以填 <span class="blank" data-answer="${validCount}"></span> 个数。`,
            answers: [validCount.toString()]
        };
    }
}

// 生成看错题分析
function generateMistake() {
    let mistakeType = random(1, 2); // 随机选择题型
    
    if (mistakeType === 1) {
        // 第一种：看错了运算符号
        let isAddition = random(0, 1) === 1;
        
        if (isAddition) {
            // 正确是加法，看成减法
            let b = random(10, 40);
            let a = random(b, 100 - b);
            let wrongResult = a - b;
            let correctResult = a + b;
            
            return {
                type: 'mistake',
                text: `小明在计算一个数加${b}的时候，把加号看成了减号，算出的结果是${wrongResult}，正确的结果应该是<span class="blank" data-answer="${correctResult}"></span>。`,
                answers: [correctResult]
            };
        } else {
            // 正确是减法，看成加法
            let b = random(10, 40);
            let a = random(b, 100 - b);
            let wrongResult = a + b;
            let correctResult = a - b;
            
            return {
                type: 'mistake',
                text: `小明在计算一个数减${b}的时候，把减号看成了加号，算出的结果是${wrongResult}，正确的结果应该是<span class="blank" data-answer="${correctResult}"></span>。`,
                answers: [correctResult]
            };
        }
    } else {
        // 第二种：看错了十位上的数字
        let isAddition = random(0, 1) === 1;
        
        if (isAddition) {
            // 一个数加二十几，看错了十位数字
            // 正确的十位tensDigit1，看成的十位tensDigit2
            // 一个数是unitsDigit + tensDigit1*10
            let unitsDigit = random(0, 9);
            let tensDigit1 = random(1, 4); // 正确的十位（1-4）
            let tensDigit2 = random(tensDigit1 + 1, 7); // 看错的十位（比正确的大）
            
            let a = unitsDigit + tensDigit1 * 10;
            let wrongA = unitsDigit + tensDigit2 * 10;
            let wrongResult = wrongA + random(10, 40);
            let correctResult = a + random(10, 40);
            
            // 确保结果不超过100，如果超过则重新生成
            if (wrongResult > 100 || correctResult > 100) {
                return generateMistake();
            }
            
            let b = wrongResult - wrongA;
            return {
                type: 'mistake',
                text: `小明在计算一个数加${b}的时候，错把十位上的${tensDigit1}看成了${tensDigit2}，算出的结果是${wrongResult}，正确的结果应该是<span class="blank" data-answer="${correctResult}"></span>。`,
                answers: [correctResult]
            };
        } else {
            // 一个数减二十几或者五十几扩一个数
            let subType = random(0, 1);
            
            if (subType === 0) {
                // 一个数减二十几，看错了十位数字
                let unitsDigit = random(0, 9);
                let tensDigit1 = random(2, 4);
                let tensDigit2 = random(tensDigit1 + 1, 7);
                
                let a = unitsDigit + tensDigit1 * 10;
                let wrongA = unitsDigit + tensDigit2 * 10;
                let b = random(10, Math.min(40, a));
                let wrongResult = wrongA - b;
                let correctResult = a - b;
                
                if (wrongResult < 0 || correctResult < 0 || wrongResult > 100 || correctResult > 100) {
                    return generateMistake();
                }
                
                return {
                    type: 'mistake',
                    text: `小明在计算一个数减${b}的时候，错把十位上的${tensDigit1}看成了${tensDigit2}，算出的结果是${wrongResult}，正确的结果应该是<span class="blank" data-answer="${correctResult}"></span>。`,
                    answers: [correctResult]
                };
            } else {
                // 计算五十几减一个数，错把五看成了七
                let a = 50 + random(0, 9); // 正确的五十几
                let wrongA = 70 + random(0, 9); // 看错的七十几（使用相同的个位）
                let b = random(10, Math.min(40, a)); // 减数
                let wrongResult = wrongA - b;
                let correctResult = a - b;
                
                if (wrongResult < 0 || correctResult < 0 || wrongResult > 100 || correctResult > 100) {
                    return generateMistake();
                }
                
                return {
                    type: 'mistake',
                    text: `小明在计算五十几减一个数的时候，错把十位上的5看成了7，算出的结果是${wrongResult}，正确的结果应该是<span class="blank" data-answer="${correctResult}"></span>。`,
                    answers: [correctResult]
                };
            }
        }
    }
}

// 生成画线题
function generateDrawing() {
    let drawType = random(1, 3); // 随机选择画线题的类型
    let drawingArea = '<div style="margin-top: 10px; padding: 10px 0;"><div style="height: 100px;"></div></div>';
    
    if (drawType === 1) {
        // 第一种：画一条几厘米的线段
        let length1 = random(2, 15);
        return {
            type: 'drawing',
            text: `画一条长 ${length1} 厘米的线段。${drawingArea}`,
            answers: [length1]
        };
    } else if (drawType === 2) {
        // 第二种：画一条比几厘米长（短）几厘米的线段
        let baseLength = random(5, 12);
        let difference = random(1, 5);
        let isLonger = random(0, 1) === 1;
        let newLength = isLonger ? baseLength + difference : baseLength - difference;
        
        if (newLength < 2 || newLength > 15) {
            return generateDrawing();
        }
        
        let questionText = isLonger 
            ? `画一条比 ${baseLength} 厘米长 ${difference} 厘米的线段。` 
            : `画一条比 ${baseLength} 厘米短 ${difference} 厘米的线段。`;
        
        return {
            type: 'drawing',
            text: `${questionText}${drawingArea}`,
            answers: [newLength]
        };
    } else {
        // 第三种：先画一条几厘米的线段，再画一条比他长（短）几厘米的线段
        let length1 = random(2, 12);
        let difference = random(1, 5);
        let isLonger = random(0, 1) === 1;
        let length2 = isLonger ? length1 + difference : length1 - difference;
        
        if (length2 < 2 || length2 > 15) {
            return generateDrawing();
        }
        
        let questionText = isLonger
            ? `先画一条长 ${length1} 厘米的线段，再画一条比他长 ${difference} 厘米的线段。`
            : `先画一条长 ${length1} 厘米的线段，再画一条比他短 ${difference} 厘米的线段。`;
        
        return {
            type: 'drawing',
            text: `${questionText}${drawingArea}`,
            answers: [length2]
        };
    }
}

// 生成购物问题
function generateShopping() {
    // 定义物品类别（包含单位和价格范围）
    const categories = [
        {
            name: '玩具',
            items: [
                {name: '玩具车', unit: '个', minPrice: 15, maxPrice: 50},
                {name: '玩偶', unit: '个', minPrice: 20, maxPrice: 60},
                {name: '积木', unit: '盒', minPrice: 25, maxPrice: 70},
                {name: '拼图', unit: '盒', minPrice: 15, maxPrice: 40},
                {name: '遥控飞机', unit: '个', minPrice: 30, maxPrice: 80},
                {name: '陀螺', unit: '个', minPrice: 8, maxPrice: 25},
                {name: '弹珠', unit: '袋', minPrice: 5, maxPrice: 15}
            ]
        },
        {
            name: '文具',
            items: [
                {name: '铅笔', unit: '支', minPrice: 1, maxPrice: 5},
                {name: '橡皮', unit: '块', minPrice: 2, maxPrice: 8},
                {name: '尺子', unit: '把', minPrice: 3, maxPrice: 10},
                {name: '本子', unit: '本', minPrice: 4, maxPrice: 15},
                {name: '彩笔', unit: '盒', minPrice: 10, maxPrice: 30},
                {name: '胶水', unit: '瓶', minPrice: 3, maxPrice: 10},
                {name: '订书机', unit: '个', minPrice: 8, maxPrice: 25},
                {name: '卷笔刀', unit: '个', minPrice: 5, maxPrice: 15}
            ]
        },
        {
            name: '水果',
            items: [
                {name: '苹果', unit: '斤', minPrice: 5, maxPrice: 15},
                {name: '香蕉', unit: '斤', minPrice: 4, maxPrice: 12},
                {name: '梨', unit: '斤', minPrice: 4, maxPrice: 10},
                {name: '葡萄', unit: '斤', minPrice: 8, maxPrice: 20},
                {name: '李子', unit: '斤', minPrice: 6, maxPrice: 15},
                {name: '橙子', unit: '斤', minPrice: 5, maxPrice: 12},
                {name: '西瓜', unit: '斤', minPrice: 2, maxPrice: 8},
                {name: '桃子', unit: '斤', minPrice: 6, maxPrice: 18}
            ]
        }
    ];
    
    // 随机选择一个类别
    const category = categories[random(0, categories.length - 1)];
    
    // 从选定的类别中选择至少6种物品
    let selectedItems = [];
    let itemsData = [...category.items];
    
    // 确保至少有6种物品
    while (selectedItems.length < 6 && itemsData.length > 0) {
        const itemData = itemsData.splice(random(0, itemsData.length - 1), 1)[0];
        // 生成价格（在合理范围内）
        const price = random(itemData.minPrice, itemData.maxPrice);
        selectedItems.push({
            name: itemData.name,
            unit: itemData.unit,
            price: price
        });
    }
    
    // 随机选择两种物品作为未知价格（用问号表示）
    let unknownPriceIndices = [];
    if (selectedItems.length >= 2) {
        const item1Index = random(0, selectedItems.length - 1);
        let item2Index = random(0, selectedItems.length - 1);
        while (item2Index === item1Index) {
            item2Index = random(0, selectedItems.length - 1);
        }
        
        unknownPriceIndices.push(item1Index, item2Index);
        
        // 保存未知价格物品的真实价格（用于生成问题）
        selectedItems[item1Index].realPrice = selectedItems[item1Index].price;
        selectedItems[item2Index].realPrice = selectedItems[item2Index].price;
        
        // 将这两种物品的显示价格设为null表示未知
        selectedItems[item1Index].price = null;
        selectedItems[item2Index].price = null;
    }
    
    // 创建物品价格表的HTML
    let priceTableHTML = '<div style="margin: 20px 0; padding: 20px; background: #f8f9fa; border-radius: 10px; border: 2px solid #dee2e6;">';
    priceTableHTML += '<div style="font-size: 20px; font-weight: bold; margin-bottom: 15px; text-align: center;">' + category.name + '价格表</div>';
    priceTableHTML += '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">';
    
    for (let i = 0; i < selectedItems.length; i++) {
        const item = selectedItems[i];
        priceTableHTML += '<div style="text-align: center; padding: 10px; background: white; border-radius: 8px; border: 1px solid #ccc;">';
        
        // 物品图标（使用表情符号或方框代替）
        let icon = '📦';
        if (category.name === '水果') {
            const fruitIcons = {'苹果': '🍎', '香蕉': '🍌', '梨': '🍐', '葡萄': '🍇', '李子': '🫐', '橙子': '🍊', '西瓜': '🍉', '桃子': '🍑'};
            icon = fruitIcons[item.name] || '🍎';
        } else if (category.name === '文具') {
            const stationeryIcons = {'铅笔': '✏️', '橡皮': '🧼', '尺子': '📏', '本子': '📓', '彩笔': '🖍️', '胶水': '🧴', '订书机': '📎', '卷笔刀': '✂️'};
            icon = stationeryIcons[item.name] || '✏️';
        } else if (category.name === '玩具') {
            const toyIcons = {'玩具车': '🚗', '玩偶': '🧸', '积木': '🧱', '拼图': '🧩', '遥控飞机': '✈️', '悠悠球': '⚽', '陀螺': '🎯', '弹珠': '⚾'};
            icon = toyIcons[item.name] || '🧸';
        }
        
        priceTableHTML += '<div style="font-size: 40px; margin-bottom: 5px;">' + icon + '</div>';
        priceTableHTML += '<div style="font-size: 16px; font-weight: bold; margin-bottom: 5px;">' + item.name + '</div>';
        priceTableHTML += '<div style="font-size: 18px; color: #d9534f; font-weight: bold;">';
        if (item.price === null) {
            priceTableHTML += '？元/' + item.unit;
        } else {
            priceTableHTML += item.price + '元/' + item.unit;
        }
        priceTableHTML += '</div>';
        priceTableHTML += '</div>';
    }
    
    priceTableHTML += '</div>';
    priceTableHTML += '</div>';
    
    // 生成3-4个问题
    let questions = [];
    let answers = [];
    let questionCount = random(3, 4);
    let generatedQuestionTypes = []; // 记录已生成的问题类型，避免重复
    
    // 问题类型池（提高类型3的出现概率）
    let availableQuestionTypes = [1, 2, 3, 3, 3, 4]; // 类型3出现概率更高
    
    for (let q = 0; q < questionCount; q++) {
        // 如果可用的问题类型用完了，就停止生成
        if (availableQuestionTypes.length === 0) break;
        
        // 随机选择一个问题类型
        const typeIndex = random(0, availableQuestionTypes.length - 1);
        const questionType = availableQuestionTypes[typeIndex];
        
        let questionGenerated = false;
        
        if (questionType === 1) {
            // 类型1：比较问题（如"苹果比香蕉贵15元，苹果多少元？"）
            let unknownItem = null;
            let knownItem = null;
            
            for (let i = 0; i < selectedItems.length; i++) {
                const item = selectedItems[i];
                if (item.price === null && unknownItem === null) {
                    unknownItem = {...item, index: i};
                } else if (item.price !== null && knownItem === null) {
                    knownItem = {...item, index: i};
                }
                
                if (unknownItem !== null && knownItem !== null) break;
            }
            
            if (unknownItem !== null && knownItem !== null && unknownItem.realPrice && knownItem.price) {
                const difference = Math.abs(unknownItem.realPrice - knownItem.price);
                
                if (difference > 0 && difference <= 50) {
                    if (unknownItem.realPrice > knownItem.price) {
                        questions.push(`${unknownItem.name}比${knownItem.name}贵${difference}元，${unknownItem.name}多少元一${unknownItem.unit}？`);
                        answers.push(unknownItem.realPrice);
                        questionGenerated = true;
                    } else if (unknownItem.realPrice < knownItem.price) {
                        questions.push(`${unknownItem.name}比${knownItem.name}便宜${difference}元，${unknownItem.name}多少元一${unknownItem.unit}？`);
                        answers.push(unknownItem.realPrice);
                        questionGenerated = true;
                    }
                }
            }
        } else if (questionType === 2) {
            // 类型2：总价问题（如"买一支铅笔和一块橡皮一共几元钱？"）
            let knownItems = selectedItems.filter(item => item.price !== null);
            
            if (knownItems.length >= 2) {
                const item1 = knownItems[random(0, knownItems.length - 1)];
                let item2 = knownItems[random(0, knownItems.length - 1)];
                
                let attempts = 0;
                while (item2.name === item1.name && attempts < 10) {
                    item2 = knownItems[random(0, knownItems.length - 1)];
                    attempts++;
                }
                
                if (item2.name !== item1.name) {
                    const total = item1.price + item2.price;
                    if (total <= 100) {
                        questions.push(`买一${item1.unit}${item1.name}和一${item2.unit}${item2.name}一共多少元？`);
                        answers.push(total);
                        questionGenerated = true;
                    }
                }
            }
        } else if (questionType === 3) {
            // 类型3：付款问题（如"买2把尺子和2块橡皮，小明付了48元够吗？如果够应该找回多少元，如果不够还差几元？"）
            let knownItems = selectedItems.filter(item => item.price !== null);
            
            if (knownItems.length >= 2) {
                const item1 = knownItems[random(0, knownItems.length - 1)];
                let item2 = knownItems[random(0, knownItems.length - 1)];
                
                let attempts = 0;
                while (item2.name === item1.name && attempts < 10) {
                    item2 = knownItems[random(0, knownItems.length - 1)];
                    attempts++;
                }
                
                if (item2.name !== item1.name) {
                    const quantity1 = random(1, 3);
                    const quantity2 = random(1, 3);
                    const total = item1.price * quantity1 + item2.price * quantity2;
                    
                    // 确保乘法运算中价格和数量都不超过9
                    if (total <= 100 && item1.price <= 9 && item2.price <= 9 && quantity1 <= 9 && quantity2 <= 9) {
                        const paid = random(Math.max(20, total - 10), Math.min(100, total + 30));
                        
                        questions.push(`买${quantity1}${item1.unit}${item1.name}和${quantity2}${item2.unit}${item2.name}，小明付了${paid}元够吗？如果够应该找回多少元，如果不够还差几元？`);
                        
                        if (paid < total) {
                            const difference = total - paid;
                            answers.push(`不够，还差${difference}元`);
                        } else if (paid > total) {
                            const change = paid - total;
                            answers.push(`够，应找回${change}元`);
                        } else {
                            answers.push('刚好够');
                        }
                        questionGenerated = true;
                    }
                }
            }
        } else if (questionType === 4) {
            // 类型4：倍数问题（如"卷笔刀的价格是5元，有一种文具的价格是卷笔刀的2倍，这种文具是多少元？"）
            // 找到两个价格为问号的物品
            let unknownItems = selectedItems.filter(item => item.price === null && item.realPrice !== null);
            // 找到一个价格已知的物品作为基准
            let knownItems = selectedItems.filter(item => item.price !== null);
            
            if (unknownItems.length >= 1 && knownItems.length >= 1) {
                // 随机选择一个未知价格的物品作为答案
                const unknownItem = unknownItems[random(0, unknownItems.length - 1)];
                // 随机选择一个已知价格的物品作为基准
                const baseItem = knownItems[random(0, knownItems.length - 1)];
                
                // 计算倍数（未知物品 = 基准物品 × 倍数）
                if (unknownItem.realPrice % baseItem.price === 0) {
                    const multiplier = unknownItem.realPrice / baseItem.price;
                    
                    // 确保乘法运算中价格和乘数都不超过9，答案不超过100
                    if (multiplier >= 2 && multiplier <= 9 && baseItem.price <= 9 && unknownItem.realPrice <= 100) {
                        questions.push(`${baseItem.name}的价格是${baseItem.price}元，有一种${category.name}的价格是${baseItem.name}的${multiplier}倍，这种${category.name}是多少元？`);
                        answers.push(unknownItem.realPrice);
                        questionGenerated = true;
                    }
                } else {
                    // 如果不能整除，尝试找其他组合
                    for (let i = 0; i < unknownItems.length && !questionGenerated; i++) {
                        for (let j = 0; j < knownItems.length && !questionGenerated; j++) {
                            const testUnknown = unknownItems[i];
                            const testKnown = knownItems[j];
                            
                            if (testUnknown.realPrice % testKnown.price === 0) {
                                const multiplier = testUnknown.realPrice / testKnown.price;
                                
                                if (multiplier >= 2 && multiplier <= 9 && testKnown.price <= 9 && testUnknown.realPrice <= 100) {
                                    questions.push(`${testKnown.name}的价格是${testKnown.price}元，有一种${category.name}的价格是${testKnown.name}的${multiplier}倍，这种${category.name}是多少元？`);
                                    answers.push(testUnknown.realPrice);
                                    questionGenerated = true;
                                }
                            }
                        }
                    }
                }
            }
        }
        
        // 如果成功生成了问题，从可用类型中移除该类型
        if (questionGenerated) {
            availableQuestionTypes.splice(typeIndex, 1);
            generatedQuestionTypes.push(questionType);
        } else {
            // 如果没有成功生成，也从可用类型中移除该类型，避免重复尝试
            availableQuestionTypes.splice(typeIndex, 1);
            q--; // 重新尝试生成一个问题
        }
    }
    
    // 如果生成的问题不够，补充简单问题
    while (questions.length < 3) {
        let knownItems = selectedItems.filter(item => item.price !== null);
        if (knownItems.length >= 2) {
            const item1 = knownItems[random(0, knownItems.length - 1)];
            let item2 = knownItems[random(0, knownItems.length - 1)];
            
            let attempts = 0;
            while (item2.name === item1.name && attempts < 10) {
                item2 = knownItems[random(0, knownItems.length - 1)];
                attempts++;
            }
            
            if (item2.name !== item1.name) {
                const total = item1.price + item2.price;
                if (total <= 100) {
                    questions.push(`买一${item1.unit}${item1.name}和一${item2.unit}${item2.name}一共多少元？`);
                    answers.push(total);
                }
            }
        } else {
            break;
        }
    }
    
    // 组合所有问题（应用题格式，空出多行供学生作答）
    let questionsHTML = '<div style="margin-top: 20px;">';
    for (let i = 0; i < questions.length; i++) {
        questionsHTML += `<div style="margin-bottom: 100px; font-size: 20px; line-height: 1.8;">`;
        questionsHTML += `${i + 1}. ${questions[i]}`;
        // 不添加横线，留出空白供学生写算式和答案
        questionsHTML += `</div>`;
    }
    questionsHTML += '</div>';
    
    return {
        type: 'shopping',
        text: priceTableHTML + questionsHTML,
        answers: answers
    };
}

// 生成简单的购物问题（备用方案）
function generateSimpleShoppingProblem(items) {
    // 找到两个已知价格的物品
    let knownItems = items.filter(item => item.price !== null);
    
    if (knownItems.length >= 2) {
        const item1 = knownItems[random(0, knownItems.length - 1)];
        let item2 = knownItems[random(0, knownItems.length - 1)];
        
        while (item2.name === item1.name) {
            item2 = knownItems[random(0, knownItems.length - 1)];
        }
        
        const total = item1.price + item2.price;
        // 确保总价格不超过100
        if (total <= 100) {
            return {
                type: 'shopping',
                text: `买一斤${item1.name}和一斤${item2.name}一共 <span class="blank" data-answer="${total}"></span> 元。`,
                answers: [total]
            };
        }
    }
    
    // 如果还是不行，就生成一个最基本的问题
    return {
        type: 'shopping',
        text: '小明买了两种水果，一种5元，一种8元，一共需要 <span class="blank" data-answer="13"></span> 元。',
        answers: [13]
    };
}

// 生成方向识别题
function generateDirection() {
    let locations = ['图书馆', '学校', '小明家', '咖啡馆', '游乐园', '公园', '超市', '医院', '银行', '邮局', '餐厅', '书店', '电影院', '体育馆', '博物馆', '动物园', '植物园', '科技馆', '美术馆', '音乐厅', '剧院'];
    
    // 选择9个不同的位置
    let selectedLocations = [];
    while (selectedLocations.length < 9) {
        let loc = locations[random(0, locations.length - 1)];
        if (!selectedLocations.includes(loc)) {
            selectedLocations.push(loc);
        }
    }
    
    // 随机选择两个位置留空
    let emptyPositions = [];
    while (emptyPositions.length < 2) {
        let pos = random(0, 8);
        if (!emptyPositions.includes(pos)) {
            emptyPositions.push(pos);
        }
    }
    
    // 创建九宫格HTML，留出两个空位，放大尺寸
    let gridHTML = '<div style="display: inline-block; margin: 10px 0;">';
    gridHTML += '<table style="border-collapse: collapse; border: 2px solid #000;">';
    
    for (let row = 0; row < 3; row++) {
        gridHTML += '<tr>';
        for (let col = 0; col < 3; col++) {
            let idx = row * 3 + col;
            // 如果是空位则显示空白，否则显示位置名称
            if (emptyPositions.includes(idx)) {
                gridHTML += `<td style="width: 80px; height: 80px; border: 2px solid #000; text-align: center; vertical-align: middle; font-size: 16px; font-weight: bold;"></td>`;
            } else {
                gridHTML += `<td style="width: 80px; height: 80px; border: 2px solid #000; text-align: center; vertical-align: middle; font-size: 16px; font-weight: bold;">${selectedLocations[idx]}</td>`;
            }
        }
        gridHTML += '</tr>';
    }
    
    gridHTML += '</table></div>';
    
    // 生成四种类型的问题，前三种必须包含，第四种可选
    let questions = [];
    let answers = [];
    
    // 确保不会重复选择相同的位置对
    let usedPairs = [];
    
    // 问题1：哪里的哪个方向是哪里，根据相邻位置数量调整问题格式
    let question1Generated = false;
    let attempts = 0;
    while (!question1Generated && attempts < 25) {  // 增加尝试次数
        attempts++;
        let centerLocIdx = random(0, 8);
        // 确保这个位置不是空位
        if (emptyPositions.includes(centerLocIdx)) continue;
        
        let centerLoc = selectedLocations[centerLocIdx];
        
        // 随机选择一个方向（东、南、西、北）
        let direction = random(1, 4); // 1:东, 2:南, 3:西, 4:北
        let directionName = ['东', '南', '西', '北'][direction - 1];
        let pairKey = `${directionName}-${centerLoc}`;
        
        if (usedPairs.includes(pairKey)) continue;
        
        usedPairs.push(pairKey);
        
        // 找到指定方向的位置
        // 修改逻辑：查找整行或整列的所有非空位置
        let directionLocations = [];
        
        switch (direction) {
            case 1: // 东
                // 查找同一行的所有非空位置（在当前列的右边）
                let centerRow = Math.floor(centerLocIdx / 3);
                for (let col = (centerLocIdx % 3) + 1; col < 3; col++) {
                    let checkIdx = centerRow * 3 + col;
                    if (!emptyPositions.includes(checkIdx)) {
                        directionLocations.push(selectedLocations[checkIdx]);
                    }
                }
                break;
            case 2: // 南
                // 查找同一列的所有非空位置（在当前行的下面）
                let centerCol = centerLocIdx % 3;
                for (let row = Math.floor(centerLocIdx / 3) + 1; row < 3; row++) {
                    let checkIdx = row * 3 + centerCol;
                    if (!emptyPositions.includes(checkIdx)) {
                        directionLocations.push(selectedLocations[checkIdx]);
                    }
                }
                break;
            case 3: // 西
                // 查找同一行的所有非空位置（在当前列的左边）
                let centerRowWest = Math.floor(centerLocIdx / 3);
                for (let col = (centerLocIdx % 3) - 1; col >= 0; col--) {
                    let checkIdx = centerRowWest * 3 + col;
                    if (!emptyPositions.includes(checkIdx)) {
                        directionLocations.push(selectedLocations[checkIdx]);
                    }
                }
                break;
            case 4: // 北
                // 查找同一列的所有非空位置（在当前行的上面）
                let centerColNorth = centerLocIdx % 3;
                for (let row = Math.floor(centerLocIdx / 3) - 1; row >= 0; row--) {
                    let checkIdx = row * 3 + centerColNorth;
                    if (!emptyPositions.includes(checkIdx)) {
                        directionLocations.push(selectedLocations[checkIdx]);
                    }
                }
                break;
        }
        
        // 如果指定方向有位置，生成问题
        if (directionLocations.length > 0) {
            // 根据相邻位置数量调整问题格式
            if (directionLocations.length === 1) {
                // 只有一个相邻位置，问"学校的西边是（）"
                questions.push(`${centerLoc}的${directionName}边是<span class="blank" data-answer="${directionLocations[0]}"></span>`);
                answers.push(directionLocations[0]);
            } else if (directionLocations.length === 2) {
                // 有两个相邻位置，问"学校的西边是（）和（）"
                questions.push(`${centerLoc}的${directionName}边是<span class="blank" data-answer="${directionLocations[0]}"></span>和<span class="blank" data-answer="${directionLocations[1]}"></span>`);
                answers.push(directionLocations[0], directionLocations[1]);
            } else {
                // 有更多相邻位置，使用循环方式生成
                let questionText = `${centerLoc}的${directionName}边是`;
                for (let j = 0; j < directionLocations.length; j++) {
                    questionText += `<span class="blank" data-answer="${directionLocations[j]}"></span>`;
                    if (j < directionLocations.length - 1) questionText += '和';
                    answers.push(directionLocations[j]);
                }
                questions.push(questionText);
            }
            question1Generated = true;
        }
        
        // 如果尝试多次仍未生成，就强制生成一个简单版本
        if (!question1Generated && attempts >= 25) {
            // 选择任意一个非空位置
            let nonEmptyPositions = [];
            for (let i = 0; i < 9; i++) {
                if (!emptyPositions.includes(i)) {
                    nonEmptyPositions.push(i);
                }
            }
            if (nonEmptyPositions.length > 0) {
                let locIdx = nonEmptyPositions[random(0, nonEmptyPositions.length - 1)];
                let loc = selectedLocations[locIdx];
                // 随机选择一个方向
                let direction = random(1, 4); // 1:东, 2:南, 3:西, 4:北
                let directionName = ['东', '南', '西', '北'][direction - 1];
                questions.push(`${loc}的${directionName}边是<span class="blank" data-answer=""></span>`);
                answers.push("");
                question1Generated = true;
            }
        }
    }
    
    // 问题2：哪里在哪里的哪边，如体育馆在学校的（）边
    // 确保两个位置必须在同一行或同一列（正东、正南、正西或正北方向）
    let question2Generated = false;
    attempts = 0;
    while (!question2Generated && attempts < 20) {  // 增加尝试次数
        attempts++;
        let loc1Idx, loc2Idx;
        let pairKey;
                
        // 确保两个位置都不是空位且不同，且必须在同一行或同一列
        let attemptCount = 0;
        do {
            loc1Idx = random(0, 8);
            loc2Idx = random(0, 8);
            pairKey = `${loc1Idx}-${loc2Idx}`;
            attemptCount++;
                    
            // 检查是否在同一行或同一列
            let sameRow = Math.floor(loc1Idx / 3) === Math.floor(loc2Idx / 3);
            let sameCol = (loc1Idx % 3) === (loc2Idx % 3);
            let isValidDirection = (sameRow || sameCol) && (loc1Idx !== loc2Idx);
        } while ((loc1Idx === loc2Idx || emptyPositions.includes(loc1Idx) || emptyPositions.includes(loc2Idx) || usedPairs.includes(pairKey) || 
                 !(Math.floor(loc1Idx / 3) === Math.floor(loc2Idx / 3) || (loc1Idx % 3) === (loc2Idx % 3))) && attemptCount < 30);  // 增加尝试次数
                
        // 检查是否找到了符合条件的位置
        let sameRow = Math.floor(loc1Idx / 3) === Math.floor(loc2Idx / 3);
        let sameCol = (loc1Idx % 3) === (loc2Idx % 3);
        let isValidDirection = (sameRow || sameCol) && (loc1Idx !== loc2Idx);
                
        if (isValidDirection) {
            usedPairs.push(pairKey);
                    
            let loc1 = selectedLocations[loc1Idx];
            let loc2 = selectedLocations[loc2Idx];
                    
            // 计算方位描述（只可能是正东、正南、正西或正北）
            let directionString = '';
            if (sameRow) {
                // 同一行，比较列数
                if (loc1Idx < loc2Idx) directionString = '西';
                else directionString = '东';
            } else if (sameCol) {
                // 同一列，比较行数
                if (loc1Idx < loc2Idx) directionString = '北';
                else directionString = '南';
            }
                    
            if (directionString) {
                questions.push(`${loc1}在${loc2}的<span class="blank" data-answer="${directionString}"></span>边`);
                answers.push(directionString);
                question2Generated = true;
            }
        }
                
        // 如果尝试多次仍未生成，就强制生成一个简单版本
        if (!question2Generated && attempts >= 20) {
            // 选择任意两个非空位置，确保在同一行或同一列
            let nonEmptyPositions = [];
            for (let i = 0; i < 9; i++) {
                if (!emptyPositions.includes(i)) {
                    nonEmptyPositions.push(i);
                }
            }
                    
            if (nonEmptyPositions.length >= 2) {
                let loc1Idx = nonEmptyPositions[random(0, nonEmptyPositions.length - 1)];
                let loc2Idx;
                        
                // 寻找同一行或同一列的位置
                let sameRowPositions = [];
                let sameColPositions = [];
                        
                let loc1Row = Math.floor(loc1Idx / 3);
                let loc1Col = loc1Idx % 3;
                        
                for (let i = 0; i < nonEmptyPositions.length; i++) {
                    let pos = nonEmptyPositions[i];
                    if (pos !== loc1Idx) {
                        let posRow = Math.floor(pos / 3);
                        let posCol = pos % 3;
                                
                        if (posRow === loc1Row) {
                            sameRowPositions.push(pos);
                        }
                        if (posCol === loc1Col) {
                            sameColPositions.push(pos);
                        }
                    }
                }
                        
                // 优先选择同行的位置，如果没有则选择同列的
                if (sameRowPositions.length > 0) {
                    loc2Idx = sameRowPositions[random(0, sameRowPositions.length - 1)];
                } else if (sameColPositions.length > 0) {
                    loc2Idx = sameColPositions[random(0, sameColPositions.length - 1)];
                } else {
                    // 如果都没有，就随便选一个
                    loc2Idx = nonEmptyPositions[random(0, nonEmptyPositions.length - 1)];
                    while (loc2Idx === loc1Idx && nonEmptyPositions.length > 1) {
                        loc2Idx = nonEmptyPositions[random(0, nonEmptyPositions.length - 1)];
                    }
                }
                        
                let loc1 = selectedLocations[loc1Idx];
                let loc2 = selectedLocations[loc2Idx];
                        
                // 计算方位
                let directionString = '';
                let sameRow = Math.floor(loc1Idx / 3) === Math.floor(loc2Idx / 3);
                let sameCol = (loc1Idx % 3) === (loc2Idx % 3);
                        
                if (sameRow) {
                    if (loc1Idx < loc2Idx) directionString = '西';
                    else directionString = '东';
                } else if (sameCol) {
                    if (loc1Idx < loc2Idx) directionString = '北';
                    else directionString = '南';
                }
                        
                questions.push(`${loc1}在${loc2}的<span class="blank" data-answer="${directionString}"></span>边`);
                answers.push(directionString);
                question2Generated = true;
            }
        }
    }
    
    // 问题3：哪里在哪里的哪边，请你在图上补充完整（要求补充所有缺失位置）
    let question3Generated = false;
    attempts = 0;
    while (!question3Generated && attempts < 25) {  // 增加尝试次数
        attempts++;
        
        // 收集所有需要补充的位置信息
        let fillInfo = [];
        // 用于跟踪已选择的补充位置名称，确保不重复
        let usedFillLocations = [];
        
        // 遍历所有空位
        for (let i = 0; i < emptyPositions.length; i++) {
            let emptyPos = emptyPositions[i];
            
            // 查找与这个空位相邻的已知位置
            for (let j = 0; j < 9; j++) {
                // 跳过空位本身
                if (emptyPositions.includes(j)) continue;
                
                // 检查是否相邻
                let isEmptyAdjacentToKnown = false;
                let directionName = '';
                
                // 检查四个方向
                if (j === emptyPos - 3 && Math.floor(j/3) === Math.floor(emptyPos/3) - 1) { // 北
                    isEmptyAdjacentToKnown = true;
                    directionName = '南';
                } else if (j === emptyPos + 3 && Math.floor(j/3) === Math.floor(emptyPos/3) + 1) { // 南
                    isEmptyAdjacentToKnown = true;
                    directionName = '北';
                } else if (j === emptyPos - 1 && Math.floor(j/3) === Math.floor(emptyPos/3) && (j % 3) === (emptyPos % 3) - 1) { // 西
                    isEmptyAdjacentToKnown = true;
                    directionName = '东';
                } else if (j === emptyPos + 1 && Math.floor(j/3) === Math.floor(emptyPos/3) && (j % 3) === (emptyPos % 3) + 1) { // 东
                    isEmptyAdjacentToKnown = true;
                    directionName = '西';
                }
                
                if (isEmptyAdjacentToKnown) {
                    let knownLoc = selectedLocations[j];
                    // 生成补充位置的名称（从locations中随机选择一个未使用的，且不重复的）
                    let unusedLocations = locations.filter(loc => !selectedLocations.includes(loc) && !usedFillLocations.includes(loc));
                    if (unusedLocations.length > 0) {
                        let fillLocation = unusedLocations[random(0, unusedLocations.length - 1)];
                        usedFillLocations.push(fillLocation); // 记录已使用的补充位置名称
                        fillInfo.push({
                            fillLocation: fillLocation,
                            knownLoc: knownLoc,
                            directionName: directionName
                        });
                        break; // 找到一个相邻的已知位置就够了
                    }
                }
            }
        }
        
        // 如果有需要补充的位置，生成问题
        if (fillInfo.length > 0) {
            let questionText = '请你在图上补充完整缺失的位置：';
            for (let i = 0; i < fillInfo.length; i++) {
                questionText += `${fillInfo[i].fillLocation}在${fillInfo[i].knownLoc}的${fillInfo[i].directionName}边`;
                if (i < fillInfo.length - 1) {
                    questionText += '，';
                }
                answers.push(fillInfo[i].fillLocation);
            }
            questions.push(questionText);
            question3Generated = true;
        }
        
        // 如果尝试多次仍未生成，就强制生成一个简单版本
        if (!question3Generated && attempts >= 25) {
            // 选择任意一个空位来补充
            if (emptyPositions.length > 0) {
                let emptyPos = emptyPositions[random(0, emptyPositions.length - 1)];
                
                // 选择一个已知位置作为参考
                let knownLocIdx;
                let attemptCount = 0;
                do {
                    knownLocIdx = random(0, 8);
                    attemptCount++;
                } while (emptyPositions.includes(knownLocIdx) && attemptCount < 25);  // 增加尝试次数
                
                if (!emptyPositions.includes(knownLocIdx)) {
                    let knownLoc = selectedLocations[knownLocIdx];
                    
                    // 确定相对位置关系
                    let direction = random(1, 4); // 1:北, 2:南, 3:东, 4:西
                    let directionName = ['北', '南', '东', '西'][direction - 1];
                    
                    // 生成补充位置的名称（从locations中随机选择一个未使用的）
                    let unusedLocations = locations.filter(loc => !selectedLocations.includes(loc));
                    if (unusedLocations.length > 0) {
                        let fillLocation = unusedLocations[random(0, unusedLocations.length - 1)];
                        questions.push(`${fillLocation}在${knownLoc}的${directionName}边，请你把${fillLocation}在图上补充完整`);
                        answers.push(fillLocation);
                        question3Generated = true;
                    }
                }
            }
        }
    }
    
    // 问题4（必选）：方向感知题，如小明站在体育馆，面向餐厅，前面是什么方向等
    let question4Generated = false;
    attempts = 0;
    // 确保必定生成方向感知题
    while (!question4Generated && attempts < 15) {  // 增加尝试次数
        attempts++;
        // 选择两个非空位置
        let positionIndexes = [];
        for (let i = 0; i < 9; i++) {
            if (!emptyPositions.includes(i)) {
                positionIndexes.push(i);
            }
        }
        
        if (positionIndexes.length >= 2) {
            let loc1Idx = positionIndexes[random(0, positionIndexes.length - 1)];
            let loc2Idx = positionIndexes[random(0, positionIndexes.length - 1)];
            
            // 确保两个位置不同
            let attemptCount = 0;
            while (loc1Idx === loc2Idx && attemptCount < 15) {  // 增加尝试次数
                loc2Idx = positionIndexes[random(0, positionIndexes.length - 1)];
                attemptCount++;
            }
            
            // 确保两个位置必须在同一行或同一列（正东、正南、正西或正北方向）
            let sameRow = Math.floor(loc1Idx / 3) === Math.floor(loc2Idx / 3);
            let sameCol = (loc1Idx % 3) === (loc2Idx % 3);
            let isValidDirection = (sameRow || sameCol) && (loc1Idx !== loc2Idx);
            
            if (isValidDirection) {
                let loc1 = selectedLocations[loc1Idx];
                let loc2 = selectedLocations[loc2Idx];
                
                // 计算loc1相对于loc2的方向（只可能是正东、正南、正西或正北）
                let relativeDirection = '';
                if (sameRow) {
                    // 同一行，比较列数
                    if (loc1Idx < loc2Idx) relativeDirection = '西';
                    else relativeDirection = '东';
                } else if (sameCol) {
                    // 同一列，比较行数
                    if (loc1Idx < loc2Idx) relativeDirection = '北';
                    else relativeDirection = '南';
                }
                
                if (relativeDirection) {
                    // 根据相对方向确定前、左、右、后四个方向
                    let front = relativeDirection;
                    let left, right, back;
                    
                    if (relativeDirection === '北') {
                        left = '西';
                        right = '东';
                        back = '南';
                    } else if (relativeDirection === '南') {
                        left = '东';
                        right = '西';
                        back = '北';
                    } else if (relativeDirection === '东') {
                        left = '北';
                        right = '南';
                        back = '西';
                    } else if (relativeDirection === '西') {
                        left = '南';
                        right = '北';
                        back = '东';
                    }
                    
                    questions.push(`小明站在${loc1}，面向${loc2}，前面是<span class="blank" data-answer="${front}"></span>边，左边是<span class="blank" data-answer="${left}"></span>边，右边是<span class="blank" data-answer="${right}"></span>边，后面是<span class="blank" data-answer="${back}"></span>边`);
                    answers.push(front, left, right, back);
                    question4Generated = true;
                }
            }
        }
        
        // 如果尝试多次仍未生成，就强制生成一个简单版本
        if (!question4Generated && attempts >= 15) {
            // 选择任意两个非空位置，确保在同一行或同一列
            let nonEmptyPositions = [];
            for (let i = 0; i < 9; i++) {
                if (!emptyPositions.includes(i)) {
                    nonEmptyPositions.push(i);
                }
            }
            
            if (nonEmptyPositions.length >= 2) {
                let loc1Idx = nonEmptyPositions[random(0, nonEmptyPositions.length - 1)];
                let loc2Idx;
                
                // 寻找同一行或同一列的位置
                let sameRowPositions = [];
                let sameColPositions = [];
                
                let loc1Row = Math.floor(loc1Idx / 3);
                let loc1Col = loc1Idx % 3;
                
                for (let i = 0; i < nonEmptyPositions.length; i++) {
                    let pos = nonEmptyPositions[i];
                    if (pos !== loc1Idx) {
                        let posRow = Math.floor(pos / 3);
                        let posCol = pos % 3;
                        
                        if (posRow === loc1Row) {
                            sameRowPositions.push(pos);
                        }
                        if (posCol === loc1Col) {
                            sameColPositions.push(pos);
                        }
                    }
                }
                
                // 优先选择同行的位置，如果没有则选择同列的
                if (sameRowPositions.length > 0) {
                    loc2Idx = sameRowPositions[random(0, sameRowPositions.length - 1)];
                } else if (sameColPositions.length > 0) {
                    loc2Idx = sameColPositions[random(0, sameColPositions.length - 1)];
                } else {
                    // 如果都没有，就随便选一个
                    loc2Idx = nonEmptyPositions[random(0, nonEmptyPositions.length - 1)];
                    while (loc2Idx === loc1Idx && nonEmptyPositions.length > 1) {
                        loc2Idx = nonEmptyPositions[random(0, nonEmptyPositions.length - 1)];
                    }
                }
                
                let loc1 = selectedLocations[loc1Idx];
                let loc2 = selectedLocations[loc2Idx];
                
                // 计算方位
                let relativeDirection = '';
                let sameRow = Math.floor(loc1Idx / 3) === Math.floor(loc2Idx / 3);
                let sameCol = (loc1Idx % 3) === (loc2Idx % 3);
                
                if (sameRow) {
                    if (loc1Idx < loc2Idx) relativeDirection = '西';
                    else relativeDirection = '东';
                } else if (sameCol) {
                    if (loc1Idx < loc2Idx) relativeDirection = '北';
                    else relativeDirection = '南';
                }
                
                if (relativeDirection) {
                    // 根据相对方向确定前、左、右、后四个方向
                    let front = relativeDirection;
                    let left, right, back;
                    
                    if (relativeDirection === '北') {
                        left = '西';
                        right = '东';
                        back = '南';
                    } else if (relativeDirection === '南') {
                        left = '东';
                        right = '西';
                        back = '北';
                    } else if (relativeDirection === '东') {
                        left = '北';
                        right = '南';
                        back = '西';
                    } else if (relativeDirection === '西') {
                        left = '南';
                        right = '北';
                        back = '东';
                    }
                    
                    questions.push(`小明站在${loc1}，面向${loc2}，前面是<span class="blank" data-answer="${front}"></span>边，左边是<span class="blank" data-answer="${left}"></span>边，右边是<span class="blank" data-answer="${right}"></span>边，后面是<span class="blank" data-answer="${back}"></span>边`);
                    answers.push(front, left, right, back);
                    question4Generated = true;
                } else {
                    // 如果无法计算方向，就生成空白版本
                    questions.push(`小明站在${loc1}，面向${loc2}，前面是<span class="blank" data-answer=""></span>边，左边是<span class="blank" data-answer=""></span>边，右边是<span class="blank" data-answer=""></span>边，后面是<span class="blank" data-answer=""></span>边`);
                    answers.push("", "", "", "");
                    question4Generated = true;
                }
            }
        }
    }
    
    // 组合所有问题，将题目显示在图的右边
    let questionText = `<div style="display: flex; align-items: flex-start;">`;
    questionText += `${gridHTML}`;
    questionText += `<div style="margin-left: 30px;">`;
    questionText += `<div style="font-size: 20px; font-weight: bold; margin-bottom: 10px;">请根据九宫格回答问题：</div>`;
    for (let i = 0; i < questions.length; i++) {
        questionText += `<div style="margin-bottom: 15px; font-size: 22px; line-height: 1.5;">${i+1}. ${questions[i]}</div>`;
    }
    questionText += `</div>`;
    questionText += `</div>`;
    
    return {
        type: 'direction',
        text: questionText,
        answers: answers
    };
}

// 生成所有题目
function generateAllQuestions() {
    // 检查是否有选择题型
    let totalQuestions = 0;
    for (let type in questionCounts) {
        totalQuestions += questionCounts[type];
    }
    
    // 检查是否选择了竖式练习
    const includeVertical = questionCounts.vertical || 0;
    
    if (totalQuestions === 0 && includeVertical === 0) {
        alert('请至少选择一种题型！');
        return;
    }
    
    const questions = [];
    const totalQuestionCount = 20; // 总共20题
    
    // 如果选择了竖式练习，生成竖式题目
    let verticalQuestions = [];
    if (includeVertical > 0) {
        verticalQuestions = generateVerticalQuestions();
    }
    
    // 优先生成口算题（如果选择了口算题）
    let mentalQuestionCount = questionCounts.mental || 0;
    // 如果选择了口算题，点击一次生成32道题（8行×4列）
    if (mentalQuestionCount > 0) {
        mentalQuestionCount = 32;
    }
    for (let i = 0; i < mentalQuestionCount; i++) {
        questions.push(generateMentalMath());
    }
    
    // 计算每种题型应该生成的数量
    let remainingCount = totalQuestionCount - verticalQuestions.length - mentalQuestionCount;
    
    // 如果还有剩余题目，随机分配给已选择的题型
    while (remainingCount > 0) {
        // 过滤出已被选择的题型（数量大于0的题型）
        const selectedTypes = Object.keys(questionCounts).filter(type => 
            questionCounts[type] > 0 && type !== 'vertical'
        );
        
        if (selectedTypes.length > 0) {
            // 随机选择一个已选择的题型
            const randomType = selectedTypes[random(0, selectedTypes.length - 1)];
            let question;
            
            switch (randomType) {
                case 'basic':
                    // 随机选择加法、减法或乘法
                    const basicType = random(1, 3);
                    if (basicType === 1) {
                        question = generateAddition();
                    } else if (basicType === 2) {
                        question = generateSubtraction();
                    } else {
                        question = generateMultiplicationBasic();
                    }
                    break;
                case 'multiplication':
                    question = random(1, 2) === 1 ? generateMultiplicationWithBalancedTypes() : generateMultiplicationFormula();
                    break;
                case 'carry':
                    question = generateCarryBorrow();
                    break;
                case 'mistake':
                    question = generateMistake();
                    break;
                case 'drawing':
                    question = generateDrawing();
                    break;
                case 'shopping':
                    question = generateShopping();
                    break;
                case 'direction':
                    question = generateDirection();
                    break;
                case 'mental':
                    question = generateMentalMath();
                    break;
            }
            
            questions.push(question);
            remainingCount--;
        } else {
            break;
        }
    }
    
    // 渲染题目
    renderQuestions(questions, verticalQuestions);
}

// 渲染题目
function renderQuestions(questions, verticalQuestions = []) {
    const container = document.getElementById('questionsContainer');
    container.innerHTML = '';
    
    const questionsPerPage = 100; // 增加每页题目数量
    const pages = 1; // 只显示一页
    
    // 分离口算题和其它题目
    const mentalQuestions = [];
    const otherQuestions = [];
    
    questions.forEach((question, index) => {
        if (question.type === 'mental') {
            mentalQuestions.push({index: index, question: question});
        } else {
            otherQuestions.push({index: index, question: question});
        }
    });
    
    // 合并所有题目，按照正常顺序排列
    const allQuestions = [...otherQuestions, ...mentalQuestions];
    
    // 显示题目（分页显示）
    for (let page = 0; page < pages; page++) {
        const pageDiv = document.createElement('div');
        pageDiv.className = 'question-page';
        
        // 页面标题
        const pageHeader = document.createElement('div');
        pageHeader.className = 'page-header';
        pageHeader.innerHTML = `
            <h2>二年级数学练习题</h2>
            <div class="info">
                <span>姓名：___________</span>
                <span>班级：___________</span>
                <span>日期：___________</span>
            </div>
        `;
        pageDiv.appendChild(pageHeader);
        
        const start = page * questionsPerPage;
        const end = start + questionsPerPage;
        
        // 题目网格
        const grid = document.createElement('div');
        grid.className = 'question-grid';
        
        // 检查当前页面是否包含口算题
        const pageQuestions = allQuestions.slice(start, end);
        const hasMentalMath = pageQuestions.some(item => item.question.type === 'mental');
        
        // 如果包含口算题，添加特殊类名以启用4列网格布局
        if (hasMentalMath) {
            grid.classList.add('mental-math-page');
        }
        
        // 渲染题目
        allQuestions.slice(start, end).forEach(item => {
            const questionDiv = document.createElement('div');
            
            // 如果是口算题，使用特殊的类名
            if (item.question.type === 'mental') {
                questionDiv.className = 'mental-math';
                questionDiv.innerHTML = `
                    <div class="question-text">${item.question.text}</div>
                `;
            } else {
                questionDiv.className = 'question-item';
                questionDiv.innerHTML = `
                    <div class="question-number">${item.index + 1}.</div>
                    <div class="question-text">${item.question.text}</div>
                `;
            }
            
            grid.appendChild(questionDiv);
        });
        
        pageDiv.appendChild(grid);
        container.appendChild(pageDiv);
    }
    
    // 如果有竖式练习，最后显示竖式练习
    if (verticalQuestions.length > 0) {
        // 创建竖式练习的HTML
        const verticalHTML = createVerticalQuestionsHTML(verticalQuestions);
        
        // 添加竖式练习页面
        const verticalPage = document.createElement('div');
        verticalPage.className = 'question-page';
        verticalPage.innerHTML = `
            <div class="vertical-container">
                ${verticalHTML}
            </div>
        `;
        container.appendChild(verticalPage);
    }
    
    // 如果需要显示答案，则填充答案
    if (showAnswers) {
        showAllAnswers();
    }
}
async function downloadPDF() {
    const container = document.getElementById('questionsContainer');
    
    if (container.querySelector('.welcome-message')) {
        alert('请先生成题目再下载！');
        return;
    }
    
    // 显示下载提示
    const originalBtnText = document.getElementById('downloadPDFBtn')?.innerHTML || '';
    const downloadBtn = document.getElementById('downloadPDFBtn');
    if (downloadBtn) {
        downloadBtn.innerHTML = '📥 正在生成PDF...';
        downloadBtn.disabled = true;
    }
    
    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        const pages = container.querySelectorAll('.question-page');
        
        for (let i = 0; i < pages.length; i++) {
            if (i > 0) {
                pdf.addPage();
            }
            
            // 临时隐藏答案以便截图（确保下载的PDF不包含答案）
            const showAnswersTemp = showAnswers;
            if (showAnswersTemp) {
                hideAllAnswers();
            }
            
            // 降低scale值以提高性能，添加更多选项优化渲染
            const canvas = await html2canvas(pages[i], {
                scale: 2, // 从4降低到2以提高性能
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                // 添加性能优化选项
                allowTaint: true,
                useCORS: true,
                width: pages[i].scrollWidth,
                height: pages[i].scrollHeight,
                onclone: function(clonedDoc) {
                    // 确保克隆文档中的样式正确
                    clonedDoc.querySelectorAll('.blank').forEach(el => {
                        el.style.borderBottom = '1px solid transparent';
                    });
                }
            });
            
            // 恢复原来的状态
            if (showAnswersTemp) {
                showAllAnswers();
            }
            
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210; // A4宽度
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        }
        
        const date = new Date();
        const filename = `数学练习题_${date.getFullYear()}${(date.getMonth()+1).toString().padStart(2,'0')}${date.getDate().toString().padStart(2,'0')}.pdf`;
        
        pdf.save(filename);
        
        // 恢复按钮状态
        if (downloadBtn) {
            downloadBtn.innerHTML = '📥 下载PDF';
            downloadBtn.disabled = false;
        }
    } catch (error) {
        console.error('PDF生成失败:', error);
        alert('PDF生成失败，请重试');
        
        // 恢复按钮状态
        if (downloadBtn) {
            downloadBtn.innerHTML = '📥 下载PDF';
            downloadBtn.disabled = false;
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('出题系统已就绪');
});

// 生成口算题（100以内的加减法，9以内的乘法）
function generateMentalMath() {
    // 随机选择题型：0-加法，1-减法，2-乘法
    const type = random(0, 2);
    
    if (type === 0) {
        // 加法：确保和不超过100
        const a = random(1, 99);
        const b = random(1, 100 - a);
        const result = a + b;
        
        return {
            type: 'mental',
            text: `${a} + ${b} = ______`,
            answers: [result.toString()]
        };
    } else if (type === 1) {
        // 减法：确保被减数不超过100，差为正数
        const a = random(1, 100);
        const b = random(1, a);
        const result = a - b;
        
        return {
            type: 'mental',
            text: `${a} - ${b} = ______`,
            answers: [result.toString()]
        };
    } else {
        // 乘法：9以内的乘法
        const a = random(1, 9);
        const b = random(1, 9);
        const result = a * b;
        
        return {
            type: 'mental',
            text: `${a} × ${b} = ______`,
            answers: [result.toString()]
        };
    }
}

// 下载日历计划表
async function downloadCalendar() {
    const select = document.getElementById('calendarSelect');
    const selectedFile = select.value;
    
    if (!selectedFile) {
        alert('请先选择一个日历模板！');
        return;
    }
    
    const btn = document.getElementById('downloadCalendarBtn');
    const originalText = btn.innerHTML;
    
    try {
        // 显示下载中提示
        btn.innerHTML = '⏳ 下载中...';
        btn.disabled = true;
        
        // 构建文件路径
        const filePath = `2025年日历计划表模板合集 (PDF版)/${selectedFile}`;
        
        // 使用fetch获取文件
        const response = await fetch(filePath);
        
        if (!response.ok) {
            throw new Error(`文件加载失败: ${response.status}`);
        }
        
        // 获取文件blob
        const blob = await response.blob();
        
        // 创建下载链接
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = selectedFile;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        
        // 清理
        setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }, 100);
        
        // 显示成功提示
        btn.innerHTML = '✅ 下载成功';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 2000);
        
    } catch (error) {
        console.error('下载失败:', error);
        
        // 显示错误提示
        btn.innerHTML = '❌ 下载失败';
        
        // 显示详细错误信息
        alert(`下载失败！

可能的原因：
1. 文件不存在，请确保PDF文件在正确的目录中
2. 文件路径：2025年日历计划表模板合集 (PDF版)/${selectedFile}

错误详情: ${error.message}`);
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 2000);
    }
}

/// 预览日历（显示日历信息和描述）v2
function previewCalendar() {
    console.log('预览日历函数被调用 - 版本2');
    const select = document.getElementById('calendarSelect');
    const selectedFile = select.value;
    const previewDiv = document.getElementById('calendarPreview');
    
    if (!selectedFile) {
        previewDiv.style.display = 'none';
        return;
    }
    
    // 显示预览区域
    previewDiv.style.display = 'block';
    
    // 日历信息数据
    const calendarInfo = {
        '2025年日历+计划表（可爱橘猫版）.pdf': {
            icon: '🐱',
            name: '2025年日历+计划表（可爱橘猫版）',
            size: '78MB',
            pages: '13页',
            features: ['月度日历', '每日计划表', '可爱橘猫插图', '适合打印'],
            description: '温馨可爱的橘猫主题日历，包含完整的2025年月历和详细的每日计划表，适合喜欢猫咪的朋友使用。'
        },
        '2025年日历（横屏）.pdf': {
            icon: '📄',
            name: '2025年日历（横屏）',
            size: '262KB',
            pages: '1页',
            features: ['横屏设计', '全年一览', '简洁明了', '适合墙贴'],
            description: '横屏设计的全年日历，一页展示2025年全年，简洁大方，适合打印后贴在墙上使用。'
        },
        '2025年黑猫日历（彩印版）.pdf': {
            icon: '🐈‍⬛',
            name: '2025年黑猫日历（彩印版）',
            size: '81MB',
            pages: '13页',
            features: ['精美彩印', '黑猫主题', '月度计划', '高清图片'],
            description: '精美的黑猫主题彩色日历，高清图片配合月度计划功能，适合彩色打印使用。'
        },
        '2025年黑白日历（新款）.pdf': {
            icon: '⚫',
            name: '2025年黑白日历（新款）',
            size: '3.3MB',
            pages: '13页',
            features: ['黑白设计', '节省墨水', '简约风格', '经济实用'],
            description: '简约黑白设计的日历，节省打印成本，清晰的排版设计，适合日常使用。'
        },
        '25年1-12月份计划表（日历+计划表结合）.pdf': {
            icon: '📋',
            name: '25年1-12月份计划表',
            size: '20MB',
            pages: '12页',
            features: ['月度计划', '日历结合', '任务管理', '目标追踪'],
            description: '日历与计划表完美结合，每月一页，帮助您更好地规划和管理时间。'
        },
        '25年小鸭子日历+计划表（横屏）.pdf': {
            icon: '🦆',
            name: '25年小鸭子日历+计划表',
            size: '66MB',
            pages: '13页',
            features: ['可爱小鸭', '横屏布局', '月度计划', '彩色设计'],
            description: '可爱的小鸭子主题横屏日历，配有每月计划表，萌趣设计让规划变得更有趣。'
        },
        '25年日历横板图（秋天主题）.pdf': {
            icon: '🍂',
            name: '25年日历横板图（秋天主题）',
            size: '1.5MB',
            pages: '1页',
            features: ['秋天主题', '横板设计', '温馨色调', '全年一览'],
            description: '温馨的秋天主题日历，横板设计，一页展示全年，适合办公室或家居装饰。'
        },
        '25年日历（秋天风格）.pdf': {
            icon: '🍁',
            name: '25年日历（秋天风格）',
            size: '1.2MB',
            pages: '12页',
            features: ['秋天风格', '月度分页', '自然色调', '清新设计'],
            description: '清新的秋天风格日历，每月独立一页，自然的色调让人感觉舒适惬意。'
        },
        '25年粉色白猫日历+月计划表（横屏）.pdf': {
            icon: '🐈',
            name: '25年粉色白猫日历+月计划表',
            size: '58MB',
            pages: '13页',
            features: ['粉色系', '白猫主题', '横屏设计', '月度计划'],
            description: '温柔的粉色白猫主题日历，横屏设计配合月度计划表，甜美又实用。'
        }
    };
    
    const info = calendarInfo[selectedFile];
    
    if (info) {
        previewDiv.innerHTML = `
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 15px; color: white;">
                <div style="text-align: center; margin-bottom: 25px;">
                    <div style="font-size: 4em; margin-bottom: 15px;">${info.icon}</div>
                    <h3 style="margin: 0; font-size: 1.5em;">${info.name}</h3>
                </div>
                
                <div style="background: rgba(255,255,255,0.15); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                    <p style="margin: 0 0 15px 0; line-height: 1.8;">${info.description}</p>
                    <div style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center;">
                        <span style="background: rgba(255,255,255,0.2); padding: 8px 15px; border-radius: 20px; font-size: 0.9em;">
                            📄 ${info.pages}
                        </span>
                        <span style="background: rgba(255,255,255,0.2); padding: 8px 15px; border-radius: 20px; font-size: 0.9em;">
                            💾 ${info.size}
                        </span>
                    </div>
                </div>
                
                <div style="background: rgba(255,255,255,0.15); padding: 20px; border-radius: 10px;">
                    <h4 style="margin: 0 0 15px 0; font-size: 1.1em;">✨ 特色功能：</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">
                        ${info.features.map(feature => `
                            <div style="background: rgba(255,255,255,0.2); padding: 10px; border-radius: 8px; text-align: center;">
                                ✓ ${feature}
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.3);">
                    <p style="margin: 0 0 15px 0; opacity: 0.9;">
                        💡 点击下方"下载日历"按钮即可获取完整PDF文件
                    </p>
                    <button class="btn btn-calendar" onclick="downloadCalendar()" 
                            style="background: white; color: #667eea; font-weight: bold; border: none; padding: 12px 30px; border-radius: 25px; cursor: pointer; font-size: 1.1em;">
                        📥 立即下载
                    </button>
                </div>
            </div>
        `;
    }
}

// 渲染PDF页面到canvas
function renderPDFPage(page, canvasId) {
    const canvas = document.getElementById(canvasId);
    const context = canvas.getContext('2d');
    
    // 设置缩放比例
    const scale = 1.5;
    const viewport = page.getViewport({ scale: scale });
    
    // 设置canvas尺寸
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    canvas.style.display = 'block';
    
    // 渲染PDF页面
    const renderContext = {
        canvasContext: context,
        viewport: viewport
    };
    
    page.render(renderContext);
}
