import reducer from './counterSlice'

describe('counter reducer', () => {
    it('should increment by 1 if total is not reached', () => {
        expect(reducer({found: 0, total: 2}, {type: "counter/incrementFound"}))
            .toEqual({found: 1, total: 2})

    })
    it('should increment by 1 if found count is 1 below total', () => {
        expect(reducer({found: 1, total: 2}, {type: "counter/incrementFound"}))
            .toEqual({found: 2, total: 2})

    })
    it('should not increment if total is reached', () => {
        expect(reducer({found: 2, total: 2}, {type: "counter/incrementFound"}))
            .toEqual({found: 2, total: 2})

    })

});