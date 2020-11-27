import { handle } from 'redux-pack';

import { LOAD_POSTS } from '../action-types/post';

const initialState = {
    posts: []
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case LOAD_POSTS:
            return handle(state, action, {
                start: prevState => ({ ...prevState }),
                finish: prevState => ({ ...prevState }),
                success: prevState => {
                    if (payload) {
                        console.log(`loaded ${payload.length} posts`);
                    }
                    return { ...prevState, posts: payload || initialState.posts }
                },
                failure: prevState => { console.error('bad'); return { ...prevState } }
            })
        default:
            return state;
    }
}

export default reducer;
