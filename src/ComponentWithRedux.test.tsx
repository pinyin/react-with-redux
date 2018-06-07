import {NamedReducers} from '@pinyin/redux'
import {nothing} from '@pinyin/types/dist/src/nothing'
import * as React from 'react'
import {create} from 'react-test-renderer'
import {ComponentWithRedux} from './ComponentWithRedux'

describe(`${ComponentWithRedux.name}`, ()=> {
    class Component extends ComponentWithRedux<{}, {count: number}, {increase: nothing}> {
        constructor(props: {}) {
            super(props)
            this.state = {count: 0}
        }

        render(){
            return this.state.count
        }

        protected reducers: NamedReducers<{ count: number }, { increase: nothing }> = {
            increase: state => ({count: state.count + 1})
        }
    }

    const ref = React.createRef<Component>()
    const renderer = create(<Component ref={ref}/>)

    it(`should be renderable`, ()=> {
        expect(ref.current).toBeInstanceOf(React.Component)
    })

    it(`should set initial state`, ()=> {
        expect(renderer.root.children).toEqual(['0'])
    })

    it(`should handle actions`, ()=> {
        ref.current!.dispatch.increase()
        expect(renderer.root.children).toEqual(['1'])
    })

})
