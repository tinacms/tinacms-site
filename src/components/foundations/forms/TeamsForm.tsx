import React, { useState } from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'

import { colors, breakpoints, space } from 'utils/variables'
import { Heading } from 'components/foundations'

function TeamsForm(props) {
  const [firstName, setFirstName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const { hubspotFormID } = props

  async function postForm(data) {
    if (hubspotFormID && process.env.GATSBY_HUBSPOT_PORTAL_ID) {
      const url = `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.GATSBY_HUBSPOT_PORTAL_ID}/${hubspotFormID}`
      try {
        const rawResponse = await fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        const response = await rawResponse.json()
        const message = response.inlineMessage.replace(/<[^>]*>/g, '').trim()
        alert(message)
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
      fields: [
        {
          name: 'firstname',
          value: firstName,
        },
        {
          name: 'lastname',
          value: surname,
        },
        {
          name: 'email',
          value: email,
        },
      ],
    }
    if (process.env.NODE_ENV === 'production') {
      postForm(formData)
    } else {
      console.error('Teams form only posts in production')
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Heading as="h5" size="label" color={colors.hunterOrange} style={{ marginBottom: '1rem' }}>
        Teams Early Access
      </Heading>
      <label>
        <p className="body">First Name</p>
        <input type="text" id="name" name="name" value={firstName} onChange={handleNameChange} />
      </label>
      <label>
        <p className="body">Last Name</p>
        <input type="text" id="surname" name="surname" value={surname} onChange={handleSurnameChange} />
      </label>
      <label>
        <p className="body">Email</p>
        <input type="text" id="email" name="email" required value={email} onChange={handleEmailChange} />
      </label>
      <StyledButton type="submit">
        <Heading as="h5" size="label">
          Request Access
        </Heading>
      </StyledButton>
    </StyledForm>
  )
}

export default TeamsForm

const StyledForm = styled('form')`
  height: 100%;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: ${space.smallDesktop}px auto;
  p {
    color: ${colors.mintChocoChip};
    margin-bottom: 10px;
  }
  label {
    margin-bottom: ${space.xSmallDesktop}px;
  }

  input {
    height: 40px;
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    background-color: ${colors.seafoam};
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08), 0px 2px 3px rgba(0, 0, 0, 0.12);
    border: 0;
    border-radius: 5px;
    color: ${colors.black};
    line-height: 1.2;
    white-space: nowrap;
    text-decoration: none;
    cursor: text;
    width: 100%;
    padding: 0 16px;
    transition: all 85ms ease-out;
    font-family: 'tuner-regular';
    font-size: 16px;
    &:hover,
    &:focus {
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08), 0 0 0 3px ${rgba(colors.seafoam, 0.7)},
        0px 2px 3px rgba(0, 0, 0, 0.12);
    }
    &:focus,
    &:active {
      outline: none;
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08), 0 0 0 3px ${rgba(colors.seafoam, 0.7)},
        0px 2px 3px rgba(0, 0, 0, 0.12);
    }
  }

  @media (min-width: ${breakpoints.lg}px) {
    height: unset;
    width: 65%;
    border-radius: 60px;
  }
`

const StyledButton = styled('button')`
  align-self: center;
  width: max-content;
  margin-top: ${space.smallDesktop}px;
  /* filter: drop-shadow(1px 2px 18px rgb(0, 0, 0, 12%));
  transition: filter 250ms ease; */
  transform: translate3d(0px, 0px, 0px);
  transition: transform 180ms ease-in;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  background-color: ${colors.hunterOrange};
  border-radius: 100px;
  border: 0;
  cursor: pointer;
  white-space: no-wrap;
  text-decoration: none;
  text-transform: uppercase;
  height: 45px;
  padding: 0;
  &:hover,
  &:focus {
    text-decoration: none;
    /* filter: drop-shadow(1px 5px 18px rgb(0, 0, 0, 25%));
    transition: filter 250ms ease; */
    transform: translate3d(-1px, -2px, 2px);
    transition: transform 150ms ease-out;
  }
  &:focus {
    box-shadow: 0 0 0 3px ${rgba(colors.hunterOrange, 0.5)};
  }
  &:focus,
  &:active {
    outline: none;
  }
  &:active {
    filter: none;
  }
  h5 {
    padding: 0 24px;
  }
`
