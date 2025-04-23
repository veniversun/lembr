
import { PracticePage } from "@/components/practice/PracticePage";
import { Header } from "@/components/home/Header";

const GENERALISTA_BOOK_URL = "https://www.amazon.com.br/Por-generalistas-vencem-mundo-especialistas/dp/6580634340";
const GENERALISTA_PODCAST = "https://www.youtube.com/watch?v=BKXj3wmBC2Y&t=19s";

const Generalista = () => (
  <>
    <Header />
    <PracticePage
      title="Treine Por Que Os Generalistas Vencem"
      bookType="generalista"
      tableName="generalista"
      bookUrl={GENERALISTA_BOOK_URL}
      podcastUrl={GENERALISTA_PODCAST}
    />
  </>
);

export default Generalista;
