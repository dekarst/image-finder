import React, { useEffect } from 'react'
import {
  Pagination,
  usePagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
  PaginationSeparator,
} from '@ajna/pagination'

interface IPagination {
  totalPages: number,
  page: number,
  handlePageChange: (pageNumber: number) => void,
}

const OUTER_LIMIT = 2
const INNER_LIMIT = 2

const PaginationComponent = ({ totalPages, handlePageChange, page }: IPagination) => {
  const {
    currentPage,
    setCurrentPage,
    pagesCount,
    pages
  } = usePagination({
    pagesCount: totalPages,
    initialState: { currentPage: 1 },
    limits: {
      outer: OUTER_LIMIT,
      inner: INNER_LIMIT
    },
  })

  useEffect(() => {
    handlePageChange(currentPage)
  }, [currentPage])

  useEffect(() => {
    setCurrentPage(page)
  }, [page])

  return (
    <Pagination
      pagesCount={pagesCount}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    >
      <PaginationContainer>
        <PaginationPrevious mr={1}>Prev</PaginationPrevious>
        <PaginationPageGroup
            isInline
            align="center"
            separator={
              <PaginationSeparator
                isDisabled
                fontSize="sm"
                w={7}
                jumpSize={11}
              />
            }
          >
          {pages.map((page: number) => (
            <PaginationPage
              key={`pagination_page_${page}`}
              page={page}
              w={7}
              bg="gray.100"
              fontSize="sm"
              _hover={{
                bg: "gray.300"
              }}
              _current={{
                w: 7,
                bg: "gray.300",
                fontSize: "sm",
                _hover: {
                  bg: "gray.400"
                },
              }}
            />
          ))}
        </PaginationPageGroup>
        <PaginationNext ml={1}>Next</PaginationNext>
      </PaginationContainer>
    </Pagination>
  )
}

export default PaginationComponent
