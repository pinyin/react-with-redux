import {Maybe} from '@pinyin/maybe'
import {Action, combineNamedReducers, createDispatchersByShape, Dispatchers, NamedReducers} from '@pinyin/redux'
import {nothing, something} from '@pinyin/types'
import * as React from 'react'
import {createStore, Store, StoreEnhancer, Unsubscribe} from 'redux'

export abstract class ComponentWithRedux<P = {}, S extends object = {}, A extends object = {}>
    extends React.Component<P, S> {

    protected constructor(props: P,
                          state: S,
                          reducers: NamedReducers<S, A>,
                          enhancer?: StoreEnhancer){
        super(props)

        const store = createStore(combineNamedReducers(state, reducers), enhancer)

        this.state = state
        this.dispatch = createDispatchersByShape(store, reducers)
        this._storeUnsubscribe = store.subscribe(()=>
            this.setState(store.getState())
        )
    }

    readonly dispatch: Dispatchers<A>

    private _storeUnsubscribe: Unsubscribe

    componentWillUnmount() {
        this._storeUnsubscribe()
    }
}
