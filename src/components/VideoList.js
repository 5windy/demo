import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  HStack,
  Input,
  Image,
  Text,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const VideoList = () => {
  // useState 는 화면 랜더링에 반영됨
  const [videoList, setVideoList] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("달고나 커피");

  // useRef 는 화면 랜더링 반영되지 않는 참조값
  const pageCount = useRef(1);

  // Chakra UI 에서 제공하는 훅
  const buttonScheme = useColorModeValue("blackAlpha", "whiteAlpha");

  const fetchBooks = async () => {
    const response = await fetch(
      `https://dapi.kakao.com/v2/search/vclip?query=${search}&page=${page}&size=12`,
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

    setVideoList(data.documents);
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
        <HStack wrap={"wrap"} gap={"10px"} m={"40px 0px"}>
          {videoList.map((video, index) => (
            <Link to={video.url} key={video.url}>
              <Card boxSize={"300px"}>
                <CardBody>
                  <Image
                    w={"280px"}
                    src={video.thumbnail}
                    alt={video.title}
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Text
                      fontWeight={"bold"}
                      textOverflow={"ellipsis"}
                      overflow={"hidden"}
                      lineHeight={"1em"}
                      height={"2em"}
                    >
                      {video.title}
                    </Text>
                    <Divider />
                    <Text>{video.author}</Text>
                  </Stack>
                </CardBody>
              </Card>
            </Link>
          ))}
        </HStack>
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

export default VideoList;
