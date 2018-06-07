import {combineNamedReducers, createDispatchersByShape, Dispatchers, NamedReducers} from '@pinyin/redux'
import * as React from 'react'
import {createStore, StoreEnhancer, Unsubscribe} from 'redux'

export abstract class ComponentWithRedux<P = {}, S extends object = {}, A extends object = {}, SS = any>
    extends React.Component<P, S, SS> {

    private _storeUnsubscribe: Unsubscribe = {} as any

    dispatch: Dispatchers<A> = {} as any // TODO

    protected abstract reducers: NamedReducers<S, A>
    protected enhancer?: StoreEnhancer

    componentDidMount() {
        const {state, reducers, enhancer} = this

        const store = createStore(combineNamedReducers(state, reducers), enhancer)
        this.dispatch = createDispatchersByShape(store, reducers)
        this._storeUnsubscribe = store.subscribe(()=>
            this.setState(store.getState())
        )
    }

    componentWillUnmount() {
        this._storeUnsubscribe()
    }
}
