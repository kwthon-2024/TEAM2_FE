import type { PropsWithChildren } from 'react'

export const Container = ({ children }: PropsWithChildren) => {
  return <div className="flex-column w-full gap-[10px]">{children}</div>
}
