const actions = {};

const setAction = action => {
    actions[action.type] = {
        phase: action.meta['redux-pack/LIFECYCLE'],
        transaction: action.meta['redux-pack/TRANSACTION']
    };
};

const getAction = action => actions[action.type];

const isStartAction = action =>
    action.meta['redux-pack/LIFECYCLE'] === 'start';

const isSuccessAction = action =>
    action.meta['redux-pack/LIFECYCLE'] === 'success';

const isStaleAction = action => {
    const prevAction = getAction(action);
    return (
        prevAction &&
        prevAction.transaction !== action.meta['redux-pack/TRANSACTION']
    );
};

const isActionPresentInStartPhase = action => {
    const prevAction = getAction(action);
    return prevAction.phase === 'start';
}

const isReduxPackAction = action =>
    action && Object.keys(action).includes('meta');


export const middleware = () => next => action => {
    if (isReduxPackAction(action)) {
        if (isStartAction(action)) {
            if (isStaleAction(action)) delete actions[action.type];
            setAction(action);
            next(action);
        } else if (isSuccessAction(action)) {
            if (isActionPresentInStartPhase(action)) {
                if (isStaleAction(action)) {
                    next({
                        ...action,
                        payload: null
                    });
                } else {
                    delete actions[action.type];
                    next(action);
                }
            } else {
                next(action);
            }
        }
    } else {
        next(action);
    }
}

export default middleware
