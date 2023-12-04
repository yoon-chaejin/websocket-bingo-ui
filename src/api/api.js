import axios from 'axios';

export const getBingoItemChoices = async () => axios.get(process.env.REACT_APP_API_URL + '/item-choices');