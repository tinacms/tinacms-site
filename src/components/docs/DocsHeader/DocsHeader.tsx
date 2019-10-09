import * as React from 'react'
import { Heading, Box, Text, Hr } from 'components/foundations'

interface DocsHeaderProps {
  title: string
  subtitle?: string
}

const DocsHeader: React.FC<DocsHeaderProps> = ({ title, subtitle }) => {
  return (
    <Box as="header" mb="md">
      <Heading as="h1" size={800} color="hunterOrange">
        {title}
      </Heading>
      <Text as="p" size={400} mt="md">
        {subtitle}
      </Text>
      <Hr />
    </Box>
  )
}

export default DocsHeader
