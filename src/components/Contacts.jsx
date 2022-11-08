import React from 'react'
import Banner from './Banner'


const ContactForm = () => {



    const [formStatus, setFormStatus] = React.useState('Send')
    const onSubmit = (e) => {
    e.preventDefault()
    setFormStatus('Submitting...')
    const { name, email, message } = e.target.elements
    let conFom = {
        name: name.value,
        email: email.value,
        message: message.value,
    }
    console.log(conFom)
  }
  return (
    <>
    
    <div className="container m-5 p-md-5">
      <div className="conatcts">
      <h2 className="my-5">Have You Any Project? Please Drop a Message</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label text-light" htmlFor="name">
            Name:
          </label>
          <input className="form-control  bg-transparent" type="text" placeholder=" A.Basouny" id="name" required />
        </div>
        <div className="mb-3">
          <label className="form-label text-light " htmlFor="email">
            Email:
          </label>
          <input className="form-control  bg-transparent" type="email" placeholder="basouny85@gmail.com" id="email" required />
        </div>
        <div className="mb-3">
          <label className="form-label text-light"  htmlFor="message">
            Message:
          </label>
          <textarea className="form-control text-light bg-transparent" placeholder='Write a message' id="message" required />
        </div>
        <button className="btn btn-dark" type="submit">
          {formStatus}
        </button>
      </form>
      </div>
    </div>
    </>
  )
}
export default ContactForm