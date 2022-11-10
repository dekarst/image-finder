import { useState } from 'react'
import Head from 'next/head'
import {
  Box,
  Container,
  SimpleGrid as Grid,
  GridItem,
  Text,
  useToast,
} from '@chakra-ui/react'

import SearchForm from '../forms/search'
import Loader from '../components/loader'
import Image from '../components/image'
import Pagination from '../components/pagination'

type TPhoto = {
  id: string,
  url: string,
  alt: string,
  photographer: string,
}

export default function Home() {
  const [query, setQuery] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [photos, setPhotos] = useState<TPhoto[]>([])
  const [pages, setPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const toast = useToast()

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (query.length < 3) {
      toast({
        title: 'Error.',
        description: 'At least 3 characters required.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
      return
    }

    setCurrentPage(1)
    await fetchImages()
  }

  const handlePageChange = async (pageNumber: number): Promise<void> => {
    if (pageNumber === currentPage) return

    setCurrentPage(pageNumber)

    await fetchImages()
  }

  const fetchImages = async (): Promise<void> => {
    setIsLoaded(false)
    setIsLoading(true)

    const body = {
      search: query,
      page: currentPage,
    }

    const response = await fetch('/api/images', {
      method: 'POST',
      body: JSON.stringify(body),
    })
    const result = await response.json()
    const { photos, totalCount, perPage } = result?.data

    setPhotos(photos)
    setPages(Math.ceil(totalCount / perPage))
    setIsLoading(false)
    setIsLoaded(true)
  }

  return (
    <div>
      <Head>
        <title>Image Gallery</title>
        <meta name="description" content="Image Gallery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box m={3}>
        <Container maxW="4xl">
          <SearchForm
            query={query}
            isLoading={isLoading}
            setQuery={setQuery}
            handleSubmit={handleSubmit}
          />

          {photos.length > 0 && (
            <Grid columns={[1, 2, 3]} gap={6} mt={10}>
              {photos.map((pic: TPhoto) => (
                <GridItem key={pic.id} mb={3}>
                  <Image
                    id={pic.id}
                    url={pic.url}
                    alt={pic.alt}
                    photographer={pic.photographer}
                  />
                </GridItem>
              ))}
            </Grid>
          )}
          {isLoaded && photos.length === 0 && (
            <Box mt={5} display="flex" justifyContent="center">
              <Text>No images found. Please use another keyword.</Text>
            </Box>
          )}

          <Box mt={5} display="flex" justifyContent="center">
            {pages > 0 && (
              <Pagination
                totalPages={pages}
                page={currentPage}
                handlePageChange={handlePageChange}
              />
            )}
          </Box>
        </Container>
      </Box>

      {isLoading && <Loader />}
    </div>
  )
}
