class Checkout {
  constructor() {
    this.apiUrl = '/shoppingcartAPI'
    this.shoppingCartId = ''
    this.shoppingCart = {}
    this.defaultParty = {
      party: {
        adults: 1,
        children: 0,
      },
      currencyCode: 'EUR',
      languageCode: 'en',
    }
    this.flight = {
      id: this._getURLParam('flight_id'),
      brandedFare: 'Basic',
      loyalty: 'None',
    }
    this.passengerDetails = {
      id: 1,
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      phoneNumber: '',
      email: '',
      gender: '',
    }
    this.contactDetails = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      gender: 'male',
    }

    this.passengerForm = document.querySelector('#passenger-details')
    this.contactForm = document.querySelector('#contact-details')
    this.confirmationContentElement = document.querySelector(
      '#confirmation-content'
    )
  }

  /**
   * Public method to initialize the Checkout
   */
  init() {
    this._createShoppingCart().then(() => this._addFlightToCart([this.flight]))
    this._bindEvents()
  }

  /**
   * Bind events to collect data from the form
   * and submit the form
   */
  _bindEvents() {
    this._handleFormData(this.passengerForm, this.passengerDetails)
    this._handleFormData(this.contactForm, this.contactDetails)
    this._handleFormSubmit(
      this.passengerForm,
      this.passengerDetails,
      'passengerDetails'
    )
    this._handleFormSubmit(
      this.contactForm,
      this.contactDetails,
      'contactDetails'
    )
  }

  /**
   * Collect data from the input fields
   * @param {Object} form
   * @param {Object} obj
   */
  _handleFormData(form, obj) {
    const inputs = Array.from(form.querySelectorAll('input'))

    inputs.forEach(i =>
      i.addEventListener('change', e => {
        obj[e.target.name] = e.target.value
      })
    )
  }

  /**
   * Handle submitting the form
   * @param {Object} form
   * @param {Object} obj
   * @param {String} type
   */
  _handleFormSubmit(form, obj, type) {
    const button = form.querySelector('[data-cta]')

    button.addEventListener('click', () => {
      const isFormValid = Object.keys(obj).every(x => obj[x] !== '')

      if (!isFormValid) {
        console.warn('Please fill all the form fields.')
        return
      }

      // redirect the user to the specific form
      window.location.hash = button.dataset.href

      if (type === 'passengerDetails') {
        this._startCheckout().then(() => this._addPassengerDetails(obj))
      }

      if (type === 'contactDetails') {
        this._addContactDetails(obj)
          .then(() => this._addPayment())
          .then(() => {
            this.confirmationContentElement.innerHTML = `We are processing your booking. Please wait...`
            return this._finalizeCheckout()
          })
          .then(result => {
            this.confirmationContentElement.innerHTML = `
            <h3>Booking complete!</h3>
            <p>Your booking number is <b>${result.booking.bookingNumber}</b></p>
          `
          })
      }
    })
  }

  /**
   * Create a new shopping cart
   */
  _createShoppingCart() {
    return this._fetchShoppingCartApi('', this.defaultParty)
  }

  /**
   * Add an array of flights to the shopping cart
   * @param {array} flights - list of flights
   */
  _addFlightToCart(flights) {
    const data = JSON.stringify({ flights })
    return this._fetchShoppingCartApi('flights', data)
  }

  /**
   * Start the checkout process
   * A valid shopping cart id is required at this stage
   */
  _startCheckout() {
    return this._fetchShoppingCartApi('startCheckout', null)
  }

  /**
   * Add a passenger details for a single entity
   * @param {object} passenger - passenger data
   */
  _addPassengerDetails(passenger) {
    const data = JSON.stringify(passenger)
    return this._fetchShoppingCartApi(
      `passengers/${passenger.id}/details`,
      data
    )
  }

  /**
   * Add the contact person for booking
   * @param {object} contact - contact data
   */
  _addContactDetails(contact) {
    const data = JSON.stringify(contact)
    return this._fetchShoppingCartApi('bookingContact', data)
  }

  /**
   * Initialize the payment method
   * It uses the PaymentLink as paymentMethod
   */
  _addPayment() {
    const data = JSON.stringify({
      paymentMethod: 'PaymentLink',
    })
    return this._fetchShoppingCartApi('payments', data)
  }

  /**
   * Finalize the checkout process and return an object containing the PNR
   */
  _finalizeCheckout() {
    const data = JSON.stringify({
      agreedToTermsAndConditions: true,
    })
    return this._fetchShoppingCartApi('finalizeCheckout', data)
  }

  /**
   * General method to fetch the ShoppingCart API
   */
  _fetchShoppingCartApi(step, body) {
    const config = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
    }
    const id = this.shoppingCartId || ''
    const path = `shoppingCarts/${id}/${step}`

    config.body = body

    return fetch(this.apiUrl + `?path=${path}`, config)
      .then(res => {
        if (!res.ok) {
          throw Error('Network request failed')
        }

        return res
      })
      .then(data => data.json())
      .then(json => {
        console.log(step || 'create', json)
        this.shoppingCartId = json.id
        return json
      })
  }

  _getURLParam(param) {
    const url = new URL(window.location.href)
    return url.searchParams.get(param)
  }
}
