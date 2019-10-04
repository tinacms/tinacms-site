import * as React from 'react'

interface Llama_Props {
  color? : String;
}

export const Llama_Icon= (props: Llama_Props) => {
  return (
    <svg role="img" viewBox="0 0 49 68" fill={`${props.color}`} xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
      <title>Tina</title>
      <desc>A proud llama</desc>
      <path d="M31.4615 30.1782C34.763 27.4475 36.2259 11.3098 37.6551 5.50906C39.0843 -0.291715 44.995 0.00249541 44.995 0.00249541C44.995 0.00249541 43.4605 2.67299 44.0864 4.66584C44.7123 6.65869 49 8.44005 49 8.44005L48.0752 10.8781C48.0752 10.8781 46.1441 10.631 44.995 12.9297C43.8459 15.2283 45.7336 37.9882 45.7336 37.9882C45.7336 37.9882 38.8271 51.6106 38.8271 57.3621C38.8271 63.1136 41.5495 67.9338 41.5495 67.9338H37.7293C37.7293 67.9338 32.1252 61.2648 30.9759 57.9318C29.8266 54.5988 30.2861 51.2658 30.2861 51.2658C30.2861 51.2658 24.1946 50.921 18.7931 51.2658C13.3915 51.6106 9.78922 56.2539 9.13908 58.8512C8.48894 61.4486 8.21963 67.9338 8.21963 67.9338H5.19906C3.36057 62.2603 1.90043 60.2269 2.69255 57.3621C4.88665 49.4269 4.45567 44.9263 3.94765 42.9217C3.43964 40.9172 0 39.1676 0 39.1676C1.68492 35.7349 3.4048 34.0854 10.8029 33.9133C18.201 33.7413 28.1599 32.9088 31.4615 30.1782Z"/>
      <path d="M12.25 57.03C12.25 57.03 13.0305 64.2533 17.1773 67.9342H20.7309C17.1773 63.9085 16.7897 53.415 16.7897 53.415C14.9822 54.0035 12.4799 56.1106 12.25 57.03Z"/>
    </svg>
  )
}
