import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test Dummy Server Example Page', () => {

    const preamble = 'you are logged in as'

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should log in as the test user', (done) => {
        sleep(500)
            .then(findId('message').getText()
                .then(text => {
                    expect(text.indexOf(preamble)).to.equal(0)
                })
                .then(done))
    })

    it("Update the headline and verify the change", (done) => {
        // IMPLEMENT ME
        let old_Headline;
        let new_Headline = "my new headline"
        findId('message').getText().then(text => {
            old_Headline = text;
        })
        // find the headline input
        // .sendKeys(new headline message)

        findId('newHeadline').sendKeys(new_Headline)
        .then(findId('headline').click())
        .then(sleep(1000))
        // verify the headline is updated
        .then(findId('message').getText().then(msg => {
            expect(msg).to.equal(new_Headline)
        }))
        // .sendKeys(the old headline message)
        // verify the headline is updated
        .then(() => findId('newHeadline').clear())
        .then(() => findId('newHeadline').sendKeys(old_Headline))
        .then(findId('headline').click())
        .then(sleep(1000))
        .then(findId('message').getText().then(msg => {
            expect(msg).to.equal(old_Headline)
        }))
        .then(done)
    })

    after('should log out', (done) => {
        common.logout().then(done)
    })
})
