import React from 'react'
import { useLocation } from 'wouter'

import { 
  PaginationContainer,
  PaginationContent,
  Button,
  List,
  Item
} from './elements'

function Pagination({pages, page}) {
  let initialNumberOfPage =  1
  const pageList = new Array(pages).fill(0).map(_ => initialNumberOfPage++)

  const [_, pushLocation] = useLocation()

  const handlePrevPage = () => {
    if (page === 1) {
      return 
    } else {
      pushLocation(`/comunidad/${page - 1}`)
    }
  }
  const handleNextPage = () => {
    if (page === pages) {
      return 
    } else {
      pushLocation(`/comunidad/${page + 1}`)
    }
  }

  const handleGoTo = (page) => {
    pushLocation(`/comunidad/${page}`)
  }

  return (

    <PaginationContainer>
      <PaginationContent>
        {page > 1 &&
          <Button prev onClick={handlePrevPage}> &lt; </Button>
        }
        <List>
          {pageList.map(pageItem => (
            <Item 
              isActual={pageItem === page}
              key={pageItem}
              onClick={() => handleGoTo(pageItem)}
            >
              {pageItem}
            </Item>
          ))}
        </List>
        {page < pages &&
          <Button prev onClick={handleNextPage}> &gt; </Button>
        }
      </PaginationContent>
    </PaginationContainer>
  )
}


export default Pagination
