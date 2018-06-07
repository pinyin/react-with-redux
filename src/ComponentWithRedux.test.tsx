import {nothing} from '@pinyin/types/dist/src/nothing'
import * as React from 'react'
import {create} from 'react-test-renderer'
import {ComponentWithRedux} from './ComponentWithRedux'

describe(`${ComponentWithRedux.name}`, ()=> {
    class Component extends ComponentWithRedux<{}, {count: number}, {increase: nothing}> {
        constructor(props: {}) {
            super(props, {count: 0}, {increase: state=> ({count: state.count + 1})})
        }

        render(){
            return this.state.count
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
