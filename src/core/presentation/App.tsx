import Navigation from "./navigation";
import useCachedResources from "./hooks/useCachedResources";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return (<Navigation />);
}