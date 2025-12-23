function MessagesLoadingSkeleton() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {[...Array(6)].map((_, index) => {
        const isMe = index % 2 === 0;

        return (
          <div
            key={index}
            className={`flex ${isMe ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`animate-pulse rounded-xl px-4 py-3 
              ${isMe ? "bg-cyan-600/40 rounded-br-none" : "bg-slate-700 rounded-bl-none"} 
              w-50 h-10`}
            />
          </div>
        );
      })}
    </div>
  );
}

export default MessagesLoadingSkeleton;
