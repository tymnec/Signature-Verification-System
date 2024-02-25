import { Button, Flex, Text } from "@chakra-ui/react";
import { SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";

function Home() {
  return (
    <Flex
      flexDirection={"column"}
      gap={5}
      padding={5}
      margin={5}
      backgroundColor={"blue.50"}
      boxShadow={"lg"}
      rounded={"3xl"}
      height={"90vh"}
    >
      <Flex
        flexDirection={"row"}
        gap={5}
        paddingY={5}
        paddingX={10}
        margin={2}
        backgroundColor={"white"}
        boxShadow={"lg"}
        rounded={"3xl"}
        width={"max-content"}
      >
        <Text fontWeight={"bold"} fontFamily={"sans"} fontSize={25}>
          Creator: Nikhil Sarwara
        </Text>
      </Flex>

      <Flex fontSize={55} fontWeight={"bold"} fontFamily={"sans"} margin={10}>
        <Typewriter
          options={{
            strings: ["Hi There!", "Signature Verification System"],
            autoStart: true,
            loop: true,
          }}
        />
      </Flex>

      <Flex
        fontSize={25}
        margin={"auto"}
        fontFamily={"sans"}
        justifyContent={"center"}
      >
        <SignedOut>
          <Flex
            marginTop={10}
            rounded="full"
            boxShadow={"lg"}
            paddingX={5}
            paddingY={2}
            backgroundColor={"teal"}
            fontSize={15}
            textColor={"white"}
          >
            <SignInButton />
          </Flex>
        </SignedOut>

        <SignedIn>
          <Link to="/Application">
            <Button
              marginTop={10}
              colorScheme="teal"
              rounded="full"
              boxShadow={"lg"}
              padding={10}
            >
              Go to Application
            </Button>
          </Link>
        </SignedIn>
      </Flex>
    </Flex>
  );
}

export default Home;
