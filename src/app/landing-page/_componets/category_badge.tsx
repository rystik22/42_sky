import React from 'react'
import { Event } from '../../../types/types'

export const CategoryBadge = ({ category }: { category: string }) => {
  const colors: Record<string, string> = {
    workshop: "bg-blue-500/20 text-blue-400",
    competition: "bg-purple-500/20 text-purple-400",
    social: "bg-emerald-500/20 text-emerald-400",
    lecture: "bg-amber-500/20 text-amber-400",
    association: "bg-pink-500/20 text-pink-400",
    rush: "bg-red-500/20 text-red-400",
    other: "bg-gray-500/20 text-gray-400"
  }

  return (
    <span className={`text-xs px-2 py-1 rounded-full ${colors[category.toLowerCase()] || "bg-gray-500/20 text-gray-400"}`}>
      {category}
    </span>
  )
}