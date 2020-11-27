import types from '../action-types/post';

export const loadPosts = userId => {
    return {
        type: types.LOAD_POSTS,
        promise: fetch(
            userId ?
            `http://jsonplaceholder.typicode.com/posts?userId=${userId}` :
            'http://jsonplaceholder.typicode.com/posts'
        ).then(res => res.json())
    }
}


const postActions = {
    loadPosts
}

export default postActions;
