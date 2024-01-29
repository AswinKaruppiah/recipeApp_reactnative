import { SafeAreaView } from "react-native-safe-area-context";

const SectionWrapper = (Component) =>
  function HOC() {
    return (
      <SafeAreaView>
        <Component />
      </SafeAreaView>
    );
  };

export default SectionWrapper;
