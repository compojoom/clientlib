import chai from 'chai'
import 'mocha'

import { Contact } from '../../src/Contact'
import { User } from '../../src/User'

import { FakeTLProvider } from '../helpers/FakeTLProvider'
import { FakeTLSigner } from '../helpers/FakeTLSigner'
import { FakeTLWallet } from '../helpers/FakeTLWallet'

import { FAKE_USER_ADDRESSES } from '../Fixtures'

const { assert } = chai

describe('unit', () => {
  describe('Contact', () => {
    // Test object
    let user: User
    let contact: Contact

    // Mocked classes
    let fakeTLProvider
    let fakeTLWallet
    let fakeTLSigner

    const init = () => {
      fakeTLProvider = new FakeTLProvider()
      fakeTLWallet = new FakeTLWallet()
      fakeTLSigner = new FakeTLSigner()
      user = new User({
        provider: fakeTLProvider,
        signer: fakeTLSigner,
        wallet: fakeTLWallet
      })

      const params = { user, provider: fakeTLProvider }
      contact = new Contact(params)
    }

    describe('#constructor()', () => {
      beforeEach(() => init())

      it('should construct a Contact instance', () => {
        assert.propertyVal(contact, 'user', user)
        assert.propertyVal(contact, 'provider', fakeTLProvider)
      })
    })

    describe('#createLink()', () => {
      beforeEach(() => init())

      const username = 'testname'

      it('should create trustlines:// link', async () => {
        const contactLink = contact.createLink(FAKE_USER_ADDRESSES[0], username)
        assert.equal(
          contactLink,
          `trustlines://contact/${FAKE_USER_ADDRESSES[0]}/${username}`
        )
      })

      it('should create custom link', async () => {
        const contactLink = contact.createLink(
          FAKE_USER_ADDRESSES[0],
          username,
          'http://custom.network'
        )
        assert.equal(
          contactLink,
          `http://custom.network/contact/${FAKE_USER_ADDRESSES[0]}/${username}`
        )
      })
    })
  })
})
