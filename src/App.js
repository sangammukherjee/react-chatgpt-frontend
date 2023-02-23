import logo from "./logo.svg";
import "./App.css";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import Sidebar from "./sidebar";
import { Send } from "@mui/icons-material";
import { useEffect, useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [currentChatType, setCurrentChatType] = useState("text");
  const [messages, setMessages] = useState([]);
  const [currentResult, setCurrentResult] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  function handleChatInput(event) {
    const { target } = event;
    const { value } = target;
    setInputValue(value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    //set the current query in messages array
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        query: inputValue,
        result: "",
        type: currentChatType,
        id: !messages.length ? 1 : messages.length + 1,
      },
    ]);

    //call our api
    const apiResponse = await fetch(
      currentChatType === "text"
        ? "http://localhost:5500"
        : "http://localhost:5500/createimage",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          query: inputValue,
        }),
      }
    );

    const apiResponseResult = await apiResponse.json();
    if (apiResponseResult && apiResponseResult.data) {
      setCurrentResult(apiResponseResult.data);
    }

    console.log(apiResponseResult);
  }

  useEffect(() => {
    if (currentResult) {
      let cpyMessages = [...messages];
      const findLatestId = Math.max(...messages.map((item) => item.id));
      const findLastMessage = cpyMessages.findIndex(
        (item) => item.id === findLatestId
      );

      cpyMessages[findLastMessage] = {
        ...cpyMessages[findLastMessage],
        result: currentResult,
      };

      setMessages(cpyMessages);
      setInputValue("");
      setCurrentResult("");
    }
  }, [currentResult]);

  console.log(currentChatType);

  return (
    <Stack direction={"row"} height="100vh">
      <Box
        sx={{
          background: "rgba(32,33,35,1)",
          padding: "10px",
          width: "240px",
        }}
      >
        <Sidebar
          setCurrentChatType={setCurrentChatType}
          currentChatType={currentChatType}
          setIsDarkMode={setIsDarkMode}
          isDarkMode={isDarkMode}
        />
      </Box>
      <Box
        sx={{
          overflowY: "auto",
          flex: "1",
          position: "relative",
          padding: "0",
          background: isDarkMode ? "rgba(52,53,65,1)" : "#ffffff",
        }}
      >
        <Box
          sx={{
            height: "calc(100% - 100px)",
            overflow: "auto",
          }}
        >
          {messages && messages.length > 0
            ? messages.map((item) => (
                <Box>
                  <Box
                    sx={{
                      padding: "20px 120px",
                    }}
                  >
                    <Typography
                      sx={{
                        color: isDarkMode ? "#fff" : "#000",
                      }}
                    >
                      {item.query}
                    </Typography>
                  </Box>
                  {item.result !== "" ? (
                    <Box
                      sx={{
                        padding: "20px 120px",
                        background: isDarkMode
                          ? "rgba(68,70,84,1)"
                          : "rgba(247,247,248,1)",
                        border: "1px solid rgba(0,0,0,.1)",
                      }}
                    >
                      {item.type === "text" ? (
                        <Typography
                          sx={{
                            color: isDarkMode ? "rgba(236,236,241,1)" : "",
                          }}
                        >
                          {item.result}
                        </Typography>
                      ) : (
                        <img
                          style={{
                            width: "200px",
                          }}
                          src={item.result}
                          alt="Image"
                        />
                      )}
                    </Box>
                  ) : null}
                </Box>
              ))
            : null}
        </Box>
        <Paper
          component={"form"}
          sx={{
            borderRadius: "8px",
            border: "1px solid #e3e3e3",
            position: "absolute",
            bottom: "20px",
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
            left: "0px",
            right: "0px",
            display: "flex",
            boxShadow:
              "0 0  transparent, 0 0 transparent, 0 0 10px rgba(0,0,0,.1)",
            padding: "8px 12px",
          }}
          onSubmit={handleSubmit}
        >
          <input
            name="chat-input"
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: "16px",
            }}
            value={inputValue}
            onChange={handleChatInput}
          />
          <IconButton
            type="submit"
            sx={{
              p: "10px",
              backgroundColor: "rgba(0,0,0,.04)",
              borderLeft: "1px solid #f2f2f2",
              color: "#000",
            }}
          >
            <Send />
          </IconButton>
        </Paper>
      </Box>
    </Stack>
  );
}

export default App;
