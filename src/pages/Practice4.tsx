import { PracticePage } from "@/components/practice/PracticePage";

const GENERALISTA_BOOK_URL = "https://www.amazon.com.br/Por-generalistas-vencem-mundo-especialistas/dp/6580634340";

const Practice4 = () => (
  <PracticePage
    title="Treine Por Que Os Generalistas Vencem"
    bookType="generalista"
    tableName="generalista"
    bookUrl={GENERALISTA_BOOK_URL}
  />
);

export default Practice4;