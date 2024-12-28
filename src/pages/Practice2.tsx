import { PracticePage } from "@/components/practice/PracticePage";

const PSIFIN_BOOK_URL = "https://www.amazon.com.br/psicologia-financeira-atemporais-gan%C3%A2ncia-felicidade/dp/6555111100";

const Practice2 = () => (
  <PracticePage
    title="Treine Psicologia Financeira"
    bookType="psifin"
    tableName="psifin"
    bookUrl={PSIFIN_BOOK_URL}
  />
);

export default Practice2;