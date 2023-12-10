export const getBingoItemChoices = async () => {
    const itemChoices = [
        {empNo:"00000", name: "홍길동"},
        {empNo:"00001", name: "강감찬"},
        {empNo:"00002", name: "유재석"},
        {empNo:"00003", name: "이몽룡"},
        {empNo:"00004", name: "김예나"},
        {empNo:"00005", name: "박종선"},
        {empNo:"00006", name: "김민경"},
        {empNo:"00007", name: "윤지선"},
        {empNo:"00008", name: "최재영"},
        {empNo:"00009", name: "나병학"},
        {empNo:"00010", name: "박미라"},
        {empNo:"00011", name: "김성익"},
        {empNo:"00012", name: "김성우"},
        {empNo:"00013", name: "백송"},
        {empNo:"00014", name: "최선미"},
        {empNo:"00015", name: "김만성"},
    ]
    
    return new Promise((resolve, reject) => {
           resolve({data: itemChoices});
    });
};