import reducer from './playAgainSlice'

describe('toggleVisibility Reducer', () => {
    it('should turn false to true', () => {
        expect(reducer({visible: false}, {type: 'playAgain/toggleVisible'}))
            .toEqual({visible: true})
    })
    it('should turn true to false', () => {
        expect(reducer({visible: true}, {type: 'playAgain/toggleVisible'}))
            .toEqual({visible: false})
    })
})