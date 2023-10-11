import {
  Flex,
  Input,
  Image,
  InputGroup,
  InputLeftElement,
  IconButton,
  Button,
  ButtonGroup,
  Stack,
  HStack,
  VStack,
  Text,
  Spacer,
} from "@chakra-ui/react";
import { IconContext } from "react-icons/lib";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { useState } from "react";

const MenuCards = (props) => {
  const cardWidth = props.basketActive ? "150px" : "180px";
  return (
    <Card
      bg={"white"}
      _hover={{ color: "red" }}
      height={"250px"}
      width={cardWidth}
      borderRadius={"12px"}
    >
      <CardBody
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignContent={"center"}
        alignItems={"center"}
        flexWrap={"wrap"}
        color={"black"}
        _hover={{
          color: "white",
          bg: "red",
          borderRadius: "6px",
        }}
      >
        <Image
          src={props.gambar}
          alt={props.text}
          boxSize={"110px"}
          borderRadius={"150px"}
          onClick={props.button}
        />
        <Flex
          alignItems={"center"}
          flexDirection={"column"}
          width={"100%"}
          fontSize={"18px"}
        >
          <Text>{props.text}</Text>
          <Text>Rp. {props.price.toLocaleString("id-ID")}</Text>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default MenuCards;
