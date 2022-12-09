import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashBoard extends Component {
  state = {covinDetails: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCovinData()
  }

  getCovinData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(eachDataa => ({
          vaccineDate: eachDataa.vaccine_date,
          dose1: eachDataa.dose_1,
          dose2: eachDataa.dose_2,
        })),
        vaccinationByAge: data.vaccination_by_age.map(eacData => ({
          age: eacData.age,
          count: eacData.count,
        })),
        vaccinationByGender: data.vaccination_by_gender.map(eachData => ({
          count: eachData.count,
          gender: eachData.gender,
        })),
      }
      this.setState({
        covinDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderCovinResults = () => {
    const {covinDetails} = this.state

    return (
      <>
        <VaccinationCoverage
          vaccinationCoverageDetails={covinDetails.last7DaysVaccination}
        />

        <VaccinationByGender
          vaccinationGenderDetails={covinDetails.vaccinationByGender}
        />

        <VaccinationByAge
          vaccinationAgeDetails={covinDetails.vaccinationByAge}
        />
      </>
    )
  }

  renderLoadingView = () => (
    <div testid="loader" className="loader-container">
      <Loader color="#ffffff" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Something went wrong</h1>
    </div>
  )

  renderViewsAPIStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCovinResults()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div className="heading-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo"
          />
          <h1 className="heading">Co-WIN</h1>
        </div>
        <h1 className="covin-heading">CoWin Vaccination in India</h1>
        {this.renderViewsAPIStatus()}
      </div>
    )
  }
}

export default CowinDashBoard
