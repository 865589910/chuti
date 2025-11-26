// 生成题目的数量（2页：每页6道题 × 2页 = 12道题）
const TOTAL_QUESTIONS = 12;

// 题目类型
const QUESTION_TYPES = {
    ADD_2D_2D: 'add_2d_2d',           // 两位数加两位数
    ADD_2D_1D: 'add_2d_1d',           // 两位数加一位数
    ADD_2D_2D_EQ100: 'add_2d_2d_eq100', // 两位数加两位数等于100
    SUB_2D_2D: 'sub_2d_2d',           // 两位数减两位数
    SUB_2D_1D: 'sub_2d_1d',           // 两位数减一位数
    SUB_100_2D: 'sub_100_2d',         // 100减两位数
    SUB_100_1D: 'sub_100_1d'          // 100减一位数
};

// 生成随机数
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 生成两位数加两位数（进位）
function generateAdd2D2D() {
    let num1, num2;
    do {
        num1 = randomInt(10, 89);
        num2 = randomInt(10, 89);
    } while (
        num1 + num2 >= 100 || // 和小于100
        (num1 % 10) + (num2 % 10) < 10 // 确保个位相加会进位
    );
    
    return {
        type: QUESTION_TYPES.ADD_2D_2D,
        num1: num1,
        num2: num2,
        answer: num1 + num2
    };
}

// 生成两位数加一位数（进位）
function generateAdd2D1D() {
    let num1, num2;
    do {
        num1 = randomInt(10, 99);
        num2 = randomInt(1, 9);
    } while (
        (num1 % 10) + num2 < 10 // 确保个位相加会进位
    );
    
    return {
        type: QUESTION_TYPES.ADD_2D_1D,
        num1: num1,
        num2: num2,
        answer: num1 + num2
    };
}

// 生成两位数加两位数等于100
function generateAdd2D2DEq100() {
    const num1 = randomInt(10, 90);
    const num2 = 100 - num1;
    
    return {
        type: QUESTION_TYPES.ADD_2D_2D_EQ100,
        num1: num1,
        num2: num2,
        answer: 100
    };
}

// 生成两位数减两位数（退位）
function generateSub2D2D() {
    let num1, num2;
    do {
        num1 = randomInt(20, 99);
        num2 = randomInt(10, num1 - 1);
    } while (
        (num1 % 10) >= (num2 % 10) // 确保个位不够减，需要退位
    );
    
    return {
        type: QUESTION_TYPES.SUB_2D_2D,
        num1: num1,
        num2: num2,
        answer: num1 - num2
    };
}

// 生成两位数减一位数（退位）
function generateSub2D1D() {
    let num1, num2;
    do {
        num1 = randomInt(20, 99);
        num2 = randomInt(2, 9);
    } while (
        (num1 % 10) >= num2 // 确保个位不够减，需要退位
    );
    
    return {
        type: QUESTION_TYPES.SUB_2D_1D,
        num1: num1,
        num2: num2,
        answer: num1 - num2
    };
}

// 生成100减两位数
function generateSub100_2D() {
    const num2 = randomInt(10, 99);
    
    return {
        type: QUESTION_TYPES.SUB_100_2D,
        num1: 100,
        num2: num2,
        answer: 100 - num2
    };
}

// 生成100减一位数
function generateSub100_1D() {
    const num2 = randomInt(1, 9);
    
    return {
        type: QUESTION_TYPES.SUB_100_1D,
        num1: 100,
        num2: num2,
        answer: 100 - num2
    };
}

// 随机生成题目（按顺序循环7种题型）
function generateQuestion(index) {
    const typeIndex = index % 7;
    
    switch (typeIndex) {
        case 0:
            return generateAdd2D2D();
        case 1:
            return generateAdd2D1D();
        case 2:
            return generateAdd2D2DEq100();
        case 3:
            return generateSub2D2D();
        case 4:
            return generateSub2D1D();
        case 5:
            return generateSub100_2D();
        case 6:
            return generateSub100_1D();
    }
}

// 创建竖式HTML
function createVerticalCalc(question) {
    const { type, num1, num2, answer } = question;
    const isAddition = type.startsWith('add');
    const is100 = num1 === 100;
    const isAnswer100 = answer === 100;
    
    // 确定位数
    const digits = is100 ? 3 : 2;
    
    let html = '<div class="vertical-calc">';
    
    // 1. 数位标识框
    html += '<div class="place-value-row">';
    if (is100 || isAnswer100) {
        html += '<div class="place-box">百位</div>';
    }
    html += '<div class="place-box">十位</div>';
    html += '<div class="place-box">个位</div>';
    html += '</div>';
    
    // 减法退位标记行：在数位框和被减数之间单独一行
    if (!isAddition) {
        html += '<div class="place-value-row" style="margin-bottom: 5px; height: 25px; justify-content: flex-end;">';
        if (is100) {
            // 100减几，百位和十位都要有退位圈圈，分开对应各自的数位
            html += '<div style="width: 55px; display: flex; justify-content: center; align-items: center; padding-left: 120px;"><div class="borrow-mark"></div></div>';
            html += '<div style="width: 55px; display: flex; justify-content: center; align-items: center; margin-left: 18px; padding-left: 32px;"><div class="borrow-mark"></div></div>';
            html += '<div style="width: 55px; margin-left: 18px;"></div>';
        } else {
            // 两位数减几，在十位位置显示退位圈圈
            html += '<div style="width: 55px; display: flex; justify-content: center; align-items: center; padding-left: 32px;"><div class="borrow-mark"></div></div>';
            html += '<div style="width: 55px; margin-left: 18px;"></div>';
        }
        html += '</div>';
    }
    
    // 2. 第一个数（全部留空让学生填写）
    html += '<div class="number-row">';
    if (is100 || isAnswer100) {
        html += '<div class="number-cell"></div>';
        html += '<div class="number-cell"></div>';
        html += '<div class="number-cell"></div>';
    } else {
        html += '<div class="number-cell"></div>';
        html += '<div class="number-cell"></div>';
    }
    html += '</div>';
    
    // 3. 运算符号和第二个数
    html += '<div class="operator-row">';
    // 如果是100相关的算式（被减数是100或得数是100），符号向右移动20个字符
    const operatorLeft = (is100 || isAnswer100) ? '50px' : '-26px';
    html += `<div class="operator-circle" style="left: ${operatorLeft}"></div>`;
    
    // 第二个数的位置（全部留空让学生填写）
    if (is100 || isAnswer100 || num2 >= 10) {
        if (is100 || isAnswer100) {
            html += '<div class="number-cell"></div>';
        }
        html += '<div class="number-cell"></div>';
        html += '<div class="number-cell"></div>';
    } else {
        if (is100 || isAnswer100) {
            html += '<div class="number-cell"></div>';
        }
        html += '<div class="number-cell"></div>';
        html += '<div class="number-cell"></div>';
    }
    
    html += '</div>';
    
    // 加法进位标记行：在第二个加数和横线之间单独一行
    if (isAddition) {
        html += '<div class="place-value-row" style="margin-bottom: 5px; margin-top: 5px; height: 25px; justify-content: flex-end;">';
        const onesSum = (num1 % 10) + (num2 % 10);
        
        if (isAnswer100) {
            // 结果是100，百位和十位都有进位，分开对应各自的数位
            html += '<div style="width: 55px; display: flex; justify-content: center; align-items: center; padding-left: 120px;"><div class="carry-mark"></div></div>';
            if (onesSum >= 10) {
                html += '<div style="width: 55px; display: flex; justify-content: center; align-items: center; margin-left: 18px; padding-left: 32px;"><div class="carry-mark"></div></div>';
            } else {
                html += '<div style="width: 55px; margin-left: 18px;"></div>';
            }
            html += '<div style="width: 55px; margin-left: 18px;"></div>';
        } else if (onesSum >= 10) {
            // 只有十位进位，在第二个加数的十位正下方
            if (is100 || isAnswer100) {
                html += '<div style="width: 55px;"></div>';
            }
            html += '<div style="width: 55px; display: flex; justify-content: center; align-items: center; padding-left: 32px;"><div class="carry-mark"></div></div>';
            html += '<div style="width: 55px; margin-left: 18px;"></div>';
        }
        html += '</div>';
    }
    
    // 4. 横线
    html += '<div class="horizontal-line"></div>';
    
    // 5. 答案行（空白方框供学生填写）
    html += '<div class="answer-row" style="position: relative;">';
    
    // 根据答案位数显示空白方框
    if (is100 || isAnswer100) {
        // 三位数答案
        html += '<div class="answer-box"></div>';
        html += '<div class="answer-box"></div>';
        html += '<div class="answer-box"></div>';
    } else {
        // 两位数答案
        html += '<div class="answer-box"></div>';
        html += '<div class="answer-box"></div>';
    }
    html += '</div>';
    
    html += '</div>';
    
    return html;
}

// 生成所有竖式题目
function generateVerticalQuestions() {
    const questions = [];
    for (let i = 0; i < TOTAL_QUESTIONS; i++) {
        questions.push(generateQuestion(i));
    }
    return questions;
}

// 创建竖式题目HTML
function createVerticalQuestionsHTML(questions) {
    let html = '<div class="vertical-exercises">';
    
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const operator = question.type.startsWith('add') ? '+' : '−';
        
        html += `<div class="exercise-item">`;
        html += `<div class="expression">${i + 1}. ${question.num1} ${operator} ${question.num2} =</div>`;
        html += createVerticalCalc(question);
        html += `</div>`;
    }
    
    html += '</div>';
    return html;
}