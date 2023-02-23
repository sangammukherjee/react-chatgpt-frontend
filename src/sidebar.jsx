import { Button, Stack } from "@mui/material";

function Sidebar({
  setCurrentChatType,
  currentChatType,
  setIsDarkMode,
  isDarkMode,
}) {
  return (
    <Stack
      sx={{
        width: "100%",
        position: "relative",
        height: "100%",
      }}
    >
      <Button
        sx={{
          border: "1px solid #fff",
          color: "#fff",
          padding: "10px 0px",
          background: currentChatType === 'text' ? 'rgba(52, 53, 65, 1)' : "",
          "&:hover": {
            border: "1px solid #fff",
            background: currentChatType === 'text' ? 'rgba(52, 53, 65, 1)' : "",
        },
        }}
        onClick={() => setCurrentChatType("text")}
      >
        New Chat
      </Button>
      <Button
        sx={{
          border: "1px solid #fff",
          color: "#fff",
          padding: "10px 0px",
          background: currentChatType === 'image' ? 'rgba(52, 53, 65, 1)' : "",
          margin: "20px 0px 0px 0px",
          "&:hover": {
            border: "1px solid #fff",
            background: currentChatType === 'image' ? 'rgba(52, 53, 65, 1)' : "",
        },
        }}
        onClick={() => setCurrentChatType("image")}
      >
        Create Image
      </Button>
      <Button
        sx={{
          border: "1px solid #fff",
          color: "#fff",
          padding: "10px 0px",
          background: "",
          "&:hover": {
            border: "1px solid #fff",
            background: "",
          },
          position: "absolute",
          width: "100%",
          bottom: "20px",
        }}
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        Dark Mode
      </Button>
    </Stack>
  );
}

export default Sidebar;
