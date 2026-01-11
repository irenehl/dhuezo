export const AmbientBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200/40 dark:bg-purple-900/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-normal filter animate-float"></div>
      <div className="absolute top-[10%] right-[-10%] w-[40%] h-[60%] bg-blue-200/40 dark:bg-blue-900/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-normal filter animate-float-delayed"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[50%] bg-rose-200/30 dark:bg-rose-900/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-normal filter animate-breathe"></div>
    </div>
  )
}
