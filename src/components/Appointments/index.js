import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    AppointmentTitle: '',
    date: '',
    appointmentLists: [],
    isFilterActive: false,
  }

  toggleIsLiked = uniqueId => {
    this.setState(prevState => ({
      appointmentLists: prevState.appointmentLists.map(eachApp => {
        if (eachApp.id === uniqueId) {
          return {...eachApp, isStarred: !eachApp.isStarred}
        }
        return eachApp
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state
    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onChangeTitle = event => {
    this.setState({AppointmentTitle: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {AppointmentTitle, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title: AppointmentTitle,
      inputDate: date,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentLists: [...prevState.appointmentLists, newAppointment],
      AppointmentTitle: '',
      date: '',
    }))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentLists, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentLists.filter(eachApp => eachApp.isStarred === true)
    }
    return appointmentLists
  }

  render() {
    const {AppointmentTitle, date, isFilterActive} = this.state
    const starredClassName = isFilterActive ? 'filteredStared' : 'starred-btn'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="Appointments-App-container">
        <div className="main-container">
          <div className="appointment-details-container">
            <form onSubmit={this.onSubmitForm}>
              <h1 className="heading-1">Add Appointment</h1>
              <label htmlFor="title" className="form-sub-titles">
                TITLE
              </label>
              <br />
              <input
                id="title"
                type="text"
                placeholder="Title"
                className="form-control"
                value={AppointmentTitle}
                onChange={this.onChangeTitle}
              />
              <br />
              <label htmlFor="date" className="form-sub-titles">
                DATE
              </label>
              <br />
              <input
                type="date"
                id="date"
                onChange={this.onChangeDate}
                value={date}
                className="form-control"
              />
              <br />
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-img"
            />
          </div>
          <hr className="horizontal-line" />
          <div className="appointment-container-2">
            <h1 className="heading-2">Appointments</h1>
            <button
              type="button"
              className={starredClassName}
              onClick={this.onFilter}
            >
              Starred
            </button>
          </div>
          <ul className="unorderedList">
            {filteredAppointmentsList.map(paitient => (
              <AppointmentItem
                key={paitient.id}
                appointmentDetails={paitient}
                toggleIsLiked={this.toggleIsLiked}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
