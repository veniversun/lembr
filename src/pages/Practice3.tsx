import { PracticePage } from "@/components/practice/PracticePage";
import { Header } from "@/components/home/Header";

const ESSENCIALISMO_URL = "https://www.amazon.com.br/gp/aw/d/8543102146";

const Practice3 = () => (
  <>
    <Header />
    <PracticePage
      title="Treine Essencialismo"
      bookType="essen"
      tableName="essen"
      bookUrl={ESSENCIALISMO_URL}
    />
  </>
);

export default Practice3;