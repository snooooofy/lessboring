"use client"

import { useState, useRef, useEffect } from "react"
import { FlaskConical, TestTube2, Beaker, Eye, Droplets, Thermometer } from "lucide-react"

interface LabItemProps {
  id: string
  icon: React.ReactNode
  label: string
  color: string
  initialPosition?: { x: number; y: number }
}

export function DraggableLabItem({ id, icon, label, color, initialPosition }: LabItemProps) {
  const [position, setPosition] = useState(initialPosition || { x: 100, y: 100 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const itemRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
      setIsDragging(true)
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragOffset])

  return (
    <div
      ref={itemRef}
      className={`absolute cursor-grab active:cursor-grabbing select-none transition-transform ${
        isDragging ? 'z-50 scale-110' : 'z-10 hover:scale-105'
      }`}
      style={{
        left: position.x,
        top: position.y,
        transform: isDragging ? 'rotate(5deg)' : 'rotate(0deg)',
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        className={`flex flex-col items-center justify-center w-20 h-24 rounded-lg shadow-xl backdrop-blur-sm border-2 border-white/30 ${color} transition-all duration-200 relative overflow-hidden`}
      >
        {/* Equipment-specific styling */}
        {id === "flask" && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/20 rounded-lg" />
        )}
        {id === "testtube" && (
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/10 rounded-lg" />
        )}
        {id === "beaker" && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/15 to-white/25 rounded-lg" />
        )}
        {id === "microscope" && (
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/20 rounded-lg" />
        )}
        {id === "dropper" && (
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/10 rounded-lg" />
        )}
        {id === "thermometer" && (
          <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-white/25 rounded-lg" />
        )}
        
        <div className="text-white/90 mb-1 relative z-10">
          {icon}
        </div>
        <span className="text-xs font-medium text-white/90 text-center leading-tight relative z-10">
          {label}
        </span>
        
        {/* Equipment-specific details */}
        {id === "flask" && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-white/20 rounded-full" />
        )}
        {id === "testtube" && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-white/30 rounded-full" />
        )}
        {id === "beaker" && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-2 bg-white/20 rounded-full" />
        )}
        {id === "microscope" && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white/30 rounded-full" />
        )}
        {id === "dropper" && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-white/30 rounded-full" />
        )}
        {id === "thermometer" && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-white/30 rounded-full" />
        )}
      </div>
    </div>
  )
}

export function LabEquipmentContainer() {
  const labItems = [
    {
      id: "flask",
      icon: <FlaskConical className="w-7 h-7" />,
      label: "Erlenmeyer",
      color: "bg-blue-600/90",
      initialPosition: { x: 150, y: 200 }
    },
    {
      id: "testtube",
      icon: <TestTube2 className="w-7 h-7" />,
      label: "Test Tube",
      color: "bg-emerald-600/90",
      initialPosition: { x: 300, y: 150 }
    },
    {
      id: "beaker",
      icon: <Beaker className="w-7 h-7" />,
      label: "Beaker",
      color: "bg-violet-600/90",
      initialPosition: { x: 450, y: 250 }
    },
    {
      id: "microscope",
      icon: <Eye className="w-7 h-7" />,
      label: "Microscope",
      color: "bg-amber-600/90",
      initialPosition: { x: 200, y: 350 }
    },
    {
      id: "dropper",
      icon: <Droplets className="w-7 h-7" />,
      label: "Pipette",
      color: "bg-rose-600/90",
      initialPosition: { x: 400, y: 100 }
    },
    {
      id: "thermometer",
      icon: <Thermometer className="w-7 h-7" />,
      label: "Thermometer",
      color: "bg-sky-600/90",
      initialPosition: { x: 100, y: 300 }
    }
  ]

  return (
    <div className="relative w-full h-full min-h-[600px] pointer-events-none">
      {labItems.map((item) => (
        <div key={item.id} className="pointer-events-auto">
          <DraggableLabItem
            id={item.id}
            icon={item.icon}
            label={item.label}
            color={item.color}
            initialPosition={item.initialPosition}
          />
        </div>
      ))}
    </div>
  )
} 