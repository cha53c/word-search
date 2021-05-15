import reducer from './playAgainSlice'
describe('playAgainReducers', () => {
    describe('show reducer', () => {
        it('should turn false to true', () => {
            expect(reducer({visible: false}, {type: 'playAgain/show'}))
                .toEqual({visible: true})
        })
        it('should leave true as true', () => {
            expect(reducer({visible: true}, {type: 'playAgain/show'}))
                .toEqual({visible: true})
        })
    })

    describe('hide reducer', () => {
        it('should turn true to false', () => {
            expect(reducer({visible: true}, {type: 'playAgain/hide'}))
                .toEqual({visible: false})
        })
        it('should leave false as false', () => {
            expect(reducer({visible: false}, {type: 'playAgain/hide'}))
                .toEqual({visible: false})
        })
    })
})
