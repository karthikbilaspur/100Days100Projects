const getMatchCount = (difficulty) => {
    switch (difficulty) {
    case 'easy':
    return 8;
    case 'medium':
    return 12;
    case 'hard':
    return 16;
    default:
    return 8;
    }
    };
    
    export default getMatchCount;