import React, { useState, useEffect } from 'react'
import styled from 'styled-components'


const StyledForm = styled('form')`

`

function TeamsForm() {
  const [ firstName, setFirstName ] = useState('')
  const [ surname, setSurname] = useState('')
  const [ email, setEmail ] = useState('')

  async function postForm(data){
    if (process.env.GATSBY_HUBSPOT_FORM_ID && process.env.GATSBY_HUBSPOT_PORTAL_ID) {
      const url = `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.GATSBY_HUBSPOT_PORTAL_ID}/${process.env.GATSBY_HUBSPOT_FORM_ID}`
      try {
        const rawResponse = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const response = await rawResponse.json();
        alert(response.inlineMessage);
      } catch (e) {
        alert('Looks like an error, please email support@forestry.io')
        console.error(e)
      }
    } else {
      console.error('Teams Form: Environment variables missing')
    }
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFirstName(e.target.value)
  }
  function handleSurnameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSurname(e.target.value)
  }
  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = {
      "fields": [
      {
        "name": "firstname",
        "value": firstName
      },
      {
        "name": "lastname",
        "value": surname
      },
      {
        "name": "email",
        "value": email
      }
    ]}
    if (process.env.NODE_ENV === 'production') {
      postForm(formData)
    } else {
      console.error('Teams form only posts in production')
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label >
        First Name
        <input
          type="text"
          id="name"
          name="name"
          value={firstName}
          onChange={handleNameChange}/>
      </label>
      <label >
        Last Name
        <input
          type="text"
          id="surname"
          name="surname"
          value={surname}
          onChange={handleSurnameChange}/>
      </label>
      <label >
        Email
        <input
          type="text"
          id="email"
          name="email"
          required
          value={email}
          onChange={handleEmailChange} />
      </label>
      <button type="submit">Sign Up</button>
    </StyledForm>
  )
}

export default TeamsForm
