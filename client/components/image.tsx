import Image from 'next/image'
import { Box } from '@chakra-ui/react'

interface IPhoto {
  id: string,
  url: string,
  alt: string,
  photographer: string,
}

const ImageComponent = ({ url, alt, photographer }: IPhoto) => (
  <>
    <Box
      position="relative"
      height={150}
      boxShadow="base"
      rounded="10px"
      overflow="hidden"
      bg="white"
      _hover={{ boxShadow: "dark-lg" }}
    >
      <Image
        src={url}
        alt={alt}
        fill
        style={{objectFit: "cover"}}
      />
    </Box>
    <Box mt={1}>
      <Box color="gray.600" fontSize="sm">
        {photographer || 'Unknown'}
      </Box>
      <Box
        fontSize="md"
        lineHeight={1.4}
        noOfLines={2}
      >
        {alt || 'Unknown'}
      </Box>
    </Box>
  </>
)

export default ImageComponent
