export const getBingoItemChoices = async () => {
    const itemChoices = [
        {empNo:"00000", name: "홍길동"},
        {empNo:"00001", name: "강감찬"},
        {empNo:"00002", name: "유재석"},
        {empNo:"00003", name: "이몽룡"},
    ]
    
    return new Promise((resolve, reject) => {
           resolve({data: itemChoices});
    });
};