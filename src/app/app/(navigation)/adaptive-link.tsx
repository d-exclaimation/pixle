"use client";

import { rc } from "@d-exclaimation/next";
import Link, { LinkProps } from "next/link";
import { useSearchParams } from "next/navigation";
import { ComponentPropsWithoutRef, useMemo, type ReactNode } from "react";

type Props = Omit<ComponentPropsWithoutRef<"a">, keyof LinkProps> &
  LinkProps & { children?: ReactNode };
export default rc<Props>(({ href, ...rest }) => {
  const searchParams = useSearchParams();

  const isStandalone = useMemo(
    () => !!searchParams.get("standalone"),
    [searchParams]
  );

  const url = useMemo(() => {
    if (!href.toString().startsWith("/") || !isStandalone)
      return href.toString();
    const current = href.toString();
    if (current.includes("?")) return current + "&standalone=true";
    return current;
  }, [isStandalone, href]);

  if (!href.toString().startsWith("/")) {
    return <a href={url} {...rest} />;
  }

  return <Link href={url} {...rest} />;
});
