import {
  ModalContext,
  ModalManagerContext,
} from "@cozy/components/ModalManager";
import { useContext } from "react";

export function useModal(): ModalContext {
  return useContext(ModalManagerContext);
}
