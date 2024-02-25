import { Button, Flex, Text } from "@chakra-ui/react";
import Typewriter from "typewriter-effect";
import ImageUploader from "react-image-upload";
import "react-image-upload/dist/index.css";
import { AiOutlineDelete } from "react-icons/ai";
import { FaCamera } from "react-icons/fa";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import axios from "axios";
import { useState } from "react";

function Application() {
  const [first_image, setFirst_image] = useState(null);
  const [second_image, setSecond_image] = useState(null);
  const [response, setResponse] = useState(null);

  async function match_images() {
    if (first_image && second_image) {
      const response = await axios.post("https://signature-api-kvrr.onrender.com/endpoint", {
        first_image: first_image,
        second_image: second_image,
      });
      console.log({ response });

      setResponse(response.data);
    }
  }

  async function getImageFileObject(imageFile) {
    // Read the image file as a binary string
    const reader = new FileReader();
    // Fetch the image data from the blob URL
    const response = await fetch(imageFile.dataUrl);
    const blob = await response.blob();

    reader.onload = function (event) {
      // Convert the binary string to base64
      const base64Image = event.target.result.split(',')[1];

      // store this image
      if (first_image) {
        setSecond_image(base64Image);
      } else {
        setFirst_image(base64Image);
      }
    };

    reader.readAsDataURL(blob);
  }

  function runAfterImageDelete(file) {
    console.log({ file });
  }
  return (
    <>
      <SignedIn>
        <Flex
          rounded={"3xl"}
          backgroundColor={"blue.50"}
          boxShadow={"lg"}
          padding={5}
          marginX={"auto"}
          flexDirection={"column"}
          gap={5}
          width={"max-content"}
          marginTop={10}
        >
          <Flex
            backgroundColor={"teal.700"}
            paddingX={5}
            paddingY={3}
            margin={5}
            rounded={"3xl"}
            textColor={"white"}
            width={"max-content"}
          >
            <SignOutButton />
          </Flex>
          <Flex
            fontSize={25}
            fontWeight={"bold"}
            fontFamily={"sans"}
            textColor={"teal"}
            margin={5}
          >
            <Typewriter
              options={{
                strings: [
                  "Development (Beta Version)",
                  "You may test this application - upload signature images",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </Flex>

          <Flex
            margin={5}
            padding={5}
            boxShadow={"lg"}
            rounded={"3xl"}
            backgroundColor={"white"}
            flexDirection={"row"}
            gap={5}
            flexWrap={true}
            width={"max-content"}
          >
            <Flex
              backgroundColor={"red.50"}
              rounded={"3xl"}
              padding={5}
              boxShadow={"md"}
            >
              <Text
                fontFamily={"sans"}
                fontWeight={"bold"}
                fontSize={15}
                textColor={"red"}
              >
                Select First Image
                <Flex width={"max-content"} height={"max-content"} margin={5}>
                  <ImageUploader
                    onFileAdded={(img) => getImageFileObject(img)}
                    onFileRemoved={(img) => runAfterImageDelete(img)}
                    style={{
                      height: 100,
                      width: 100,
                      background: "rgb(255 199 255)",
                      borderRadius: 10,
                    }}
                    deleteIcon={<AiOutlineDelete />}
                    uploadIcon={<FaCamera />}
                  />
                </Flex>
              </Text>
            </Flex>
            <Flex
              backgroundColor={"green.50"}
              rounded={"3xl"}
              padding={5}
              boxShadow={"md"}
            >
              <Text
                fontFamily={"sans"}
                fontWeight={"bold"}
                fontSize={15}
                textColor={"green"}
              >
                Select Second Image
                <Flex width={"max-content"} height={"max-content"} margin={5}>
                  <ImageUploader
                    onFileAdded={(img) => getImageFileObject(img)}
                    onFileRemoved={(img) => runAfterImageDelete(img)}
                    style={{
                      height: 100,
                      width: 100,
                      background: "rgb(255 199 255)",
                      borderRadius: 10,
                    }}
                    deleteIcon={<AiOutlineDelete />}
                    uploadIcon={<FaCamera />}
                  />
                </Flex>
              </Text>
            </Flex>
          </Flex>

          <Flex
            margin={5}
            boxShadow={"lg"}
            rounded={"3xl"}
            backgroundColor={"white"}
            padding={5}
            width={"max-content"}
            justifyContent={"center"}
            gap={5}
            alignItems={"center"}
          >
            <Button boxShadow={"lg"} colorScheme="teal" rounded={"full"} onClick={match_images}>
              Match
            </Button>


            {
              response ? (
                <Text
                  fontSize={15}
                  textColor={"green"}
                  fontFamily={"sans"}
                  fontWeight={"bold"}
                >
                  {response['Matching Score']}
                </Text>
              ) : (
                <Text fontSize={15} textColor={"red"} fontFamily={"sans"} fontWeight={"bold"}>
                  Matching Score will be here!</Text>
              )
            }

          </Flex>
        </Flex>
      </SignedIn>

      <SignedOut>
        <Flex
          border={"1px solid black"}
          rounded={"3xl"}
          boxShadow={"lg"}
          backgroundColor={"GrayText"}
          textColor={"white"}
          fontFamily={"sans"}
          fontWeight={"bold"}
          margin={10}
          padding={3}
          width={"max-content"}
        >
          Please Sign In
        </Flex>

        <Flex
          backgroundColor={"whitesmoke"}
          paddingX={5}
          paddingY={3}
          margin={5}
          rounded={"3xl"}
          width={"max-content"}
        >
          <SignInButton />
        </Flex>
      </SignedOut>
    </>
  );
}

export default Application;
