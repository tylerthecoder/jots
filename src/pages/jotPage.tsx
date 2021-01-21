import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ILocationState } from "../App";
import CrazyLoader from "../components/CrazyLoader";
import usePassword from "../hooks/usePassword";
import { Jot } from "../models/jot";
import { API } from "../services/api";


interface ILocationParams {
  jid: string
}

export default function JotPage() {
  usePassword();

  const { jid } = useParams<ILocationParams>();

  const location = useLocation();

  const [jot, setJot] = useState<Jot | null>((location.state as ILocationState).jot ?? null);

  useEffect(() => {
    if (jot) return;

    API.getJot(jid).then(setJot);
  });

  if (!jot) {
    return <CrazyLoader />
  }

  return (
    <p> {jot.data} </p>
  );
};
