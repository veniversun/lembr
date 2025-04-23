
import { PracticePage } from "@/components/practice/PracticePage";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";

const HABITOS_ATOMICOS_URL = "https://www.amazon.com.br/H%C3%A1bitos-At%C3%B4micos-M%C3%A9todo-Comprovado-Livrar/dp/8550807567";
const HABITOS_ATOMICOS_PODCAST = "https://www.youtube.com/watch?v=4F-NbrqWF3k&t=538s";

const Habatom = () => (
  <>
    <Header />
    <PracticePage
      title="Treine Hábitos Atômicos"
      bookType="habatom"
      tableName="habatom"
      bookUrl={HABITOS_ATOMICOS_URL}
      podcastUrl={HABITOS_ATOMICOS_PODCAST}
    />
    <Footer />
  </>
);

export default Habatom;
