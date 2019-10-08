import React, {useState} from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp';
import styled from 'styled-components';

import { Heading } from 'components/foundations'
import { colors, space, breakpoints } from 'utils/variables'

/**
 * TODO:
 * move this out of footer since
 * its used on community page also
 *
 */

const EmailForm = () => {
  const  [ email, setEmail ] = useState('')
  const [ isEntering, setIsEntering] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(email)
    e.preventDefault();
    addToMailchimp(email)
      .then((data) => {
        console.log(data)
        alert(data.msg);
      })
      .catch((error: Error) => {
        // Errors in here are client side
        // Mailchimp always returns a 200
        if (error.message === 'Timeout') {
          alert('Looks like your browser is blocking this. Try to disable any tracker-blocking feature and resubmit.')
        }
        console.error(error)
      });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEntering(true)
    setEmail(event.currentTarget.value);
  };

  return (
    <StyledForm onSubmit={handleSubmit} >
      <Heading as="h3" size="h3">Stay in touch 👉</Heading>

      { isEntering &&
        <StyledButton type="submit">
          <Heading as="h5" size="label" color={`${colors.hunterOrange}`}>
            Subscribe
          </Heading>
        </StyledButton>
      }
        <input
          placeholder="Your email..."
          name="email"
          type="text"
          onChange={handleEmailChange}
          onFocus={handleEmailChange}
        />

    </StyledForm>
  );

}

export default EmailForm

const StyledForm= styled('form')`
  padding: ${space.xSmallDesktop}px 0;
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: auto;
  grid-template-areas:
    "cta btn"
    "input input";
  h3 {
    grid-area: cta;
    align-self: center;
    margin-right: 12px;
  }
  input {
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.15);
    grid-area: input;
    border: 0;
    border-radius: 0.25rem;
    background: #B13617;
    color: ${colors.mintChocoChip};
    font-family: system-ui, sans-serif;
    font-size: 1rem;
    line-height: 1.2;
    white-space: nowrap;
    text-decoration: none;
    cursor: pointer;
    height: 40px;
    width: 100%;
    padding: 0 18px;
    margin-top: ${space.xSmallDesktop}px;
    font-family: 'tuner-regular';
    font-size: 16px;
    ::placeholder {
      color: ${colors.mintChocoChip};
      opacity: 1;
      font-family: 'tuner-regular';
      font-size: 16px;
      transition: opacity 200ms ease;
    }
    :active,
    :focus {
      ::placeholder {
        opacity: .5;
        transition: opacity 200ms ease;
      }
    }
  }
  @media(min-width: ${breakpoints.lg}px) {
    padding: 10px 0;
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-template-areas:"cta input btn";
    grid-column-gap: ${space.xSmallDesktop}px;
    input {
      margin: 0;
      width: revert;
    }
    h3 {
      font-size: 18px;
      margin-right: 0;
    }
  }
`

const StyledButton = styled('button')`
  justify-self: end;
  grid-area: btn;
  width: max-content;
  filter: drop-shadow(1px 2px 18px rgb(0,0,0,12%));
  transition: filter 250ms ease;
  display: flex;
  align-items: center;
  background-color: ${colors.seafoam};
  color: ${colors.mintChocoChip};
  border-radius: 100px;
  border: 0;
  white-space: no-wrap;
  text-decoration: none;
  text-transform: uppercase;
  height: 40px;
  padding: 0;
  :hover,
  :focus {
    text-decoration: none;
    filter: drop-shadow(1px 5px 18px rgb(0,0,0,25%));
    transition: filter 250ms ease;
  }
  h5 {
    padding: 0 ${space.md}px;
  }
`

