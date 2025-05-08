import Mainantd from "./main_antd_UI";
import { ConfigProvider, theme } from "antd";

function App() {
  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      <Mainantd />
    </ConfigProvider>
  );
}

export default App;
