import GenCards from "../GenCards/gen-card";
import { useWebContext } from "../../web-context";

const Register = () => {
  const { REGISTRO, setREGISTRO, META, DIAS } = useWebContext();

  return (
 <GenCards
  data={REGISTRO}
  setData={setREGISTRO}
  storageKey="REGISTRO"
  meta={META ?? undefined}
  dias={DIAS ?? undefined}
  title="VENTAS"
  label="Ventas del día"
/>

  );
};

export default Register;
