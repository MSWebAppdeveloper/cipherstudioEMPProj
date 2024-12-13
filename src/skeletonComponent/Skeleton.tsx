import {cn}from "@/lib/utils"

function Skeleton({
    className,
    ...props
}:React.HTMLAttributes<HTMLDivElement>){
    return(
        <div className={cn ("animate-pulse rounded-md bg-muted",className)}
        style={{ minHeight: "1rem", minWidth: "100px" }}
        {...props}
        />
    )
}
export {Skeleton}