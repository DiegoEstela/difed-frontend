import { useEffect, useState } from "react";

/**
 * Hook que detecta si el viewport actual es considerado "mobile".
 *
 * @param breakpoint - Ancho máximo en píxeles para considerar mobile (por defecto 768px)
 * @returns {boolean} `true` si el ancho de la ventana es menor o igual al breakpoint, de lo contrario `false`.
 *
 * @example
 * ```tsx
 * const isMobile = useIsMobile();
 *
 * return (
 *   <div>
 *     {isMobile ? "Estás en mobile" : "Estás en desktop"}
 *   </div>
 * )
 * ```
 */
export const useIsMobile = (breakpoint: number = 768): boolean => {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth <= breakpoint
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};
