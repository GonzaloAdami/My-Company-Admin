import GenCards from "../GenCards/gen-card";
import { useWebContext } from "../../web-context";

const RegistroComisiones = () => {
  const { COMISIONES, setCOMISIONES, META, DIAS } = useWebContext();

  return (
    <GenCards
      data={COMISIONES}
      setData={setCOMISIONES}
      storageKey="COMISIONES"
      meta={META ?? undefined}
      dias={DIAS ?? undefined}
    />

  );
};

export default RegistroComisiones;
