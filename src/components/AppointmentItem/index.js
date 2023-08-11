import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsLiked} = props
  const {id, title, inputDate, isStarred} = appointmentDetails
  const formattedDate = inputDate
    ? format(new Date(inputDate), 'dd MMMM yyyy, EEEE')
    : ''
  const staredImg = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickFavorite = () => {
    toggleIsLiked(id)
  }

  return (
    <li className="appointment-lists">
      <div>
        <h1 className="given-title">{title}</h1>
        <p className="given-date">Date: {formattedDate}</p>
      </div>
      <button
        type="button"
        data-testid="star"
        onClick={onClickFavorite}
        className="star-btn"
      >
        <img src={staredImg} alt="star" className="star-img" />
      </button>
    </li>
  )
}
export default AppointmentItem
