
import { PracticePage } from "@/components/practice/PracticePage";
import { Header } from "@/components/home/Header";

const ESSENCIALISMO_URL = "https://www.amazon.com.br/gp/aw/d/8543102146";
const ESSENCIALISMO_PODCAST = "https://www.youtube.com/watch?v=pbZ59IGwA8M&t=27s";

const Essen = () => (
  <>
    <Header />
    <PracticePage
      title="Treine Essencialismo"
      bookType="essen"
      tableName="essen"
      bookUrl={ESSENCIALISMO_URL}
      podcastUrl={ESSENCIALISMO_PODCAST}
    />
  </>
);

export default Essen;
