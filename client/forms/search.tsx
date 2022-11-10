import {
  Input,
  IconButton,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

interface ISearchForm {
  isLoading: boolean,
  query: string,
  setQuery: (query: string) => void,
  handleSubmit: React.FormEventHandler<HTMLFormElement>,
}

const SearchForm = ({ isLoading, query, setQuery, handleSubmit }: ISearchForm) => (
  <form onSubmit={handleSubmit}>
    <InputGroup pb="1rem">
      <Input
        placeholder="Search knowledge"
        bg="gray.100"
        variant="ghost"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <InputRightElement
        children={
          <IconButton
            aria-label="Search"
            icon={<SearchIcon />}
            bg="gray.400"
            color="white"
            type="submit"
            disabled={isLoading}
          />
        }
      />
    </InputGroup>
  </form>
)

export default SearchForm
