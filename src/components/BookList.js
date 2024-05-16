import {
  Box,
  Button,
  HStack,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const BookList = () => {
  // useState 는 화면 랜더링에 반영됨
  const [bookList, setBookList] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("구름빵");

  // useRef 는 화면 랜더링 반영되지 않는 참조값
  const pageCount = useRef(1);

  // Chakra UI 에서 제공하는 훅
  const buttonScheme = useColorModeValue("blackAlpha", "whiteAlpha");

  const fetchBooks = async () => {
    const response = await fetch(
      `https://dapi.kakao.com/v3/search/book?query=${search}&page=${page}&size=12`,
      {
        method: "GET",
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_API_KEY}`,
        },
      }
    );
    const data = await response.json();
    // console.log(data);

    pageCount.current =
      data.meta.pageable_count % 10 > 0
        ? data.meta.pageable_count / 10 + 1
        : data.meta.pageable_count / 10;
    pageCount.current = Math.floor(pageCount.current);
    pageCount.current = pageCount.current > 15 ? 15 : pageCount.current;
    // console.log(pageCount.current);

    setBookList(data.documents);
  };

  const changeSearch = (e) => {
    if (e.target.value.length >= 2) setSearch(e.target.value);
  };

  useEffect(() => {
    fetchBooks();
  }, [page, search]);

  return (
    <>
      <Box>
        <Input
          type="text"
          placeholder="검색어 입력"
          onChange={changeSearch}
          size="lg"
          variant="filled"
          w={"240px"}
        />
        <TableContainer>
          <Table variant={"striped"} colorScheme="blackAlpha" m={"40px 0"}>
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Title</Th>
                {window.screen.width >= 760 ? (
                  <>
                    <Th>Author</Th>
                    <Th>Publisher</Th>
                  </>
                ) : (
                  <></>
                )}
              </Tr>
            </Thead>
            <Tbody>
              {bookList.map((book, index) => (
                <>
                  <Tr
                    _hover={{
                      backgroundColor: "lightblue",
                      cursor: "pointer",
                    }}
                  >
                    <Td>{(page - 1) * 10 + index + 1}</Td>
                    <Td>
                      <Link to={`/book/search/${book.isbn}`}>
                        <Text
                          isTruncated
                          maxWidth="50vw"
                          whiteSpace="nowrap"
                          overflow="hidden"
                          textOverflow="ellipsis"
                        >
                          {book.title}
                        </Text>
                      </Link>
                    </Td>
                    {window.screen.width >= 760 ? (
                      <>
                        <Td>{book.authors[0]}</Td>
                        <Td>{book.publisher}</Td>
                      </>
                    ) : (
                      <></>
                    )}
                  </Tr>
                </>
              ))}
            </Tbody>
            <Tfoot></Tfoot>
          </Table>
        </TableContainer>
        <HStack mb={"40px"} justifyContent={"center"} wrap={"wrap"}>
          {Array.from({ length: pageCount.current }, (_, index) => (
            <>
              <Button
                colorScheme={page === index + 1 ? "red" : buttonScheme}
                onClick={(e) => {
                  setPage(index + 1);
                }}
              >
                {index + 1}
              </Button>
            </>
          ))}
        </HStack>
      </Box>
    </>
  );
};

export default BookList;
