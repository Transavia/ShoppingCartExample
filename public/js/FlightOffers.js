/**
 * The FlightOffers component is responsible for getting flight offers and rendering them on the page.
 * It uses mock data, like the origin, destination, departure date and party size.
 */
class FlightOffers {
  constructor(element) {
    this.element = element
  }

  init() {
    this._getFlightOffers()
      .then(offers => this._render(offers))
      .catch(error => console.error(error))
  }

  /**
   * Get all the flight offers from the first 10 days of next month
   */
  _getFlightOffers() {
    const date = new Date()
    const year = date.getFullYear()
    const nextMonth = date.getMonth() + 2
    const rangeStart = `${year}${pad(nextMonth, 2)}01` // start with 1st of next month's current date
    const rangeEnd = `${year}${pad(nextMonth, 2)}10` // end with the 10th day of next month's current date
    const params = {
      origin: 'AMS',
      destination: 'BCN',
      originDepartureDate: `${rangeStart}-${rangeEnd}`,
      adults: 1,
    }
    const query = objectToParams(params)
    const options = {
      method: 'GET',
      credentials: 'same-origin',
      mode: 'cors',
    }

    return fetch(`/flightOffers?path=${query}`, options)
      .then(response => (response.status === 200 ? response.json() : {}))
      .catch(error => console.error(error))
  }

  /**
   * Render the flight offers
   * @param {arary} offers - The list of flight offers
   */
  _render(offers) {
    offers.flightOffer.forEach(offer => {
      const departureDateTime = new Date(offer.outboundFlight.departureDateTime)
      const arrivalDateTime = new Date(offer.outboundFlight.arrivalDateTime)

      this.element.innerHTML += `
        <tr>
            <td>${offer.outboundFlight.flightNumber}</td>
            <td>${offer.outboundFlight.departureAirport.locationCode}</td>
            <td>${offer.outboundFlight.arrivalAirport.locationCode}</td>
            <td>${formatDate(departureDateTime)}</td>
            <td>${formatTime(departureDateTime)}</td>
            <td>${formatTime(arrivalDateTime)}</td>
            <td>${formatCurrency(
              offer.pricingInfoSum.totalPriceAllPassengers
            )}</td>
            <td>
              <form action="/checkout.html#passenger-details" method="GET">
                <input type="hidden" name="flight_id" value="${
                  offer.outboundFlight.id
                }" />
                <button type="submit" class="btn btn-primary">Select</button>
              </form>
            </td>
        </tr>
      `
    })
  }
}
