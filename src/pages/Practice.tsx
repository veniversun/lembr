import { PracticePage } from "@/components/practice/PracticePage";
import { Header } from "@/components/home/Header";

const HABITOS_ATOMICOS_URL = "https://www.amazon.com.br/H%C3%A1bitos-At%C3%B4micos-M%C3%A9todo-Comprovado-Livrar/dp/8550807567";

const Practice = () => (
  <>
    <Header />
    <PracticePage
      title="Treine Hábitos Atômicos"
      bookType="habatom"
      tableName="habatom"
      bookUrl={HABITOS_ATOMICOS_URL}
    />
  </>
);

export default Practice;