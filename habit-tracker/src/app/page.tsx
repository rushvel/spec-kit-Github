import { Suspense } from 'react'

export default function Home() {
  return (
    <div>
      <h1 className="text-center mb-4">Habit Tracker</h1>
      <Suspense fallback={<div>Loading...</div>}>
        {/* HabitDashboard component will be added here */}
      </Suspense>
    </div>
  )
}