import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';

import getJobs from "../app/frontend/src/actions/job-actions";
import REQUEST_JOB from "../app/frontend/src/actions/job-actions";
import GOT_JOBS from "../app/frontend/src/actions/job-actions";

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('application async actions', () => {
    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    })

    it('creates GOT_JOBS when fetching jobs has been done', () => {
        fetchMock
            .getOnce('/position', { body: { allJobs: [{id:"",name:""}] }, headers: { 'content-type': 'application/json' } })


        const expectedActions = [
            { type: REQUEST_JOB },
            { type: GOT_JOBS, body: { allJobs: [{id:"",name:""}] } }
        ]
        const store = mockStore({ allJobs: [] })

        return store.dispatch(getJobs()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})